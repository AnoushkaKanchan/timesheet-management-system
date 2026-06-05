from django.db.models import Sum, Value, DecimalField
from django.db.models.functions import Coalesce

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import BasePermission

from apps.projects.models import Project
from apps.users.models import User
from apps.timesheets.models import TimesheetMaster, TimesheetDetail
from .serializers import DashboardStatsSerializer


class IsAdminRole(BasePermission):
    """
    Ensures the requesting user is authenticated and mapped explicitly 
    to your structural "Admin" role name.
    """
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            hasattr(request.user, 'role') and 
            request.user.role.role_name == "Admin"
        )


class DashboardStatsView(APIView):
    # Swap out IsAdminUser for your custom structural project role validation
    permission_classes = [IsAdminRole]

    def get(self, request):
        total_hours = TimesheetDetail.objects.aggregate(
            total=Coalesce(
                Sum("hours_worked"),
                Value(0, output_field=DecimalField(max_digits=10, decimal_places=2)),
            )
        )["total"]

        data = {
            "total_projects": Project.objects.count(),
            "total_users": User.objects.count(),
            "total_timesheets": TimesheetMaster.objects.count(),
            "pending_timesheets": TimesheetMaster.objects.filter(status="PENDING").count(),
            "locked_timesheets": TimesheetMaster.objects.filter(is_locked=True).count(),
            "total_hours": total_hours,
        }

        # Clear and explicit instantiation using keyword arguments
        serializer = DashboardStatsSerializer(instance=data)
        return Response(serializer.data)
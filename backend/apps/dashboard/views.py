from datetime import datetime
from django.db.models import Sum, Value, DecimalField, Count
from django.db.models.functions import Coalesce, TruncMonth
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import BasePermission

from ..projects.models import Project
from ..users.models import User
from ..timesheets.models import TimesheetMaster, TimesheetDetail


class IsAdminRole(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            hasattr(request.user, 'role') and 
            request.user.role.role_name == "Admin"
        )


class DashboardStatsView(APIView):
    permission_classes = [IsAdminRole]

    def get(self, request):
        # 1. Determine Target Filtering Month (Format: YYYY-MM)
        month_param = request.query_params.get("month")
        
        if month_param:
            try:
                target_date = datetime.strptime(month_param, "%Y-%m").date()
                year = target_date.year
                month = target_date.month
            except ValueError:
                now = timezone.now()
                year, month = now.year, now.month
        else:
            now = timezone.now()
            year, month = now.year, now.month

        # 2. Build Scoped Monthly Base Querysets
        timesheet_master_month = TimesheetMaster.objects.filter(
            submission_date__year=year,
            submission_date__month=month
        )
        
        timesheet_detail_month = TimesheetDetail.objects.filter(
            timesheet_master__submission_date__year=year,
            timesheet_master__submission_date__month=month
        )

        # 3. Compile Selectable Months History (for the dropdown component)
        selectable_months = []
        month_buckets = (
            TimesheetMaster.objects.annotate(month_bucket=TruncMonth("submission_date"))
            .values("month_bucket")
            .annotate(count=Count("id"))
            .order_by("-month_bucket")
        )

        for item in month_buckets:
            if item["month_bucket"]:
                selectable_months.append({
                    "value": item["month_bucket"].strftime("%Y-%m"),      # e.g., "2026-06"
                    "label": item["month_bucket"].strftime("%B %Y")       # e.g., "June 2026"
                })

        # Fallback if database logging is pristine empty
        if not selectable_months:
            current_str = timezone.now().strftime("%Y-%m")
            current_lbl = timezone.now().strftime("%B %Y")
            selectable_months.append({"value": current_str, "label": current_lbl})

        # 4. Aggregate Cumulative Logged Hours
        total_hours_query = timesheet_detail_month.aggregate(
            computed_hours=Coalesce(
                Sum("hours_worked"),
                Value(0.0),
                output_field=DecimalField(max_digits=10, decimal_places=2)
            )
        )
        
        try:
            total_hours_value = float(total_hours_query["computed_hours"])
        except (ValueError, TypeError):
            total_hours_value = 0.00

        # Construct Month-Wise Dashboard State Payload Object
        data = {
            "selected_month": f"{year}-{str(month).zfill(2)}",
            "selectable_months": selectable_months,
            "metrics": {
                "total_projects_active_this_month": Project.objects.filter(
                    id__in=timesheet_detail_month.values_list("project_id", flat=True).distinct()
                ).count(),
                "active_users_this_month": User.objects.filter(
                    id__in=timesheet_master_month.values_list("user_id", flat=True).distinct()
                ).count(),
                "total_timesheets_submitted": timesheet_master_month.count(),
                "submitted_timesheets": timesheet_master_month.filter(is_locked=True).count(),
                "locked_timesheets": timesheet_master_month.filter(is_locked=True).count(),
                "total_hours_logged": total_hours_value
            }
        }

        return Response(data)
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import TimesheetMaster
from .serializers import TimesheetMasterSerializer
from .permissions import IsOwnerOrAdmin

from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import TimesheetMaster, TimesheetDetail
from .serializers import (
    TimesheetMasterSerializer,
    TimesheetDetailSerializer
)
from .permissions import (
    IsOwnerOrAdmin,
    IsDetailOwnerOrAdmin
)

from rest_framework.exceptions import PermissionDenied

from django.db.models import DecimalField, Sum
from django.db.models.functions import Coalesce
from django.db.models import Value

class TimesheetListCreateView(generics.ListCreateAPIView):

    serializer_class = TimesheetMasterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        queryset = TimesheetMaster.objects.annotate(
            total_hours=Coalesce(
                Sum("timesheet_details__hours_worked"),
                Value(
                    0,
                    output_field=DecimalField(
                        max_digits=5,
                        decimal_places=2
                    )
                )
            )
        )
        if user.role.role_name == "Admin":
            return queryset

        return queryset.filter(user=user)

    def perform_create(self, serializer):

        serializer.save(
            user=self.request.user
        )

    

class TimesheetRetrieveUpdateDeleteView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = TimesheetMasterSerializer
    permission_classes = [
        IsAuthenticated,
        IsOwnerOrAdmin
    ]

    queryset = TimesheetMaster.objects.all()

    def update(self, request, *args, **kwargs):

        timesheet = self.get_object()

        if timesheet.is_locked:
            raise PermissionDenied(
                "Locked timesheets cannot be modified."
            )

        return super().update(
            request,
            *args,
            **kwargs
        )

    def destroy(self, request, *args, **kwargs):

        timesheet = self.get_object()

        if timesheet.is_locked:
            raise PermissionDenied(
                "Locked timesheets cannot be deleted."
            )

        return super().destroy(
            request,
            *args,
            **kwargs
        )
    
class SubmitTimesheetView(APIView):
    permission_classes = [
        IsAuthenticated,
        IsOwnerOrAdmin
    ]

    def post(self, request, pk):
        timesheet = get_object_or_404(TimesheetMaster, pk=pk)

        self.check_object_permissions(
            request,
            timesheet
        )

        if timesheet.is_locked:
            return Response(
                {
                    "message": "Timesheet already submitted."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Removed timesheet.status = "PENDING"
        timesheet.is_locked = True
        timesheet.submitted_at = timezone.now()

        timesheet.save()

        return Response(
            {
                "message": "Timesheet submitted successfully"
            },
            status=status.HTTP_200_OK
        )
    
class TimesheetDetailListCreateView(generics.ListCreateAPIView):

    serializer_class = TimesheetDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        queryset = TimesheetDetail.objects.all()

        timesheet_master_id = self.request.query_params.get(
            "timesheet_master"
        )

        if timesheet_master_id:
            queryset = queryset.filter(
                timesheet_master_id=timesheet_master_id
            )

        if self.request.user.role.role_name != "Admin":
            queryset = queryset.filter(
                timesheet_master__user=self.request.user
            )

        return queryset

    def perform_create(self, serializer):

        timesheet_master = serializer.validated_data[
            "timesheet_master"
        ]

        if timesheet_master.is_locked:
            raise PermissionDenied(
                "Cannot add details to a locked timesheet."
            )

        serializer.save()

class TimesheetDetailRetrieveUpdateDestroyView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = TimesheetDetailSerializer
    permission_classes = [
        IsAuthenticated,
        IsDetailOwnerOrAdmin
    ]

    def get_queryset(self):

        if self.request.user.is_staff:
            return TimesheetDetail.objects.all()

        return TimesheetDetail.objects.filter(
            timesheet_master__user=self.request.user
        )

    def perform_update(self, serializer):

        detail = self.get_object()

        if detail.timesheet_master.is_locked:
            raise PermissionDenied(
                "Cannot modify details of a locked timesheet."
            )

        serializer.save()

    def perform_destroy(self, instance):

        if instance.timesheet_master.is_locked:
            raise PermissionDenied(
                "Cannot delete details from a locked timesheet."
            )

        instance.delete()
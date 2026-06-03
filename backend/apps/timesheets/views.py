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

class TimesheetListCreateView(generics.ListCreateAPIView):

    serializer_class = TimesheetMasterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        if user.role.role_name == "Admin":
            return TimesheetMaster.objects.all()

        return TimesheetMaster.objects.filter(
            user=user
        )

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

        timesheet = get_object_or_404(TimesheetMaster,pk=pk)

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

        timesheet.status = "PENDING"
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

        if self.request.user.is_staff:
            return TimesheetDetail.objects.all()

        return TimesheetDetail.objects.filter(
            timesheet_master__user=self.request.user
        )


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
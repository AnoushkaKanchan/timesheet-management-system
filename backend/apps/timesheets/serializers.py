from rest_framework import serializers
from .models import TimesheetMaster, TimesheetDetail

class TimesheetMasterSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(
        source="user.email"
    )

    class Meta:
        model = TimesheetMaster
        fields = [
            "id",
            "user",
            "submission_date",
            "status",
            "is_locked",
            "sent_to_client_at",
            "submitted_at",
            "reviewed_at",
            "reviewed_by",
            "comments",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "user",
            "is_locked",
            "sent_to_client_at",
            "submitted_at",
            "reviewed_at",
            "reviewed_by",
            "created_at",
            "updated_at",
            "status",
        ]

class TimesheetDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = TimesheetDetail
        fields = [
            "id",
            "timesheet_master",
            "project",
            "hours_worked",
            "task_description",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]
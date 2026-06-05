from rest_framework import serializers
from .models import TimesheetMaster, TimesheetDetail

class TimesheetMasterSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(
        source="user.email"
    )

    total_hours = serializers.DecimalField(
        max_digits=7,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = TimesheetMaster
        fields = [
            "id",
            "user",
            "submission_date",
            "total_hours",
            "is_locked",
            "submitted_at",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "user",
            "total_hours",
            "is_locked",
            "submitted_at",
            "created_at",
            "updated_at",
        ]


class TimesheetDetailSerializer(serializers.ModelSerializer):
    project_name = serializers.ReadOnlyField(
        source="project.project_name"
    )
     
    class Meta:
        model = TimesheetDetail
        fields = [
            "id",
            "timesheet_master",
            "project",
            "project_name",
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
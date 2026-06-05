from rest_framework import serializers
from apps.timesheets.models import TimesheetDetail

class ReportRowSerializer(serializers.ModelSerializer):
    employee = serializers.ReadOnlyField(source="timesheet_master.user.email")
    project = serializers.ReadOnlyField(source="project.project_name")
    status = serializers.ReadOnlyField(source="timesheet_master.status")
    submission_date = serializers.ReadOnlyField(source="timesheet_master.submission_date")

    class Meta:
        model = TimesheetDetail
        fields = [
            "employee",
            "project",
            "hours_worked",
            "status",
            "submission_date",
            "task_description",
        ]
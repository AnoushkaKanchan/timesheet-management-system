import csv

from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser

from apps.timesheets.models import TimesheetDetail


class ExportReportView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        response = HttpResponse(
            content_type="text/csv"
        )

        response[
            "Content-Disposition"
        ] = 'attachment; filename="timesheet_report.csv"'

        writer = csv.writer(response)

        writer.writerow([
            "Employee",
            "Submission Date",
            "Project",
            "Hours",
            "Task Description",
            "Status",
        ])

        details = (
            TimesheetDetail.objects
            .select_related(
                "timesheet_master",
                "timesheet_master__user",
                "project",
            )
            .all()
        )

        for detail in details:

            writer.writerow([
                detail.timesheet_master.user.email,
                detail.timesheet_master.submission_date,
                detail.project.project_name,
                detail.hours_worked,
                detail.task_description,
                detail.timesheet_master.status,
            ])

        return response
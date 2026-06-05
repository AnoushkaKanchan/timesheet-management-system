import csv
from django.http import HttpResponse
from django.db.models import Sum, DecimalField, Value
from django.db.models.functions import Coalesce

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from apps.timesheets.models import TimesheetDetail
from .serializers import ReportRowSerializer


class ExportReportView(APIView):
    """
    Hardened CSV export view supporting dynamic matching query parameter filters.
    """
    permission_classes = [IsAdminUser]

    def get(self, request):
        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="timesheet_report.csv"'

        writer = csv.writer(response)
        writer.writerow([
            "Employee",
            "Submission Date",
            "Project",
            "Hours",
            "Task Description",
            "Status",
        ])

        # Optimize relation pre-fetches
        queryset = TimesheetDetail.objects.select_related(
            "timesheet_master",
            "timesheet_master__user",
            "project",
        )

        # Parse identical incoming filter parameters
        project_id = request.query_params.get("project")
        status = request.query_params.get("status")
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")

        if project_id:
            queryset = queryset.filter(project_id=project_id)
        if status:
            queryset = queryset.filter(timesheet_master__status=status)
        if start_date:
            queryset = queryset.filter(timesheet_master__submission_date__gte=start_date)
        if end_date:
            queryset = queryset.filter(timesheet_master__submission_date__lte=end_date)

        for detail in queryset:
            writer.writerow([
                detail.timesheet_master.user.email,
                detail.timesheet_master.submission_date,
                detail.project.project_name,
                detail.hours_worked,
                detail.task_description,
                detail.timesheet_master.status,
            ])

        return response


class ReportListView(APIView):
    """
    Report JSON preview list endpoint with type-safe summary calculations.
    """
    permission_classes = [IsAdminUser]

    def get(self, request):
        queryset = TimesheetDetail.objects.select_related(
            "timesheet_master",
            "timesheet_master__user",
            "project",
        )

        project_id = request.query_params.get("project")
        status = request.query_params.get("status")
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")

        if project_id:
            queryset = queryset.filter(project_id=project_id)
        if status:
            queryset = queryset.filter(timesheet_master__status=status)
        if start_date:
            queryset = queryset.filter(timesheet_master__submission_date__gte=start_date)
        if end_date:
            queryset = queryset.filter(timesheet_master__submission_date__lte=end_date)

        total_records = queryset.count()
        
        summary_stats = queryset.aggregate(
            computed_hours=Coalesce(
                Sum("hours_worked"), 
                Value(0.0),
                output_field=DecimalField()
            )
        )
        
        try:
            total_hours = f"{float(summary_stats['computed_hours']):.2f}"
        except (ValueError, TypeError):
            total_hours = "0.00"

        serializer = ReportRowSerializer(queryset, many=True)

        return Response({
            "summary": {
                "total_records": total_records,
                "total_hours": total_hours
            },
            "results": serializer.data
        })
import csv
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Sum

from apps.timesheets.models import TimesheetDetail
from .serializers import ReportRowSerializer
from apps.authentication.permissions import IsAdmin  # Assuming standard Admin restriction is enforced here

class ReportPreviewView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request, *args, **kwargs):
        queryset = TimesheetDetail.objects.all().select_related(
            'timesheet_master', 'timesheet_master__user', 'project'
        )

        # Extraction parameters
        employee_email = request.query_params.get("employee")
        project_id = request.query_params.get("project")
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")

        # Query filters
        if employee_email:
            queryset = queryset.filter(timesheet_master__user__email__icontains=employee_email)
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        if start_date:
            queryset = queryset.filter(timesheet_master__submission_date__gte=start_date)
        if end_date:
            queryset = queryset.filter(timesheet_master__submission_date__lte=end_date)

        # Aggregate Metrics
        total_records = queryset.count()
        total_hours_sum = queryset.aggregate(total=Sum('hours_worked'))['total'] or 0
        
        serializer = ReportRowSerializer(queryset, many=True)

        return Response({
            "summary": {
                "total_records": total_records,
                "total_hours": f"{float(total_hours_sum):.2f}"
            },
            "results": serializer.data
        },  status=status.HTTP_200_OK)

class ReportExportCSVView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request, *args, **kwargs):
        details = TimesheetDetail.objects.all().select_related(
            'timesheet_master', 'timesheet_master__user', 'project'
        )

        # Extraction parameters
        employee_email = request.query_params.get("employee")
        project_id = request.query_params.get("project")
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")

        # Query filters
        if employee_email:
            details = details.filter(timesheet_master__user__email__icontains=employee_email)
        if project_id:
            details = details.filter(project_id=project_id)
        if start_date:
            details = details.filter(timesheet_master__submission_date__gte=start_date)
        if end_date:
            details = details.filter(timesheet_master__submission_date__lte=end_date)

        # Initialize stream response configurations
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="timesheet_allocations_report.csv"'

        writer = csv.writer(response)
        
        # Write clean structural database header components
        writer.writerow([
            "Employee",
            "Submission Date",
            "Project",
            "Hours",
            "Task Description",
        ])

        # Serialize stream items sequentially
        for detail in details:
            writer.writerow([
                detail.timesheet_master.user.email,
                detail.timesheet_master.submission_date,
                detail.project.project_name,
                detail.hours_worked,
                detail.task_description,
            ])

        return response
from django.urls import path
from .views import ExportReportView, ReportListView

urlpatterns = [
    path(
        "",
        ReportListView.as_view(),
        name="report-list",
    ),
    path(
        "export/",
        ExportReportView.as_view(),
        name="export-report",
    ),
]
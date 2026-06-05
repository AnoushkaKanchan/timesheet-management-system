from django.urls import path
from .views import (
    ReportPreviewView,
    ReportExportCSVView,
)

urlpatterns = [
    path(
        "",
        ReportPreviewView.as_view(),
        name="report-preview",
    ),

    path(
        "export/",
        ReportExportCSVView.as_view(),
        name="report-export",
    ),
]
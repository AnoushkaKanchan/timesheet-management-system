from django.urls import path
from django.urls import path
from .views import (
    TimesheetListCreateView,
    TimesheetRetrieveUpdateDeleteView,
    SubmitTimesheetView,
    TimesheetDetailListCreateView,
    TimesheetDetailRetrieveUpdateDestroyView,
)

urlpatterns = [
    # Timesheet Master
    path(
        "",
        TimesheetListCreateView.as_view(),
        name="timesheet-list-create",
    ),
    path(
        "<int:pk>/",
        TimesheetRetrieveUpdateDeleteView.as_view(),
        name="timesheet-detail",
    ),
    path(
        "<int:pk>/submit/",
        SubmitTimesheetView.as_view(),
        name="timesheet-submit",
    ),

    # Timesheet Detail
    path(
        "details/",
        TimesheetDetailListCreateView.as_view(),
        name="timesheet-detail-list-create",
    ),
    path(
        "details/<int:pk>/",
        TimesheetDetailRetrieveUpdateDestroyView.as_view(),
        name="timesheet-detail-detail",
    ),
]
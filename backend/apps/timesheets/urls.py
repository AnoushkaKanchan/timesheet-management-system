from django.urls import path
from .views import (
    TimesheetListCreateView,
    TimesheetRetrieveUpdateDeleteView,
    SubmitTimesheetView,
)

urlpatterns = [
    path(
        "",
        TimesheetListCreateView.as_view(),
        name="timesheet-list-create"
    ),
    path(
        "<int:pk>/",
        TimesheetRetrieveUpdateDeleteView.as_view(),
        name="timesheet-detail"
    ),
    path(
        "<int:pk>/submit/",
        SubmitTimesheetView.as_view(),
        name="submit-timesheet"
    ),
]
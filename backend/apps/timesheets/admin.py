from django.contrib import admin
from .models import TimesheetMaster, TimesheetDetail


class TimesheetDetailInline(admin.TabularInline):
    model = TimesheetDetail
    extra = 0


@admin.register(TimesheetMaster)
class TimesheetMasterAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "submission_date",
        "is_locked",
        "submitted_at",
    )

    search_fields = (
        "user__email",
    )

    # Completely purged "status" from filters here
    list_filter = (
        "is_locked",
        "submission_date",
    )

    ordering = ("-submission_date",)

    inlines = [TimesheetDetailInline]


@admin.register(TimesheetDetail)
class TimesheetDetailAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "timesheet_master",
        "project",
        "hours_worked",
    )

    search_fields = (
        "project__project_name",
    )

    ordering = ("id",)
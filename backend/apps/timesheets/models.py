from django.db import models
from apps.projects.models import Project
from django.conf import settings


class TimesheetMaster(models.Model):
    """
    Core master tracking head. Keeps structural context metrics bound to 
    submission execution dates, ownership profiles, and record locks.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="timesheet_masters"
    )

    submission_date = models.DateField()
    
    is_locked = models.BooleanField(
        default=False
    )

    submitted_at = models.DateTimeField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.user.email} - {self.submission_date}"
    
    
class TimesheetDetail(models.Model):
    """
    Granular task-level breakdown line entries referencing logged hours worked 
    and target project foreign keys.
    """
    timesheet_master = models.ForeignKey(
        TimesheetMaster,
        on_delete=models.CASCADE,
        related_name="timesheet_details"
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="timesheet_entries"
    )

    hours_worked = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )

    task_description = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.project.project_name} - {self.hours_worked} hrs"
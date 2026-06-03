from django.db import models
from apps.projects.models import Project
from django.conf import settings


class TimesheetMaster(models.Model):

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
        ("SENT_TO_CLIENT", "Sent To Client"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="timesheet_masters"
    )

    submission_date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )
    
    is_locked = models.BooleanField(
    default=False
    )

    sent_to_client_at = models.DateTimeField(
        null=True,
        blank=True
    )

    submitted_at = models.DateTimeField(
        null=True,
        blank=True
    )

    reviewed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reviewed_timesheets"
    )

    comments = models.TextField(
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
        return (
            f"{self.project.project_name} "
            f"- {self.hours_worked} hrs"
        )
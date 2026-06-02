
from django.db import models
from django.conf import settings

class Project(models.Model):

    STATUS_CHOICES = [
        ("ACTIVE", "Active"),
        ("COMPLETED", "Completed"),
        ("ON_HOLD", "On Hold"),
    ]

    project_name = models.CharField(
        max_length=255
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    start_date = models.DateField()

    end_date = models.DateField(
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="ACTIVE"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.project_name
    
class ProjectAssignment(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="project_assignments"
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="project_assignments"
    )

    assigned_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        unique_together = ("user", "project")

    def __str__(self):
        return f"{self.user.email} - {self.project.project_name}"
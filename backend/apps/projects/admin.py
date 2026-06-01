from django.contrib import admin
from .models import Project, ProjectAssignment


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "project_name",
        "status",
        "start_date",
        "end_date",
    )

    search_fields = (
        "project_name",
        "description",
    )

    list_filter = (
        "status",
        "start_date",
    )

    ordering = ("id",)


@admin.register(ProjectAssignment)
class ProjectAssignmentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "project",
        "assigned_at",
    )

    search_fields = (
        "user__email",
        "project__project_name",
    )

    ordering = ("id",)
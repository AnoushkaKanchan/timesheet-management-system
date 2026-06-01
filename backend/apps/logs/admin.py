from django.contrib import admin
from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "action",
        "entity_type",
        "entity_id",
        "created_at",
    )

    search_fields = (
        "action",
        "entity_type",
    )

    list_filter = (
        "entity_type",
        "created_at",
    )

    ordering = ("-created_at",)
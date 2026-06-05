from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = [
            "id",
            "project_name",
            "description",
            "start_date",
            "end_date",
            "status",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]
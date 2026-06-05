from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Project
from .serializers import ProjectSerializer
from apps.authentication.permissions import IsAdminOrReadOnly


class ProjectListCreateView(generics.ListCreateAPIView):
    """
    GET  -> List all projects
    POST -> Create project (Admin only)
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    -> Project details
    PUT    -> Update project (Admin only)
    DELETE -> Delete project (Admin only)
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]
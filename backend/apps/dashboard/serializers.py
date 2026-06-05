from rest_framework import serializers

class DashboardStatsSerializer(serializers.Serializer):
    total_projects = serializers.IntegerField()
    total_users = serializers.IntegerField()
    total_timesheets = serializers.IntegerField()
    pending_timesheets = serializers.IntegerField()
    locked_timesheets = serializers.IntegerField()
    total_hours = serializers.DecimalField(max_digits=10, decimal_places=2)
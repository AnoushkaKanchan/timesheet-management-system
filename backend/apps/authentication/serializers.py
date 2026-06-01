from rest_framework import serializers
from apps.users.models import User


class UserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source="role.role_name")

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "role",
        )


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
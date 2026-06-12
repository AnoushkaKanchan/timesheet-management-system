from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from .models import Role

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        write_only=True,
        required=True,
        help_text="The corporate handle prefix before the domain."
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password', 'password_confirm']

    def validate_username(self, value):
        normalized_prefix = value.strip().lower()
        # Strip off domain if user typed it out anyway to prevent duplicate concatenation
        if "@" in normalized_prefix:
            normalized_prefix = normalized_prefix.split("@")[0]
        
        computed_email = f"{normalized_prefix}@orangedatatech.com"
        
        # Severe backend security rule: Check uniqueness against the calculated corporate email
        if User.objects.filter(email=computed_email).exists():
            raise serializers.ValidationError("User with this company email handle already exists.")
            
        return normalized_prefix

    def validate(self, attrs):
        # Password Confirmation Match Validation Pass
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        # Extract fields to prevent model allocation contamination
        username_prefix = validated_data.pop('username')
        validated_data.pop('password_confirm')
        
        # Never Trust Frontend: Explicit Backend Domain Construction
        corporate_email = f"{username_prefix}@orangedatatech.com"
        
        # Enforce Employee assignment automatically on creation pass
        employee_role, _ = Role.objects.get_or_create(role_name="Employee")
        
        user = User.objects.create_user(
            email=corporate_email,
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=employee_role
        )
        return user
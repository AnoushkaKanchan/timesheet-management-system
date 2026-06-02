from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken ,AccessToken
from rest_framework.permissions import IsAuthenticated
from .serializers import LoginSerializer, UserSerializer


class LoginView(APIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = authenticate(
            request,
            email=email,
            password=password
        )

        if not user:
            return Response(
                {"detail": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh_token = RefreshToken.for_user(user)
        access_token = AccessToken.for_user(user)

        return Response(
            {
                "access": str(access_token),   
                "refresh": str(refresh_token),
                "user": UserSerializer(user).data,
            }
        )

class CurrentUserView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            UserSerializer(request.user).data
        )
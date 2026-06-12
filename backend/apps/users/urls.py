from django.urls import path
from .views import RegisterView

urlpatterns = [
    # ... your existing authentication paths (login, logout, token-refresh) live here
    path("register/", RegisterView.as_view(), name="register"),
]
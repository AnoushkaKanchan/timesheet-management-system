from django.urls import include, path
from .views import LoginView, CurrentUserView

urlpatterns = [
    path(
        "login/",
        LoginView.as_view(),
        name="login",
    ),

    path(
        "me/",
        CurrentUserView.as_view(),
        name="current-user",
    ),

    path("", include("apps.users.urls")),
]
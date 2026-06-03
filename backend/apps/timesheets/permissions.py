from rest_framework.permissions import BasePermission


class IsOwnerOrAdmin(BasePermission):
    """
    Admin:
        Access all timesheets

    Employee:
        Access only own timesheets
    """

    def has_object_permission(self, request, view, obj):
        if request.user.role.role_name == "Admin":
            return True

        return obj.user == request.user
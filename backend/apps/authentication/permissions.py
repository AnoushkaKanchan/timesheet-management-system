from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsAdmin(BasePermission):
    """
    Allows access only to Admin users.
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.is_authenticated
            and request.user.role.role_name == "Admin"
        )


class IsEmployee(BasePermission):
    """
    Allows access only to Employee users.
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role
            and request.user.role.role_name == "Employee"
        )
    
class IsAdminOrReadOnly(BasePermission):
    """
    Read access:
        Any authenticated user

    Write access:
        Admin only
    """

    def has_permission(self, request, view):

        if request.method in SAFE_METHODS:
            return request.user.is_authenticated

        return (
            request.user.is_authenticated
            and request.user.role
            and request.user.role.role_name == "Admin"
        )
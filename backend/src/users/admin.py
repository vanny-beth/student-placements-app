from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, TraineeProfile, PartnerProfile

# Register your models here.

class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {"fields": ("email", "password", "is_trainee", "is_partner", "is_admin")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {"fields": ("email", "password1", "password2", "is_trainee", "is_partner", "is_admin")}),
    )
    list_display = ("email", "is_trainee", "is_partner", "is_admin", "is_staff")
    search_fields = ("email",)
    ordering = ("email",)

# Register models
admin.site.register(User, UserAdmin)
admin.site.register(TraineeProfile)
admin.site.register(PartnerProfile)

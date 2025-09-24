from django.contrib.auth.models import AbstractUser
from django.db import models
from .managers import CustomUserManager

# Custom User model that uses email instead of username
class User(AbstractUser):
    username = None  # remove the default username field
    email = models.EmailField(unique=True)  # use email as unique identifier

    # Role flags
    is_trainee = models.BooleanField(default=False)
    is_partner = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = "email"   # login with email
    REQUIRED_FIELDS = []       # no extra required fields

    objects = CustomUserManager()    # use custom manager

    def __str__(self):
        return self.email


# Extra details for trainees
class TraineeProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="trainee_profile")
    trainee_id = models.CharField(max_length=20, unique=True)  # e.g. TRN001
    university = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255)
    bio = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.email} ({self.trainee_id})"


# Extra details for partners
class PartnerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="partner_profile")
    organization_name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    contact_email = models.EmailField()

    def __str__(self):
        return self.organization_name

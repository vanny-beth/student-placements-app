from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import TraineeProfile, PartnerProfile

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = (
            'email',
            'password',
            'password2',
            'is_trainee',
            'is_partner',
        )
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        # ensure passwords match
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password2": "Passwords do not match."}
            )

        # ensure at least one role is selected
        if not (attrs.get("is_trainee") or attrs.get("is_partner")):
            raise serializers.ValidationError(
                {"role": "User must be either a trainee or a partner."}
            )

        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)

        # automatically create profile based on role
        if user.is_trainee:
            TraineeProfile.objects.create(user=user)
        if user.is_partner:
            PartnerProfile.objects.create(user=user)

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'is_trainee',
            'is_partner',
            'is_admin',
        )


# Custom login serializer (returns tokens + user info)
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add user details to the response
        data.update({
            "user": {
                "id": self.user.id,
                "email": self.user.email,
                "is_trainee": self.user.is_trainee,
                "is_partner": self.user.is_partner,
                "is_admin": self.user.is_admin,
            }
        })
        return data

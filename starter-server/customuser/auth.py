from __future__ import annotations

from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .throttling import TokenObtainRateThrottle


class EmailConfirmedTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        **TokenObtainPairSerializer.default_error_messages,
        "email_not_confirmed": "Confirmez votre adresse email avant de vous connecter.",
    }

    @classmethod
    def get_token(cls, user):
        return super().get_token(user)

    def validate(self, attrs):
        data = super().validate(attrs)
        user = getattr(self, "user", None)
        if user and getattr(user, "email_confirmed", False) is not True:
            raise AuthenticationFailed(
                self.error_messages["email_not_confirmed"],
                code="email_not_confirmed",
            )
        return data


class TokenObtainPairResponseSerializer(serializers.Serializer):
    """OpenAPI response shape for POST /api/token/. SimpleJWT returns a plain
    dict so spectacular cannot infer it from the input serializer."""

    access = serializers.CharField()
    refresh = serializers.CharField()


@extend_schema_view(
    post=extend_schema(
        tags=["token"],
        responses={200: TokenObtainPairResponseSerializer},
    )
)
class EmailConfirmedTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailConfirmedTokenObtainPairSerializer
    throttle_classes = [TokenObtainRateThrottle]

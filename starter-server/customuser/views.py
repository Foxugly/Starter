import logging

from django.contrib.auth import get_user_model
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiResponse, extend_schema, extend_schema_view
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from config.tools import ErrorDetailSerializer

from .permissions import IsSelf, IsSelfOrStaffOrSuperuser, IsSuperuserOnly
from .serializers import (
    CustomUserAdminUpdateSerializer,
    CustomUserCreateSerializer,
    CustomUserProfileUpdateSerializer,
    CustomUserReadSerializer,
    EmailConfirmationSerializer,
    PasswordChangeSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetOKSerializer,
    PasswordResetRequestSerializer,
)
from .services import (
    change_password,
    confirm_email,
    confirm_password_reset,
    register_user,
    request_password_reset,
)
from .throttling import (
    EmailConfirmRateThrottle,
    PasswordResetConfirmRateThrottle,
    PasswordResetRateThrottle,
)

logger = logging.getLogger(__name__)
User = get_user_model()


@extend_schema_view(
    list=extend_schema(
        tags=["User"],
        summary="Lister les utilisateurs",
        description="Superuser uniquement.",
        responses={
            200: CustomUserReadSerializer(many=True),
            401: OpenApiResponse(response=ErrorDetailSerializer, description="Unauthorized"),
            403: OpenApiResponse(response=ErrorDetailSerializer, description="Forbidden (admin only)"),
        },
    ),
    create=extend_schema(
        tags=["User"],
        summary="Créer un utilisateur",
        description="Création ouverte (AllowAny).",
        request=CustomUserCreateSerializer,
        responses={
            201: CustomUserReadSerializer,
            400: OpenApiResponse(description="Validation error"),
        },
    ),
    retrieve=extend_schema(
        tags=["User"],
        summary="Récupérer un utilisateur",
        responses={
            200: CustomUserReadSerializer,
            401: OpenApiResponse(response=ErrorDetailSerializer, description="Unauthorized"),
            403: OpenApiResponse(response=ErrorDetailSerializer, description="Forbidden"),
            404: OpenApiResponse(response=ErrorDetailSerializer, description="Not found"),
        },
    ),
    update=extend_schema(
        tags=["User"],
        summary="Mettre à jour un utilisateur (PUT)",
        request=CustomUserAdminUpdateSerializer,
        responses={200: CustomUserReadSerializer},
    ),
    partial_update=extend_schema(
        tags=["User"],
        summary="Mettre à jour un utilisateur (PATCH)",
        request=CustomUserAdminUpdateSerializer,
        responses={200: CustomUserReadSerializer},
    ),
    me=extend_schema(
        tags=["User"],
        summary="Récupérer et mettre à jour mon profil",
        request=CustomUserProfileUpdateSerializer,
        responses={
            200: CustomUserReadSerializer,
            400: OpenApiResponse(response=ErrorDetailSerializer, description="Validation error"),
            401: OpenApiResponse(response=ErrorDetailSerializer, description="Unauthorized"),
            403: OpenApiResponse(response=ErrorDetailSerializer, description="Forbidden"),
        },
    ),
)
class CustomUserViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    lookup_field = "pk"
    lookup_url_kwarg = "user_id"
    queryset = User.objects.none()
    lookup_value_regex = r"\d+"

    def get_queryset(self):
        user = self.request.user
        if not getattr(user, "is_authenticated", False):
            return User.objects.none()
        if getattr(user, "is_superuser", False):
            return User.objects.order_by("id")
        return User.objects.filter(pk=user.pk)

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        if self.action == "list":
            return [IsSuperuserOnly()]
        if self.action == "destroy":
            return [IsAuthenticated(), IsSuperuserOnly()]
        if self.action == "me":
            return [IsSelf()]
        return [IsSelfOrStaffOrSuperuser()]

    def perform_create(self, serializer):
        register_user(serializer)

    def get_serializer_class(self):
        if self.action == "create":
            return CustomUserCreateSerializer
        if self.action in ("update", "partial_update"):
            if self.request.user.is_superuser:
                return CustomUserAdminUpdateSerializer
            return CustomUserProfileUpdateSerializer
        return CustomUserReadSerializer

    @action(detail=False, methods=["get", "patch"], url_path="me")
    def me(self, request):
        user = request.user
        if request.method.lower() == "get":
            return Response(
                CustomUserReadSerializer(user, context={"request": request}).data,
                status=status.HTTP_200_OK,
            )

        serializer = CustomUserProfileUpdateSerializer(
            user, data=request.data, partial=True, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user.refresh_from_db()
        return Response(
            CustomUserReadSerializer(user, context={"request": request}).data,
            status=status.HTTP_200_OK,
        )


@extend_schema_view(
    post=extend_schema(
        tags=["Auth"],
        summary="Demander un reset de mot de passe",
        description=(
            "Envoie un email avec un lien de réinitialisation.\n"
            "Répond toujours 200 pour ne pas révéler si l'email existe."
        ),
        request=PasswordResetRequestSerializer,
        responses={
            200: PasswordResetOKSerializer,
            400: OpenApiResponse(response=OpenApiTypes.OBJECT, description="Validation error"),
        },
    ),
)
class PasswordResetRequestView(GenericAPIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    serializer_class = PasswordResetRequestSerializer
    throttle_classes = [PasswordResetRateThrottle]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        request_password_reset(serializer.validated_data["email"], request)
        return Response(
            {"detail": "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé."},
            status=status.HTTP_200_OK,
        )


@extend_schema_view(
    post=extend_schema(
        tags=["Auth"],
        summary="Confirmer un reset de mot de passe",
        request=PasswordResetConfirmSerializer,
        responses={
            200: PasswordResetOKSerializer,
            400: OpenApiResponse(response=ErrorDetailSerializer, description="Lien invalide / token invalide"),
        },
    ),
)
class PasswordResetConfirmView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = PasswordResetConfirmSerializer
    throttle_classes = [PasswordResetConfirmRateThrottle]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = confirm_password_reset(
            serializer.validated_data["uid"],
            serializer.validated_data["token"],
            serializer.validated_data["new_password1"],
        )
        if not user:
            return Response({"detail": "Lien invalide."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"detail": "Mot de passe mis à jour avec succès."},
            status=status.HTTP_200_OK,
        )


@extend_schema_view(
    post=extend_schema(
        tags=["Auth"],
        summary="Changer son mot de passe",
        description="Utilisateur authentifié uniquement.",
        request=PasswordChangeSerializer,
        responses={
            200: PasswordResetOKSerializer,
            400: OpenApiResponse(
                response=ErrorDetailSerializer,
                description="Ancien mot de passe incorrect / validation",
            ),
            401: OpenApiResponse(response=ErrorDetailSerializer, description="Unauthorized"),
        },
    ),
)
class PasswordChangeView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PasswordChangeSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if not change_password(
            request.user,
            serializer.validated_data["old_password"],
            serializer.validated_data["new_password"],
        ):
            return Response({"detail": "Ancien mot de passe incorrect."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"detail": "Mot de passe modifié avec succès."},
            status=status.HTTP_200_OK,
        )


@extend_schema_view(
    post=extend_schema(
        tags=["Auth"],
        summary="Confirmer une adresse email",
        request=EmailConfirmationSerializer,
        responses={
            200: PasswordResetOKSerializer,
            400: OpenApiResponse(response=ErrorDetailSerializer, description="Lien invalide / token invalide"),
        },
    ),
)
class EmailConfirmView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = EmailConfirmationSerializer
    throttle_classes = [EmailConfirmRateThrottle]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = confirm_email(
            serializer.validated_data["uid"],
            serializer.validated_data["token"],
        )
        if not user:
            return Response({"detail": "Lien invalide."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"detail": "Adresse email confirmée avec succès."},
            status=status.HTTP_200_OK,
        )

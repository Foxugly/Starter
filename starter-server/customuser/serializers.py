from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

User = get_user_model()


class PasswordResetOKSerializer(serializers.Serializer):
    detail = serializers.CharField()


class StrictFieldsModelSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        attrs = super().validate(attrs)
        unknown = set(self.initial_data.keys()) - set(self.fields.keys())
        if unknown:
            raise serializers.ValidationError(
                {field: "This field is not allowed." for field in sorted(unknown)}
            )
        return attrs


class CustomUserReadSerializer(serializers.ModelSerializer):
    password_change_required = serializers.BooleanField(source="requires_password_change", read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "language",
            "email_confirmed",
            "password_change_required",
            "is_superuser",
            "is_staff",
            "is_active",
        ]
        read_only_fields = [
            "id",
            "username",
            "email_confirmed",
            "password_change_required",
            "is_staff",
            "is_superuser",
            "is_active",
        ]


class CustomUserCreateSerializer(StrictFieldsModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "language",
        ]

    def validate_password(self, value: str) -> str:
        validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.email_confirmed = False
        user.set_password(password)
        user.save()
        return user


class CustomUserProfileUpdateSerializer(StrictFieldsModelSerializer):
    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "language"]

    def update(self, instance, validated_data):
        update_fields = []
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            update_fields.append(attr)
        if update_fields:
            instance.save(update_fields=update_fields)
        return instance


class CustomUserAdminUpdateSerializer(StrictFieldsModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    password_change_required = serializers.BooleanField(required=False, source="must_change_password")
    email_confirmed = serializers.BooleanField(required=False)

    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "language",
            "password",
            "is_active",
            "email_confirmed",
            "password_change_required",
        ]

    def validate_password(self, value: str) -> str:
        validate_password(value, user=self.instance)
        return value

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        update_fields = []
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            update_fields.append(attr)
        if password:
            instance.set_password(password)
            instance.must_change_password = True
            update_fields.extend(["password", "must_change_password"])
        if update_fields:
            instance.save(update_fields=update_fields)
        return instance


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password1 = serializers.CharField(write_only=True)
    new_password2 = serializers.CharField(write_only=True)

    def validate_new_password1(self, value):
        validate_password(value)
        return value

    def validate(self, attrs):
        if attrs["new_password1"] != attrs["new_password2"]:
            raise serializers.ValidationError({"new_password2": "Les mots de passe ne correspondent pas."})
        return attrs


class EmailConfirmationSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    @staticmethod
    def validate_new_password(value):
        validate_password(value)
        return value

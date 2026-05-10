from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class CustomUser(AbstractUser):
    email = models.EmailField(_("email address"), unique=True, blank=True, null=True, default=None)
    language = models.CharField(
        _("language"),
        max_length=8,
        choices=settings.LANGUAGES,
        default=getattr(settings, "LANGUAGE_CODE", "en"),
    )
    email_confirmed = models.BooleanField(default=False)
    must_change_password = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.email:
            self.email = None
        super().save(*args, **kwargs)

    def __str__(self):
        return self.get_display_name()

    def get_display_name(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name} ({self.username})"
        return self.username

    def to_field_value_dict(self) -> dict[str, object]:
        return {
            field.attname: getattr(self, field.attname)
            for field in self._meta.concrete_fields
        }

    @property
    def requires_password_change(self) -> bool:
        return self.must_change_password

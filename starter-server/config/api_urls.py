# config/api_urls.py
from django.urls import path, include

from core.views import TestEmailView

app_name = 'api'
urlpatterns = [
    path("mail/test/", TestEmailView.as_view(), name="mail-test"),
    path("user/", include(("customuser.api_urls", "user"), namespace="user-api")),
    path("lang/", include(("language.api_urls", "lang"), namespace="lang-api")),
    path("translate/", include(("translation.api_urls", "translation"), namespace="translate-api")),
]

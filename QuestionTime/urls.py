from django.contrib import admin
from django.urls import include, path, re_path
from django_registration.backends.one_step.views import RegistrationView
from questions.models import Question
from users.forms import CustomUserForm
from core.views import IndexTemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "accounts/register/",
        RegistrationView.as_view(form_class=CustomUserForm, success_url="/"),
        name="django_registration_register",
    ),
    path("accounts/", include("django.contrib.auth.urls")),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
    path("api/v1/", include("questions.api.urls")),
    re_path(
        r"^.*$",
        IndexTemplateView.as_view(),
        name="index",
    ),
]

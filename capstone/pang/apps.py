from django.apps import AppConfig


class PangConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "pang"

    def ready(self):
        import pang.signals  # signals module을 import 합니다.

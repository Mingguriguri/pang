from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("show/", views.show_items, name="show_items"),
    path("show/<int:category_id>:", views.detail, name="detail"),
]
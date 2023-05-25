from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("show/", views.show_items, name="show_items"),
    path("detail/", views.detail, name="detail"),
]
from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("show/", views.show_items, name="show_items"),
    path("show/<int:category_id>", views.detail, name="detail"),
    path("add_category/", views.add_category, name="add_category"),
    path("add_item/<int:category_id>", views.add_item, name="add_item"),
    path('delete_category/<int:category_id>', views.delete_category, name='delete_category'),

]
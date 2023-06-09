from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("show/", views.show, name="show"),
]



#path("show/<int:category_id>", views.detail, name="detail"),
    #path("add_category/", views.add_category, name="add_category"),
    #path("add_item/<int:category_id>", views.add_item, name="add_item"),
    #path('delete_item/<int:item_id>/', views.delete_item, name='delete_item'),
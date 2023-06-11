from django.urls import path
from . import views

app_name = 'pang'
urlpatterns = [
    # /pang/
    path("", views.index, name="index"),
    # /pang/show/
    path("show/", views.show, name="show"),
    # /pang/delete/2
    path('show/delete/<int:item_id>/', views.delete_item, name='delete_item'),
    # /pang/search
    path('search', views.search, name="search"),
    # /pang/item_create
    path('item_create', views.item_create, name="item_create"),
]



#path("show/<int:category_id>", views.detail, name="detail"),
    #path("add_category/", views.add_category, name="add_category"),
    #path("add_item/<int:category_id>", views.add_item, name="add_item"),
    #path('delete_item/<int:item_id>/', views.delete_item, name='delete_item'),
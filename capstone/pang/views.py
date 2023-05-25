from django.http import HttpResponse
from django.shortcuts import render
from .models import Category, Item

def index(request):
    return HttpResponse("Hello, world. You're at the pang index.")


def show_items(request):
    categories = Category.objects.all()  
    context = {
        "categories" : categories,
    }
    
    return render(request, 'pang/category.html', context)

def detail(request, category_id):
    categories = Category.objects.get(id=category_id)  
    items = Item.objects.all()
    context = {
        "categories" : categories,
        "items" : items,
    }
    
    return render(request, 'pang/detail.html', context)
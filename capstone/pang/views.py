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

def detail(request):
    categories = Category.objects.all()  
    item_ = Item.objects.all()
    context = {
        "categories" : categories,
        "item" : item_,
    }
    
    return render(request, 'pang/detail.html', context)
from django.http import HttpResponse
from django.shortcuts import render
from .models import Category, SmallCategory, Item
# input
#from django.views.decorators.http import require_POST
#from django.shortcuts import get_object_or_404, redirect
# delete
#from django.dispatch import receiver

def index(request):
    return HttpResponse("Hello, world. You're at the pang index.")

def show(request):
    categories = Category.objects.all()
    context = {
        "categories" : categories,
    }
    
    return render(request, 'pang/pang.html', context)

def detail(request, category_id):
    categories = Category.objects.get(id=category_id)  
    items = Item.objects.all()
    context = {
        "categories" : categories,
        "items" : items,
    }
    
    return render(request, 'pang/detail.html', context)


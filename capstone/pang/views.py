from django.http import HttpResponse
from django.shortcuts import render
from .models import Category, SmallCategory, Item

def index(request):
    return HttpResponse("Hello, world. You're at the pang index.")

def show(request):
    categories = Category.objects.all().order_by('name')
    categories_with_index = [(index, category) for index, category in enumerate(categories)]

    small_categories_with_index = []
    items_with_index = []

    for category in categories:
        small_categories = category.small.all().order_by('name')
        small_categories_with_index.extend([(index, small_category) for index, small_category in enumerate(small_categories)])

        for small_category in small_categories:
            items = small_category.items.all().order_by('created_at')
            items_with_index.extend([(index + 1, item) for index, item in enumerate(items)])

    context = {
        "categories": categories_with_index,
        "small_categories": small_categories_with_index,
        "items": items_with_index,
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


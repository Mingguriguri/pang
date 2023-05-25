from django.http import HttpResponse
from django.shortcuts import render
from .models import Category, Item
# input
from django.views.decorators.http import require_POST
from django.shortcuts import get_object_or_404, redirect

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


@require_POST
def add_category(request):
    category_name = request.POST['category_name']
    Category.objects.create(name=category_name)
    return redirect('show_items')

@require_POST
def add_item(request, category_id):
    category = get_object_or_404(Category, id=category_id)
   # item_name = request.POST['item_name'] Error 
   #대부분 메서드를 사전(Dictionary) 또는 리스트(List)처럼 접근하려고 할 때 발생합니다.
    item_name = request.POST.get('item_name')
    
    if item_name:  # Check if item_name is not None
        Item.objects.create(contents=item_name, category=category)

    return redirect('detail', category_id=category_id)

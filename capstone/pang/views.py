from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from .models import Category, SmallCategory, Item
from django.views.decorators.http import require_GET, require_POST

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
            items_with_index.extend([(index, item) for index, item in enumerate(items)])

    context = {
        "categories": categories_with_index,
        "small_categories": small_categories_with_index,
        "items": items_with_index,
    }

    return render(request, 'pang/pang.html', context)

@require_POST
def add_category(request):
    category_name = request.POST['category_name']
    small_category_name = request.POST['small_category_name']
    item_name = request.POST.get('item_name')
    
    # 만약 같은 카테고리라면, 이미 있는 카테고리를 가져온다. 없다면 새로 만든다.
    category, created = Category.objects.get_or_create(name=category_name)
    small_category, created = SmallCategory.objects.get_or_create(name=small_category_name, parent=category)

    if item_name:
        Item.objects.create(contents=item_name, category=category, small_category=small_category)

    return redirect('show')

def detail(request, category_id):
    categories = Category.objects.get(id=category_id)  
    items = Item.objects.all()
    context = {
        "categories" : categories,
        "items" : items,
    }
    
    return render(request, 'pang/detail.html', context)

def delete_elem(request):
    if request.method == 'POST':
        elem_id = request.POST.get('elem_id')
        elem = get_object_or_404(Item, id=elem_id)
        elem.delete()
        return redirect('pang:index')
    else:
        return HttpResponse(status=405)
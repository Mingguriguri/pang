from django.http import HttpResponse
from django.shortcuts import render
from .models import Category, Item
# input
from django.views.decorators.http import require_POST
from django.shortcuts import get_object_or_404, redirect
# delete
from django.db.models.signals import post_delete
from django.dispatch import receiver

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
    item_name = request.POST.get('item_name')  # Add this line
    
    # 만약 같은 카테고리라면, 이미 있는 카테고리를 가져온다. 없다면 새로 만든다.
    category, created = Category.objects.get_or_create(name=category_name)

    if item_name:  # Add these lines
        Item.objects.create(contents=item_name, category=category)

    return redirect('show_items')
    
@require_POST
def add_item(request, category_id):
    category = get_object_or_404(Category, id=category_id)
   # item_name = request.POST['item_name'] Error 
   #대부분 메서드를 사전(Dictionary) 또는 리스트(List)처럼 접근하려고 할 때 발생합니다.
    item_name = request.POST.get('item_name')
    
    if item_name:  # Check if item_name is not None
        Item.objects.create(contents=item_name, category=category)

    return redirect('show_items', category_id=category_id)

@require_POST
def delete_item(request, item_id):
    # item_id로 Item을 찾고 삭제합니다.
    '''
    Item.objects.get(id=item_id).delete()
    return redirect('show_items')  # 변경: 메인 페이지로 이동
    '''
    item = get_object_or_404(Item, id=item_id)
    category = item.category
    item.delete()
    
    return redirect('show_items')  # 변경: 메인 페이지로 이동

# item이 모두 삭제된다면, Category도 삭제
@receiver(post_delete, sender=Item)
def delete_category_if_empty(sender, instance, **kwargs):
    if not instance.category.items.exists():
        category = instance.category
        instance.category = None
        instance.save()
        category.refresh_from_db()  # primary key 값을 업데이트합니다.
        category.delete()
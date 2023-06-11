from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from .models import Category, SmallCategory, Item
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt
from .forms import CategoryForm, SmallCategoryForm, ItemForm
from django.db.models import Q

def index(request):

    #post
    # if request.method == "POST":
    #     form = CategoryForm(request.POST)
    #     if form.is_valid():
    #         category = form.cleaned_data['category']

    #         return HttpResponseRedirect('/pang/show')
    # # GET
    # else:
    #     form = CategoryForm()
    
    # return render(request, 'pang/index.html', {'form': form})

    # return HttpResponse("Hello, world. You're at the pang index.")
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

    return render(request, 'pang/index.html', context)

@csrf_exempt
def item_create(request):
    if request.method == "GET":
        form = ItemForm()
        return render(request, 'pang/item_create.html', {'form':form})

    elif request.method == "POST":
        category = get_object_or_404(Category, pk=request.category.id)
        small_category = get_object_or_404(SmallCategory, pk=request.small_category.id)
    
        form = CategoryForm(request.POST)
        if form.is_valid():
            item = form.save(commit = False)
            item.big_category = category
            item.small_category = small_category
            #commit : DB에서 insert/update/delete 할 때 바로 반영되는 것이 아니라 작업 후, commit 이라는 명령어를 통해 DB에 반영됨
            category.save()
        else:
            print(form.errors)
        return render(request, 'pang/result.html')

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

def delete_item(request, item_id):
    item =  get_object_or_404(Item, pk=item_id)
    item.delete()
    return redirect('pang:pang')

def search(request):
    if request.method == "GET":
        searchKeyword = request.GET.get("q", "")
        category = models.Category.objects.filter(
            Q(name__icontains=q)
        )
    context = {
        "categories":categories,
    }
    return render(request, 'pang/pang.html', context)


#from django.db.models import Q

# def question_create(request):
#     if request.method == 'POST':
#         form = CategoryForm(request.POST)
#         if form.is_valid():
#             category = form.save(commit = False)
#             category.save()
#             return redirect('pang:index')
#         else:
#             form = CategoryForm()

#     context = {'form':form}
#     return render(request, 'pang/show.html')


# def question_return(request):
#     kw = request.GET.get('kw', '')  # 검색어
#     categories = Category.objects.order_by('name')
    
#     if kw:
#         categories = categories.filter(
#             Q(name__icontains=kw) |  # level1 검색
#             Q(small__name__icontains=kw)
#             # Q(smallcategory__item__contents__icontains=kw)
#         ).distinct()
#     context = {'categories': categories, 'kw': kw}
#     return render(request, 'pang/index.html', context)

##############################################################################3
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# @csrf_exempt
# def delete_item(request):
#     item_id = request.POST.get('item_id')
#     try:
#         item = Item.objects.get(id=item_id)
#     except Item.DoesNotExist:
#         return JsonResponse({'success': False, 'error': 'Item does not exist.'})
# @require_POST
# def add_category(request):
#     category_name = request.POST['category_name']
#     small_category_name = request.POST['small_category_name']
#     item_name = request.POST.get('item_name')
    
#     # 만약 같은 카테고리라면, 이미 있는 카테고리를 가져온다. 없다면 새로 만든다.
#     category, created = Category.objects.get_or_create(name=category_name)
#     small_category, created = SmallCategory.objects.get_or_create(name=small_category_name, parent=category)

#     if item_name:
#         Item.objects.create(contents=item_name, category=category, small_category=small_category)

#     return redirect('show')

# def detail(request, category_id):
#     categories = Category.objects.get(id=category_id)  
#     items = Item.objects.all()
#     context = {
#         "categories" : categories,
#         "items" : items,
#     }

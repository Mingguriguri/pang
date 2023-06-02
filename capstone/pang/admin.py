from django.contrib import admin
from .models import Category, SmallCategory, Item

admin.site.register(Category)
admin.site.register(SmallCategory)
admin.site.register(Item)

class ItemInline(admin.StackedInline):
    model = Item
    extra = 3
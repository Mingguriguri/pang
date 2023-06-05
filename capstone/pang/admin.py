from django.contrib import admin
from django import forms
from .models import Category, SmallCategory, Item

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

class SmallCategoryAdmin(admin.ModelAdmin):
    list_display = ('parent_category', 'name')
    
class ItemAdmin(admin.ModelAdmin):
    list_display = ('contents', 'big_category', 'small_category', 'created_at')
    raw_id_fields = ('big_category', 'small_category')

class SmallCategoryInline(admin.TabularInline):
    model = SmallCategory
    extra = 1

class ItemInline(admin.TabularInline):
    model = Item
    extra = 1


admin.site.register(Category, CategoryAdmin)
admin.site.register(SmallCategory, SmallCategoryAdmin)
admin.site.register(Item, ItemAdmin)

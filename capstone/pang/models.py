from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)

class Item(models.Model):
    category = models.ForeignKey(Category, related_name='items', on_delete=models.CASCADE, null=True)
    contents = models.CharField(default="", max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)  
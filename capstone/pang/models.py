from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)
    def __str__(self):
        return self.name
class SmallCategory(models.Model):
    parent_category = models.ForeignKey(Category, related_name='small', on_delete=models.CASCADE, null=True)
    name = models.CharField(default="", max_length=200)
    def __str__(self):
        return f"{self.parent_category.name} - {self.name}"
class Item(models.Model):
    big_category = models.ForeignKey(Category, related_name='items', on_delete=models.CASCADE, null=True)
    small_category = models.ForeignKey(SmallCategory, related_name='items', on_delete=models.CASCADE, null=True)
    contents = models.CharField(default="", max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

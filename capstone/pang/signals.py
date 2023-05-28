# 코드 모듈화/유지보수 

from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Item

# item이 모두 삭제된다면, Category도 삭제
@receiver(post_delete, sender=Item)
def delete_category_if_empty(sender, instance, **kwargs):
    if not instance.category.items.exists():
        category = instance.category
        instance.category = None
        instance.save()
        category.refresh_from_db()  # primary key 값을 업데이트합니다.
        category.delete()
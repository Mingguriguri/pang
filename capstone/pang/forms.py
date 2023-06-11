from django import forms
from pang.models import Category, SmallCategory, Item
# html 태그와 mapping

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category  # 사용할 모델
        fields = ['name']  # QuestionForm에서 사용할 Question 모델의 속성
        labels = {
            'name': '레벨1카테고리',
        }


class SmallCategoryForm(forms.ModelForm):
    class Meta:
        model = SmallCategory
        fields = ['name']
        labels = {
            'name': '레벨2카테고리',
        }


class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = ['big_category', 'small_category', 'contents']
        labels = {
            'big_category': '상위레이블',
            'small_category': '하위레이블',
            'contents': '입력내용',
        }




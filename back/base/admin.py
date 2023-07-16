from django.contrib import admin
from .models import Task  # Update the import statement to reference the correct module
from.models import Product
from.models import Category

# Register your models here.
admin.site.register(Task)  # Use admin.site.register to register the Task model
admin.site.register(Product)
admin.site.register(Category)


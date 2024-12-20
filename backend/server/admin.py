from django.contrib import admin

from .models import User, Products, Orders, Cart

admin.site.register(User)
admin.site.register(Products)
admin.site.register(Orders)
admin.site.register(Cart)
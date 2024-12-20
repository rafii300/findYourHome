from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from PIL import Image

from .manager import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    Id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=150, unique=True)
    address = models.CharField(max_length=50)
    password = models.CharField(max_length=1024)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'address']
    
    objects = UserManager()

    class Meta:
        verbose_name = "User"
    
    def __str__(self):
        return f"{str(self.Id)} {self.name} {self.email}"
    

class Products(models.Model):
    Id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, blank=False)
    description = models.CharField(max_length=1024, blank=False)
    image = models.ImageField(upload_to='', blank=True, default='default.png')
    price = models.FloatField(blank=False)
    rating = models.FloatField(blank=False, default=0.0)
    available = models.BooleanField(blank=True, default=True)
    area = models.CharField(max_length=256, blank=False)

    class Meta:
        verbose_name = "Product"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        image = Image.open(self.image.path)

        (height, width) = (600, 600)
        if image.height > height or image.width > width:
            image.thumbnail((height, width))
            image.save(self.image.path)

    def __str__(self):
        return f"{str(self.Id)} {self.name}"
    
    
class Orders(models.Model):
    Id = models.AutoField(primary_key=True)
    userId = models.IntegerField(blank=False)
    price = models.FloatField(blank=False, default=0.0)
    date = models.DateField(auto_now_add=True)
    method = models.CharField(max_length=64, blank=False)
    pending = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Order"

    def __str__(self):
        return f"{str(self.Id)} {str(self.userId)}"
    
    
class Cart(models.Model):
    Id = models.AutoField(primary_key=True)
    userId = models.IntegerField(blank=False)
    productId = models.IntegerField(blank=False)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = "Cart"
        unique_together = (('userId', 'productId'),)

    def __str__(self):
        return f"{str(self.Id)} {str(self.userId)} {str(self.productId)}"
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import User, Products, Orders, Cart

class UserSerializer(serializers.ModelSerializer):
    
    class Meta: 
        model = User
        fields = ("Id", "name", "email", "address", "password", "is_admin", "is_superuser")

    def create(self, validated_data):
        password = validated_data['password']
        validated_data['password'] = make_password(password)
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        super().update(instance=instance, validated_data=validated_data)
        instance.is_staff = instance.is_admin
        instance.save()
        return instance
    

class ProductSerializer(serializers.ModelSerializer):
    
    class Meta: 
        model = Products
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Orders
        fields = "__all__"


class CartProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Products
        fields = ('name', 'image', 'price', 'rating', 'area')


class CartSerializer(serializers.ModelSerializer):
    product = CartProductSerializer(read_only=True)

    class Meta:
        model = Cart
        fields = "__all__"

    def create(self, validated_data):
        product_instance = Products.objects.get(Id=validated_data['productId'])
        validated_data['product'] = product_instance
        cart_instance = Cart.objects.create(**validated_data)
        return cart_instance
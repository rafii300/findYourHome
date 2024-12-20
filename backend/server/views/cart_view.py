from django.core.paginator import Paginator
from django.http import Http404
from django.db.models import Sum
from django.db.models import F
from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status

from ..models import Cart
from ..serializers import CartSerializer

class CartList(APIView):
	def get(self, request, format=None):
		page_size = 12
		page = request.query_params['page']
		cart_objects = Cart.objects.get_queryset().order_by('Id')
		paginator = Paginator(cart_objects, page_size)
		try:
			cart_objects = paginator.page(page)
		except:
			Response(status=status.HTTP_400_BAD_REQUEST)
		serializer = CartSerializer(cart_objects, many=True) 
		return Response({'cart': serializer.data, 'pages': paginator.num_pages})

	def post(self, request, format=None):
		serializer = CartSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save(product=request.data['product'])
			return Response(serializer.data, 
							status=status.HTTP_201_CREATED)
		try: 
			Cart.objects.get(userId=request.data['userId'], productId=request.data['productId'])
			return Response(status=status.HTTP_200_OK)
		except Cart.DoesNotExist:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class CartDetail(APIView):
	def get_cart(self, pk):
		try:
			return Cart.objects.get(Id=pk)
		except Cart.DoesNotExist: 
			raise Http404

	def get(self, request, pk, format=None):
		try:
			page_size = 7
			page = request.query_params['page']
			cart_objects = Cart.objects.filter(userId=pk).order_by('Id')
			paginator = Paginator(cart_objects, page_size)
			try:
				cart_objects = paginator.page(page)
			except:
				Response(status=status.HTTP_400_BAD_REQUEST)
			serializer = CartSerializer(cart_objects, many=True)
			products = Cart.objects.filter(userId=pk).count()
			items = Cart.objects.filter(userId=pk).aggregate(total=Sum('items'))['total']
			price = Cart.objects.filter(userId=pk).aggregate(total=Sum(F('items')*F('product__price')))['total']
			return Response({'cart': serializer.data, 'products': products, 'items': items, 'price': price, 'pages': paginator.num_pages})
		except:
			return Response(status=status.HTTP_202_ACCEPTED)

	def patch(self, request, pk, format=None):
		cart_object = self.get_cart(pk) 
		serializer = CartSerializer(cart_object, data=request.data, partial=True) 
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

	def delete(self, request, pk, format=None):
		cart_object = self.get_cart(pk)
		cart_object.delete()
		return Response(status=status.HTTP_200_OK)

class CartDelete(APIView):
    def delete(self, request, pk, format=None):
        try:
            Cart.objects.filter(userId=pk).delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
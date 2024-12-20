from django.core.paginator import Paginator
from django.http import Http404
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from django.db.models import Q
from ..models import Products
from ..serializers import ProductSerializer

class ProductList(APIView):
	def get(self, request, format=None):
		page_size = 12
		page = request.query_params['page']
		sort = request.query_params['sort']
		by = request.query_params['by']
		field = f"-{by}" if sort == 'DESC' else by
		try:
			search = request.query_params['search']
			products = Products.objects.filter(Q(name__contains=search) | Q(description__contains=search) | Q(brand__contains=search)).order_by(field) 
			paginator = Paginator(products, page_size)
			try:
				products = paginator.page(page)
			except:
				Response(status=status.HTTP_400_BAD_REQUEST)
			serializer = ProductSerializer(products, many=True) 
			return Response({'products': serializer.data, 'pages': paginator.num_pages})
		except:
			products = Products.objects.get_queryset().order_by(field)
			paginator = Paginator(products, page_size)
			try:
				products = paginator.page(page)
			except:
				Response(status=status.HTTP_400_BAD_REQUEST)
			serializer = ProductSerializer(products, many=True) 
			return Response({'products': serializer.data, 'pages': paginator.num_pages})

	def post(self, request, format=None): 
		serializer = ProductSerializer(data=request.data)
		if serializer.is_valid(): 
			serializer.save()
			return Response(serializer.data, 
							status=status.HTTP_201_CREATED) 
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class ProductDetail(APIView):
	parser_classes = [MultiPartParser, FormParser]

	def get_product(self, pk):
		try: 
			return Products.objects.get(Id=pk)
		except Products.DoesNotExist: 
			raise Http404

	def get(self, request, pk, format=None):
		product = self.get_product(pk)
		serializer = ProductSerializer(product)
		return Response(serializer.data)

	def patch(self, request, pk, format=None):
		product = self.get_product(pk) 
		serializer = ProductSerializer(product, data=request.data, partial=True) 
		if serializer.is_valid(): 
			serializer.save()
			return Response(status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

	def delete(self, request, pk, format=None): 
		product = self.get_product(pk)
		product.delete()
		return Response(status=status.HTTP_200_OK)
	

class ProductUpdate(APIView):
	def get_product(self, pk):
		try: 
			return Products.objects.get(Id=pk)
		except Products.DoesNotExist: 
			raise Http404
		
	def get(self, request, pk, format=None):
		product = self.get_product(pk)
		serializer = ProductSerializer(product)
		return Response(serializer.data)
		
	def patch(self, request, pk, format=None):
		product = self.get_product(pk)
		serializer = ProductSerializer(product, data=request.data, partial=True) 
		if serializer.is_valid(): 
			serializer.save()
			return Response(status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
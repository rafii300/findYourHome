from django.core.paginator import Paginator
from django.http import Http404
from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status 

from ..models import Orders
from ..serializers import OrderSerializer 

class OrderList(APIView):
	def get(self, request, format=None): 
		page_size = 10
		page = request.query_params['page']
		status = True if request.query_params['status'] == 'true' else False
		orders = Orders.objects.get_queryset().filter(pending=status).order_by('Id')
		paginator = Paginator(orders, page_size)
		try:
			orders = paginator.page(page)
		except:
			Response(status=status.HTTP_400_BAD_REQUEST)
		serializer = OrderSerializer(orders, many=True) 
		return Response({'orders': serializer.data, 'pages': paginator.num_pages})

	def post(self, request, format=None):
		serializer = OrderSerializer(data=request.data)
		if serializer.is_valid(): 
			serializer.save()
			return Response(serializer.data, 
							status=status.HTTP_201_CREATED) 
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class OrderDetail(APIView):
	def get_order(self, pk):
		try: 
			return Orders.objects.get(Id=pk) 
		except Orders.DoesNotExist: 
			raise Http404

	def get(self, request, pk, format=None):
		try:
			page_size = 12
			page = request.query_params['page']
			orders = Orders.objects.filter(userId=pk).order_by('Id')
			paginator = Paginator(orders, page_size)
			try:
				orders = paginator.page(page)
			except:
				Response(status=status.HTTP_400_BAD_REQUEST)
			serializer = OrderSerializer(orders, many=True)
			return Response({'orders': serializer.data, 'pages': paginator.num_pages}) 
		except:
			return Response(status=status.HTTP_202_ACCEPTED)

	def patch(self, request, pk, format=None):
		order = self.get_order(pk) 
		serializer = OrderSerializer(order, data=request.data, partial=True) 
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

	def delete(self, request, pk, format=None): 
		order = self.get_order(pk)
		order.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
	

class OrderPending(APIView):
	def get_order(self, pk):
		try: 
			return Orders.objects.get(Id=pk)
		except Orders.DoesNotExist: 
			raise Http404

	def get(self, request, pk, format=None):
		order = self.get_order(pk)
		serializer = OrderSerializer(order)
		return Response(serializer.data)
	
	def patch(self, request, pk, format=None):
		order = self.get_order(pk) 
		serializer = OrderSerializer(order, data=request.data, partial=True) 
		if serializer.is_valid(): 
			serializer.save()
			return Response(status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, pk, format=None): 
		order = self.get_order(pk)
		order.delete()
		return Response(status=status.HTTP_200_OK)
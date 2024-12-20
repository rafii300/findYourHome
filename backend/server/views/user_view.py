from django.core.paginator import Paginator
from django.http import Http404
from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status 

from django.db.models import Q
from ..models import User
from ..serializers import UserSerializer

class UserList(APIView):
	def get(self, request, format=None):
		page_size = 5
		page = request.query_params['page']
		try:
			search = request.query_params['search']
			users = User.objects.filter(Q(name__contains=search) | Q(email__contains=search)).order_by('Id') 
			paginator = Paginator(users, page_size)
			try:
				users = paginator.page(page)
			except:
				Response(status=status.HTTP_400_BAD_REQUEST)
			serializer = UserSerializer(users, many=True)
			return Response({'users': serializer.data, 'pages': paginator.num_pages})
		except:
			users = User.objects.get_queryset().order_by('Id')
			paginator = Paginator(users, page_size)
			try:
				users = paginator.page(page)
			except:
				Response(status=status.HTTP_400_BAD_REQUEST)
			serializer = UserSerializer(users, many=True)
			return Response({'users': serializer.data, 'pages': paginator.num_pages})

	def post(self, request, format=None): 
		serializer = UserSerializer(data=request.data)
		if serializer.is_valid(): 
			serializer.save()
			return Response(serializer.data, 
							status=status.HTTP_201_CREATED) 
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class UserDetail(APIView):
	def get_user(self, pk):
		try: 
			return User.objects.get(Id=pk)
		except User.DoesNotExist: 
			raise Http404

	def get(self, request, pk, format=None):
		user = self.get_user(pk)
		serializer = UserSerializer(user)
		return Response(serializer.data)


	def patch(self, request, pk, format=None): 
		user = self.get_user(pk) 
		serializer = UserSerializer(user, data=request.data, partial=True) 
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

	def delete(self, request, pk, format=None): 
		user = self.get_user(pk)
		user.delete()
		return Response(status=status.HTTP_200_OK)
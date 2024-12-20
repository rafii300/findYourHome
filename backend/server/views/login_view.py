from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT
from django.contrib.auth.hashers import check_password

from ..models import User
from ..serializers import UserSerializer

class Login(APIView):
    def post(self, request, format=None):
        email = request.data['email']
        password = request.data['password']
        try:
            user = User.objects.get(email=email)
            if check_password(password, user.password):
                serializer = UserSerializer(user)
                return Response(serializer.data)
            else:
                return Response(status=HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response(status=HTTP_204_NO_CONTENT)
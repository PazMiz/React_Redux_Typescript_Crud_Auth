from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from django.contrib.auth import authenticate
from rest_framework import generics
from django.core import serializers
from django.http import JsonResponse
from .serializers import ProductSerializer
from django.contrib.auth import views as auth_views
from django.urls import reverse_lazy
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
# from .models import BlacklistedToken
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import BlacklistedToken  # Import the BlacklistedToken model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import AbstractUser
import datetime
import jwt


@api_view(['GET'])
def task_list(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def taskDetail(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def task_create(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def task_update(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=404)

    if 'completed' in request.data:
        completed = request.data['completed'] == 'true'  # Convert the string to a boolean
        task.completed = completed

    if 'image' in request.data:
        task.image = request.data['image']

    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    
    print(serializer.errors)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def task_delete(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=404)

    task.delete()
    return Response('Task deleted successfully', status=204)

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)

    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User registered successfully'})

@csrf_exempt
def upload_file(request):
    if request.method == 'POST' and request.FILES:
        uploaded_file = request.FILES['file']
        # Process the uploaded file as needed
        # Save the file to a desired location, e.g., using `uploaded_file.save()`
        return JsonResponse({'message': 'File uploaded successfully.'})
    return JsonResponse({'error': 'Invalid request.'}, status=400)

def get_photo_data(request):
    tasks = Task.objects.all()
    photo_data = [TaskSerializer(task).data for task in tasks]
    return JsonResponse(photo_data, safe=False)



from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductCreate(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductUpdate(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDelete(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)

from django.contrib.auth.views import PasswordResetView, PasswordResetConfirmView, PasswordResetDoneView
from django.http import JsonResponse

class CustomPasswordResetView(PasswordResetView):
    def form_valid(self, form):
        # Process the form and send the password reset email
        response = super().form_valid(form)
        
        # Return a JSON response indicating the success of the email sending process
        return JsonResponse({'message': 'Password reset email has been sent.'})

class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    def form_valid(self, form):
        form.save()
        return JsonResponse({'message': 'Password has been reset successfully.'})

class CustomPasswordResetDoneView(PasswordResetDoneView):
    def get(self, request, *args, **kwargs):
        return JsonResponse({'message': 'Password reset completed.'})

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            auth_header = request.headers.get('Authorization')
            if auth_header is None:
                raise TokenError('Access token not provided')

            access_token = auth_header.split(' ')[1]
            token = AccessToken(access_token)

            # Perform any additional logic for logout

            return Response({'message': 'Logout successful'}, status=200)
        except TokenError as e:
            return Response({'error': str(e)}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=500)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['staff'] = user.is_staff
        token['email'] = user.email

        # ...

        return token

 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    # Add any other custom fields or methods to your user model

    def __str__(self):
        return self.username
    
    
    

    

# from django.core.mail import send_mail

# subject = 'Hello from Paz'
# message = 'This is Paz. You forgot your password, please reset it!'
# from_email = 'paz714239@gmail.com'  # Your email address
# recipient_list = ['paz714239@gmail.com']  # Email address of the recipient

# send_mail(subject, message, from_email, recipient_list)



# @api_view(['POST'])
# def login(request):
#     username = request.data.get('username')
#     password = request.data.get('password')

#     try:
#         user = User.objects.get(username=username)
#     except User.DoesNotExist:
#         return Response({'error': 'Invalid username'}, status=400)

#     if not user.check_password(password):
#         return Response({'error': 'Invalid password'}, status=400)

#     # Login successful, generate and return access token and email
#     access_token = generate_access_token(user)  # Generate access token using your preferred method
#     email = user.email

#     return Response({'access': access_token, 'email': email}, status=200)

import secrets
from rest_framework import status


def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            email = user.email

            return JsonResponse({
                'access': access_token,
                'refresh': str(refresh),
                'email': email,  # Include the email field in the response
            })
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)

    return JsonResponse({'error': 'Invalid request'}, status=400)



def generate_access_token(user):
    # Generate a random access token
    token = secrets.token_hex(32)

    # Save the access token to the user or your preferred storage

    return token


from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        new_refresh_token = response.data.get('refresh')
        if new_refresh_token:
            response.set_cookie('refresh_token', new_refresh_token, httponly=True, samesite='Strict')
        return response






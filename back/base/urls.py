from django.urls import path
from . import views
from .views import register
from rest_framework_simplejwt.views import TokenObtainPairView
from base.views import LogoutView
from django.conf import settings
from django.conf.urls.static import static
from .views import get_photo_data
# from .views import  OrderCreateView
from .views import (
    ProductList,
    ProductCreate,
    ProductDetail,
    ProductUpdate,
    ProductDelete,
)
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import views as auth_views

from .views import (
    CustomPasswordResetView,
    CustomPasswordResetConfirmView,
    CustomPasswordResetDoneView,
    
)
from .views import LogoutView

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('tasks/', views.task_list, name='task_list'),
    path('tasks/create/', views.task_create, name='task_create'),
    path('tasks/update/<int:pk>/', views.task_update, name='task_update'),
    path('tasks/delete/<int:pk>/', views.task_delete, name='task_delete'),

    path('api/register/', register, name='register'),
    path('login/', views.MyTokenObtainPairView.as_view()),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('reset_password/', CustomPasswordResetView.as_view(), name='password_reset'),
    path('reset_password/confirm/<uidb64>/<token>/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset_password/done/', CustomPasswordResetDoneView.as_view(), name='password_reset_done'),


    path('api/photos/', get_photo_data, name='get_photo_data'),
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/create/', ProductCreate.as_view(), name='product-create'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    path('products/<int:pk>/update/', ProductUpdate.as_view(), name='product-update'),
    path('products/<int:pk>/delete/', ProductDelete.as_view(), name='product-delete'),

    # path('checkout', views.CartView.as_view()),

    # path('orders/create/', OrderCreateView.as_view(), name='order-create'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


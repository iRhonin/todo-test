from django.contrib import admin
from django.urls import path, include


api_urls = [
    path('', include('todos.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urls)),
]

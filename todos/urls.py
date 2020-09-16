from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('todos', views.TodoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

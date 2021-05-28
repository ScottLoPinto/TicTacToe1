from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from toe import views

router = routers.DefaultRouter()
router.register(r'toe', views.ToeView, 'toe')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

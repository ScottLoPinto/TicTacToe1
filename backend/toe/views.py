from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ToeSerializer
from .models import Toe

class ToeView(viewsets.ModelViewSet):
	serializer_class = ToeSerializer
	queryset = Toe.objects.all()
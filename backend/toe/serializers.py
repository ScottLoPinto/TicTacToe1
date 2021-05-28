from rest_framework import serializers
from .models import Toe

class ToeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Toe
		fields = (['square'])
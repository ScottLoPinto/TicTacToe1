from django.contrib import admin
from .models import Toe

class ToeAdmin(admin.ModelAdmin):
	fields = (['square', 'score'])

admin.site.register(Toe, ToeAdmin)
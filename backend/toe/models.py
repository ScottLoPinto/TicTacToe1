from django.db import models

# Create your models here

class Toe(models.Model):
	square = models.CharField(max_length=1, default="")
	score = models.IntegerField(default=0)

	def _str_(self):
		return self.square
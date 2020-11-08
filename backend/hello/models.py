from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.
class Greeting(models.Model):
    when = models.DateTimeField("date created", auto_now_add=True)

class User(models.Model):
    userId = models.CharField(max_length=50)
    picks = ArrayField(
        models.CharField(max_length=50),
        size=5
    )

    def __str__(self):
        return "(UserId: {}, Picks: {})".format(self.userId, str(self.picks))

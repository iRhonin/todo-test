from django.contrib.auth.models import User
from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=80)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    owner = models.ForeignKey(
        User, related_name='todos', on_delete=models.CASCADE,
    )

    class Meta:
        ordering = ['updated']

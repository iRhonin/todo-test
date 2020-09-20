from django.contrib.auth.models import User
from django.db import models


class Todo(models.Model):
    STATUS_CHOICES = (
        ('in-progress', 'In Progress'),
        ('completed', 'Completed'),
    )

    title = models.CharField(max_length=80)
    status = models.CharField(
        max_length=32, choices=STATUS_CHOICES, default='in-progress',
    )
    owner = models.ForeignKey(
        User, related_name='todos', on_delete=models.CASCADE,
    )

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created']

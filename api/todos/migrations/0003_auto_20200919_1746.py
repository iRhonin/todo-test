# Generated by Django 3.1.1 on 2020-09-19 17:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0002_auto_20200919_1745'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='todo',
            options={'ordering': ['-created']},
        ),
    ]
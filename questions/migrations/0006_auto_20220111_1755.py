# Generated by Django 3.1.14 on 2022-01-11 17:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0005_auto_20220111_1750'),
    ]

    operations = [
        migrations.RenameField(
            model_name='question',
            old_name='question_uuid',
            new_name='uuid',
        ),
    ]
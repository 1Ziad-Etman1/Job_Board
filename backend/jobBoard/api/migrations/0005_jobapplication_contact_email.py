# Generated by Django 5.0.3 on 2024-03-16 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_candidate_contact_email_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobapplication',
            name='contact_email',
            field=models.EmailField(default='', max_length=254),
            preserve_default=False,
        ),
    ]

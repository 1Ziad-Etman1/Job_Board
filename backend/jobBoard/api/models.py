from django.db import models
from django.contrib.auth.models import User


class Candidate(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username=models.CharField(max_length=20, unique=True)
    password=models.CharField(max_length=20)
    contact_email = models.EmailField(unique=True)
    contact_phone = models.CharField(max_length=20)
    skills = models.TextField()
    experience = models.CharField(max_length=100)
    education = models.CharField(max_length=100)

    def __str__(self):
        return self.username

class Employer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username=models.CharField(max_length=20, unique=True)
    password=models.CharField(max_length=20)
    company_name = models.CharField(max_length=100)
    contact_email = models.EmailField(unique=True)
    contact_phone = models.CharField(max_length=20)

    def __str__(self):
        return self.username

class Job(models.Model):
    title = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    description = models.TextField()
    requirements = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    employer = models.CharField(max_length=20)

    def __str__(self):
        return self.title

class JobApplication(models.Model):
    name = models.CharField(max_length=20)
    contact_email = models.EmailField()
    job = models.IntegerField()
    status = models.CharField(max_length=20, default='Pending')
    cover_letter = models.TextField()
    resume = models.FileField(upload_to='resumes/')
    date_applied = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}'s application to {self.job}"

    class Meta:
        unique_together = (('contact_email', 'job'),)
        index_together = (('contact_email', 'job'),)

from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
    title = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    description = models.TextField()
    requirements = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    employer = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Employer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=100)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=20)

    def __str__(self):
        return self.user.username

class Candidate(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=20)
    skills = models.TextField()
    experience = models.CharField(max_length=100)
    education = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username

class JobApplication(models.Model):
    candidate = models.ForeignKey(User, related_name='application', on_delete=models.CASCADE)
    job = models.ForeignKey(Job, related_name='appliction', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='Pending')
    cover_letter = models.TextField()
    date_applied = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.candidate.username}'s application to {self.job.title}"

    class Meta:
        unique_together = (('candidate', 'job'),)
        index_together = (('candidate', 'job'),)

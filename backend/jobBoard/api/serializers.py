from rest_framework import serializers
from .models import Job, Employer, Candidate, JobApplication

class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = '__all__'

        
class EmployerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employer
        fields = '__all__'

class CandidateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Candidate
        fields = '__all__'

class JobApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobApplication
        fields = '__all__'


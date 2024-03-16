from rest_framework import serializers
from .models import Job, Employer, Candidate, JobApplication

class LoginSerializer(serializers.Serializer):
    contact_email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        # You can add custom validation logic here (optional)
        return data

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


from django.contrib.auth.backends import BaseBackend
from .models import Candidate, Employer
from .serializers import CandidateSerializer, EmployerSerializer
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


User = get_user_model()

class CandidateBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None):
        if not email or not password:
            return None
        
        try:
            candidate = Candidate.objects.get(contact_email=email)
            if candidate.password == password:
                User = get_user_model()
                user = User.objects.create_user(username=candidate.username, password=password)
                return user
        except Candidate.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

class EmployerBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None):
        if not email or not password:
            return None

        try:
            employer = Employer.objects.get(contact_email=email)
            if employer.password == password:
                User = get_user_model()
                user = User.objects.create_user(username=employer.username, password=password)
                return user
        except Employer.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None



# class CandidateBackend(BaseBackend):
#     def authenticate(self, request, email=None, password=None):
#         User.objects.prefetch_related(Candidate=email)
#         if not email or not password:
#             return None
        
#         try:
#             candidate = Candidate.objects.get(contact_email=email)
#             if candidate.password == password:
#                 return candidate.user
#         except Candidate.DoesNotExist:
#             return None

#     def get_user(self, user_id):
#         try:
#             return User.objects.get(pk=user_id)
#         except User.DoesNotExist:
#             return None

# class EmployerBackend(BaseBackend):
#     def authenticate(self, request, email=None, password=None):
#         if not email or not password:
#             return None

#         try:
#             employer = Employer.objects.get(contact_email=email)
#             if employer.password == password:
#                 return employer.user
#         except Employer.DoesNotExist:
#             return None

#     def get_user(self, user_id):
#         try:
#             return User.objects.get(pk=user_id)
#         except User.DoesNotExist:
#             return None


# class CandidateBackend(BaseBackend):

#     def authenticate(self, request, email=None, password=None):

#         if not email or not password:
#             return None

#         try:
#             candidate = Candidate.objects.filter(contact_email=email, password=password).first()
#             print(f"\n\nin Backend\nCandidate:{candidate}\n\n\n ")
            
#         except Candidate.DoesNotExist:
#             return None

#         if candidate:
#             serializer = CandidateSerializer(candidate)
#             return candidate
#         else:
#             return None

#     def get_user(self, user_id):
#         try:
#             return Candidate.objects.get(pk=user_id)
#         except Candidate.DoesNotExist:
#             return None

# class EmployerBackend(BaseBackend):

#     def authenticate(self, request, email=None, password=None):

#         if not email or not password:
#             return None

#         try:
#             employer = Employer.objects.filter(contact_email=email, password=password).first()
#         except Employer.DoesNotExist:
#             return None

#         if employer:
#             serializer = EmployerSerializer(employer)
#             return serializer.data
#         else:
#             return None

#     def get_user(self, user_id):
#         try:
#             return Employer.objects.get(pk=user_id)
#         except Employer.DoesNotExist:
#             return None
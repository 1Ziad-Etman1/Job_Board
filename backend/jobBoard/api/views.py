from django.shortcuts import render
from .models import Job, Employer, Candidate, JobApplication
from rest_framework.decorators import api_view
from .serializers import JobSerializer, EmployerSerializer, CandidateSerializer, JobApplicationSerializer, LoginSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, viewsets
from rest_framework.authtoken.models import Token
from .backends import CandidateBackend, EmployerBackend
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model


#Register VIEW
class RegisterView(APIView):
    def post(self, request):
        # Extract registration data from request
        username = request.data.get('username')
        password = request.data.get('password')
        contact_email = request.data.get('contact_email')
        contact_phone = request.data.get('contact_phone')
        if request.data.get('skills'):
            user_type='candidate'
            skills = request.data.get('skills')
            experience = request.data.get('experience')
            education= request.data.get('education')
        else:
            user_type='employer'
            company_name=request.data.get('company_name')
        # user_type = request.data.get('skills')

        # Validate required fields
        if not username or not password or not contact_email or not user_type:
            return Response({'message': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new user
        User = get_user_model()
        user = User.objects.create_user(username=username, password=password)

        # Create corresponding profile based on user type
        if user_type == 'candidate':
            Candidate.objects.create(user=user, contact_email=contact_email, contact_phone=contact_phone,username=username, password=password, skills=skills, education=education, experience=experience)
        elif user_type == 'employer':
            Employer.objects.create(user=user, contact_email=contact_email, contact_phone=contact_phone, company_name=company_name, username=username, password=password)
        else:
            # Invalid user type
            user.delete()  # Rollback user creation
            return Response({'message': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)


#LOGIN VIEW
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('contact_email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'message': 'Missing email or password'}, status=status.HTTP_401_UNAUTHORIZED)

        # Try candidate authentication first
        candidate = Candidate.objects.filter(contact_email=email).first()
        # print(f"\n\n\nCandidate in Login View:\n{candidate}\ncandidate.user: {candidate.user}\n\n\n")
        if candidate:
            # Candidate authenticated
            token, _ = Token.objects.get_or_create(user=candidate.user)
            return Response({
                'token': token.key,
                'message': 'Login successful for candidate',
                'username': candidate.username,
                'isCandidate': True
            }, status=status.HTTP_200_OK)

        # If candidate fails, try employer authentication
        employer = Employer.objects.filter(contact_email=email).first()
        
        if employer:
            # Employer authenticated
            token, _ = Token.objects.get_or_create(user=employer.user)
            return Response({
                'token': token.key,
                'message': 'Login successful for employer',
                'username': employer.username,
                'isCandidate': False
            }, status=status.HTTP_200_OK)

        # Authentication failed for both
        raise AuthenticationFailed('Invalid email or password')

#JOB MODEL
@api_view(['GET', 'POST'])
def Job_list(request):
    #GET
    if request.method == 'GET':
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)
    #POST
    elif request.method == 'POST':
        print('hello')
        print(request.data)
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status= status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def Job_pk(request, pk):
    try:
        job = Job.objects.get(pk=pk)
    except Job.DoesNotExists:
        return Response(status=status.HTTP_404_NOT_FOUND)
    #GET
    if request.method == 'GET':
        serializer = JobSerializer(job)
        return Response(serializer.data)
    #PUT
    elif request.method == 'PUT':
        serializer = JobSerializer(job, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data, status= status.HTTP_400_BAD_REQUEST)
    #DELETE
    elif request.method == 'DELETE':
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#EMPLOYER MODEL
#GET POST
class Employer_list(APIView):
    #GET
    def get(self,request):
        employer = Employer.objects.all()
        serializer=EmployerSerializer(employer, many=True)
        return Response(serializer.data)
    #POST
    def post(self, request):
        serializer = EmployerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#GET PUT DELETE
class Employer_pk(APIView):
    def get_object(self,pk):
        try:
            return Employer.objects.get(pk=pk)
        except Employer.DoesNotExist:
            raise Http404
    #GET
    def get(self,request, pk):
        employer = self.get_object(pk)
        serializer=EmployerSerializer(employer)
        return Response(serializer.data)
    #PUT
    def put(self, request, pk):
        employer = self.get_object(pk)
        serializer = EmployerSerializer(employer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    #DELETE
    def delete(self, request, pk):
        employer = self.get_object(pk)
        employer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#CANDIDATE MODEL
#GET POST
class Candidate_list(generics.ListCreateAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer

#GET PUT DELETE 
class Candidate_pk(generics.RetrieveUpdateDestroyAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer


#JOBAPLICATION MODEL
# GET POST & GET PUT DELETE
class JobApplication_viewsets(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
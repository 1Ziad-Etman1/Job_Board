from django.shortcuts import render
from .models import Job, Employer, Candidate, JobApplication
from rest_framework.decorators import api_view
from .serializers import JobSerializer, EmployerSerializer, CandidateSerializer, JobApplicationSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, viewsets



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
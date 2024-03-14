from django.contrib import admin
from django.db import router
from django.urls import include, path
from api import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('applications', views.JobApplication_viewsets)


urlpatterns = [
    path('admin/', admin.site.urls),
    #JOB Model
    path('apis/jobs/', views.Job_list),
    path('apis/jobs/<int:pk>', views.Job_pk),
    #Employer Model
    path('apis/employers/', views.Employer_list.as_view()),
    path('apis/employers/<int:pk>', views.Employer_pk.as_view()),
    #Candidate Model
    path('apis/candidates/', views.Candidate_list.as_view()),
    path('apis/candidates/<int:pk>', views.Candidate_pk.as_view()),
    #JobApplication Model
    path('apis/', include(router.urls))
]

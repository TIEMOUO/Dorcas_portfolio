from rest_framework import viewsets
from .models import Project, Blog, ProjectScreenshot, Service, Skill, Experience, Contact
from .serializers import (
    ProjectSerializer,
    BlogSerializer,
    ServiceSerializer,
    SkillSerializer,
    ExperienceSerializer,
    ContactSerializer,
)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectScreenshotViewSet(viewsets.ModelViewSet):
   
    def get_queryset(self):
        project_id = self.kwargs.get('project_id')
        return ProjectScreenshot.objects.filter(project_id=project_id)    


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

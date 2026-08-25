from rest_framework.routers import DefaultRouter
from .views import (
    ProjectScreenshotViewSet,
    ProjectViewSet,
    BlogViewSet,
    ServiceViewSet,
    SkillViewSet,
    ExperienceViewSet,
    ContactViewSet,
)

router = DefaultRouter()

router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'projects/(?P<project_id>\d+)/screenshots', ProjectScreenshotViewSet, basename='project-screenshots')
router.register(r'blogs', BlogViewSet, basename='blog')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'experiences', ExperienceViewSet, basename='experience')
router.register(r'contacts', ContactViewSet, basename='contact')

urlpatterns = router.urls

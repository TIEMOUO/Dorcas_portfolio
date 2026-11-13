from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Prefetch
from .models import Project, Blog, ProjectScreenshot, Service, Skill, Experience, Contact, Like, Comment, CommentLike
from .serializers import (
    ProjectSerializer,
    ProjectScreenshotSerializer,
    BlogSerializer,
    ServiceSerializer,
    SkillSerializer,
    ExperienceSerializer,
    ContactSerializer,
    LikeSerializer,
    CommentSerializer,
    CommentLikeSerializer,
    CommentCreateSerializer,
)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectScreenshotViewSet(viewsets.ModelViewSet):
    queryset = ProjectScreenshot.objects.all()
    serializer_class = ProjectScreenshotSerializer

    def get_queryset(self):
        project_id = self.kwargs.get('project_id')
        return ProjectScreenshot.objects.filter(project_id=project_id)


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        blog = self.get_object()
        visitor_id = request.data.get('visitor_id')

        if not visitor_id:
            return Response({'error': 'visitor_id required'}, status=400)

        like, created = Like.objects.get_or_create(blog=blog, visitor_id=visitor_id)

        if not created:
            return Response({'error': 'Already liked', 'liked': True}, status=400)

        blog.likes = Like.objects.filter(blog=blog).count()
        blog.save()

        return Response({
            'likes': blog.likes,
            'liked': True
        })

    @action(detail=True, methods=['post'])
    def unlike(self, request, pk=None):
        blog = self.get_object()
        visitor_id = request.data.get('visitor_id')

        if not visitor_id:
            return Response({'error': 'visitor_id required'}, status=400)

        try:
            like = Like.objects.get(blog=blog, visitor_id=visitor_id)
            like.delete()
        except Like.DoesNotExist:
            pass

        blog.likes = Like.objects.filter(blog=blog).count()
        blog.save()

        return Response({
            'likes': blog.likes,
            'liked': False
        })

    @action(detail=True, methods=['get'])
    def like_status(self, request, pk=None):
        blog = self.get_object()
        visitor_id = request.query_params.get('visitor_id')

        if not visitor_id:
            return Response({'liked': False, 'likes': blog.likes})

        liked = Like.objects.filter(blog=blog, visitor_id=visitor_id).exists()
        likes_count = blog.likes

        return Response({
            'liked': liked,
            'likes': likes_count
        })

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        blog = self.get_object()
        page = int(request.query_params.get('page', 1))
        page_size = 5
        offset = (page - 1) * page_size

        parent_comments = Comment.objects.filter(
            blog=blog,
            parent__isnull=True
        ).prefetch_related(
            Prefetch('replies', queryset=Comment.objects.order_by('created_at'))
        ).order_by('-created_at')[offset:offset + page_size + 1]

        has_more = parent_comments.count() > page_size
        comments_to_show = parent_comments[:page_size]

        serializer = CommentSerializer(comments_to_show, many=True)

        return Response({
            'comments': serializer.data,
            'has_more': has_more,
            'page': page
        })

    @action(detail=True, methods=['post'])
    def add_comment(self, request, pk=None):
        blog = self.get_object()

        serializer = CommentCreateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        author = serializer.validated_data['author']
        content = serializer.validated_data['content']
        parent_id = serializer.validated_data.get('parent_id')

        parent_comment = None
        if parent_id:
            try:
                parent_comment = Comment.objects.get(id=parent_id, blog=blog)
            except Comment.DoesNotExist:
                return Response({'error': 'Parent comment not found'}, status=400)

        comment = Comment.objects.create(
            blog=blog,
            parent=parent_comment,
            author=author,
            content=content
        )

        response_serializer = CommentSerializer(comment)
        return Response(response_serializer.data, status=201)


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


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        comment = self.get_object()
        visitor_id = request.data.get('visitor_id')

        if not visitor_id:
            return Response({'error': 'visitor_id required'}, status=400)

        like, created = CommentLike.objects.get_or_create(comment=comment, visitor_id=visitor_id)

        if not created:
            return Response({'error': 'Already liked', 'liked': True}, status=400)

        comment.likes = CommentLike.objects.filter(comment=comment).count()
        comment.save()

        return Response({
            'likes': comment.likes,
            'liked': True
        })

    @action(detail=True, methods=['post'])
    def unlike(self, request, pk=None):
        comment = self.get_object()
        visitor_id = request.data.get('visitor_id')

        if not visitor_id:
            return Response({'error': 'visitor_id required'}, status=400)

        try:
            like = CommentLike.objects.get(comment=comment, visitor_id=visitor_id)
            like.delete()
        except CommentLike.DoesNotExist:
            pass

        comment.likes = CommentLike.objects.filter(comment=comment).count()
        comment.save()

        return Response({
            'likes': comment.likes,
            'liked': False
        })

    @action(detail=True, methods=['get'])
    def like_status(self, request, pk=None):
        comment = self.get_object()
        visitor_id = request.query_params.get('visitor_id')

        if not visitor_id:
            return Response({'liked': False, 'likes': comment.likes})

        liked = CommentLike.objects.filter(comment=comment, visitor_id=visitor_id).exists()

        return Response({
            'liked': liked,
            'likes': comment.likes
        })

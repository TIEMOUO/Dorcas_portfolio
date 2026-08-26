from rest_framework import serializers
from .models import Project, Blog, ProjectScreenshot, Service, Skill, Experience, Contact, Like, Comment, CommentLike



class ProjectScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectScreenshot
        fields = ["id", "image"]


class ProjectSerializer(serializers.ModelSerializer):
    screenshots = ProjectScreenshotSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = "__all__"


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLike
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'blog', 'parent', 'author', 'content', 'likes', 'likes_count', 'replies', 'created_at']

    def get_replies(self, obj):
        if obj.replies.exists():
            return CommentSerializer(obj.replies.filter(), many=True).data
        return []

    def get_likes_count(self, obj):
        return obj.likes


class CommentCreateSerializer(serializers.Serializer):
    author = serializers.CharField(max_length=100, min_length=1)
    content = serializers.CharField(max_length=2000, min_length=1)
    parent_id = serializers.IntegerField(required=False, allow_null=True)


class BlogSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = '__all__'

    def get_likes_count(self, obj):
        return obj.likes


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

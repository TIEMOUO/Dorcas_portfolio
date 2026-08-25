from django.contrib import admin
from .models import Project, Blog, ProjectScreenshot, Service, Skill, Experience, Contact


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'featured', 'created_at', 'updated_at')
    list_filter = ('category', 'featured', 'created_at')
    search_fields = ('title', 'description', 'long_description')
    list_editable = ('featured',)


@admin.register(ProjectScreenshot)
class ProjectScreenshotAdmin(admin.ModelAdmin):
    list_display = ('project', 'image')
    list_filter = ('project',)
    search_fields = ('project__title',)


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'likes', 'featured', 'created_at')
    list_filter = ('category', 'featured', 'date')
    search_fields = ('title', 'excerpt', 'content')
    list_editable = ('featured',)
    date_hierarchy = 'date'


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'featured', 'created_at')
    list_filter = ('featured',)
    search_fields = ('title', 'description')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'mastered', 'featured')
    list_filter = ('mastered', 'featured')
    search_fields = ('name',)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'period', 'location', 'tag', 'featured')
    list_filter = ('type', 'featured')
    search_fields = ('title', 'description', 'location', 'tag')
    list_editable = ('featured',)


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'message')
    list_editable = ('is_read',)
    date_hierarchy = 'created_at'
    readonly_fields = ('name', 'email', 'message', 'created_at')

    def has_add_permission(self, request):
        return False

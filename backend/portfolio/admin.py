from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Project, Blog, ProjectScreenshot, Service, Skill, Experience, Contact, Comment, CommentLike


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'featured', 'created_at', 'updated_at')
    list_filter = ('category', 'featured', 'created_at')
    search_fields = ('title', 'description', 'long_description')
    list_editable = ('featured',)
    actions = ['delete_selected']
    save_as = True
    save_on_top = True


@admin.register(ProjectScreenshot)
class ProjectScreenshotAdmin(admin.ModelAdmin):
    list_display = ('project', 'image')
    list_filter = ('project',)
    search_fields = ('project__title',)
    actions = ['delete_selected']
    save_on_top = True


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'likes', 'featured', 'created_at')
    list_filter = ('category', 'featured', 'date')
    search_fields = ('title', 'excerpt', 'content')
    list_editable = ('featured',)
    date_hierarchy = 'date'
    actions = ['delete_selected']
    save_as = True
    save_on_top = True


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon', 'featured', 'created_at')
    list_filter = ('featured',)
    search_fields = ('title', 'description')
    actions = ['delete_selected']
    save_as = True
    save_on_top = True


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon_display', 'mastered', 'featured')
    list_filter = ('mastered', 'featured')
    search_fields = ('name',)
    list_editable = ('mastered', 'featured')
    actions = ['delete_selected']
    save_as = True
    save_on_top = True

    def icon_display(self, obj):
        return f'<i class="{obj.icon}"></i> {obj.get_icon_display()}'
    icon_display.short_description = 'Icon'
    icon_display.allow_tags = True


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'period', 'location', 'tag', 'featured')
    list_filter = ('type', 'featured')
    search_fields = ('title', 'description', 'location', 'tag')
    list_editable = ('featured',)
    actions = ['delete_selected']
    save_as = True
    save_on_top = True


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'message')
    list_editable = ('is_read',)
    date_hierarchy = 'created_at'
    readonly_fields = ('name', 'email', 'message', 'created_at')
    actions = ['delete_selected']

    def has_add_permission(self, request):
        return False


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'blog', 'parent', 'likes', 'created_at')
    list_filter = ('blog', 'created_at')
    search_fields = ('author', 'content', 'blog__title')
    readonly_fields = ('created_at',)
    raw_id_fields = ('blog', 'parent')
    actions = ['delete_selected']
    save_on_top = True


@admin.register(CommentLike)
class CommentLikeAdmin(admin.ModelAdmin):
    list_display = ('visitor_id', 'comment', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('visitor_id', 'comment__author', 'comment__content')
    readonly_fields = ('created_at',)
    raw_id_fields = ('comment',)
    actions = ['delete_selected']
    save_on_top = True


class GroupAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    actions = ['delete_selected']


admin.site.unregister(Group)
admin.site.register(Group, GroupAdmin)

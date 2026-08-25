from django.db import models

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('uiux', 'UI/UX Design'),
        ('web', 'Développement Web'),
        ('graphic', 'Graphic Design'),
        ('mobile', 'Mobile'),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField()
    long_description = models.TextField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    tags = models.JSONField(default=list, blank=True)
    demo = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    figma = models.URLField(blank=True, null=True)
    behance = models.URLField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
        ordering = ['-created_at']


class ProjectScreenshot(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="screenshots"
    )
    image = models.ImageField(upload_to="projects/screenshots/", blank=True, null=True)

class Blog(models.Model):
    CATEGORY_CHOICES = [
        ('Design', 'Design'),
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('Other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    excerpt = models.TextField()
    content = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='blogs/', blank=True, null=True)
    icon = models.CharField(max_length=50, blank=True)
    date = models.DateField()
    read_time = models.CharField(max_length=20, blank=True)
    likes = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'
        ordering = ['-date']


class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50)
    features = models.JSONField(default=list, blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Service'
        verbose_name_plural = 'Services'
        ordering = ['created_at']


class Skill(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)
    mastered = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Skill'
        verbose_name_plural = 'Skills'
        ordering = ['name']


class Experience(models.Model):
    TYPE_CHOICES = [
        ('academic', 'Académique'),
        ('professional', 'Professionnel'),
    ]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='professional')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    period = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    tag = models.CharField(max_length=50)
    icon = models.CharField(max_length=50, blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.period})"

    class Meta:
        verbose_name = 'Experience'
        verbose_name_plural = 'Experiences'
        ordering = ['-created_at']


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"

    class Meta:
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'
        ordering = ['-created_at']

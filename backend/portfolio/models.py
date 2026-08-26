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


class Like(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='blog_likes')
    visitor_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['blog', 'visitor_id']
        ordering = ['-created_at']


class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='blog_comments')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    author = models.CharField(max_length=100)
    content = models.TextField()
    likes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Comment by {self.author} on {self.blog.title}"


class CommentLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='comment_likes')
    visitor_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['comment', 'visitor_id']
        ordering = ['-created_at']


class Service(models.Model):
    ICON_CHOICES = [
        ('fa-solid fa-code', 'Code'),
        ('fa-solid fa-palette', 'Design'),
        ('fa-solid fa-paint-brush', 'UI/UX'),
        ('fa-solid fa-mobile', 'Mobile'),
        ('fa-solid fa-globe', 'Web'),
        ('fa-solid fa-server', 'Backend'),
        ('fa-solid fa-database', 'Database'),
        ('fa-solid fa-cloud', 'Cloud'),
        ('fa-solid fa-lock', 'Security'),
        ('fa-solid fa-rocket', 'Performance'),
        ('fa-solid fa-cogs', 'Integration'),
        ('fa-solid fa-chart-line', 'Analytics'),
        ('fa-solid fa-robot', 'Automation'),
        ('fa-solid fa-brain', 'AI'),
        ('fa-brands fa-react', 'React'),
        ('fa-brands fa-angular', 'Angular'),
        ('fa-brands fa-vuejs', 'Vue.js'),
        ('fa-brands fa-node-js', 'Node.js'),
        ('fa-brands fa-python', 'Python'),
        ('fa-brands fa-java', 'Java'),
        ('fa-brands fa-docker', 'Docker'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, choices=ICON_CHOICES, default='fa-solid fa-code')
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
    ICON_CHOICES = [
        ('fa-brands fa-react', 'React'),
        ('fa-brands fa-angular', 'Angular'),
        ('fa-brands fa-js', 'JavaScript'),
        ('fa-brands fa-node-js', 'Node.js'),
        ('fa-brands fa-python', 'Python'),
        ('fa-brands fa-java', 'Java'),
        ('fa-brands fa-php', 'PHP'),
        ('fa-brands fa-laravel', 'Laravel'),
        ('fa-brands fa-django', 'Django'),
        ('fa-brands fa-flutter', 'Flutter'),
        ('fa-brands fa-swift', 'Swift'),
        ('fa-brands fa-kotlin', 'Kotlin'),
        ('fa-brands fa-docker', 'Docker'),
        ('fa-brands fa-aws', 'AWS'),
        ('fa-brands fa-git-alt', 'Git'),
        ('fa-brands fa-github', 'GitHub'),
        ('fa-brands fa-figma', 'Figma'),
        ('fa-brands fa-sketch', 'Sketch'),
        ('fa-brands fa-html5', 'HTML5'),
        ('fa-brands fa-css3-alt', 'CSS3'),
        ('fa-brands fa-sass', 'Sass'),
        ('fa-brands fa-tailwind', 'Tailwind'),
        ('fa-brands fa-bootstrap', 'Bootstrap'),
        ('fa-brands fa-vuejs', 'Vue.js'),
        ('fa-brands fa-amazon', 'Amazon'),
        ('fa-brands fa-google', 'Google'),
        ('fa-brands fa-microsoft', 'Microsoft'),
        ('fa-solid fa-database', 'Database'),
        ('fa-solid fa-server', 'Server'),
        ('fa-solid fa-code', 'Code'),
        ('fa-solid fa-palette', 'Design'),
        ('fa-solid fa-mobile', 'Mobile'),
        ('fa-solid fa-globe', 'Web'),
        ('fa-solid fa-lock', 'Security'),
        ('fa-solid fa-cloud', 'Cloud'),
        ('fa-solid fa-brain', 'AI/ML'),
        ('fa-solid fa-chart-line', 'Analytics'),
    ]

    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, choices=ICON_CHOICES, default='fa-solid fa-code')
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

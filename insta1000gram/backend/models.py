from django.db import models

class PSEOPart(models.Model):
    """
    Template for programmatic SEO content, keywords, titles and schema.
    """
    CATEGORY_CHOICES = [
        ('reels', 'Reels Downloader'),
        ('stories', 'Story Saver'),
        ('photos', 'Photo Downloader'),
        ('audio', 'Audio Extractor'),
        ('highlight', 'Highlights Saver'),
        ('device', 'Device & OS Guides'),
    ]

    title_template = models.CharField(
        max_length=255, 
        default="Download Instagram {target} in 1080p Full HD - Free Online",
        help_text="Use {target}, {location}, {year}, {lang} placeholders"
    )
    meta_description_template = models.TextField(
        default="Free online Instagram {target} downloader. Save Reels, Stories, Photos in original MP4 / JPG quality without login.",
        help_text="Dynamic SEO description"
    )
    h1_template = models.CharField(
        max_length=255,
        default="Download Instagram {target} Free Online"
    )
    content_body = models.TextField(
        default="Save any Instagram {target} directly to your device in 1080p Full HD using our lightning-fast media extractor.",
        help_text="HTML or Markdown body template"
    )
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='reels')
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = 'core'

    def __str__(self):
        return f"pSEO Template ({self.get_category_display()})"


class PSEOPartKeyword(models.Model):
    """
    Dynamic keyword slug records (e.g. reels-saver-usa, download-instagram-stories-online).
    """
    slug = models.SlugField(max_length=200, unique=True, db_index=True)
    target_keyword = models.CharField(max_length=150)
    category = models.CharField(max_length=50, default='reels')
    search_volume = models.CharField(max_length=50, default='High (10k-50k/mo)')
    is_indexed = models.BooleanField(default=True, help_text="Include in sitemap_1.xml")
    views_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'core'
        ordering = ['-views_count', 'slug']

    def __str__(self):
        return f"{self.slug} ({self.target_keyword})"


class AdPlacement(models.Model):
    """
    Control ad networks, scripts, banners, and ads.txt directly from Django Admin.
    """
    SLOT_CHOICES = [
        ('top_banner', 'Top Header Banner (728x90 / responsive)'),
        ('below_downloader', 'Below Downloader Box (Native / 300x250)'),
        ('pseo_content', 'pSEO Article In-Content Ad'),
        ('footer_banner', 'Bottom Sticky / Footer Banner'),
        ('head_script', 'Global <head> Tag Script (AdSense / Monetag / Analytics)'),
    ]

    slot = models.CharField(max_length=50, choices=SLOT_CHOICES, unique=True)
    name = models.CharField(max_length=100, default="My Ad Network")
    ad_code = models.TextField(
        blank=True,
        help_text="Paste your raw HTML/JS ad snippet from Google AdSense, Monetag, Adsterra, or Ezoic."
    )
    is_active = models.BooleanField(default=False, help_text="Turn ON/OFF this ad slot instantly")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = 'core'

    def __str__(self):
        status = "🟢 Active" if self.is_active else "🔴 Paused"
        return f"[{status}] {self.get_slot_display()} ({self.name})"


class AdsTxtEntry(models.Model):
    """
    Manage /ads.txt records required by Google AdSense & ad exchanges.
    """
    content = models.TextField(
        default="google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0",
        help_text="Paste your official ads.txt lines here"
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = 'core'

    def __str__(self):
        return f"ads.txt config (Updated {self.updated_at.strftime('%Y-%m-%d')})"

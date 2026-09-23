from django.contrib import admin
try:
    from models import PSEOPart, PSEOPartKeyword, AdPlacement, AdsTxtEntry
except ImportError:
    from .models import PSEOPart, PSEOPartKeyword, AdPlacement, AdsTxtEntry

@admin.register(PSEOPart)
class PSEOPartAdmin(admin.ModelAdmin):
    list_display = ('category', 'title_template', 'updated_at')
    list_filter = ('category',)
    search_fields = ('title_template', 'meta_description_template', 'content_body')
    fieldsets = (
        ('Categorization', {
            'fields': ('category',)
        }),
        ('SEO Meta Tags', {
            'description': 'Customize the programmatic template with {target}, {location}, {year} placeholders.',
            'fields': ('title_template', 'h1_template', 'meta_description_template')
        }),
        ('Main Content Body', {
            'fields': ('content_body',)
        }),
    )

@admin.register(PSEOPartKeyword)
class PSEOPartKeywordAdmin(admin.ModelAdmin):
    list_display = ('slug', 'target_keyword', 'category', 'is_indexed', 'views_count', 'created_at')
    list_filter = ('is_indexed', 'category')
    search_fields = ('slug', 'target_keyword')
    list_editable = ('is_indexed',)
    prepopulated_fields = {'slug': ('target_keyword',)}
    actions = ['mark_indexed', 'mark_unindexed']

    @admin.action(description="Include selected keywords in sitemap_1.xml")
    def mark_indexed(self, request, queryset):
        queryset.update(is_indexed=True)

    @admin.action(description="Exclude selected keywords from sitemap")
    def mark_unindexed(self, request, queryset):
        queryset.update(is_indexed=False)

@admin.register(AdPlacement)
class AdPlacementAdmin(admin.ModelAdmin):
    list_display = ('slot', 'name', 'is_active', 'updated_at')
    list_filter = ('is_active', 'slot')
    list_editable = ('is_active',)
    search_fields = ('name', 'slot', 'ad_code')
    fieldsets = (
        ('Placement Slot', {
            'fields': ('slot', 'name', 'is_active')
        }),
        ('Code Snippet', {
            'description': 'Paste your raw ad unit snippet (AdSense, Monetag, Adsterra, Propeller, Ezoic, etc.). Next.js will execute it automatically.',
            'fields': ('ad_code',)
        }),
    )

@admin.register(AdsTxtEntry)
class AdsTxtEntryAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'updated_at')

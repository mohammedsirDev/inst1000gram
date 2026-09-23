from django.contrib import admin
from django.urls import path
try:
    import views
    import admin as custom_admin
except ImportError:
    from . import views
    from . import admin as custom_admin

urlpatterns = [
    # Built-in Django Admin Interface
    path('admin/', admin.site.urls),

    # Core Downloader APIs (support with and without trailing slash)
    path('api/instagram/resolve', views.resolve_instagram, name='resolve_instagram_noslash'),
    path('api/instagram/resolve/', views.resolve_instagram, name='resolve_instagram'),
    path('api/download/proxy', views.proxy_download, name='proxy_download_noslash'),
    path('api/download/proxy/', views.proxy_download, name='proxy_download'),

    # Programmatic SEO API for Next.js SSR
    path('api/pseo/page/<slug:slug>/', views.get_pseo_page, name='get_pseo_page'),
    path('api/pseo/page/<slug:slug>', views.get_pseo_page, name='get_pseo_page_noslash'),

    # Monetization & Ads Control
    path('api/ads', views.get_ads, name='get_ads_noslash'),
    path('api/ads/', views.get_ads, name='get_ads'),
    path('ads.txt', views.get_ads_txt, name='get_ads_txt'),

    # Partitioned Sitemaps for Google Indexing
    path('sitemap.xml', views.sitemap_index, name='sitemap_index'),
    path('sitemap_1.xml', views.sitemap_1, name='sitemap_1'),
]

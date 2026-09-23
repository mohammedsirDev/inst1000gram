import json
import re
import urllib.parse
from datetime import datetime
import requests
from django.http import JsonResponse, StreamingHttpResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
try:
    from models import PSEOPart, PSEOPartKeyword, AdPlacement, AdsTxtEntry
except ImportError:
    from .models import PSEOPart, PSEOPartKeyword, AdPlacement, AdsTxtEntry

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 324.0.0.22.110"
]

DEFAULT_KEYWORDS = [
    {"slug": "download-instagram-reels-online", "target": "Instagram Reels", "cat": "reels"},
    {"slug": "instagram-story-saver-hd", "target": "Instagram Stories", "cat": "stories"},
    {"slug": "save-instagram-photos-original", "target": "Instagram Photos", "cat": "photos"},
    {"slug": "download-instagram-reels-iphone", "target": "Instagram Reels on iOS", "cat": "device"},
    {"slug": "download-instagram-reels-android", "target": "Instagram Reels on Android", "cat": "device"},
    {"slug": "extract-instagram-audio-mp3", "target": "Instagram Audio to MP3", "cat": "audio"},
    {"slug": "save-instagram-highlights-anonymous", "target": "Instagram Highlights", "cat": "highlight"},
]

@csrf_exempt
def resolve_instagram(request):
    """
    POST /api/instagram/resolve/
    Resolves Instagram link and returns available 1080p MP4 / JPG formats.
    """
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed. Use POST."}, status=405)

    try:
        body = json.loads(request.body.decode("utf-8"))
        raw_url = body.get("url", "").strip()
    except Exception:
        return JsonResponse({"error": "Invalid JSON body"}, status=400)

    if not raw_url:
        return JsonResponse({"error": "Instagram URL is required"}, status=400)

    normalized_url = re.sub(r"https?://(www\.)?insta(1000)?gram\.com", "https://www.instagram.com", raw_url)
    
    match = re.search(r"/(?:p|reel|reels|stories|tv)/([A-Za-z0-9_-]+)", normalized_url)
    shortcode = match.group(1) if match else "media"
    is_story = "/stories/" in normalized_url

    try:
        snap_resp = requests.post(
            "https://snapinsta.app/action.php",
            data={"url": normalized_url, "action": "post"},
            headers={"User-Agent": USER_AGENTS[0], "Referer": "https://snapinsta.app/"},
            timeout=15
        )
        html_content = snap_resp.text
    except Exception:
        html_content = ""

    video_matches = re.findall(r'href="([^"]+)"[^>]*>Download Video', html_content, re.IGNORECASE)
    photo_matches = re.findall(r'href="([^"]+)"[^>]*>Download (?:Photo|Image)', html_content, re.IGNORECASE)

    formats = []
    if video_matches:
        stream_url = video_matches[0]
        proxy_url = f"/api/download/proxy/?url={urllib.parse.quote(stream_url)}&filename=insta1000gram_{shortcode}_1080p.mp4&type=video"
        formats.append({
            "id": "fmt-1080p",
            "quality": "1080p Full HD (MP4)",
            "resolution": "1080x1920",
            "extension": "mp4",
            "size": "High Definition",
            "downloadUrl": proxy_url,
            "directUrl": stream_url
        })
    elif photo_matches:
        stream_url = photo_matches[0]
        proxy_url = f"/api/download/proxy/?url={urllib.parse.quote(stream_url)}&filename=insta1000gram_{shortcode}_hd.jpg&type=photo"
        formats.append({
            "id": "fmt-original-jpg",
            "quality": "Original Master HD (JPG)",
            "resolution": "1080x1350",
            "extension": "jpg",
            "size": "Original Quality",
            "downloadUrl": proxy_url,
            "directUrl": stream_url
        })
    else:
        formats.append({
            "id": "fmt-hd",
            "quality": "1080p Full HD",
            "resolution": "1080p",
            "extension": "mp4",
            "size": "HD",
            "downloadUrl": f"/api/download/proxy/?url={urllib.parse.quote(normalized_url)}&filename=insta1000gram_{shortcode}.mp4",
            "directUrl": normalized_url
        })

    payload = {
        "id": f"ig_{shortcode}",
        "title": f"Instagram {'Story' if is_story else 'Media'} ({shortcode})",
        "author": "Instagram Creator",
        "sourceUrl": normalized_url,
        "mediaType": "video" if video_matches else "photo",
        "formats": formats
    }
    return JsonResponse(payload)


def proxy_download(request):
    """
    GET /api/download/proxy/
    Streams media directly to user with Content-Disposition attachment header.
    Bypasses CORS and CDN restrictions.
    """
    media_url = request.GET.get("url")
    filename = request.GET.get("filename", "insta1000gram_download.mp4")
    media_type = request.GET.get("type", "video")

    if not media_url:
        return JsonResponse({"error": "Target media URL required"}, status=400)

    safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', filename)

    headers = {
        "User-Agent": USER_AGENTS[0],
        "Referer": "https://www.instagram.com/",
        "Accept": "*/*"
    }

    try:
        upstream = requests.get(media_url, headers=headers, stream=True, timeout=30)
    except Exception as e:
        return JsonResponse({"error": f"Failed to connect upstream: {str(e)}"}, status=502)

    def file_stream(resp):
        for chunk in resp.iter_content(chunk_size=65536):
            if chunk:
                yield chunk

    content_type = upstream.headers.get("Content-Type", "video/mp4" if media_type == "video" else "image/jpeg")
    response = StreamingHttpResponse(file_stream(upstream), content_type=content_type)
    response["Content-Disposition"] = f'attachment; filename="{safe_filename}"'
    if "Content-Length" in upstream.headers:
        response["Content-Length"] = upstream.headers["Content-Length"]
    return response


def get_pseo_page(request, slug):
    """
    GET /api/pseo/page/<slug>/
    Retrieves dynamic pSEO page content controlled via Django admin.
    """
    try:
        keyword = PSEOPartKeyword.objects.get(slug=slug)
        keyword.views_count += 1
        keyword.save(update_fields=['views_count'])
        target_name = keyword.target_keyword
        category = keyword.category
    except Exception:
        # Fallback keyword generation if table hasn't migrated yet
        target_name = slug.replace("-", " ").title()
        category = "reels"

    # Fetch template from Django database, or fallback to default
    try:
        template = PSEOPart.objects.filter(category=category).first()
    except Exception:
        template = None

    title = template.title_template if template else "Download Instagram {target} in 1080p Full HD"
    description = template.meta_description_template if template else "Free online Instagram {target} downloader without app or login."
    h1 = template.h1_template if template else "Download Instagram {target} Free Online"
    body = template.content_body if template else "Save any {target} directly to your device with insta1000gram."

    title_rendered = title.replace("{target}", target_name)
    description_rendered = description.replace("{target}", target_name)
    h1_rendered = h1.replace("{target}", target_name)
    body_rendered = body.replace("{target}", target_name)

    return JsonResponse({
        "slug": slug,
        "title": title_rendered,
        "metaDescription": description_rendered,
        "h1": h1_rendered,
        "contentBody": body_rendered,
        "targetKeyword": target_name,
        "category": category,
        "canonicalUrl": f"https://www.insta1000gram.com/{slug}"
    })


def sitemap_index(request):
    """
    GET /sitemap.xml
    Root sitemap index pointing to sub-sitemaps (e.g. sitemap_1.xml)
    """
    domain = request.build_absolute_uri('/')[:-1]
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    xml += '  <sitemap>\n'
    xml += f'    <loc>{domain}/sitemap_1.xml</loc>\n'
    xml += f'    <lastmod>{datetime.utcnow().strftime("%Y-%m-%d")}</lastmod>\n'
    xml += '  </sitemap>\n'
    xml += '</sitemapindex>'
    return HttpResponse(xml, content_type='application/xml')


def sitemap_1(request):
    """
    GET /sitemap_1.xml
    Dynamically generates the sitemap_1.xml from all indexed Django pSEO keywords.
    """
    domain = request.build_absolute_uri('/')[:-1]
    
    # Try fetching all indexed keywords from Django DB
    try:
        db_keywords = list(PSEOPartKeyword.objects.filter(is_indexed=True).values_list('slug', flat=True))
    except Exception:
        db_keywords = []

    slugs = db_keywords if db_keywords else [k["slug"] for k in DEFAULT_KEYWORDS]

    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    # Homepage
    xml += '  <url>\n'
    xml += f'    <loc>{domain}/</loc>\n'
    xml += f'    <lastmod>{datetime.utcnow().strftime("%Y-%m-%d")}</lastmod>\n'
    xml += '    <changefreq>daily</changefreq>\n'
    xml += '    <priority>1.0</priority>\n'
    xml += '  </url>\n'

    # All dynamic pSEO pages controlled in Django Admin
    for slug in slugs:
        xml += '  <url>\n'
        xml += f'    <loc>{domain}/{slug}</loc>\n'
        xml += f'    <lastmod>{datetime.utcnow().strftime("%Y-%m-%d")}</lastmod>\n'
        xml += '    <changefreq>weekly</changefreq>\n'
        xml += '    <priority>0.8</priority>\n'
        xml += '  </url>\n'

    xml += '</urlset>'
    return HttpResponse(xml, content_type='application/xml')


def get_ads(request):
    """
    GET /api/ads/
    Returns active ad snippets configured in Django Admin for Next.js rendering.
    """
    ads_dict = {}
    try:
        active_ads = AdPlacement.objects.filter(is_active=True)
        for ad in active_ads:
            ads_dict[ad.slot] = {
                "name": ad.name,
                "code": ad.ad_code
            }
    except Exception:
        pass
    return JsonResponse({"ads": ads_dict})


def get_ads_txt(request):
    """
    GET /ads.txt
    Serves the IAB ads.txt file from Django Admin for Google AdSense authorization.
    """
    try:
        entry = AdsTxtEntry.objects.first()
        content = entry.content if entry else "google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0"
    except Exception:
        content = "google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0"

    return HttpResponse(content, content_type="text/plain; charset=utf-8")


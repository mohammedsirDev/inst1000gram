import { MetadataRoute } from 'next';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://www.insta1000gram.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Query indexed keywords dynamically from Django Backend
  let slugs: string[] = [];

  try {
    const res = await fetch(`${BACKEND_URL}/sitemap_1.xml`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const xml = await res.text();
      const matches = xml.match(/<loc>(.*?)<\/loc>/g);
      if (matches) {
        return matches.map((tag) => {
          const loc = tag.replace(/<\/?loc>/g, '');
          return {
            url: loc,
            lastModified: new Date(),
            changeFrequency: loc === SITE_DOMAIN || loc.endsWith('/') ? 'daily' : 'weekly',
            priority: loc === SITE_DOMAIN || loc.endsWith('/') ? 1.0 : 0.8,
          };
        });
      }
    }
  } catch (e) {
    // fallback static entries if backend is offline during static build
  }

  // Fallback programmatic pages
  const fallbackKeywords = [
    'download-instagram-reels-online',
    'instagram-story-saver-hd',
    'save-instagram-photos-original',
    'download-instagram-reels-iphone',
    'download-instagram-reels-android',
    'extract-instagram-audio-mp3',
    'save-instagram-highlights-anonymous'
  ];

  return [
    {
      url: SITE_DOMAIN,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...fallbackKeywords.map((slug) => ({
      url: `${SITE_DOMAIN}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}

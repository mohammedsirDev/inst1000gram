import { MetadataRoute } from 'next';

const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://www.insta1000gram.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${SITE_DOMAIN}/sitemap_1.xml`,
  };
}

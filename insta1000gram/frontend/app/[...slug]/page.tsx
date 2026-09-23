import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CatchAllClient from './CatchAllClient';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// Server-side dynamic SEO metadata generation fetched from Django Backend
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join('/');

  try {
    const res = await fetch(`${BACKEND_URL}/api/pseo/page/${slugPath}/`, {
      next: { revalidate: 3600 }, // ISR cache for fast page rendering
    });

    if (res.ok) {
      const data = await res.json();
      return {
        title: data.title,
        description: data.metaDescription,
        alternates: {
          canonical: data.canonicalUrl,
        },
        openGraph: {
          title: data.title,
          description: data.metaDescription,
          type: 'website',
          url: data.canonicalUrl,
        },
      };
    }
  } catch (e) {
    // If backend isn't reached, provide a high-conversion fallback
  }

  const formattedName = slugPath.replace(/[-_]/g, ' ');
  return {
    title: `Download Instagram ${formattedName} in 1080p Full HD - insta1000gram`,
    description: `Free Instagram ${formattedName} downloader in MP4 / JPG master quality without login.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join('/');

  let pseoData = null;
  let adsData: Record<string, { name: string; code: string }> = {};

  try {
    const [pseoRes, adsRes] = await Promise.all([
      fetch(`${BACKEND_URL}/api/pseo/page/${slugPath}/`, { next: { revalidate: 3600 } }),
      fetch(`${BACKEND_URL}/api/ads/`, { next: { revalidate: 60 } })
    ]);

    if (pseoRes.ok) {
      pseoData = await pseoRes.json();
    }
    if (adsRes.ok) {
      const adsJson = await adsRes.json();
      adsData = adsJson.ads || {};
    }
  } catch (e) {
    // continue with fallbacks
  }

  return <CatchAllClient slug={slugPath} initialData={pseoData} ads={adsData} />;
}

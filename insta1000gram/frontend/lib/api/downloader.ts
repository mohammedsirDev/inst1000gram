import { InstagramMediaResult, MediaType } from '@/types';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export interface ResolveInstagramParams {
  url: string;
}

export interface AdsResponse {
  ads: Record<string, { name: string; code: string }>;
}

export interface PseoPageResponse {
  slug: string;
  keyword: string;
  category: string;
  title: string;
  metaDescription: string;
  h1: string;
  contentBody: string;
  canonicalUrl: string;
  relatedPages: { title: string; slug: string }[];
}

/**
 * Resolves an Instagram URL using the Django backend API
 */
export async function resolveInstagramMedia(rawUrl: string): Promise<InstagramMediaResult> {
  const normalized = rawUrl.trim();
  if (!normalized) {
    throw new Error('Please enter a valid Instagram URL');
  }

  const response = await fetch(`${BACKEND_URL}/api/instagram/resolve/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: normalized }),
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error || 'Failed to extract Instagram media');
  }

  return data as InstagramMediaResult;
}

/**
 * Fetches dynamic ad placements configured in Django Admin
 */
export async function getAdPlacements(): Promise<Record<string, { name: string; code: string }>> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/ads/`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      return data.ads || {};
    }
  } catch (err) {
    // Return empty fallback gracefully
  }
  return {};
}

/**
 * Fetches programmatic SEO page content for localized routes
 */
export async function getPseoPage(slugPath: string): Promise<PseoPageResponse | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/pseo/page/${slugPath}/`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Return null fallback
  }
  return null;
}

import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/ads.txt`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const text = await res.text();
      return new NextResponse(text, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      });
    }
  } catch (e) {
    // backend offline fallback
  }

  // Fallback default ads.txt placeholder
  return new NextResponse('google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

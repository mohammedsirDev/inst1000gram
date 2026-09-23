'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ArrowLeft, Sparkles, Download, CheckCircle2, Globe, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';

interface CatchAllClientProps {
  slug: string;
  initialData?: any;
  ads?: Record<string, { name: string; code: string }>;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export default function CatchAllClient({ slug, initialData, ads = {} }: CatchAllClientProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const isInstagramUrlDirect = 
    pathname.startsWith('/p/') || 
    pathname.startsWith('/reel/') || 
    pathname.startsWith('/reels/') || 
    pathname.startsWith('/stories/') || 
    pathname.startsWith('/tv/');

  useEffect(() => {
    if (!isInstagramUrlDirect) return;

    const search = searchParams.toString() ? `?${searchParams.toString()}` : '';
    const igUrl = `https://www.instagram.com${pathname}${search}`;

    async function fetchInstagram() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BACKEND_URL}/api/instagram/resolve/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: igUrl }),
        });
        const data = await res.json();
        if (!res.ok || data.error) {
          throw new Error(data.error || 'Failed to resolve Instagram media');
        }
        setResult(data);
      } catch (err: any) {
        setError(err.message || 'Error resolving media from Instagram');
      } finally {
        setLoading(false);
      }
    }

    fetchInstagram();
  }, [pathname, searchParams, isInstagramUrlDirect]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Top Header Ad (Controlled from Django Admin) */}
        <AdSlot slot="top_banner" adCode={ads.top_banner?.code} />

        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* pSEO Landing Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>{isInstagramUrlDirect ? "Direct 1000 Shortcut" : "Programmatic SEO Engine"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {initialData?.h1 || `Download ${slug.replace(/[-_]/g, ' ')}`}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            {initialData?.contentBody || "Download high-definition videos, reels, photos, and stories in 1080p MP4 without watermarks or login."}
          </p>

          {/* Quick Features */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Anonymous & Secure</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Globe className="w-4 h-4 text-pink-400 shrink-0" />
              <span>Full 1080p MP4 Stream</span>
            </div>
          </div>

          {/* In-Content pSEO Ad Slot */}
          <AdSlot slot="pseo_content" adCode={ads.pseo_content?.code} />

          {loading && (
            <div className="mt-8 text-center py-8">
              <div className="w-10 h-10 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-300">Extracting stream from Instagram...</p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Media ready for download</span>
              </div>

              {result.formats?.map((fmt: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div>
                    <span className="font-bold text-sm text-white block">{fmt.quality}</span>
                    <span className="text-xs text-slate-400">{fmt.resolution}</span>
                  </div>
                  <a
                    href={`${BACKEND_URL}${fmt.downloadUrl}`}
                    className="px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shadow-pink-600/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Below Downloader Ad Slot */}
          <AdSlot slot="below_downloader" adCode={ads.below_downloader?.code} />
        </div>
      </div>
    </main>
  );
}

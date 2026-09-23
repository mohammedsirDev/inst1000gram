import React, { useEffect } from 'react';
import { PseoPage } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { DownloaderBox } from './DownloaderBox';
import { ResultCard } from './ResultCard';
import { ArrowLeft, CheckCircle2, Globe, Shield, Sparkles, Smartphone, HelpCircle } from 'lucide-react';
import { InstagramMediaResult } from '../types';

interface PseoPageViewProps {
  page: PseoPage;
  onBack: () => void;
  onOpenAdmin: () => void;
}

export const PseoPageView: React.FC<PseoPageViewProps> = ({ page, onBack, onOpenAdmin }) => {
  const { currentLang, setLanguage } = useLanguage();
  const [downloadResult, setDownloadResult] = React.useState<InstagramMediaResult | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Switch language if the pSEO page has a specific language code and inject page-specific JSON-LD
  useEffect(() => {
    if (page.lang && page.lang !== currentLang) {
      setLanguage(page.lang);
    }
    // Update document title and meta description for SEO fidelity
    document.title = page.title;
    
    // Inject dynamic page-specific Schema.org JSON-LD
    const scriptId = 'pseo-dynamic-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const pageSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `https://www.insta1000gram.com/${page.slug}/#webpage`,
          "url": `https://www.insta1000gram.com/${page.slug}`,
          "name": page.title,
          "description": page.metaDescription,
          "inLanguage": page.lang
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.insta1000gram.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": page.mediaType.toUpperCase(),
              "item": `https://www.insta1000gram.com/#${page.mediaType}`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": page.h1,
              "item": `https://www.insta1000gram.com/${page.slug}`
            }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": page.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        }
      ]
    };

    scriptTag.textContent = JSON.stringify(pageSchema);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-slate-700 hover:text-pink-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>Back to insta1000gram Home</span>
            </button>
            <span>/</span>
            <span className="text-slate-400">pSEO</span>
            <span>/</span>
            <span className="text-pink-600 font-mono truncate max-w-xs">{page.slug}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] px-2.5 py-1 rounded-full font-bold uppercase bg-slate-100 text-slate-700">
              Page Group #{page.chunkId}
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-full font-bold uppercase bg-pink-100 text-pink-700">
              {page.lang}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header for this programmatic landing page */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 mb-4 border border-pink-200/60">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>{page.targetKeyword}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {page.h1}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {page.intro}
        </p>

        {/* Downloader Input Box pre-configured */}
        <div className="mt-8">
          <DownloaderBox
            activeTab={page.mediaType === 'all' ? 'reels' : page.mediaType}
            onSelectTab={() => {}}
            onResult={(res) => setDownloadResult(res)}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>

        {downloadResult && (
          <ResultCard
            result={downloadResult}
            onClear={() => setDownloadResult(null)}
          />
        )}
      </div>

      {/* Detailed Content & Features for this pSEO cluster */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        {/* Core Value Pillars */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
            Key Advantages of insta1000gram
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {page.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Guide */}
        {page.device && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Target Guide for {page.device} in {page.country || 'Global'}
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              When downloading on your {page.device}, our system automatically formats the file for seamless playback in your native media player without needing third-party converter applications.
            </p>
          </div>
        )}

        {/* Tailored FAQs for this search intent */}
        {page.faqs && page.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-pink-600" />
              <h2 className="text-xl font-bold text-slate-900">
                Frequently Asked Questions about {page.targetKeyword}
              </h2>
            </div>
            <div className="space-y-4">
              {page.faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    {faq.q}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

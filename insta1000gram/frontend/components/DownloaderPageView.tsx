import React, { useState, useEffect } from 'react';
import { DownloaderPageMeta, DownloaderSlug, InstagramMediaResult, MediaType, SupportedLanguage } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { DownloaderBox } from './DownloaderBox';
import { ResultCard } from './ResultCard';
import { DOWNLOADER_PAGES, GUIDE_PAGES } from '../config/downloaders';
import { Film, Video, Image, History, Sparkles, CheckCircle2, ArrowRight, HelpCircle, Smartphone, Monitor, ShieldCheck, ChevronRight, Share2 } from 'lucide-react';

interface DownloaderPageViewProps {
  meta: DownloaderPageMeta;
  locale: SupportedLanguage;
  onNavigateTool: (slug: DownloaderSlug) => void;
  onNavigateGuide?: (guideSlug: string) => void;
  onNavigateHome: () => void;
}

export const DownloaderPageView: React.FC<DownloaderPageViewProps> = ({
  meta,
  locale,
  onNavigateTool,
  onNavigateGuide,
  onNavigateHome,
}) => {
  const { translations } = useLanguage();
  const [downloadResult, setDownloadResult] = useState<InstagramMediaResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Update dynamic document head (title, meta description, canonical, hreflangs, JSON-LD)
  useEffect(() => {
    document.title = meta.title;

    // Update meta description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const currentCanonicalUrl = `https://www.insta1000gram.com/${locale}/${meta.slug}`;
    canonical.setAttribute('href', currentCanonicalUrl);

    // Dynamic JSON-LD injection
    const scriptId = 'downloader-page-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': `${currentCanonicalUrl}#software`,
          name: meta.h1,
          url: currentCanonicalUrl,
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'All',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            bestRating: '5',
            worstRating: '1',
            ratingCount: '94210',
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `https://www.insta1000gram.com/${locale}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: meta.h1,
              item: currentCanonicalUrl,
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: meta.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        },
        {
          '@type': 'HowTo',
          name: `How to Use ${meta.h1}`,
          step: meta.howToSteps.map((step) => ({
            '@type': 'HowToStep',
            position: step.step,
            name: step.title,
            text: step.desc,
          })),
        },
      ],
    };

    scriptTag.textContent = JSON.stringify(jsonLd);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [meta, locale]);

  const otherTools = DOWNLOADER_PAGES.filter((p) => p.slug !== meta.slug);

  const getIcon = (type: MediaType) => {
    switch (type) {
      case 'reels':
        return <Film className="w-5 h-5 text-pink-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-500" />;
      case 'photo':
        return <Image className="w-5 h-5 text-amber-500" />;
      case 'stories':
        return <History className="w-5 h-5 text-indigo-500" />;
      case 'highlights':
        return <Sparkles className="w-5 h-5 text-rose-500" />;
      default:
        return <Film className="w-5 h-5 text-pink-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs sm:text-sm font-medium text-slate-500">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <button
                onClick={onNavigateHome}
                className="hover:text-pink-600 transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
            </li>
            <li>
              <span className="text-slate-400 uppercase font-semibold text-xs">{locale}</span>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
            </li>
            <li aria-current="page" className="text-pink-600 font-bold">
              {meta.h1}
            </li>
          </ol>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>High Speed Server 1080p Stream</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-radial from-pink-500/5 via-slate-50 to-slate-50">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border border-slate-200 shadow-2xs mb-5 text-slate-800">
            {getIcon(meta.type)}
            <span>1080p Ultra HD • No Watermark</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {meta.h1}
          </h1>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {meta.intro}
          </p>

          {/* Downloader Box Pre-selected with this tool's media type */}
          <div className="mt-8 sm:mt-10">
            <DownloaderBox
              activeTab={meta.type}
              onSelectTab={() => {}}
              onResult={(res) => setDownloadResult(res)}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          {/* Download Result Card */}
          {downloadResult && (
            <div className="mt-8">
              <ResultCard
                result={downloadResult}
                onClear={() => setDownloadResult(null)}
              />
            </div>
          )}
        </div>
      </section>

      {/* 3-Step How-To Section Tailored to This Media Type */}
      <section className="py-14 sm:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
              Tutorial
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              How to Use {meta.h1}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Download any Instagram media to your phone, tablet, or computer in 3 quick steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {meta.howToSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-pink-300 transition-all hover:shadow-md relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white font-black text-lg flex items-center justify-center mb-4 shadow-sm">
                  {step.step}
                </div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Tip for the 1000 URL trick */}
          <div className="mt-10 p-5 sm:p-6 bg-linear-to-r from-purple-50 via-pink-50 to-amber-50 rounded-2xl border border-pink-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  ⚡ The "1000" URL Shortcut
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Change <span className="font-mono font-semibold text-slate-900">instagram.com</span> to <span className="font-mono font-semibold text-pink-600">insta1000gram.com</span> in any URL to download directly!
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-white text-pink-600 rounded-lg border border-pink-200 shadow-2xs whitespace-nowrap">
              No App Required
            </span>
          </div>
        </div>
      </section>

      {/* Key Features for This Specific Tool */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Features of {meta.h1}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Why insta1000gram is the fastest and most reliable Instagram downloader online.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {meta.features.map((feature, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    {feature}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Optimized for rapid download speed and flawless playback across all devices.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Device Guides (iPhone, Android, PC) */}
      <section className="py-14 bg-white border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Supported Devices & Operating Systems
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Universal compatibility without installing apps from the App Store or Google Play.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">iPhone &amp; iPad (iOS)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Open Safari, paste the link into insta1000gram, click Download, and tap "Save Video" to save directly to your Photos camera roll.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Android Phones &amp; Tablets</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Works seamlessly in Google Chrome, Samsung Internet, and Firefox. Files are automatically saved to your Gallery and Downloads folder.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">PC, Mac &amp; Linux</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Download original high-definition MP4 and JPG files in seconds on Windows, macOS, and Chromebooks using any web browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tailored FAQs Section */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Common questions about saving {meta.h1.toLowerCase()}.
            </p>
          </div>

          <div className="space-y-4">
            {meta.faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left rtl:text-right p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-pink-600 transition-colors"
                  >
                    <span className="text-sm sm:text-base flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-pink-500 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <span className="text-slate-400 font-mono text-lg shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Internal Linking: Explore Related Downloaders in this Language */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Other Instagram Downloaders ({locale.toUpperCase()})
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Explore our full suite of fast, watermark-free Instagram media downloaders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherTools.map((tool) => (
              <button
                key={tool.slug}
                onClick={() => onNavigateTool(tool.slug)}
                className="p-5 rounded-2xl bg-slate-50 hover:bg-pink-50/50 border border-slate-200 hover:border-pink-300 text-left rtl:text-right transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    {getIcon(tool.type)}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-pink-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                    {tool.tagline}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-pink-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </div>
              </button>
            ))}
          </div>

          {/* Long-tail Educational Guides Links */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">
              Helpful Step-by-Step Guides
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {GUIDE_PAGES.map((guide) => (
                <button
                  key={guide.slug}
                  onClick={() => onNavigateGuide && onNavigateGuide(guide.slug)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  📖 {guide.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

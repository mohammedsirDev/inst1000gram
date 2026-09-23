import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Header } from './components/Header';
import { DownloaderBox } from './components/DownloaderBox';
import { ResultCard } from './components/ResultCard';
import { Features } from './components/Features';
import { HowToGuide } from './components/HowToGuide';
import { FaqSection } from './components/FaqSection';
import { PseoDirectory } from './components/PseoDirectory';
import { PseoPageView } from './components/PseoPageView';
import { DownloaderPageView } from './components/DownloaderPageView';
import { GuidePageView } from './components/GuidePageView';
import { Footer } from './components/Footer';
import { AdminModal } from './components/admin/AdminModal';
import { MediaType, InstagramMediaResult, PseoPage, SupportedLanguage, DownloaderSlug } from './types';
import { parseCurrentRoute, navigateTo, RouteType } from './utils/router';
import { getDownloaderDataForLocale } from './translations/downloadersData';
import { GUIDE_PAGES, DOWNLOADER_PAGES } from './config/downloaders';
import { ALL_SUPPORTED_LANGUAGES } from './config/languages';
import { Sparkles, Zap, Shield, HelpCircle, ArrowRight } from 'lucide-react';

function MainApp() {
  const { translations, currentLang, setLanguage } = useLanguage();
  const [currentRoute, setCurrentRoute] = useState<RouteType>(() =>
    parseCurrentRoute(window.location.pathname, window.location.search)
  );

  const [activeTab, setActiveTab] = useState<MediaType>('reels');
  const [downloadResult, setDownloadResult] = useState<InstagramMediaResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);
  const [legacyPseoPage, setLegacyPseoPage] = useState<PseoPage | null>(null);

  // Listen for browser forward/back history events
  useEffect(() => {
    const handleLocationChange = () => {
      const parsed = parseCurrentRoute(window.location.pathname, window.location.search);
      setCurrentRoute(parsed);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Sync route properties with language, robots meta, and tabs
  useEffect(() => {
    // 1. Robots tag management
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }

    if (currentRoute.type === 'smart-media') {
      // User requested smart URL: DO NOT INDEX
      robotsMeta.setAttribute('content', 'noindex, nofollow');
      setActiveTab(currentRoute.mediaType);
    } else {
      robotsMeta.setAttribute('content', 'index, follow');
    }

    // 2. Locale sync
    if (currentRoute.type === 'downloader' || currentRoute.type === 'guide') {
      if (currentRoute.locale && currentRoute.locale !== currentLang) {
        setLanguage(currentRoute.locale);
      }
    } else if (currentRoute.type === 'home' && currentRoute.locale) {
      if (currentRoute.locale !== currentLang) {
        setLanguage(currentRoute.locale);
      }
    }
  }, [currentRoute, currentLang, setLanguage]);

  // Canonical tag & Hreflangs for Homepages & Localized SEO
  useEffect(() => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    // Clean up existing dynamic hreflang alternate tags
    const existingAlts = document.querySelectorAll('link[data-dynamic-hreflang="true"]');
    existingAlts.forEach((el) => el.remove());

    if (currentRoute.type === 'home') {
      const targetLocale = currentRoute.locale || currentLang;
      canonical.setAttribute('href', `https://www.insta1000gram.com/${targetLocale}/`);

      // Add hreflang for all 29 languages + x-default
      ALL_SUPPORTED_LANGUAGES.forEach((l) => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', l);
        link.setAttribute('href', `https://www.insta1000gram.com/${l}/`);
        link.setAttribute('data-dynamic-hreflang', 'true');
        document.head.appendChild(link);
      });

      const xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      xDefault.setAttribute('href', 'https://www.insta1000gram.com/en/');
      xDefault.setAttribute('data-dynamic-hreflang', 'true');
      document.head.appendChild(xDefault);
    } else if (currentRoute.type === 'downloader') {
      canonical.setAttribute(
        'href',
        `https://www.insta1000gram.com/${currentRoute.locale}/${currentRoute.slug}`
      );

      ALL_SUPPORTED_LANGUAGES.forEach((l) => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', l);
        link.setAttribute('href', `https://www.insta1000gram.com/${l}/${currentRoute.slug}`);
        link.setAttribute('data-dynamic-hreflang', 'true');
        document.head.appendChild(link);
      });

      const xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      xDefault.setAttribute('href', `https://www.insta1000gram.com/en/${currentRoute.slug}`);
      xDefault.setAttribute('data-dynamic-hreflang', 'true');
      document.head.appendChild(xDefault);
    }
  }, [currentRoute, currentLang]);

  // Admin shortcut (Ctrl+Shift+A or ?admin=1)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    if (typeof window !== 'undefined' && window.location.search.includes('admin=1')) {
      setAdminOpen(true);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle header language changes smoothly
  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    if (currentRoute.type === 'downloader') {
      navigateTo(`/${newLang}/${currentRoute.slug}`);
    } else if (currentRoute.type === 'guide') {
      navigateTo(`/${newLang}/guide/${currentRoute.guideSlug}`);
    } else if (currentRoute.type === 'home') {
      navigateTo(`/${newLang}/`);
    }
  };

  // 1. Render Localized Downloader Page (e.g. /en/reels-downloader, /ar/highlights-downloader)
  if (currentRoute.type === 'downloader') {
    const meta = getDownloaderDataForLocale(currentRoute.locale, currentRoute.slug);
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Header
          activeTab={meta.type}
          onSelectTab={(tab) => {
            const match = DOWNLOADER_PAGES.find((p) => p.type === tab);
            if (match) {
              navigateTo(`/${currentRoute.locale}/${match.slug}`);
            }
          }}
          onOpenAdmin={() => setAdminOpen(true)}
          onNavigateHome={() => navigateTo(`/${currentRoute.locale}/`)}
          onLanguageChange={handleLanguageChange}
        />

        <main className="flex-1">
          <DownloaderPageView
            meta={meta}
            locale={currentRoute.locale}
            onNavigateTool={(slug) => navigateTo(`/${currentRoute.locale}/${slug}`)}
            onNavigateGuide={(gSlug) => navigateTo(`/${currentRoute.locale}/guide/${gSlug}`)}
            onNavigateHome={() => navigateTo(`/${currentRoute.locale}/`)}
          />
        </main>

        <Footer
          onOpenAdmin={() => setAdminOpen(true)}
          onNavigateHome={() => navigateTo(`/${currentRoute.locale}/`)}
          onNavigateTool={(slug) => navigateTo(`/${currentRoute.locale}/${slug}`)}
          onNavigateGuide={(gSlug) => navigateTo(`/${currentRoute.locale}/guide/${gSlug}`)}
        />

        <AdminModal
          isOpen={adminOpen}
          onClose={() => setAdminOpen(false)}
          onPreviewPseoPage={(page) => setLegacyPseoPage(page)}
        />
      </div>
    );
  }

  // 2. Render Educational Guide Page (e.g. /en/guide/how-to-download-instagram-reels-on-iphone)
  if (currentRoute.type === 'guide') {
    const guide =
      GUIDE_PAGES.find((g) => g.slug === currentRoute.guideSlug) || GUIDE_PAGES[0];
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Header
          activeTab={guide.category}
          onSelectTab={(tab) => {
            const match = DOWNLOADER_PAGES.find((p) => p.type === tab);
            if (match) {
              navigateTo(`/${currentRoute.locale}/${match.slug}`);
            }
          }}
          onOpenAdmin={() => setAdminOpen(true)}
          onNavigateHome={() => navigateTo(`/${currentRoute.locale}/`)}
          onLanguageChange={handleLanguageChange}
        />

        <main className="flex-1">
          <GuidePageView
            guide={guide}
            locale={currentRoute.locale}
            onNavigateHome={() => navigateTo(`/${currentRoute.locale}/`)}
            onNavigateTool={(slug) => navigateTo(`/${currentRoute.locale}/${slug}`)}
            onBack={() => navigateTo(`/${currentRoute.locale}/`)}
          />
        </main>

        <Footer
          onOpenAdmin={() => setAdminOpen(true)}
          onNavigateHome={() => navigateTo(`/${currentRoute.locale}/`)}
          onNavigateTool={(slug) => navigateTo(`/${currentRoute.locale}/${slug}`)}
          onNavigateGuide={(gSlug) => navigateTo(`/${currentRoute.locale}/guide/${gSlug}`)}
        />

        <AdminModal
          isOpen={adminOpen}
          onClose={() => setAdminOpen(false)}
          onPreviewPseoPage={(page) => setLegacyPseoPage(page)}
        />
      </div>
    );
  }

  // 3. Render Legacy pSEO Landing Page if explicitly active
  if (legacyPseoPage) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Header
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setLegacyPseoPage(null);
          }}
          onOpenAdmin={() => setAdminOpen(true)}
          onNavigateHome={() => {
            setLegacyPseoPage(null);
            navigateTo(`/${currentLang}/`);
          }}
          onLanguageChange={handleLanguageChange}
        />

        <main className="flex-1">
          <PseoPageView
            page={legacyPseoPage}
            onBack={() => {
              setLegacyPseoPage(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAdmin={() => setAdminOpen(true)}
          />
        </main>

        <Footer
          onOpenAdmin={() => setAdminOpen(true)}
          onNavigateHome={() => {
            setLegacyPseoPage(null);
            navigateTo(`/${currentLang}/`);
          }}
        />

        <AdminModal
          isOpen={adminOpen}
          onClose={() => setAdminOpen(false)}
          onPreviewPseoPage={(page) => setLegacyPseoPage(page)}
        />
      </div>
    );
  }

  // 4. Default View: Handles Root Homepage, Localized Homepage, and Smart Media Route
  const isSmartRoute = currentRoute.type === 'smart-media';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white text-[11px] sm:text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
        </span>
        <span>
          insta1000gram Engine 3.2 • Multi-stream 1080p resolution active • Free &amp; Anonymous
        </span>
      </div>

      {/* Smart Instagram Replacement Mode Alert */}
      {isSmartRoute && (
        <div className="bg-slate-900 border-b border-pink-500/30 text-white px-4 py-3 sm:py-3.5">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400">
                <Zap className="w-4 h-4 animate-bounce" />
              </span>
              <span>
                <strong>Smart URL Shortcut Activated:</strong> Converted{' '}
                <span className="text-slate-400 line-through">instagram.com</span> to{' '}
                <span className="text-pink-400 font-bold">insta1000gram.com</span>. Resolving{' '}
                <span className="font-mono text-pink-300 font-bold">
                  {currentRoute.mediaType.toUpperCase()} ({currentRoute.mediaId})
                </span>
                ...
              </span>
            </div>
            <button
              onClick={() => navigateTo(`/${currentLang}/`)}
              className="text-xs text-slate-400 hover:text-white underline shrink-0"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setDownloadResult(null);
          const match = DOWNLOADER_PAGES.find((p) => p.type === tab);
          if (match) {
            navigateTo(`/${currentLang}/${match.slug}`);
          }
        }}
        onOpenAdmin={() => setAdminOpen(true)}
        onNavigateHome={() => {
          setLegacyPseoPage(null);
          setDownloadResult(null);
          navigateTo(`/${currentLang}/`);
        }}
        onLanguageChange={handleLanguageChange}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-radial from-pink-500/5 via-slate-50 to-slate-50">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border border-slate-200 shadow-2xs mb-6 text-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{translations.heroHighlight}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {translations.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              {translations.heroSubtitle}
            </p>

            {/* Downloader Input Box */}
            <div className="mt-8 sm:mt-10">
              <DownloaderBox
                activeTab={activeTab}
                onSelectTab={(tab) => setActiveTab(tab)}
                onResult={(res) => setDownloadResult(res)}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                initialUrl={isSmartRoute ? currentRoute.instagramUrl : undefined}
                autoTrigger={isSmartRoute}
              />
            </div>

            {/* Download Media Result Card */}
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

        {/* Feature Pillars */}
        <Features />

        {/* 3 Step Tutorial */}
        <HowToGuide />

        {/* Programmatic SEO Directory (145 Localized Pages Matrix) */}
        <PseoDirectory onSelectPseoPage={(page) => setLegacyPseoPage(page)} />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setAdminOpen(true)}
        onNavigateHome={() => {
          setLegacyPseoPage(null);
          setDownloadResult(null);
          navigateTo(`/${currentLang}/`);
        }}
        onNavigateTool={(slug) => navigateTo(`/${currentLang}/${slug}`)}
        onNavigateGuide={(gSlug) => navigateTo(`/${currentLang}/guide/${gSlug}`)}
      />

      {/* Admin Panel Modal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onPreviewPseoPage={(page) => {
          setLegacyPseoPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

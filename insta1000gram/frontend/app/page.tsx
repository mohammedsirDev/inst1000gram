'use client';

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { Header } from '../components/Header';
import { DownloaderBox } from '../components/DownloaderBox';
import { ResultCard } from '../components/ResultCard';
import { Features } from '../components/Features';
import { HowToGuide } from '../components/HowToGuide';
import { FaqSection } from '../components/FaqSection';
import { PseoDirectory } from '../components/PseoDirectory';
import { Footer } from '../components/Footer';
import { AdminModal } from '../components/admin/AdminModal';
import { MediaType, InstagramMediaResult, SupportedLanguage } from '../types';
import { DOWNLOADER_PAGES } from '../config/downloaders';
import { Zap } from 'lucide-react';

function MainApp() {
  const { translations, currentLang, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<MediaType>('reels');
  const [downloadResult, setDownloadResult] = useState<InstagramMediaResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

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

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-pink-500 selection:text-white">
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white text-[11px] sm:text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
        </span>
        <span>
          insta1000gram Engine 3.2 • Multi-stream 1080p resolution active • Free &amp; Anonymous
        </span>
      </div>

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setDownloadResult(null);
        }}
        onOpenAdmin={() => setAdminOpen(true)}
        onNavigateHome={() => {
          setDownloadResult(null);
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
        <PseoDirectory onSelectPseoPage={() => {}} />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setAdminOpen(true)}
        onNavigateHome={() => setDownloadResult(null)}
        onNavigateTool={(slug) => {}}
        onNavigateGuide={(gSlug) => {}}
      />

      {/* Admin Panel Modal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onPreviewPseoPage={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

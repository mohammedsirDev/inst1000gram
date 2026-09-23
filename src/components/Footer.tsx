import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage, DownloaderSlug } from '../types';
import { DOWNLOADER_PAGES, GUIDE_PAGES } from '../config/downloaders';

interface FooterProps {
  onOpenAdmin: () => void;
  onNavigateHome: () => void;
  onNavigateTool?: (slug: DownloaderSlug) => void;
  onNavigateGuide?: (guideSlug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onNavigateHome,
  onNavigateTool,
  onNavigateGuide,
}) => {
  const { translations, availableLanguages, currentLang, setLanguage } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                1k
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                insta<span className="text-pink-500">1000</span>gram
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {translations.brandTagline}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span>Ultra HD 1080p Stream Online</span>
            </div>
          </div>

          {/* Col 2: Downloaders */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">
              Downloaders
            </h4>
            <ul className="space-y-2">
              {DOWNLOADER_PAGES.map((tool) => (
                <li key={tool.slug}>
                  <button
                    onClick={() => onNavigateTool && onNavigateTool(tool.slug)}
                    className="hover:text-pink-400 transition-colors text-xs text-left rtl:text-right"
                  >
                    {tool.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Guides */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">
              Guides &amp; Tutorials
            </h4>
            <ul className="space-y-2">
              {GUIDE_PAGES.slice(0, 5).map((guide) => (
                <li key={guide.slug}>
                  <button
                    onClick={() => onNavigateGuide && onNavigateGuide(guide.slug)}
                    className="hover:text-pink-400 transition-colors text-xs text-left rtl:text-right line-clamp-1"
                  >
                    {guide.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: 1000 Trick */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">
              ⚡ 1000 Quick Trick
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Add <span className="font-bold text-pink-400 font-mono">1000</span> between "insta" and "gram" in any Instagram link to start instant download without copy-pasting.
            </p>
            <div className="mt-3 p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60 font-mono text-[11px] text-slate-300 break-all">
              https://www.insta<span className="text-pink-400 font-bold">1000</span>gram.com/reels/...
            </div>
          </div>
        </div>

        {/* 29 Languages Pill Matrix */}
        <div className="py-8 border-b border-slate-800">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Supported Languages (29)</span>
            <span className="text-[10px] text-pink-400 font-mono">145 Localized SEO Pages</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {availableLanguages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code as SupportedLanguage)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                  currentLang === l.code
                    ? 'bg-pink-600 text-white font-bold'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.nativeName}</span>
                {l.dir === 'rtl' && <span className="text-[9px] text-amber-400 font-mono">RTL</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Middle Status Notice */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span className="text-slate-400 font-medium">{translations.sslSecureNotice}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">{translations.fastSpeedNotice}</span>
            <a
              href="/download-source"
              className="text-pink-400 hover:text-pink-300 font-medium transition-colors"
              title="Download project files (.zip)"
            >
              📥 Download Source ZIP
            </a>
            <button
              onClick={onOpenAdmin}
              className="text-slate-500 hover:text-slate-400 underline transition-colors"
            >
              Control Panel
            </button>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-slate-800 text-center sm:text-left rtl:sm:text-right flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>{translations.footerRights}</p>
          <p className="text-slate-500 max-w-xl text-center sm:text-right rtl:sm:text-left">
            {translations.footerDisclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PseoPage, SupportedLanguage, DownloaderSlug } from '../types';
import { DOWNLOADER_PAGES } from '../config/downloaders';
import { ALL_SUPPORTED_LANGUAGES, LANGUAGES } from '../config/languages';
import { navigateTo } from '../utils/router';
import { Globe, ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface PseoDirectoryProps {
  onSelectPseoPage?: (page: PseoPage) => void;
}

export const PseoDirectory: React.FC<PseoDirectoryProps> = () => {
  const { translations, currentLang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'localized' | 'sitemaps'>('localized');
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(currentLang);

  const currentLangConfig = LANGUAGES[selectedLang] || LANGUAGES.en;

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-black tracking-widest text-pink-600 uppercase bg-pink-100/70 px-3 py-1 rounded-full">
              pSEO Directory • 29 Languages
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
              {translations.pseoSectionTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              {translations.pseoSectionSubtitle}
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setActiveTab('localized')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'localized'
                  ? 'bg-white text-pink-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              145 Localized Tools
            </button>
            <button
              onClick={() => setActiveTab('sitemaps')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'sitemaps'
                  ? 'bg-white text-pink-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              XML Sitemaps
            </button>
          </div>
        </div>

        {activeTab === 'localized' && (
          <div>
            {/* Language Selection Filter (29 Languages) */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Select Language to Preview Localized SEO Pages:
              </label>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                {ALL_SUPPORTED_LANGUAGES.map((langCode) => {
                  const lang = LANGUAGES[langCode];
                  const isSelected = selectedLang === langCode;
                  return (
                    <button
                      key={langCode}
                      onClick={() => setSelectedLang(langCode)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-pink-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                      <span className="text-[10px] opacity-75 uppercase">({langCode})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5 Core Downloader Cards for the Selected Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {DOWNLOADER_PAGES.map((tool) => {
                const urlPath = `/${selectedLang}/${tool.slug}`;
                return (
                  <div
                    key={tool.slug}
                    onClick={() => navigateTo(urlPath)}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-pink-300 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-pink-100 text-pink-700">
                          {currentLangConfig.code.toUpperCase()}
                        </span>
                        <span className="text-xs">{currentLangConfig.flag}</span>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-pink-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {tool.tagline}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-pink-600">
                      <span className="font-mono text-[11px] text-slate-500 truncate max-w-[120px]">
                        {urlPath}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary statistics bar */}
            <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>
                  <strong>29 languages × 5 downloaders = 145 canonical SEO URLs</strong> with clean JSON-LD and hreflang alternates.
                </span>
              </div>
              <button
                onClick={() => navigateTo(`/${selectedLang}/`)}
                className="text-pink-600 hover:text-pink-700 font-bold underline"
              >
                Open {currentLangConfig.name} Homepage →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'sitemaps' && (
          <div className="space-y-4">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-base text-slate-900 mb-2">
                Google &amp; Bing Search Engine Sitemaps
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                Our dynamic sitemap index lists all 145 localized core URLs, partitioned programmatic pages, and educational guides with fast Googlebot change frequencies.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-pink-300 font-mono text-xs text-slate-800 flex items-center justify-between"
                >
                  <span>/sitemap.xml</span>
                  <span className="text-[10px] font-bold text-pink-600">Primary Index</span>
                </a>
                <a
                  href="/sitemap-downloaders.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-pink-300 font-mono text-xs text-slate-800 flex items-center justify-between"
                >
                  <span>/sitemap-downloaders.xml</span>
                  <span className="text-[10px] font-bold text-emerald-600">145 Tools</span>
                </a>
                <a
                  href="/sitemap_1.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-pink-300 font-mono text-xs text-slate-800 flex items-center justify-between"
                >
                  <span>/sitemap_1.xml</span>
                  <span className="text-[10px] font-bold text-slate-500">Partition #1</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

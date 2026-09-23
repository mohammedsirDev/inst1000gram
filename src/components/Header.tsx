import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage, MediaType } from '../types';
import { Film, Video, Image, History, Sparkles, Globe, Search } from 'lucide-react';

interface HeaderProps {
  activeTab: MediaType;
  onSelectTab: (tab: MediaType) => void;
  onOpenAdmin: () => void;
  onNavigateHome: () => void;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenAdmin,
  onNavigateHome,
  onLanguageChange,
}) => {
  const { currentLang, setLanguage, availableLanguages, translations, config } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');

  const navItems: { type: MediaType; label: string; icon: React.ReactNode }[] = [
    { type: 'reels', label: translations.navReels, icon: <Film className="w-4 h-4" /> },
    { type: 'video', label: translations.navVideo, icon: <Video className="w-4 h-4" /> },
    { type: 'photo', label: translations.navPhoto, icon: <Image className="w-4 h-4" /> },
    { type: 'stories', label: translations.navStories, icon: <History className="w-4 h-4" /> },
    { type: 'highlights', label: translations.navHighlights, icon: <Sparkles className="w-4 h-4" /> },
  ];

  const filteredLanguages = useMemo(() => {
    if (!langSearch.trim()) return availableLanguages;
    const query = langSearch.toLowerCase();
    return availableLanguages.filter(
      (l) =>
        l.name.toLowerCase().includes(query) ||
        l.nativeName.toLowerCase().includes(query) ||
        l.code.toLowerCase().includes(query)
    );
  }, [availableLanguages, langSearch]);

  const handleSelectLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    if (onLanguageChange) {
      onLanguageChange(code);
    }
    setLangMenuOpen(false);
    setLangSearch('');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 text-left rtl:text-right focus:outline-none group"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-lg tracking-tight">1k</span>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-pink-600 transition-colors">
                  insta<span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">1000</span>gram
                </span>
                <p className="text-[10px] sm:text-xs text-slate-600 font-medium hidden sm:block">
                  {translations.brandTagline}
                </p>
              </div>
            </button>
          </div>

          {/* Center Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200">
            {navItems.map((item) => {
              const isActive = activeTab === item.type;
              return (
                <button
                  key={item.type}
                  onClick={() => onSelectTab(item.type)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-pink-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher (29 Languages) */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all"
                aria-label="Select Language"
              >
                <Globe className="w-4 h-4 text-slate-500" />
                <span className="text-base">{config.flag}</span>
                <span className="hidden sm:inline font-bold uppercase">{config.code}</span>
              </button>

              {langMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                      setLangMenuOpen(false);
                      setLangSearch('');
                    }}
                  />
                  <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-2 border-b border-slate-100">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-2.5" />
                        <input
                          type="text"
                          value={langSearch}
                          onChange={(e) => setLangSearch(e.target.value)}
                          placeholder="Search 29 languages..."
                          className="w-full text-xs pl-8 pr-3 rtl:pr-8 rtl:pl-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-pink-500"
                        />
                      </div>
                    </div>

                    <div className="max-h-72 overflow-y-auto py-1 scrollbar-thin">
                      {filteredLanguages.map((lang) => {
                        const isSelected = currentLang === lang.code;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => handleSelectLanguage(lang.code as SupportedLanguage)}
                            className={`w-full text-left rtl:text-right px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${
                              isSelected
                                ? 'text-pink-600 font-bold bg-pink-50/60'
                                : 'text-slate-700'
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="text-base">{lang.flag}</span>
                              <span className={lang.code === 'ar' || lang.code === 'fa' ? 'font-amiri text-sm font-bold' : 'font-medium'}>
                                {lang.nativeName}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono uppercase">
                                ({lang.code})
                              </span>
                            </span>
                            {lang.dir === 'rtl' && (
                              <span className="text-[9px] px-1.5 py-0.5 bg-amber-50 text-amber-800 rounded font-mono font-bold border border-amber-200/60">
                                RTL
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Tabs */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-slate-100 scrollbar-none gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.type;
            return (
              <button
                key={item.type}
                onClick={() => onSelectTab(item.type)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-pink-600 text-white'
                    : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Copy, ArrowRight, Download, Smartphone, Monitor, Check } from 'lucide-react';

export const HowToGuide: React.FC = () => {
  const { translations } = useLanguage();

  const steps = [
    {
      num: '01',
      title: translations.step1Title,
      desc: translations.step1Desc,
      icon: <Copy className="w-5 h-5 text-pink-500" />,
    },
    {
      num: '02',
      title: translations.step2Title,
      desc: translations.step2Desc,
      icon: <ArrowRight className="w-5 h-5 text-purple-500" />,
    },
    {
      num: '03',
      title: translations.step3Title,
      desc: translations.step3Desc,
      icon: <Download className="w-5 h-5 text-emerald-500" />,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black tracking-widest text-purple-600 uppercase bg-purple-100/70 px-3 py-1 rounded-full">
            Quick Tutorial
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            {translations.howToTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            {translations.howToSubtitle}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 relative transition-transform hover:-translate-y-1 shadow-xs"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-black text-slate-300 font-mono">
                  {s.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                  {s.icon}
                </div>
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Pro Secret Trick: The "1000" URL Shortcut */}
        <div className="mt-8 p-5 sm:p-7 lg:p-8 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl text-white shadow-xl border border-purple-800/40 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 relative z-10">
            <div className="w-full lg:max-w-xl xl:max-w-2xl">
              <div className="inline-flex items-center flex-wrap gap-2 px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-3">
                <span>{translations.secretShortcutBadge}</span>
                <span>•</span>
                <span className="text-amber-300 font-black">{translations.secretShortcutSub}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {translations.secretShortcutTitle}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {translations.secretShortcutDesc}
              </p>
            </div>

            {/* Visual URL Transformation Box - Strictly LTR for URLs in all languages */}
            <div className="w-full lg:w-auto min-w-0 max-w-full bg-slate-950/90 p-4 sm:p-5 rounded-2xl border border-slate-800 font-mono text-xs shadow-inner shrink-0 overflow-hidden text-left" dir="ltr">
              <div className="text-[11px] text-slate-400 mb-1.5 flex items-center gap-1.5" dir="ltr">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span className="font-semibold">{translations.secretShortcutOriginal}</span>
              </div>
              <div className="text-slate-300 bg-black/50 px-3 py-2 rounded-lg break-all select-all text-[11px] sm:text-xs text-left font-mono" dir="ltr">
                <bdi>https://www.instagram.com/p/DFeFJZB...</bdi>
              </div>

              <div className="text-[11px] text-emerald-400 mt-3.5 mb-1.5 flex items-center gap-1.5" dir="ltr">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-bold">{translations.secretShortcutModified}</span>
              </div>
              <div className="text-white bg-black/70 px-3 py-2 rounded-lg border border-pink-500/40 break-all select-all flex items-center flex-row flex-nowrap overflow-x-auto text-[11px] sm:text-xs text-left font-mono" dir="ltr">
                <span className="shrink-0">https://www.insta</span>
                <span className="bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-black px-1.5 py-0.5 rounded mx-1 shadow-xs shrink-0 inline-block font-sans">
                  1000
                </span>
                <span className="shrink-0">gram.com/p/DFeFJZB...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Tips: Mobile vs Desktop - Responsive 2-column grid */}
        <div className="mt-8 sm:mt-10 p-5 sm:p-6 bg-gradient-to-r from-pink-50/60 via-purple-50/60 to-blue-50/60 rounded-2xl border border-pink-100/80 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-pink-500 shadow-2xs shrink-0 mt-0.5 sm:mt-0">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                {translations.mobileOptimizedTitle}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {translations.mobileOptimizedDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-purple-600 shadow-2xs shrink-0 mt-0.5 sm:mt-0">
              <Monitor className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                {translations.desktopOptimizedTitle}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {translations.desktopOptimizedDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

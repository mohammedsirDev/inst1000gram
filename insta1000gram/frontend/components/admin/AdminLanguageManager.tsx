import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SupportedLanguage } from '../../types';
import { TranslationDictionary, DEFAULT_TRANSLATIONS } from '../../translations';
import { Globe, Check, Edit2, Save, RotateCcw, Sparkles } from 'lucide-react';

export const AdminLanguageManager: React.FC = () => {
  const { currentLang, setLanguage, availableLanguages, translations, updateTranslationString, resetTranslations } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('ar');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Form editable state for the selected language
  const [editValues, setEditValues] = useState<Partial<TranslationDictionary>>({});

  const handleSelectLang = (lang: SupportedLanguage) => {
    setSelectedLang(lang);
    setEditValues({});
  };

  const handleStringChange = (key: keyof TranslationDictionary, val: string) => {
    setEditValues((prev) => ({
      ...prev,
      [key]: val,
    }));
    updateTranslationString(selectedLang, key, val);
  };

  const handleSaveAll = () => {
    setSavedNotice(`Translations updated for ${selectedLang.toUpperCase()}!`);
    setTimeout(() => setSavedNotice(null), 2500);
  };

  const currentDict = {
    ...DEFAULT_TRANSLATIONS[selectedLang],
    ...editValues,
  };

  type StringKey = { [K in keyof TranslationDictionary]: TranslationDictionary[K] extends string ? K : never }[keyof TranslationDictionary];

  const editableFields: { key: StringKey; label: string; isTextarea?: boolean }[] = [
    { key: 'brandTagline', label: 'Brand Tagline / Header Subtitle' },
    { key: 'heroTitle', label: 'Hero Main Title' },
    { key: 'heroHighlight', label: 'Hero Gradient Highlight' },
    { key: 'heroSubtitle', label: 'Hero Subtitle Description', isTextarea: true },
    { key: 'inputPlaceholder', label: 'Input URL Placeholder' },
    { key: 'downloadBtn', label: 'Download Button Text' },
    { key: 'featuresTitle', label: 'Features Section Heading' },
    { key: 'howToTitle', label: 'How-to Guide Heading' },
    { key: 'step1Title', label: 'Step 1 Title' },
    { key: 'step1Desc', label: 'Step 1 Description', isTextarea: true },
    { key: 'step2Title', label: 'Step 2 Title' },
    { key: 'step2Desc', label: 'Step 2 Description', isTextarea: true },
    { key: 'step3Title', label: 'Step 3 Title' },
    { key: 'step3Desc', label: 'Step 3 Description', isTextarea: true },
    { key: 'faqTitle', label: 'FAQ Section Heading' },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb banner */}
      <div className="bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-slate-800">Home</span>
          <span>›</span>
          <span className="text-slate-800">Localization</span>
          <span>›</span>
          <span className="text-pink-600 font-bold">Languages &amp; Amiri RTL Manager</span>
        </div>
        <span className="font-mono text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
          5 Supported Locales: EN, ES, FR, PT, AR
        </span>
      </div>

      {/* Languages Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {availableLanguages.map((l) => {
          const isSelected = selectedLang === l.code;
          return (
            <div
              key={l.code}
              onClick={() => handleSelectLang(l.code as SupportedLanguage)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-pink-600 bg-pink-50/20 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{l.flag}</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-slate-100 text-slate-700">
                    {l.code}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{l.name}</h4>
                <p className={`text-xs text-slate-500 font-medium ${l.code === 'ar' ? 'font-amiri text-base font-bold' : ''}`}>
                  {l.nativeName}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className={`px-1.5 py-0.5 rounded font-mono font-bold ${
                  l.dir === 'rtl' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {l.dir.toUpperCase()}
                </span>
                <span className="font-medium text-slate-500">
                  {l.code === 'ar' ? 'Amiri Font' : 'Sans-Serif'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Arabic RTL & Amiri Typography Callout */}
      {selectedLang === 'ar' && (
        <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-amiri font-bold text-xl shrink-0 shadow-sm">
            ض
          </div>
          <div>
            <h4 className="font-bold text-amber-950 text-sm">
              Arabic Typography &amp; RTL Engine Active
            </h4>
            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
              When Arabic (<code className="font-mono bg-amber-200/60 px-1 rounded">ar</code>) is enabled, the layout dynamically adapts to <strong className="font-mono">dir="rtl"</strong> with specialized Amiri Google Font typography for crisp, authentic Arabic rendering across all modern mobile and desktop screens.
            </p>
            <div className="mt-2.5 p-3 bg-white/80 rounded-xl border border-amber-200 font-amiri text-lg text-slate-900 leading-normal" dir="rtl">
              معاينة الخط الأصيل: «مرحباً بك في أسرع محرك لتحميل ريلز وفيديوهات انستقرام بجودة Full HD وبدون علامة مائية»
            </div>
          </div>
        </div>
      )}

      {/* Translation Dictionary Editor */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Globe className="w-4 h-4 text-pink-500" />
              <span>Translation Dictionary Editor: {selectedLang.toUpperCase()}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit the live copy for the selected language. Modifications take effect immediately.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setLanguage(selectedLang);
                handleSaveAll();
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply &amp; Set as Current Site Language</span>
            </button>
          </div>
        </div>

        {savedNotice && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{savedNotice}</span>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {editableFields.map((field) => (
            <div key={field.key} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
              <label className="sm:col-span-4 text-xs font-bold text-slate-700 pt-2">
                {field.label}
                <span className="block font-mono text-[10px] text-slate-400 font-normal">
                  key: {field.key}
                </span>
              </label>

              <div className="sm:col-span-8">
                {field.isTextarea ? (
                  <textarea
                    rows={2}
                    dir={selectedLang === 'ar' ? 'rtl' : 'ltr'}
                    value={(currentDict[field.key] as string) || ''}
                    onChange={(e) => handleStringChange(field.key, e.target.value)}
                    className={`w-full p-2.5 bg-slate-50 border border-slate-200 focus:border-pink-500 focus:bg-white rounded-xl text-xs sm:text-sm font-medium focus:outline-none ${
                      selectedLang === 'ar' ? 'font-amiri text-base' : ''
                    }`}
                  />
                ) : (
                  <input
                    type="text"
                    dir={selectedLang === 'ar' ? 'rtl' : 'ltr'}
                    value={(currentDict[field.key] as string) || ''}
                    onChange={(e) => handleStringChange(field.key, e.target.value)}
                    className={`w-full h-10 px-3 bg-slate-50 border border-slate-200 focus:border-pink-500 focus:bg-white rounded-xl text-xs sm:text-sm font-medium focus:outline-none ${
                      selectedLang === 'ar' ? 'font-amiri text-base' : ''
                    }`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { LanguageConfig, SupportedLanguage } from './types';
import { LANGUAGES, ALL_SUPPORTED_LANGUAGES } from './config/languages';
import { COMMON_TRANSLATIONS } from './translations/commonData';

export { LANGUAGES, ALL_SUPPORTED_LANGUAGES };

export interface FaqItem {
  q: string;
  a: string;
}

export interface TranslationDictionary {
  brandName: string;
  brandTagline: string;
  navReels: string;
  navVideo: string;
  navPhoto: string;
  navStories: string;
  navHighlights: string;
  navIgtv: string;
  navAdmin: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  inputPlaceholder: string;
  pasteBtn: string;
  downloadBtn: string;
  resolvingText: string;
  processingStream: string;
  reliableNetworkBadge: string;
  retryAttempt: string;
  downloadSuccess: string;
  readyInHD: string;
  downloadFileBtn: string;
  downloadAllBtn: string;
  audioOnlyBtn: string;
  featuresTitle: string;
  featuresSubtitle: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  howToTitle: string;
  howToSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: FaqItem[];
  pseoSectionTitle: string;
  pseoSectionSubtitle: string;
  viewAllSitemaps: string;
  footerRights: string;
  footerDisclaimer: string;
  fastSpeedNotice: string;
  sslSecureNotice: string;
  quickTestLabel: string;
  secretShortcutBadge: string;
  secretShortcutSub: string;
  secretShortcutTitle: string;
  secretShortcutDesc: string;
  secretShortcutOriginal: string;
  secretShortcutModified: string;
  mobileOptimizedTitle: string;
  mobileOptimizedDesc: string;
  desktopOptimizedTitle: string;
  desktopOptimizedDesc: string;
  allToolsTitle: string;
  allToolsDesc: string;
}

// Generate base dictionary for any supported language using COMMON_TRANSLATIONS and English fallback
function buildDictionaryForLanguage(lang: SupportedLanguage): TranslationDictionary {
  const common = COMMON_TRANSLATIONS[lang] || COMMON_TRANSLATIONS.en;
  const enCommon = COMMON_TRANSLATIONS.en;

  return {
    brandName: common.brandName || enCommon.brandName,
    brandTagline: common.brandTagline || enCommon.brandTagline,
    navReels: common.navReels || enCommon.navReels,
    navVideo: common.navVideo || enCommon.navVideo,
    navPhoto: common.navPhoto || enCommon.navPhoto,
    navStories: common.navStories || enCommon.navStories,
    navHighlights: common.navHighlights || enCommon.navHighlights,
    navIgtv: common.navIgtv || enCommon.navIgtv,
    navAdmin: common.navAdmin || enCommon.navAdmin,
    heroTitle: common.heroTitle || enCommon.heroTitle,
    heroHighlight: common.heroHighlight || enCommon.heroHighlight,
    heroSubtitle: common.heroSubtitle || enCommon.heroSubtitle,
    inputPlaceholder: common.inputPlaceholder || enCommon.inputPlaceholder,
    pasteBtn: common.pasteBtn || enCommon.pasteBtn,
    downloadBtn: common.downloadBtn || enCommon.downloadBtn,
    resolvingText: common.resolvingText || enCommon.resolvingText,
    processingStream: common.processingStream || enCommon.processingStream,
    reliableNetworkBadge: common.reliableNetworkBadge || enCommon.reliableNetworkBadge,
    retryAttempt: common.retryAttempt || enCommon.retryAttempt,
    downloadSuccess: common.downloadSuccess || enCommon.downloadSuccess,
    readyInHD: common.readyInHD || enCommon.readyInHD,
    downloadFileBtn: common.downloadFileBtn || enCommon.downloadFileBtn,
    downloadAllBtn: common.downloadAllBtn || enCommon.downloadAllBtn,
    audioOnlyBtn: common.audioOnlyBtn || enCommon.audioOnlyBtn,
    featuresTitle: common.featuresTitle || enCommon.featuresTitle,
    featuresSubtitle: common.featuresSubtitle || enCommon.featuresSubtitle,
    feature1Title: lang === 'ar' ? 'بدون أي تقليل للجودة' : 'Zero Quality Loss (1080p)',
    feature1Desc:
      lang === 'ar'
        ? 'نستخرج ملفات الفيديو الأصلية بصيغة MP4 وبدقة 1080p بمعدل 60 إطاراً في الثانية والصور بأعلى دقة متوفرة.'
        : 'Direct CDN stream extraction maintains original high-bitrate video and full pixel dimensions.',
    feature2Title: lang === 'ar' ? 'مشاهدة وتحميل مجهول 100%' : '100% Anonymous & Private',
    feature2Desc:
      lang === 'ar'
        ? 'حمل وشاهد القصص والهايلايت بسرية تامة دون إشعار صاحب الحساب ودون الحاجة لتسجيل الدخول.'
        : 'View stories, reels, and profiles discreetly without sending tracking tokens or logging in.',
    feature3Title: lang === 'ar' ? 'ثبات فائق على جميع الشبكات' : 'Adaptive Edge Network',
    feature3Desc:
      lang === 'ar'
        ? 'خوارزميات ذكية لاستعادة الحزم تضمن استمرار التحميل بنجاح حتى على شبكات الهاتف المتذبذبة.'
        : 'Multi-datacenter relay automatically resumes interrupted downloads on mobile connections.',
    feature4Title: lang === 'ar' ? 'خالٍ من العلامات المائية' : 'Clean & Watermark Free',
    feature4Desc:
      lang === 'ar'
        ? 'احصل على المحتوى الأصلي نقياً تماماً دون شعارات مضافة أو إعلانات مزعجة مضللة.'
        : 'Pure media output with zero appended branding, stamps, or compression artifacts.',
    howToTitle: common.howToTitle || enCommon.howToTitle,
    howToSubtitle: common.howToSubtitle || enCommon.howToSubtitle,
    step1Title: lang === 'ar' ? '1. انسخ رابط المنشور' : '1. Copy Instagram Link',
    step1Desc:
      lang === 'ar'
        ? 'افتح تطبيق انستقرام، واضغط على أيقونة المشاركة واختر "نسخ الرابط".'
        : 'Open the Instagram app or browser, tap Share or the three dots, and choose "Copy Link".',
    step2Title: lang === 'ar' ? '2. الصق الرابط في insta1000gram' : '2. Paste into Downloader',
    step2Desc:
      lang === 'ar'
        ? 'الصق الرابط المنسوخ في حقل البحث بالأعلى ثم اضغط على زر "جلب وتحميل".'
        : 'Paste the copied URL into the box above and click "Fetch & Download".',
    step3Title: lang === 'ar' ? '3. احفظ الملف على جهازك' : '3. Save 1080p Media',
    step3Desc:
      lang === 'ar'
        ? 'اختر الجودة المفضلة لك وسيتم حفظ الملف فوراً في ألبوم الصور أو التنزيلات.'
        : 'Select your preferred quality or audio format and save directly to your camera roll or disk.',
    faqTitle: common.faqTitle || enCommon.faqTitle,
    faqSubtitle: common.faqSubtitle || enCommon.faqSubtitle,
    faqs:
      lang === 'ar'
        ? [
            {
              q: 'هل موقع insta1000gram مجاني تماماً؟',
              a: 'نعم، خدمة insta1000gram مجانية 100% بدون أي حدود لعدد التحميلات وبدون الحاجة لإنشاء حساب.',
            },
            {
              q: 'هل يتم تحميل ريلز انستقرام بأعلى دقة 1080p؟',
              a: 'نعم، يسحب الموقع الفيديو بدقة 1080p الأصلية بمعدل 60 إطاراً وصوت استريو نقي دون أي ضغط.',
            },
            {
              q: 'هل يمكنني تحميل الستوري والهايلايت بدون علم صاحب الحساب؟',
              a: 'نعم، التحميل يتم بسرية تامة ومجهول الهوية 100% دون أن يظهر اسمك في قائمة المشاهدين.',
            },
            {
              q: 'ما هي خدعة رابط 1000 السريع؟',
              a: 'فقط أضف الرقم 1000 إلى رابط إنستغرام ليصبح insta1000gram.com وسيفتح التحميل فوراً!',
            },
          ]
        : [
            {
              q: 'Is insta1000gram completely free to use?',
              a: 'Yes, insta1000gram is 100% free with unlimited downloads and no account required.',
            },
            {
              q: 'Does downloading Instagram Reels reduce video quality?',
              a: 'No. We extract the original 1080p 60fps MP4 stream directly from Instagram media servers.',
            },
            {
              q: 'Can I download Instagram Stories anonymously?',
              a: 'Yes. Our proxy servers fetch the media without sending any user identifier, so your profile never appears in the viewer list.',
            },
            {
              q: 'How does the 1000 URL shortcut work?',
              a: 'Whenever you have an Instagram link, simply change instagram.com to insta1000gram.com in your browser address bar to download instantly!',
            },
          ],
    pseoSectionTitle: lang === 'ar' ? 'فهرس الأدوات والصفحات المتخصصة' : 'Directory of Instagram Downloaders',
    pseoSectionSubtitle:
      lang === 'ar'
        ? 'استكشف كافة أدوات التحميل المتخصصة للريلز والفيديوهات والقصص'
        : 'Explore specialized high-speed downloaders for Reels, Videos, Stories, Photos, and Highlights.',
    viewAllSitemaps: lang === 'ar' ? 'عرض الفهرس' : 'View Sitemap',
    footerRights: common.footerRights || enCommon.footerRights,
    footerDisclaimer: common.footerDisclaimer || enCommon.footerDisclaimer,
    fastSpeedNotice: common.fastSpeedNotice || enCommon.fastSpeedNotice,
    sslSecureNotice: common.sslSecureNotice || enCommon.sslSecureNotice,
    quickTestLabel: common.quickTestLabel || enCommon.quickTestLabel,
    secretShortcutBadge: common.secretShortcutBadge || enCommon.secretShortcutBadge,
    secretShortcutSub: lang === 'ar' ? 'أسرع طريقة للتحميل مباشرة' : 'The Fastest Way to Download',
    secretShortcutTitle: common.secretShortcutTitle || enCommon.secretShortcutTitle,
    secretShortcutDesc: common.secretShortcutDesc || enCommon.secretShortcutDesc,
    secretShortcutOriginal: lang === 'ar' ? 'الرابط الأصلي:' : 'Original link:',
    secretShortcutModified: lang === 'ar' ? 'أضف "1000" ثم اضغط Enter:' : 'Add "1000" and press Enter:',
    mobileOptimizedTitle: lang === 'ar' ? 'مُحسّن للهواتف الذكية' : 'Mobile Optimized for iOS & Android',
    mobileOptimizedDesc:
      lang === 'ar'
        ? 'متوافق بالكامل مع سفاري وكروم للحفظ المباشر في ألبوم الكاميرا.'
        : 'Save directly to your camera roll in Safari on iPhone or Google Chrome on Android with zero apps.',
    desktopOptimizedTitle: lang === 'ar' ? 'تسريع التحميل للكمبيوتر' : 'Ultra-Fast Desktop Downloads',
    desktopOptimizedDesc:
      lang === 'ar'
        ? 'سرعات تنزيل متعددة القنوات تصل إلى 10 جيجابت في الثانية على ويندوز وماك.'
        : 'High-throughput parallel streams for lightning-fast downloads on Windows, Mac, and Linux.',
    allToolsTitle: common.allToolsTitle || enCommon.allToolsTitle,
    allToolsDesc: common.allToolsDesc || enCommon.allToolsDesc,
  };
}

export const DEFAULT_TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = ALL_SUPPORTED_LANGUAGES.reduce(
  (acc, lang) => {
    acc[lang] = buildDictionaryForLanguage(lang);
    return acc;
  },
  {} as Record<SupportedLanguage, TranslationDictionary>
);

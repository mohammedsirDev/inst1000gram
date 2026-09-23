import { PseoPage, PseoTemplateConfig, SupportedLanguage, MediaType } from './types';

export const INITIAL_PSEO_CONFIG: PseoTemplateConfig = {
  titlePattern: 'Download Instagram {type} {quality} in {country} - Free Fast {device}',
  metaDescriptionPattern: 'Save Instagram {type} in original {quality} resolution. Anonymous, zero compression, and 100% free on {device}. insta1000gram high-speed server.',
  h1Pattern: 'Best Instagram {type} Downloader ({quality})',
  introPattern: 'Looking to save Instagram {type} directly to your {device}? insta1000gram gives you instantaneous access to original high-bitrate media files with zero watermark and complete privacy.',
  chunkSize: 1000,
  totalGeneratedCount: 3000,
  keywords: [
    'download instagram reels',
    'instagram video saver online',
    'save instagram stories anonymously',
    'instagram photo full hd download',
    'igtv video downloader mp4',
    'instagram carousel album download',
    'save reels without watermark',
    'instagram audio track extractor mp3',
    'download private story instagram',
    'batch instagram media downloader',
  ],
  countries: ['USA', 'Spain', 'France', 'Brazil', 'Saudi Arabia', 'Egypt', 'UAE', 'Morocco', 'Mexico', 'Germany'],
  devices: ['iPhone & iOS', 'Android Phone', 'PC Windows', 'Macbook & Safari', 'iPad Tablet'],
};

// Seed sample pSEO pages for immediate rendering & preview
export const SEED_PSEO_PAGES: PseoPage[] = [
  {
    id: 'pseo-1',
    slug: 'download-instagram-reels-in-1080p-hd',
    mediaType: 'reels',
    lang: 'en',
    targetKeyword: 'download instagram reels in 1080p hd',
    country: 'USA',
    device: 'iPhone & iOS',
    title: 'Download Instagram Reels in 1080p HD - Free & Fast | insta1000gram',
    metaDescription: 'Download Instagram Reels in full 1080p 60fps HD without watermark. Works effortlessly on iPhone, Android, and PC. Fast, anonymous, and no sign-up.',
    h1: 'Instagram Reels Downloader (1080p Full HD)',
    intro: 'Save viral Instagram Reels in pristine 1080p high definition directly to your camera roll. insta1000gram extracts original video files without compression or annoying logos.',
    features: [
      'Original 60fps High Bitrate Video Stream',
      'Lossless MP4 Format Compatible With All Players',
      'No App Installation Required - Works in Safari & Chrome',
      'Direct Camera Roll Integration on iPhone & Android',
    ],
    faqs: [
      {
        q: 'How do I download Instagram Reels in 1080p on iPhone?',
        a: 'Copy the Reel link from the Instagram app, paste it into insta1000gram in Safari, tap Fetch, and click "Download 1080p MP4". The video will automatically save to your Files or Photos.',
      },
      {
        q: 'Does insta1000gram add a watermark to saved Reels?',
        a: 'No. insta1000gram fetches the original uncompressed broadcast stream directly from Instagram CDN, leaving zero watermarks.',
      },
    ],
    chunkId: 1,
    lastmod: new Date().toISOString().split('T')[0],
    views: 48210,
    downloadsCount: 19400,
  },
  {
    id: 'pseo-2',
    slug: 'save-instagram-stories-anonymously',
    mediaType: 'stories',
    lang: 'en',
    targetKeyword: 'save instagram stories anonymously',
    country: 'USA',
    device: 'Android Phone',
    title: 'Download Instagram Stories Anonymously | insta1000gram',
    metaDescription: 'Watch and download Instagram Stories and Highlights without leaving a trace. 100% anonymous, no account required, works on all devices.',
    h1: 'Anonymous Instagram Story Viewer & Downloader',
    intro: 'Browse and download Instagram stories discreetly. The account owner will never know you viewed or saved their story.',
    features: [
      '100% Stealth & Anonymous - No View Logged in Story Analytics',
      'Download Both Video and Photo Stories',
      'Access Active Stories and Saved Profile Highlights',
      'High-speed Edge CDN Connection',
    ],
    faqs: [
      {
        q: 'Can the person see that I watched their Instagram story?',
        a: 'Never. insta1000gram queries public story data through independent proxy servers, so your identity or account is never sent to Instagram.',
      },
    ],
    chunkId: 1,
    lastmod: new Date().toISOString().split('T')[0],
    views: 62400,
    downloadsCount: 28910,
  },
  {
    id: 'pseo-3',
    slug: 'ar/tahmeel-reels-instagram-bedoon-alama',
    mediaType: 'reels',
    lang: 'ar',
    targetKeyword: 'تحميل ريلز انستقرام بدون علامة مائية',
    country: 'Saudi Arabia',
    device: 'iPhone & iOS',
    title: 'تحميل ريلز انستقرام بجودة Full HD 1080p بدون علامة مائية | insta1000gram',
    metaDescription: 'أسرع موقع لتحميل مقاطع ريلز انستقرام بجودة عالية 1080p بدون لوجو أو علامة مائية. مجاني بالكامل ويدعم هواتف آيفون وأندرويد.',
    h1: 'تحميل ريلز انستقرام بدون علامة مائية وبأعلى جودة',
    intro: 'احفظ مقاطع ريلز انستقرام المفضلة لديك بنقاوة فائقة 1080p وبدون أي شعار على الفيديو. يعمل الموقع مباشرة عبر المتصفح دون الحاجة لتثبيت برامج.',
    features: [
      'جودة أصلية Full HD بمعدل 60 إطاراً في الثانية',
      'حفظ مباشر في ألبوم الصور في هواتف آيفون وسامسونج',
      'سرعة فائقة وسيرفرات مخصصة للعالم العربي',
      'بدون إعلانات منبثقة مزعجة أو تسجيل دخول',
    ],
    faqs: [
      {
        q: 'كيف يمكنني تحميل ريلز انستقرام على الآيفون؟',
        a: 'انسخ رابط المقطع من تطبيق انستقرام، ثم الصقه في مستطيل البحث في موقع insta1000gram واضغط على "جلب وتحميل"، ثم اختر جودة 1080p ليتم حفظه فوراً في الاستوديو.',
      },
      {
        q: 'هل الخدمة مجانية تماماً؟',
        a: 'نعم، الخدمة مجانية 100% ولا تتطلب أي اشتراك أو دفع.',
      },
    ],
    chunkId: 1,
    lastmod: new Date().toISOString().split('T')[0],
    views: 89320,
    downloadsCount: 42100,
  },
  {
    id: 'pseo-4',
    slug: 'es/descargar-historias-instagram-anonimo',
    mediaType: 'stories',
    lang: 'es',
    targetKeyword: 'descargar historias de instagram gratis',
    country: 'Spain',
    device: 'Android Phone',
    title: 'Descargar Historias de Instagram Anónimamente | insta1000gram',
    metaDescription: 'Guarda Stories y destacados de Instagram de forma 100% anónima en tu móvil o PC. Máxima resolución sin registro.',
    h1: 'Descargador Anónimo de Historias de Instagram',
    intro: 'Mira y descarga historias de Instagram de cualquier cuenta pública sin dejar rastro alguno. La persona nunca sabrá que viste su historia.',
    features: [
      'Visualización 100% invisible y anónima',
      'Descarga fotos y videos de historias en calidad original',
      'Compatible con Chrome, Safari y navegadores móviles',
      'Totalmente gratuito y sin límites diarios',
    ],
    faqs: [
      {
        q: '¿Es necesario iniciar sesión en Instagram?',
        a: 'No, no necesitas iniciar sesión ni dar tus contraseñas en ningún momento.',
      },
    ],
    chunkId: 1,
    lastmod: new Date().toISOString().split('T')[0],
    views: 31200,
    downloadsCount: 14200,
  },
  {
    id: 'pseo-5',
    slug: 'instagram-igtv-video-downloader-mp4',
    mediaType: 'igtv',
    lang: 'en',
    targetKeyword: 'instagram igtv video downloader mp4',
    country: 'USA',
    device: 'PC Windows',
    title: 'Instagram IGTV Video Downloader - Save Long Videos in MP4 | insta1000gram',
    metaDescription: 'Download long-form IGTV videos from Instagram in 1080p MP4. High speed chunked streaming download for videos up to 60 minutes long.',
    h1: 'Instagram IGTV Video Downloader in MP4 HD',
    intro: 'Download lengthy IGTV shows, interviews, and broadcasts with accelerated multi-threaded transfer speeds. No length limits.',
    features: [
      'Supports Long Videos up to 60 Minutes',
      'Fast Multi-threaded Edge Download Acceleration',
      'Universal MP4 Format with Clean Audio Track',
      'High Compatibility across Windows, Mac, and Mobile',
    ],
    faqs: [
      {
        q: 'Can I download long 30-minute IGTV videos?',
        a: 'Yes, insta1000gram is built with multi-chunk streaming that reliably downloads full-length IGTV videos without timing out.',
      },
    ],
    chunkId: 2,
    lastmod: new Date().toISOString().split('T')[0],
    views: 22100,
    downloadsCount: 8900,
  },
  {
    id: 'pseo-6',
    slug: 'save-instagram-photo-original-quality',
    mediaType: 'photo',
    lang: 'en',
    targetKeyword: 'save instagram photo original quality',
    country: 'USA',
    device: 'Macbook & Safari',
    title: 'Download Instagram Photos in Original HD Resolution | insta1000gram',
    metaDescription: 'Download high-resolution Instagram photos, carousel multi-posts, and profile pictures in maximum resolution JPG.',
    h1: 'Instagram Photo & Carousel Downloader',
    intro: 'Save original uncompressed photos from Instagram posts and albums. Easily download single photos or all slides from a carousel simultaneously.',
    features: [
      'Extracts 1080x1350 Original Uncropped Photos',
      'Full Multi-Photo Carousel Batch Support',
      'Zero Loss of Color or Sharpness',
      'Instant Right-Click or One-Tap Saving',
    ],
    faqs: [
      {
        q: 'Can I download all photos from a multiple-photo post?',
        a: 'Yes! When you paste an Instagram carousel link, insta1000gram displays all images with individual download buttons or a "Download All" option.',
      },
    ],
    chunkId: 2,
    lastmod: new Date().toISOString().split('T')[0],
    views: 39500,
    downloadsCount: 16700,
  },
];

// Generator function to dynamically synthesize thousands of indexed pSEO pages
export function generatePseoPages(count: number, template: PseoTemplateConfig): PseoPage[] {
  const mediaTypes: MediaType[] = ['reels', 'video', 'photo', 'stories', 'igtv'];
  const languages: SupportedLanguage[] = ['en', 'es', 'fr', 'pt', 'ar'];
  const qualities = ['1080p Full HD', '4K Ultra HD', 'Original Quality', 'High Bitrate 60fps', 'HD MP4'];
  const basePages: PseoPage[] = [...SEED_PSEO_PAGES];

  let currentId = basePages.length + 1;
  const targetCount = Math.max(count, basePages.length);

  while (basePages.length < targetCount) {
    const lang = languages[currentId % languages.length];
    const mediaType = mediaTypes[currentId % mediaTypes.length];
    const country = template.countries[currentId % template.countries.length];
    const device = template.devices[currentId % template.devices.length];
    const quality = qualities[currentId % qualities.length];
    const keyword = template.keywords[currentId % template.keywords.length];

    // Compute chunk ID for partition into sitemap_1.xml, sitemap_2.xml, etc.
    const chunkId = Math.floor(basePages.length / template.chunkSize) + 1;
    
    let slug = '';
    let title = '';
    let h1 = '';
    let intro = '';

    if (lang === 'ar') {
      const arTypes: Record<MediaType, string> = {
        reels: 'ريلز انستقرام',
        video: 'فيديوهات انستقرام',
        photo: 'صور انستقرام',
        stories: 'ستوري وقصص انستقرام',
        highlights: 'هايلايت انستقرام',
        igtv: 'تلفزيون انستقرام IGTV',
        all: 'محتوى انستقرام',
      };
      slug = `ar/tahmeel-${mediaType}-instagram-${currentId}`;
      title = `تحميل ${arTypes[mediaType]} بجودة ${quality} في ${country} | insta1000gram`;
      h1 = `أسرع موقع لتحميل ${arTypes[mediaType]} (${quality})`;
      intro = `احفظ وحمّل ${arTypes[mediaType]} على أجهزة ${device} بأعلى دقة متوفرة مع الحفاظ التام على نقاوة الألوان ودون أي علامات مائية.`;
    } else if (lang === 'es') {
      slug = `es/descargar-${mediaType}-instagram-${currentId}`;
      title = `Descargar ${mediaType.toUpperCase()} de Instagram en ${quality} - ${country} | insta1000gram`;
      h1 = `Descarga ${mediaType.toUpperCase()} de Instagram Gratis (${quality})`;
      intro = `Guarda ${mediaType} de Instagram en tu ${device} con la mejor velocidad y sin marcas de agua con insta1000gram.`;
    } else if (lang === 'fr') {
      slug = `fr/telecharger-${mediaType}-instagram-${currentId}`;
      title = `Télécharger ${mediaType.toUpperCase()} Instagram en ${quality} - ${country} | insta1000gram`;
      h1 = `Téléchargement ${mediaType.toUpperCase()} Instagram en Ligne`;
      intro = `Enregistrez rapidement les ${mediaType} Instagram sur votre ${device} en résolution originale sans perte de qualité.`;
    } else if (lang === 'pt') {
      slug = `pt/baixar-${mediaType}-instagram-${currentId}`;
      title = `Baixar ${mediaType.toUpperCase()} do Instagram em ${quality} - ${country} | insta1000gram`;
      h1 = `Baixar ${mediaType.toUpperCase()} do Instagram Sem Marca d'Água`;
      intro = `Salve ${mediaType} do Instagram no seu ${device} com máxima velocidade e privacidade garantida.`;
    } else {
      slug = `download-${mediaType}-instagram-${quality.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${currentId}`;
      title = `Download Instagram ${mediaType.toUpperCase()} in ${quality} for ${device} | insta1000gram`;
      h1 = `Instagram ${mediaType.toUpperCase()} Downloader (${quality})`;
      intro = `Instantly save any Instagram ${mediaType} to your ${device} in ${country}. Supercharged multi-stream download engine.`;
    }

    basePages.push({
      id: `pseo-${currentId}`,
      slug,
      mediaType,
      lang,
      targetKeyword: `${keyword} ${quality}`,
      country,
      device,
      title,
      metaDescription: `Save Instagram ${mediaType} in ${quality} resolution on ${device}. Zero watermark, anonymous, fast edge CDN download on insta1000gram.`,
      h1,
      intro,
      features: [
        `High Definition ${quality} Direct Export`,
        `Universal Compatibility for ${device}`,
        `Optimized for ${country} High-Speed CDN Relay`,
        '100% Safe, Anonymous and No Account Needed',
      ],
      faqs: [
        {
          q: `Is downloading Instagram ${mediaType} safe on ${device}?`,
          a: `Yes, insta1000gram processes public Instagram URLs through encrypted edge relays with zero storage of your personal data.`,
        },
      ],
      chunkId,
      lastmod: new Date().toISOString().split('T')[0],
      views: Math.floor(Math.random() * 12000) + 800,
      downloadsCount: Math.floor(Math.random() * 5000) + 200,
    });

    currentId++;
  }

  return basePages;
}

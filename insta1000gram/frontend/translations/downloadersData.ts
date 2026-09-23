import { DownloaderSlug, MediaType, SupportedLanguage, DownloaderPageMeta } from '../types';

export interface LocalizedToolBase {
  name: string;
  actionWord: string;
  mediaNoun: string;
  formatNotice: string;
  step1: string;
  step2: string;
  step3: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;
  faq4Q: string;
  faq4A: string;
  feat1: string;
  feat2: string;
  feat3: string;
  feat4: string;
}

// Language-specific phrases for building the 5 tools
export const LOCALE_TOOL_TERMS: Partial<
  Record<
    SupportedLanguage,
    {
      reels: LocalizedToolBase;
      video: LocalizedToolBase;
      photo: LocalizedToolBase;
      stories: LocalizedToolBase;
      highlights: LocalizedToolBase;
    }
  >
> = {
  en: {
    reels: {
      name: 'Instagram Reels Downloader',
      actionWord: 'Download Reels',
      mediaNoun: 'Instagram Reel video',
      formatNotice: '1080p Full HD MP4 without watermark',
      step1: 'Copy the Instagram Reel URL from the Instagram app or website.',
      step2: 'Paste the Reel link into the insta1000gram downloader box above.',
      step3: 'Click Download to save the 1080p MP4 directly to your device.',
      faq1Q: 'Can I download Instagram Reels in 1080p HD quality?',
      faq1A: 'Yes. insta1000gram connects directly to Instagram media CDNs and retrieves the highest resolution 1080p 60fps MP4 file available.',
      faq2Q: 'Does insta1000gram add any watermark or logo to saved Reels?',
      faq2A: 'No. All videos are saved completely clean without any watermark, branding, or degradation.',
      faq3Q: 'How do I download Instagram Reels on iPhone or iPad?',
      faq3A: 'Open Safari, paste the link into insta1000gram, click Download, and tap Save Video in your Share menu.',
      faq4Q: 'Can I extract the audio or music track from an Instagram Reel?',
      faq4A: 'Yes! Select the Audio Only (MP3) option on the result card to save the original soundtrack in 320 kbps.',
      feat1: 'Ultra HD 1080p 60fps video quality',
      feat2: '100% clean video with zero watermark',
      feat3: 'Extract background audio / music track to MP3',
      feat4: 'Instant 1000 URL shortcut support',
    },
    video: {
      name: 'Instagram Video Downloader',
      actionWord: 'Download Videos',
      mediaNoun: 'Instagram video or IGTV clip',
      formatNotice: 'original MP4 video quality',
      step1: 'Copy the video link from Instagram feed, IGTV, or profile.',
      step2: 'Paste the link into insta1000gram and press Fetch & Download.',
      step3: 'Select your preferred video resolution and save to your camera roll.',
      faq1Q: 'What video formats are supported for download?',
      faq1A: 'All videos are processed into universally playable MP4 format compatible with iOS, Android, macOS, and Windows.',
      faq2Q: 'Can I download long IGTV videos?',
      faq2A: 'Yes. insta1000gram supports full-length IGTV and regular Instagram feed videos without duration restrictions.',
      faq3Q: 'Is there a limit on how many videos I can download per day?',
      faq3A: 'No. Downloads are completely unlimited and free forever without account creation.',
      faq4Q: 'Where do saved videos go on Android and PC?',
      faq4A: 'On Android, videos are saved in your Gallery and Downloads folder. On PC/Mac, check your browser Downloads folder.',
      feat1: 'Full support for Feed, Watch and IGTV videos',
      feat2: 'Uncapped multi-megabit download throughput',
      feat3: 'Zero registration or software install needed',
      feat4: 'Works across all browsers on desktop and mobile',
    },
    photo: {
      name: 'Instagram Photo Downloader',
      actionWord: 'Download Photos',
      mediaNoun: 'Instagram photo or carousel album',
      formatNotice: 'lossless original JPG resolution',
      step1: 'Copy the link of any Instagram photo or multi-slide carousel post.',
      step2: 'Paste the URL into insta1000gram and click Download.',
      step3: 'Save individual pictures or click Download All to save the whole album.',
      faq1Q: 'Are photos saved in maximum original Instagram resolution?',
      faq1A: 'Yes. We fetch the uncompressed master JPG file directly, preserving full pixel dimensions (up to 1080x1350).',
      faq2Q: 'Can I download all slides from a carousel post?',
      faq2A: 'Yes! Every slide in the carousel is previewed with individual download buttons and a Download All option.',
      faq3Q: 'Can I save profile pictures or DP?',
      faq3A: 'You can download public post images and story photos in high definition.',
      faq4Q: 'Does downloading Instagram photos cost anything?',
      faq4A: 'No, insta1000gram is completely free with no hidden charges.',
      feat1: 'Highest resolution master JPG export',
      feat2: 'Carousel support with 1-click batch download',
      feat3: 'Preserves original color profile and clarity',
      feat4: 'No image compression or artifacts introduced',
    },
    stories: {
      name: 'Instagram Story Downloader',
      actionWord: 'Download Stories',
      mediaNoun: 'Instagram Story',
      formatNotice: '100% anonymous & high definition',
      step1: 'Copy the story link or public profile username from Instagram.',
      step2: 'Paste into insta1000gram to anonymously view active stories.',
      step3: 'Click Download next to any story video or photo to save it.',
      faq1Q: 'Will the account owner know I viewed or downloaded their story?',
      faq1A: 'Never. Our independent proxy requests the media anonymously, so your identity is never reported to Instagram view logs.',
      faq2Q: 'Can I download expired Instagram stories?',
      faq2A: 'Stories are available as long as they are active (within the 24-hour window) or saved as Highlights on the profile.',
      faq3Q: 'Do I need an Instagram account or login to use this?',
      faq3A: 'No. You do not need to log in or provide any credentials whatsoever.',
      faq4Q: 'Can I save both photo and video stories?',
      faq4A: 'Yes. Both video stories (MP4) and photo stories (JPG) are supported at original resolution.',
      feat1: '100% stealth & anonymous viewing',
      feat2: 'Zero footprint in Instagram story viewer list',
      feat3: 'Supports both 24-hour video and photo stories',
      feat4: 'No login, password, or cookies required',
    },
    highlights: {
      name: 'Instagram Highlights Downloader',
      actionWord: 'Download Highlights',
      mediaNoun: 'Instagram Highlight reel',
      formatNotice: 'archived high quality video and photo',
      step1: 'Copy the Highlight link from the user\'s Instagram profile.',
      step2: 'Paste the link into insta1000gram to load all saved highlight stories.',
      step3: 'Select the stories you wish to save and download them in 1080p HD.',
      faq1Q: 'Can I download an entire highlight collection at once?',
      faq1A: 'Yes. insta1000gram displays all stories in the highlight album so you can download each clip or image seamlessly.',
      faq2Q: 'Do Instagram Highlights expire after 24 hours?',
      faq2A: 'No. Highlights remain permanently on public profiles until deleted by the creator, and can be downloaded anytime.',
      faq3Q: 'Can I download highlights from private accounts?',
      faq3A: 'insta1000gram works with publicly accessible accounts and stories to protect user privacy.',
      faq4Q: 'Are videos in Highlights saved with sound?',
      faq4A: 'Yes! All highlight clips are downloaded with original stereo audio synchronized with the video.',
      feat1: 'Save permanent story albums and highlights',
      feat2: 'High-speed batch processing for multiple clips',
      feat3: 'Full stereo audio retention in MP4 format',
      feat4: 'Completely anonymous without alerting creator',
    },
  },
  ar: {
    reels: {
      name: 'تحميل ريلز انستقرام',
      actionWord: 'تحميل ريلز',
      mediaNoun: 'مقطع ريلز انستقرام',
      formatNotice: 'جودة 1080p Full HD بدون علامة مائية',
      step1: 'انسخ رابط مقطع الريلز من تطبيق انستقرام أو المتصفح.',
      step2: 'الصق الرابط في مربع البحث أعلاه في موقع insta1000gram.',
      step3: 'اضغط على زر التحميل لحفظ الفيديو بجودة 1080p MP4 مباشرة.',
      faq1Q: 'هل يتم تحميل ريلز انستقرام بجودة Full HD 1080p؟',
      faq1A: 'نعم، يتصل insta1000gram مباشرة بخوادم انستقرام الأصلية ويسحب الفيديو بأعلى دقة متاحة 1080p وبمعدل 60 إطاراً في الثانية.',
      faq2Q: 'هل يضع الموقع علامة مائية أو شعاراً على الفيديو؟',
      faq2A: 'كلا، يتم حفظ مقاطع الريلز نظيفة تماماً بدون أي شعار أو علامة مائية أو تقليل في الجودة.',
      faq3Q: 'كيف أقوم بحفظ مقاطع الريلز على الآيفون؟',
      faq3A: 'افتح متصفح سفاري، الصق الرابط في insta1000gram واضغط تحميل، ثم اختر "حفظ الفيديو" من قائمة المشاركة.',
      faq4Q: 'هل يمكن استخراج الموسيقى أو الصوت من الريلز؟',
      faq4A: 'نعم! اختر خيار "تحميل الصوت فقط (MP3)" لتحميل المقطع الصوتي بجودة استوديو 320 kbps.',
      feat1: 'جودة فائقة 1080p بمعدل 60 إطار في الثانية',
      feat2: 'فيديو نظيف 100% بدون أي لوجو أو علامة مائية',
      feat3: 'إمكانية فصل وتحميل الصوت بصيغة MP3',
      feat4: 'دعم اختصار 1000 السريع في شريط المتصفح',
    },
    video: {
      name: 'تحميل فيديو انستقرام',
      actionWord: 'تحميل فيديو',
      mediaNoun: 'فيديو انستقرام أو مقطع IGTV',
      formatNotice: 'صيغة MP4 عالية الجودة بدون ضغط',
      step1: 'انسخ رابط الفيديو من الصفحة الرئيسية أو الملف الشخصي في انستقرام.',
      step2: 'الصق الرابط في أداة insta1000gram واضغط جلب وتحميل.',
      step3: 'اختر الجودة المطلوبة واحفظ الفيديو في ألبوم الكاميرا لديك.',
      faq1Q: 'ما هي صيغة الفيديو التي يتم تنزيلها؟',
      faq1A: 'يتم تنزيل جميع الفيديوهات بصيغة MP4 القياسية المتوافقة مع هواتف آيفون، أندرويد والكمبيوتر.',
      faq2Q: 'هل يدعم الموقع تحميل فيديوهات IGTV الطويلة؟',
      faq2A: 'نعم، يدعم الموقع فيديوهات IGTV الطويلة والفيديوهات العادية دون قيود على مدة المقطع.',
      faq3Q: 'هل هناك حد أقصى لعدد الفيديوهات اليومية؟',
      faq3A: 'لا يوجد أي حد، التنزيل مجاني وغير محدود بالكامل ودون الحاجة لتسجيل حساب.',
      faq4Q: 'أين يتم حفظ الفيديوهات على الهاتف؟',
      faq4A: 'على هواتف أندرويد في مجلد التنزيلات والمعرض، وعلى الآيفون في تطبيق الصور أو الملفات.',
      feat1: 'دعم كامل لفيديوهات المنشورات و IGTV',
      feat2: 'سرعة تحميل فائقة عبر خوادم سحابية متعددة',
      feat3: 'بدون الحاجة لأي برامج أو تطبيقات إضافية',
      feat4: 'يعمل بسلاسة على كافة المتصفحات والهواتف',
    },
    photo: {
      name: 'تحميل صور انستقرام',
      actionWord: 'تحميل صور',
      mediaNoun: 'صور انستقرام أو ألبومات الصور',
      formatNotice: 'أعلى دقة أصلية بصيغة JPG',
      step1: 'انسخ رابط المنشور الذي يحتوي على صورة أو عدة صور (كاروسيل).',
      step2: 'الصق الرابط في insta1000gram واضغط على تحميل.',
      step3: 'احفظ الصور بشكل فردي أو اختر تحميل الألبوم بالكامل بنقرة واحدة.',
      faq1Q: 'هل يتم تنزيل الصور بأعلى دقة وضوح أصلية؟',
      faq1A: 'نعم، نوفر الصورة الأصلية دون ضغط بأبعاد تصل إلى 1080x1350 بكسل.',
      faq2Q: 'هل يمكن تحميل جميع صور المنشور متعدد الصور؟',
      faq2A: 'نعم! يعرض الموقع جميع الصور والشرائح مع خيار تحميل كل صورة أو تحميل الكل معاً.',
      faq3Q: 'هل يمكن حفظ صور الحسابات الخاصة؟',
      faq3A: 'يدعم الموقع المنشورات العامة لضمان أمان وخصوصية المستخدمين.',
      faq4Q: 'هل خدمة تحميل الصور مدفوعة؟',
      faq4A: 'كلا، الخدمة مجانية 100% ولا تتطلب أي اشتراك أو دفع رسوم.',
      feat1: 'تصدير الصور بأعلى أبعاد وجودة JPG أصلية',
      feat2: 'دعم تحميل المنشورات المتعددة والألبومات',
      feat3: 'الحفاظ على تدرج الألوان ودقة التفاصيل',
      feat4: 'بدون تشويش أو ضغط ملفات الصور',
    },
    stories: {
      name: 'تحميل ستوري انستقرام',
      actionWord: 'تحميل ستوري',
      mediaNoun: 'ستوري انستقرام',
      formatNotice: 'بشكل مجهول 100% وبدون تسجيل دخول',
      step1: 'انسخ رابط الستوري أو اسم المستخدم العام من انستقرام.',
      step2: 'الصق الرابط في insta1000gram لعرض القصص الحالية دون كشف هويتك.',
      step3: 'اضغط على زر التحميل بجانب أي ستوري لحفظ الفيديو أو الصورة.',
      faq1Q: 'هل سيعرف صاحب الحساب أنني شاهدت أو حملت الستوري؟',
      faq1A: 'أبداً. يتم طلب الوسائط عبر خوادم وسيطة مجهولة، فلا يظهر اسمك في قائمة المشاهدين إطلاقاً.',
      faq2Q: 'هل يمكن تحميل الستوري بعد مرور 24 ساعة؟',
      faq2A: 'يمكن تحميل الستوري طالما كانت نشطة (خلال 24 ساعة) أو إذا كانت محفوظة في قسم الهايلايت.',
      faq3Q: 'هل أحتاج لتسجيل الدخول بحساب انستقرام؟',
      faq3A: 'لا يتطلب الموقع أي تسجيل دخول أو مشاركة أي بيانات أو كلمات مرور.',
      faq4Q: 'هل يدعم الموقع تحميل مقاطع الفيديو والصور في الستوري؟',
      faq4A: 'نعم، يدعم تنزيل الفيديوهات بصيغة MP4 والصور بصيغة JPG وبأعلى دقة.',
      feat1: 'مشاهدة وتنزيل مجهول الهوية 100%',
      feat2: 'عدم تسجيل أي أثر في قائمة مشاهدي الستوري',
      feat3: 'دعم كامل للستوري المصورة والفيديوهات',
      feat4: 'دون الحاجة لحساب أو كلمة مرور',
    },
    highlights: {
      name: 'تحميل هايلايت انستقرام',
      actionWord: 'تحميل هايلايت',
      mediaNoun: 'ألبومات الهايلايت المحفوظة',
      formatNotice: 'أعلى دقة لقصص الهايلايت الدائمة',
      step1: 'انسخ رابط الهايلايت من الملف الشخصي للمستخدم في انستقرام.',
      step2: 'الصق الرابط في insta1000gram لعرض كافة القصص المحفوظة في الألبوم.',
      step3: 'اختر المقاطع التي تريد حفظها وقم بتنزيلها بجودة 1080p HD.',
      faq1Q: 'هل يمكن تنزيل ألبوم هايلايت كامل مرة واحدة؟',
      faq1A: 'نعم، يعرض الموقع كافة عناصر الهايلايت مع إمكانية تنزيل كل مقطع أو صورة على حدة بسهولة.',
      faq2Q: 'هل تنتهي صلاحية الهايلايت بعد 24 ساعة؟',
      faq2A: 'الهايلايت تبقى محفوظة في الملف الشخصي بصفة دائمة، ويمكنك تحميلها في أي وقت.',
      faq3Q: 'هل يتم تحميل فيديوهات الهايلايت مع الصوت؟',
      faq3A: 'نعم! يتم تنزيل جميع مقاطع الهايلايت مع الصوت الأصلي المحيطي بصيغة MP4.',
      faq4Q: 'هل يعلم صاحب الحساب أنني قمت بتحميل الهايلايت؟',
      faq4A: 'كلا، العملية تتم بخصوصية وسرية تامة دون إشعار صاحب الحساب.',
      feat1: 'حفظ الهايلايت الدائمة بجودة أصلية',
      feat2: 'استعراض سريع لكافة قصص الألبوم',
      feat3: 'حفظ الصوت الأصلي متزامناً مع الفيديو',
      feat4: 'تحميل مجهول تماماً وبدون تسجيل',
    },
  },
};

// Generic generator for the remaining 27 languages using authentic specialized strings
export function getDownloaderDataForLocale(
  locale: SupportedLanguage,
  slug: DownloaderSlug
): DownloaderPageMeta {
  const typeMap: Record<DownloaderSlug, MediaType> = {
    'reels-downloader': 'reels',
    'video-downloader': 'video',
    'photo-downloader': 'photo',
    'story-downloader': 'stories',
    'highlights-downloader': 'highlights',
  };

  const type = typeMap[slug];

  // Specific bespoke sets if available (en, ar)
  if (LOCALE_TOOL_TERMS[locale] && LOCALE_TOOL_TERMS[locale][type as 'reels' | 'video' | 'photo' | 'stories' | 'highlights']) {
    const term = LOCALE_TOOL_TERMS[locale][type as 'reels' | 'video' | 'photo' | 'stories' | 'highlights'];
    return {
      slug,
      type,
      title: `${term.name} – ${term.actionWord} in 1080p HD | Insta1000gram`,
      description: `${term.actionWord} quickly and easily with Insta1000gram. Save ${term.mediaNoun} in ${term.formatNotice}.`,
      h1: term.name,
      intro: `Save ${term.mediaNoun} directly to your device with insta1000gram. Instant 1080p full resolution download with zero watermark and complete anonymity.`,
      howToSteps: [
        { step: 1, title: '1. Copy the Link', desc: term.step1 },
        { step: 2, title: '2. Paste into insta1000gram', desc: term.step2 },
        { step: 3, title: '3. Save to Device', desc: term.step3 },
      ],
      features: [term.feat1, term.feat2, term.feat3, term.feat4],
      faqs: [
        { q: term.faq1Q, a: term.faq1A },
        { q: term.faq2Q, a: term.faq2A },
        { q: term.faq3Q, a: term.faq3A },
        { q: term.faq4Q, a: term.faq4A },
      ],
    };
  }

  // Localized title & name builders for the other 27 languages
  const toolNameLocalized: Record<SupportedLanguage, Record<MediaType, string>> = {
    en: { reels: 'Instagram Reels Downloader', video: 'Instagram Video Downloader', photo: 'Instagram Photo Downloader', stories: 'Instagram Story Downloader', highlights: 'Instagram Highlights Downloader', all: 'Downloader', igtv: 'IGTV' },
    ar: { reels: 'تحميل ريلز انستقرام', video: 'تحميل فيديو انستقرام', photo: 'تحميل صور انستقرام', stories: 'تحميل ستوري انستقرام', highlights: 'تحميل هايلايت انستقرام', all: 'تنزيل', igtv: 'IGTV' },
    bn: { reels: 'ইনস্টাগ্রাম রিলস ডাউনলোডার', video: 'ইনস্টাগ্রাম ভিডিও ডাউনলোডার', photo: 'ইনস্টাগ্রাম ফটো ডাউনলোডার', stories: 'ইনস্টাগ্রাম স্টোরি ডাউনলোডার', highlights: 'ইনস্টাগ্রাম হাইলাইটস ডাউনলোডার', all: 'ডাউনলোডার', igtv: 'IGTV' },
    cs: { reels: 'Instagram Reels Stahovač', video: 'Instagram Video Stahovač', photo: 'Instagram Fotky Stahovač', stories: 'Instagram Stories Stahovač', highlights: 'Instagram Highlights Stahovač', all: 'Stahovač', igtv: 'IGTV' },
    de: { reels: 'Instagram Reels Downloader', video: 'Instagram Video Downloader', photo: 'Instagram Foto Downloader', stories: 'Instagram Story Downloader', highlights: 'Instagram Highlights Downloader', all: 'Downloader', igtv: 'IGTV' },
    el: { reels: 'Λήψη Instagram Reels', video: 'Λήψη Βίντεο Instagram', photo: 'Λήψη Φωτογραφιών Instagram', stories: 'Λήψη Instagram Stories', highlights: 'Λήψη Instagram Highlights', all: 'Downloader', igtv: 'IGTV' },
    es: { reels: 'Descargar Reels de Instagram', video: 'Descargar Videos de Instagram', photo: 'Descargar Fotos de Instagram', stories: 'Descargar Stories de Instagram', highlights: 'Descargar Highlights de Instagram', all: 'Descargador', igtv: 'IGTV' },
    fa: { reels: 'دانلود ریلز اینستاگرام', video: 'دانلود ویدیو اینستاگرام', photo: 'دانلود عکس اینستاگرام', stories: 'دانلود استوری اینستاگرام', highlights: 'دانلود هایلایت اینستاگرام', all: 'دانلودر', igtv: 'IGTV' },
    fr: { reels: 'Télécharger Reels Instagram', video: 'Télécharger Vidéos Instagram', photo: 'Télécharger Photos Instagram', stories: 'Télécharger Stories Instagram', highlights: 'Télécharger Highlights Instagram', all: 'Téléchargeur', igtv: 'IGTV' },
    hi: { reels: 'इंस्टाग्राम रील्स डाउनलोडर', video: 'इंस्टाग्राम वीडियो डाउनलोडर', photo: 'इंस्टाग्राम फोटो डाउनलोडर', stories: 'इंस्टाग्राम स्टोरी डाउनलोडर', highlights: 'इंस्टाग्राम हाइलाइट्स डाउनलोडर', all: 'डाउनलोडर', igtv: 'IGTV' },
    hu: { reels: 'Instagram Reels Letöltő', video: 'Instagram Videó Letöltő', photo: 'Instagram Fotó Letöltő', stories: 'Instagram Stories Letöltő', highlights: 'Instagram Kiemeltek Letöltő', all: 'Letöltő', igtv: 'IGTV' },
    id: { reels: 'Pengunduh Reels Instagram', video: 'Pengunduh Video Instagram', photo: 'Pengunduh Foto Instagram', stories: 'Pengunduh Story Instagram', highlights: 'Pengunduh Sorotan Instagram', all: 'Pengunduh', igtv: 'IGTV' },
    it: { reels: 'Scaricare Reels Instagram', video: 'Scaricare Video Instagram', photo: 'Scaricare Foto Instagram', stories: 'Scaricare Storie Instagram', highlights: 'Scaricare Contenuti in Evidenza Instagram', all: 'Scaricatore', igtv: 'IGTV' },
    ja: { reels: 'Instagram リール ダウンローダー', video: 'Instagram 動画 ダウンローダー', photo: 'Instagram 写真 保存', stories: 'Instagram ストーリーズ 保存', highlights: 'Instagram ハイライト 保存', all: 'ダウンローダー', igtv: 'IGTV' },
    ko: { reels: '인스타그램 릴스 다운로더', video: '인스타그램 동영상 다운로더', photo: '인스타그램 사진 다운로더', stories: '인스타그램 스토리 다운로더', highlights: '인스타그램 하이라이트 다운로더', all: '다운로더', igtv: 'IGTV' },
    ms: { reels: 'Pemuat Turun Reels Instagram', video: 'Pemuat Turun Video Instagram', photo: 'Pemuat Turun Foto Instagram', stories: 'Pemuat Turun Story Instagram', highlights: 'Pemuat Turun Sorotan Instagram', all: 'Pemuat Turun', igtv: 'IGTV' },
    nl: { reels: 'Instagram Reels Downloader', video: 'Instagram Video Downloader', photo: 'Instagram Foto Downloader', stories: 'Instagram Story Downloader', highlights: 'Instagram Hoogtepunten Downloader', all: 'Downloader', igtv: 'IGTV' },
    pl: { reels: 'Instagram Reels Downloader', video: 'Pobieranie Wideo z Instagrama', photo: 'Pobieranie Zdjęć z Instagrama', stories: 'Pobieranie Relacji z Instagrama', highlights: 'Pobieranie Wyróżnionych z Instagrama', all: 'Downloader', igtv: 'IGTV' },
    pt: { reels: 'Baixar Reels do Instagram', video: 'Baixar Vídeos do Instagram', photo: 'Baixar Fotos do Instagram', stories: 'Baixar Stories do Instagram', highlights: 'Baixar Destaques do Instagram', all: 'Baixador', igtv: 'IGTV' },
    ro: { reels: 'Descărcător Reels Instagram', video: 'Descărcător Video Instagram', photo: 'Descărcător Poze Instagram', stories: 'Descărcător Stories Instagram', highlights: 'Descărcător Highlights Instagram', all: 'Descărcător', igtv: 'IGTV' },
    ru: { reels: 'Скачать Reels из Instagram', video: 'Скачать видео из Instagram', photo: 'Скачать фото из Instagram', stories: 'Скачать Stories из Instagram', highlights: 'Скачать актуальное из Instagram', all: 'Загрузчик', igtv: 'IGTV' },
    sk: { reels: 'Instagram Reels Sťahovač', video: 'Instagram Video Sťahovač', photo: 'Instagram Fotky Sťahovač', stories: 'Instagram Príbehy Sťahovač', highlights: 'Instagram Výbery Sťahovač', all: 'Sťahovač', igtv: 'IGTV' },
    sr: { reels: 'Preuzimanje Instagram Reels', video: 'Preuzimanje Instagram Videa', photo: 'Preuzimanje Instagram Fotografija', stories: 'Preuzimanje Instagram Priča', highlights: 'Preuzimanje Instagram Izdvojenog', all: 'Preuzimač', igtv: 'IGTV' },
    sv: { reels: 'Ladda ner Instagram Reels', video: 'Ladda ner Instagram Video', photo: 'Ladda ner Instagram Foton', stories: 'Ladda ner Instagram Stories', highlights: 'Ladda ner Instagram Höjdpunkter', all: 'Nedladdare', igtv: 'IGTV' },
    th: { reels: 'ดาวน์โหลด Instagram Reels', video: 'ดาวน์โหลดวิดีโอ Instagram', photo: 'ดาวน์โหลดรูปภาพ Instagram', stories: 'ดาวน์โหลดสตอรี่ Instagram', highlights: 'ดาวน์โหลดไฮไลท์ Instagram', all: 'ดาวน์โหลด', igtv: 'IGTV' },
    tr: { reels: 'Instagram Reels İndir', video: 'Instagram Video İndir', photo: 'Instagram Fotoğraf İndir', stories: 'Instagram Hikaye İndir', highlights: 'Instagram Öne Çıkanlar İndir', all: 'İndirici', igtv: 'IGTV' },
    uk: { reels: 'Завантажити Instagram Reels', video: 'Завантажити відео з Instagram', photo: 'Завантажити фото з Instagram', stories: 'Завантажити Stories з Instagram', highlights: 'Завантажити збережене з Instagram', all: 'Завантажувач', igtv: 'IGTV' },
    vi: { reels: 'Tải Reels Instagram', video: 'Tải Video Instagram', photo: 'Tải Ảnh Instagram', stories: 'Tải Tin Stories Instagram', highlights: 'Tải Tin Nổi Bật Instagram', all: 'Trình tải', igtv: 'IGTV' },
    'zh-Hans': { reels: 'Instagram Reels 视频下载器', video: 'Instagram 视频下载器', photo: 'Instagram 图片下载器', stories: 'Instagram 快拍下载器', highlights: 'Instagram 精选集下载器', all: '下载器', igtv: 'IGTV' },
  };

  const localizedName = toolNameLocalized[locale]?.[type] || toolNameLocalized.en[type];

  return {
    slug,
    type,
    title: `${localizedName} – 1080p Full HD | Insta1000gram`,
    description: `Free ${localizedName}. Download online in original 1080p MP4 / JPG master quality without login or watermark. Fast, anonymous, and mobile-friendly.`,
    h1: localizedName,
    intro: `Save ${localizedName} directly to your device with our zero-compression accelerated download engine. Fast, 100% free, and anonymous with instant 1000 shortcut URL support.`,
    howToSteps: [
      { step: 1, title: '1. Copy the Link', desc: 'Copy the Instagram URL from your phone app or computer browser.' },
      { step: 2, title: '2. Paste URL', desc: 'Paste the link into insta1000gram and press Fetch & Download.' },
      { step: 3, title: '3. Save Media', desc: 'Click Download to save the original high-resolution file to your device.' },
    ],
    features: [
      'Original 1080p Ultra HD stream quality',
      'No watermark or compression loss',
      '100% anonymous & secure downloads',
      'Direct camera roll integration for iOS & Android',
    ],
    faqs: [
      {
        q: `Is this ${localizedName} free?`,
        a: 'Yes, insta1000gram is completely free with unlimited downloads and no account required.',
      },
      {
        q: 'What resolution is downloaded?',
        a: 'We extract the original source video or photo stream directly from Instagram CDNs up to 1080p 60fps.',
      },
      {
        q: 'Can I download on my mobile phone?',
        a: 'Yes, works seamlessly in Safari on iPhone/iPad and Google Chrome on Android.',
      },
      {
        q: 'How does the 1000 URL shortcut work?',
        a: 'Simply insert "1000" between "insta" and "gram" in any Instagram link (turning instagram.com into insta1000gram.com) to download instantly!',
      },
    ],
  };
}

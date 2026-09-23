export type SupportedLanguage =
  | 'ar'
  | 'bn'
  | 'cs'
  | 'de'
  | 'el'
  | 'en'
  | 'es'
  | 'fa'
  | 'fr'
  | 'hi'
  | 'hu'
  | 'id'
  | 'it'
  | 'ja'
  | 'ko'
  | 'ms'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sr'
  | 'sv'
  | 'th'
  | 'tr'
  | 'uk'
  | 'vi'
  | 'zh-Hans';

export type MediaType = 'all' | 'reels' | 'video' | 'photo' | 'stories' | 'igtv' | 'highlights';

export type DownloaderSlug =
  | 'reels-downloader'
  | 'video-downloader'
  | 'photo-downloader'
  | 'story-downloader'
  | 'highlights-downloader';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  font: string;
  active: boolean;
  flag: string;
}

export interface DownloaderPageMeta {
  slug: DownloaderSlug;
  type: MediaType;
  title: string;
  description: string;
  h1: string;
  intro: string;
  howToSteps: { step: number; title: string; desc: string }[];
  features: string[];
  faqs: { q: string; a: string }[];
}

export interface MediaFormat {
  id: string;
  quality: string;
  resolution: string;
  extension: 'mp4' | 'jpg' | 'mp3' | 'webm';
  size: string;
  downloadUrl: string;
  directUrl?: string;
  isAudio?: boolean;
}

export interface MediaSlide {
  id: string;
  index: number;
  type: 'photo' | 'video';
  thumbnail: string;
  url: string;
  directUrl?: string;
  videoUrl?: string;
  downloadUrl?: string;
  resolution: string;
}

export interface InstagramMediaResult {
  id: string;
  shortcode: string;
  sourceUrl: string;
  type: MediaType;
  title: string;
  caption: string;
  directUrl?: string;
  author: {
    username: string;
    fullName: string;
    avatar: string;
    isVerified: boolean;
  };
  thumbnail: string;
  duration?: string;
  likesCount: number;
  commentsCount: number;
  isCarousel?: boolean;
  slides?: MediaSlide[];
  formats: MediaFormat[];
  previewUrl?: string;
  videoUrl?: string;
  resolvedAt: string;
  networkLatencyMs: number;
}

export interface PseoPage {
  id: string;
  slug: string;
  mediaType: MediaType;
  lang: SupportedLanguage;
  targetKeyword: string;
  country?: string;
  device?: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  features: string[];
  faqs: { q: string; a: string }[];
  chunkId: number;
  lastmod: string;
  views: number;
  downloadsCount: number;
}

export interface PseoTemplateConfig {
  titlePattern: string;
  metaDescriptionPattern: string;
  h1Pattern: string;
  introPattern: string;
  chunkSize: number;
  totalGeneratedCount: number;
  keywords: string[];
  countries: string[];
  devices: string[];
}

export interface AdminAnalytics {
  totalDownloads: number;
  downloadsToday: number;
  crawlerHitsTotal: number;
  crawlerHitsToday: number;
  activePseoPages: number;
  totalSitemapsCount: number;
  averageLatencyMs: number;
  successRatePercent: number;
  mediaBreakdown: {
    reels: number;
    video: number;
    photo: number;
    stories: number;
    igtv: number;
    highlights?: number;
  };
  dailyTrend: { day: string; downloads: number; crawlers: number }[];
  recentCrawlerPings: {
    bot: 'Googlebot' | 'Bingbot' | 'Yandex' | 'Applebot';
    path: string;
    ip: string;
    status: number;
    time: string;
  }[];
}

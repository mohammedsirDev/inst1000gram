import { DownloaderSlug, MediaType } from '../types';

export interface DownloaderDefinition {
  slug: DownloaderSlug;
  type: MediaType;
  name: string;
  shortName: string;
  icon: 'Film' | 'Video' | 'Image' | 'History' | 'Sparkles';
  tagline: string;
  samplePlaceholder: string;
}

export const DOWNLOADER_PAGES: DownloaderDefinition[] = [
  {
    slug: 'reels-downloader',
    type: 'reels',
    name: 'Instagram Reels Downloader',
    shortName: 'Reels',
    icon: 'Film',
    tagline: 'Download Instagram Reels in 1080p Full HD without watermark',
    samplePlaceholder: 'https://www.instagram.com/reel/DcAS_m5zxaU/',
  },
  {
    slug: 'video-downloader',
    type: 'video',
    name: 'Instagram Video Downloader',
    shortName: 'Video',
    icon: 'Video',
    tagline: 'Download Instagram feed videos and IGTV in original MP4 high definition',
    samplePlaceholder: 'https://www.instagram.com/p/C_abc123XYZ/',
  },
  {
    slug: 'photo-downloader',
    type: 'photo',
    name: 'Instagram Photo Downloader',
    shortName: 'Photo',
    icon: 'Image',
    tagline: 'Save high-resolution Instagram photos and carousel albums in full quality JPG',
    samplePlaceholder: 'https://www.instagram.com/p/Ddl1lsKjgw_/',
  },
  {
    slug: 'story-downloader',
    type: 'stories',
    name: 'Instagram Story Downloader',
    shortName: 'Stories',
    icon: 'History',
    tagline: 'Save and view Instagram Stories anonymously in high quality',
    samplePlaceholder: 'https://www.instagram.com/stories/username/3991863628785469455/',
  },
  {
    slug: 'highlights-downloader',
    type: 'highlights',
    name: 'Instagram Highlights Downloader',
    shortName: 'Highlights',
    icon: 'Sparkles',
    tagline: 'Download profile highlight reels and archived story albums anonymously',
    samplePlaceholder: 'https://www.instagram.com/stories/highlights/17923849123456789/',
  },
];

export interface GuideDefinition {
  slug: string;
  title: string;
  category: MediaType;
  readTime: string;
}

export const GUIDE_PAGES: GuideDefinition[] = [
  {
    slug: 'how-to-download-instagram-reels',
    title: 'How to Download Instagram Reels in 1080p Full HD',
    category: 'reels',
    readTime: '3 min read',
  },
  {
    slug: 'how-to-download-instagram-reels-on-iphone',
    title: 'How to Save Instagram Reels Directly to iPhone Camera Roll',
    category: 'reels',
    readTime: '4 min read',
  },
  {
    slug: 'how-to-download-instagram-reels-on-android',
    title: 'How to Download Instagram Reels on Android Devices',
    category: 'reels',
    readTime: '3 min read',
  },
  {
    slug: 'how-to-download-instagram-stories',
    title: 'How to Download Instagram Stories Anonymously Without Login',
    category: 'stories',
    readTime: '4 min read',
  },
  {
    slug: 'how-to-download-instagram-highlights',
    title: 'How to Save Instagram Highlights Forever in High Quality',
    category: 'highlights',
    readTime: '3 min read',
  },
  {
    slug: 'how-to-save-instagram-photos',
    title: 'How to Save Full Resolution Instagram Photos and Carousels',
    category: 'photo',
    readTime: '3 min read',
  },
  {
    slug: 'how-to-download-instagram-videos',
    title: 'How to Download Instagram Feed Videos in MP4 Format',
    category: 'video',
    readTime: '3 min read',
  },
];

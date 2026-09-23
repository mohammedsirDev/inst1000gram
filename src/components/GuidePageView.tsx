import React, { useEffect, useState } from 'react';
import { GuideDefinition, DOWNLOADER_PAGES } from '../config/downloaders';
import { SupportedLanguage, DownloaderSlug, InstagramMediaResult } from '../types';
import { DownloaderBox } from './DownloaderBox';
import { ResultCard } from './ResultCard';
import { ChevronRight, ArrowLeft, Clock, ShieldCheck, CheckCircle2, Smartphone, Monitor } from 'lucide-react';

interface GuidePageViewProps {
  guide: GuideDefinition;
  locale: SupportedLanguage;
  onNavigateHome: () => void;
  onNavigateTool: (slug: DownloaderSlug) => void;
  onBack: () => void;
}

export const GuidePageView: React.FC<GuidePageViewProps> = ({
  guide,
  locale,
  onNavigateHome,
  onNavigateTool,
  onBack,
}) => {
  const [downloadResult, setDownloadResult] = useState<InstagramMediaResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = `${guide.title} (Step-by-Step Guide) | Insta1000gram`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [guide]);

  // Find matching tool
  const matchingTool = DOWNLOADER_PAGES.find((p) => p.type === guide.category) || DOWNLOADER_PAGES[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top breadcrumb */}
      <nav className="bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-slate-700 hover:text-pink-600 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>Back</span>
            </button>
            <span>/</span>
            <button onClick={onNavigateHome} className="hover:text-pink-600 transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-pink-600 font-bold truncate max-w-xs">{guide.title}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{guide.readTime}</span>
          </div>
        </div>
      </nav>

      {/* Guide Content Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase bg-pink-100 text-pink-700 mb-4">
          <span>Tutorial</span>
          <span>•</span>
          <span className="uppercase">{guide.category}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {guide.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Learn how to save Instagram content effortlessly to your phone or computer in original 1080p high definition without watermarks or installing untrusted third-party apps.
        </p>

        {/* Embedded Downloader Box for instant action */}
        <div className="my-8">
          <DownloaderBox
            activeTab={guide.category}
            onSelectTab={() => {}}
            onResult={(res) => setDownloadResult(res)}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>

        {downloadResult && (
          <div className="my-8">
            <ResultCard
              result={downloadResult}
              onClear={() => setDownloadResult(null)}
            />
          </div>
        )}

        {/* Step-by-Step Walkthrough */}
        <div className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm mt-10">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
            Step-by-Step Instructions
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-pink-500 text-white font-black flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  Open Instagram &amp; Copy the Share Link
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-1.5 leading-relaxed">
                  Open the Instagram app on iOS or Android (or visit instagram.com in any desktop browser). Find the Reel, post, story, or video you wish to save. Tap the <strong>Share</strong> icon (paper airplane) or the <strong>three dots (...)</strong> in the top-right corner, then tap <strong>Copy Link</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  Paste the URL into insta1000gram
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-1.5 leading-relaxed">
                  Navigate to <strong>insta1000gram.com</strong> in your browser (Safari, Chrome, Firefox, or Edge). Paste the copied Instagram link into the search box above and press <strong>Fetch &amp; Download</strong>.
                </p>
                <div className="mt-3 p-3 bg-pink-50 rounded-xl border border-pink-200/80 text-xs sm:text-sm text-pink-900">
                  💡 <strong>Pro Shortcut:</strong> You can also just type <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-pink-200">1000</code> between "insta" and "gram" in the Instagram URL (e.g. <code className="font-mono">insta1000gram.com/reels/...</code>) and hit Enter!
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  Save 1080p MP4 or JPG to Your Camera Roll
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-1.5 leading-relaxed">
                  Our system will extract the highest resolution 1080p 60fps video stream or master JPG photo. Click the <strong>Download</strong> button to save directly to your iPhone Photos app, Android Gallery, or computer Downloads folder.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Device-Specific Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">iOS (iPhone &amp; iPad) Tip</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Always use Safari for best results on iOS. When you tap Download, Safari will prompt "Do you want to download this file?". Tap <strong>Download</strong>, then tap the blue download arrow in the Safari address bar, select the video, tap the Share icon, and choose <strong>Save Video</strong> to put it in your camera roll.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Android &amp; PC Tip</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              On Android, Google Chrome will automatically save the video to your internal storage and make it immediately visible in Google Photos, Samsung Gallery, or VLC Player without needing extra permissions.
            </p>
          </div>
        </div>

        {/* Related Tool CTA */}
        <div className="mt-10 p-8 rounded-3xl bg-linear-to-r from-slate-900 to-purple-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-pink-400">
              Ready to Download?
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-1">
              Use the Dedicated {matchingTool.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
              Fast, anonymous, and watermark-free Instagram media downloads.
            </p>
          </div>
          <button
            onClick={() => onNavigateTool(matchingTool.slug)}
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-pink-600/30 transition-all shrink-0"
          >
            Open {matchingTool.shortName} Downloader
          </button>
        </div>
      </article>
    </div>
  );
};

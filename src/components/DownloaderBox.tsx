import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MediaType, InstagramMediaResult } from '../types';
import { Download, Clipboard, X, Loader2, Sparkles, Wifi, ShieldCheck, Film, Video, Image, History, Tv } from 'lucide-react';

interface DownloaderBoxProps {
  activeTab: MediaType;
  onSelectTab: (tab: MediaType) => void;
  onResult: (result: InstagramMediaResult) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  initialUrl?: string;
  autoTrigger?: boolean;
}

export const DownloaderBox: React.FC<DownloaderBoxProps> = ({
  activeTab,
  onSelectTab,
  onResult,
  isLoading,
  setIsLoading,
  initialUrl,
  autoTrigger,
}) => {
  const { translations } = useLanguage();
  const [url, setUrl] = useState(initialUrl || '');
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [retryCount, setRetryCount] = useState<number>(0);

  const sampleLinks: { label: string; url: string; type: MediaType }[] = [
    {
      label: '🎬 Verified Reel (1080p)',
      url: 'https://www.instagram.com/reel/DdmbSgYx2k6/?stkn=Y3AzZmQ5N3Jwa2d0',
      type: 'reels',
    },
    {
      label: '📸 Verified Post (Carousel)',
      url: 'https://www.instagram.com/p/Ddl1lsKjgw_/?stkn=MWFvZWZocGs3ODZiZw==',
      type: 'photo',
    },
    {
      label: '✨ Verified Story (Videos)',
      url: 'https://www.instagram.com/stories/chikafakeid/3991863628785469455',
      type: 'stories',
    },
  ];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setError(null);
      }
    } catch {
      setUrl('https://www.instagram.com/reel/DdmbSgYx2k6/?stkn=Y3AzZmQ5N3Jwa2d0');
      setError(null);
    }
  };

  const handleDownload = async (customUrl?: string) => {
    let targetUrl = (customUrl || url).trim();
    if (!targetUrl) {
      setError(translations.inputPlaceholder);
      return;
    }

    // Auto-normalize if user typed or pasted insta1000gram.com or inst1000gram.com URL
    if (targetUrl.includes('insta1000gram.com') || targetUrl.includes('inst1000gram.com')) {
      targetUrl = targetUrl
        .replace(/https?:\/\/(www\.)?insta(1000)?gram\.com/i, 'https://www.instagram.com')
        .replace(/https?:\/\/(www\.)?inst(1000)?gram\.com/i, 'https://www.instagram.com');
      setUrl(targetUrl);
    }

    setError(null);
    setIsLoading(true);
    setRetryCount(0);
    setStatusMessage(translations.resolvingText);

    try {
      const stepTimer = setTimeout(() => {
        setStatusMessage(translations.processingStream);
      }, 500);

      const res = await fetch('/api/instagram/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: targetUrl,
          mediaType: activeTab,
        }),
      });

      clearTimeout(stepTimer);

      if (!res.ok) {
        const errorJson = await res.json().catch(() => null);
        throw new Error(
          errorJson?.error ||
          'Could not retrieve media from this Instagram link. The post may be private, age-restricted, or removed by Instagram.'
        );
      }

      const data: InstagramMediaResult = await res.json();
      onResult(data);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err?.message || 'Unable to resolve Instagram media stream. Please verify the URL.');
    } finally {
      setIsLoading(false);
      setStatusMessage('');
    }
  };

  // Auto-trigger if initialUrl and autoTrigger passed
  React.useEffect(() => {
    if (initialUrl && autoTrigger) {
      setUrl(initialUrl);
      handleDownload(initialUrl);
    }
  }, [initialUrl, autoTrigger]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Downloader Card Box */}
      <div className="bg-white rounded-3xl p-4 sm:p-7 shadow-xl shadow-slate-200/60 border border-slate-200/90 relative overflow-hidden transition-all">
        {/* Subtle accent top border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600" />

        {/* Tab Pills for Filter */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 mb-6 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {[
            { id: 'reels', label: translations.navReels, icon: <Film className="w-3.5 h-3.5" /> },
            { id: 'video', label: translations.navVideo, icon: <Video className="w-3.5 h-3.5" /> },
            { id: 'photo', label: translations.navPhoto, icon: <Image className="w-3.5 h-3.5" /> },
            { id: 'stories', label: translations.navStories, icon: <History className="w-3.5 h-3.5" /> },
            { id: 'highlights', label: translations.navHighlights, icon: <Sparkles className="w-3.5 h-3.5" /> },
            { id: 'igtv', label: translations.navIgtv, icon: <Tv className="w-3.5 h-3.5" /> },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id as MediaType)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Input Form */}
        <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleDownload();
              }}
              placeholder={translations.inputPlaceholder}
              className="w-full h-14 sm:h-16 pl-4 pr-24 rtl:pr-4 rtl:pl-24 bg-slate-50 border-2 border-slate-200 focus:border-pink-500 focus:bg-white focus:outline-none rounded-2xl text-sm sm:text-base text-slate-900 placeholder-slate-400 transition-all font-medium"
            />

            {/* Clear and Paste buttons inside input */}
            <div className="absolute top-1/2 -translate-y-1/2 right-2.5 rtl:right-auto rtl:left-2.5 flex items-center gap-1.5">
              {url && (
                <button
                  onClick={() => setUrl('')}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handlePaste}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs hover:text-pink-600 transition-all"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{translations.pasteBtn}</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleDownload()}
            className="h-14 sm:h-16 px-6 sm:px-8 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-base sm:text-lg rounded-2xl shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{translations.resolvingText.split('...')[0]}</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>{translations.downloadBtn}</span>
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Dynamic Loading Step Notification */}
        {isLoading && statusMessage && (
          <div className="mt-3.5 p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl flex items-center justify-between text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-2.5">
              <Loader2 className="w-4 h-4 text-pink-500 animate-spin" />
              <span className="font-semibold text-slate-800">{statusMessage}</span>
            </div>
            {retryCount > 0 && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-mono text-[11px] rounded-md font-bold">
                Relay Switch #{retryCount}
              </span>
            )}
          </div>
        )}

        {/* Quick Sample Links & Network Resilience Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-slate-600 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              {translations.quickTestLabel}
            </span>
            {sampleLinks.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setUrl(s.url);
                  onSelectTab(s.type);
                  handleDownload(s.url);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-pink-50 hover:text-pink-600 text-slate-700 rounded-lg font-medium transition-colors border border-slate-200/60"
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
            <Wifi className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[11px]">{translations.reliableNetworkBadge}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

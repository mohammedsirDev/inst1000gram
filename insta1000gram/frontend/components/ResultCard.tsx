import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import { InstagramMediaResult, MediaFormat } from '../types';
import {
  Download,
  CheckCircle2,
  Film,
  Image as ImageIcon,
  Music,
  Heart,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  Play,
  Share2,
  Sparkles,
  QrCode,
  Smartphone,
  Copy,
  Check,
  X,
  Radio,
  Loader2,
} from 'lucide-react';

interface ResultCardProps {
  result: InstagramMediaResult;
  onClear: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onClear }) => {
  const { translations } = useLanguage();
  const [downloadingFormatId, setDownloadingFormatId] = useState<string | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<{ text: string; url?: string } | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [selectedQrFormat, setSelectedQrFormat] = useState<MediaFormat | null>(null);
  const [qrMode, setQrMode] = useState<'direct' | 'proxy'>('direct');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [qrShortUrl, setQrShortUrl] = useState<string>('');
  const [isGeneratingQr, setIsGeneratingQr] = useState<boolean>(false);

  const fallbackAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(result.author.username || 'IG')}&background=E1306C&color=fff&size=160&bold=true`;
  const [authorAvatarSrc, setAuthorAvatarSrc] = useState<string>(result.author.avatar || fallbackAvatarUrl);

  useEffect(() => {
    setAuthorAvatarSrc(result.author.avatar || fallbackAvatarUrl);
  }, [result.author.avatar, result.author.username]);

  const currentSlide = result.slides && result.slides[activeSlideIndex];
  const isSlideVideo = currentSlide ? currentSlide.type === 'video' : (result.type !== 'photo' && Boolean(result.videoUrl));
  const activeVideoUrl = currentSlide?.videoUrl || (currentSlide?.type === 'video' ? currentSlide.url : result.videoUrl);
  const activeThumbnail = currentSlide?.thumbnail || result.thumbnail;

  // Primary 1080p format
  const primaryFormat = result.formats.find(f => f.quality.includes('1080p')) || result.formats[0];
  const activeFormatForQr = selectedQrFormat || primaryFormat;

  const directCandidate = activeFormatForQr?.directUrl || result.directUrl || (currentSlide?.directUrl) || activeVideoUrl || result.sourceUrl;
  const proxyCandidate = activeFormatForQr?.downloadUrl || (currentSlide?.downloadUrl) || primaryFormat?.downloadUrl || '';
  const fullProxyUrl = proxyCandidate.startsWith('http') ? proxyCandidate : `${window.location.origin}${proxyCandidate}`;
  const fullQrTargetUrl = (qrMode === 'direct' && directCandidate) ? directCandidate : fullProxyUrl;

  // Generate ultra-short, camera-scannable QR code whenever the modal opens or format changes
  useEffect(() => {
    if (!isQrModalOpen) return;

    let isMounted = true;
    setIsGeneratingQr(true);
    
    const targetMediaUrl = fullQrTargetUrl;
    const targetFilename = `insta1000gram_${result.type}_${(activeFormatForQr?.quality || '1080p').replace(/[^a-zA-Z0-9]/g, '_')}.${activeFormatForQr?.extension || 'mp4'}`;

    fetch('/api/qr/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetUrl: targetMediaUrl,
        filename: targetFilename,
        quality: activeFormatForQr?.quality || '1080p Ultra HD',
        thumbnail: activeThumbnail,
        author: result.author.username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const mobileUrl = data.shortUrl || `${window.location.origin}${data.path}`;
        setQrShortUrl(mobileUrl);
        setIsGeneratingQr(false);
        setQrCodeDataUrl(
          `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=4&data=${encodeURIComponent(mobileUrl)}`
        );
      })
      .catch(() => {
        if (!isMounted) return;
        setIsGeneratingQr(false);
        setQrShortUrl(targetMediaUrl);
        setQrCodeDataUrl(
          `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=4&data=${encodeURIComponent(targetMediaUrl)}`
        );
      });

    return () => {
      isMounted = false;
    };
  }, [isQrModalOpen, activeFormatForQr, qrMode]);

  const triggerDirectDownload = (url: string, filename: string, formatId?: string) => {
    if (formatId) setDownloadingFormatId(formatId);
    setDownloadSuccessMessage({
      text: 'Download initiated! If your browser blocks popups, use the direct link below.',
      url,
    });

    // Native user gesture download
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.target = '_self';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    setTimeout(() => {
      setDownloadingFormatId(null);
    }, 1200);
  };

  const handleTriggerDownload = (format: MediaFormat) => {
    const filename = `insta1000gram_${result.type}_${format.quality.replace(/[^a-zA-Z0-9]/g, '_')}.${format.extension}`;
    triggerDirectDownload(format.downloadUrl, filename, format.id);
  };

  const handleCopyQrLink = () => {
    navigator.clipboard.writeText(fullQrTargetUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/70 border border-slate-200/90 relative overflow-hidden">
        {/* Top Header: Author and Verified Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 shadow-xs shrink-0">
              <img
                src={authorAvatarSrc}
                alt={result.author.username}
                loading="eager"
                onError={() => {
                  setAuthorAvatarSrc(
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(result.author.username || 'IG')}&background=E1306C&color=fff&size=160&bold=true`
                  );
                }}
                className="w-full h-full rounded-full object-cover bg-slate-900 border border-white"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  @{result.author.username}
                </span>
                {result.author.isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-sky-500 fill-sky-500 text-white shrink-0" />
                )}
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-pink-700 shrink-0">
                  {result.type}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {result.author.fullName}
              </p>
            </div>
          </div>

          {/* Social Stats, Latency, and Send to Phone Button */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-semibold self-end sm:self-center">
            <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              {result.likesCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
              <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
              {result.commentsCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg border border-emerald-200/60 font-mono">
              <Zap className="w-3 h-3 text-emerald-500" />
              {result.networkLatencyMs}ms
            </span>
            <button
              onClick={() => {
                setSelectedQrFormat(primaryFormat);
                setIsQrModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer"
              title="Scan QR code to transfer directly to mobile phone"
            >
              <QrCode className="w-3.5 h-3.5 text-pink-400" />
              <span>Phone QR</span>
            </button>
          </div>
        </div>

        {/* Content Layout: Preview Media + Download Options */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          {/* Media Preview Column */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full relative rounded-2xl overflow-hidden bg-slate-950 aspect-[4/5] shadow-inner group flex items-center justify-center">
              {isSlideVideo && activeVideoUrl ? (
                <video
                  key={activeVideoUrl}
                  controls
                  playsInline
                  autoPlay={false}
                  preload="metadata"
                  poster={activeThumbnail}
                  className="w-full h-full object-contain bg-black rounded-2xl"
                  src={activeVideoUrl}
                />
              ) : (
                <img
                  src={activeThumbnail}
                  alt={result.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {/* Media Type Badge Overlay */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 pointer-events-none">
                {isSlideVideo ? (
                  <Film className="w-3.5 h-3.5 text-pink-400" />
                ) : (
                  <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
                )}
                <span className="uppercase">{currentSlide ? `${result.type} #${activeSlideIndex + 1}` : result.type}</span>
                {result.duration && <span>• {result.duration}</span>}
              </div>

              {/* Original Quality Ribbon */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-xl text-center shadow-lg border border-white/40 pointer-events-none">
                <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {translations.readyInHD}
                </span>
              </div>
            </div>

            {/* Slide / Story Thumbnails if multi-post */}
            {result.slides && result.slides.length > 1 && (
              <div className="w-full mt-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-slate-700">
                    {result.type === 'stories' ? 'Stories List' : 'Carousel Slides'} ({result.slides.length} items):
                  </p>
                  <span className="text-[11px] text-pink-600 font-semibold">
                    Selected: #{activeSlideIndex + 1}
                  </span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {result.slides.map((slide, idx) => (
                    <button
                      key={slide.id || idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeSlideIndex === idx
                          ? 'border-pink-600 scale-105 shadow-md ring-2 ring-pink-400/50'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                      title={`Select Slide #${idx + 1}`}
                    >
                      <img
                        src={slide.thumbnail}
                        alt={`Slide ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 bg-black/75 text-white text-[9px] px-1 font-bold">
                        #{idx + 1}
                      </span>
                      {slide.type === 'video' && (
                        <div className="absolute top-1 left-1 bg-black/60 rounded-full p-0.5">
                          <Play className="w-2.5 h-2.5 text-white fill-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Title, Caption, Formats List */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug line-clamp-2">
                {result.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {result.caption}
              </p>

              {/* Download Success Notice with Direct Mirror Link */}
              {downloadSuccessMessage && (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs sm:text-sm font-semibold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{downloadSuccessMessage.text}</span>
                  </div>
                  {downloadSuccessMessage.url && (
                    <a
                      href={downloadSuccessMessage.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors whitespace-nowrap self-end sm:self-auto"
                    >
                      Mirror / Open File ↗
                    </a>
                  )}
                </div>
              )}

              {/* Active Slide / Story Download Action Box */}
              {currentSlide && (
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 border border-pink-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase text-pink-700 tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                      Download {result.type === 'stories' ? `Story #${activeSlideIndex + 1}` : `Slide #${activeSlideIndex + 1}`}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase">
                      {currentSlide.type === 'video' ? 'MP4 Video' : 'JPG Image'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={currentSlide.downloadUrl || currentSlide.url}
                      download={`insta1000gram_${result.type}_${activeSlideIndex + 1}.${currentSlide.type === 'video' ? 'mp4' : 'jpg'}`}
                      onClick={() => {
                        setDownloadSuccessMessage({
                          text: `Story ${currentSlide.type === 'video' ? 'Video' : 'Photo'} #${activeSlideIndex + 1} download initiated!`,
                          url: currentSlide.downloadUrl || currentSlide.url,
                        });
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download {currentSlide.type === 'video' ? 'Story Video (MP4)' : 'Story Image (JPG)'}</span>
                    </a>

                    <a
                      href={currentSlide.downloadUrl || currentSlide.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white border border-pink-200 text-pink-700 hover:bg-pink-100/50 transition-colors"
                      title="Direct Link in New Tab / Mirror"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              {/* Available Formats Section */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Available Streams &amp; Resolutions
                  </span>
                  <button
                    onClick={() => {
                      setSelectedQrFormat(primaryFormat);
                      setIsQrModalOpen(true);
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Scan with Phone</span>
                  </button>
                </div>

                {result.formats.map((fmt) => {
                  const isCurrentLoading = downloadingFormatId === fmt.id;
                  const isAudio = fmt.isAudio;

                  return (
                    <div
                      key={fmt.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-2xl border border-slate-200 hover:border-pink-300 hover:bg-pink-50/20 bg-slate-50/50 transition-all gap-3"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isAudio
                              ? 'bg-amber-100 text-amber-800'
                              : fmt.quality.includes('1080p')
                              ? 'bg-pink-100 text-pink-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {isAudio ? <Music className="w-4 h-4" /> : fmt.extension.toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                              {fmt.quality}
                            </span>
                            {fmt.quality.includes('1080p') && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500 text-white shrink-0">
                                ULTRA HD
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 font-medium block truncate">
                            {fmt.resolution} • {fmt.size}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                        {/* Direct Native Anchor Download */}
                        <a
                          href={fmt.downloadUrl}
                          download={`insta1000gram_${result.type}_${fmt.quality.replace(/[^a-zA-Z0-9]/g, '_')}.${fmt.extension}`}
                          onClick={() => {
                            setDownloadSuccessMessage({
                              text: `${fmt.quality} download started!`,
                              url: fmt.downloadUrl,
                            });
                          }}
                          className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                            fmt.quality.includes('1080p')
                              ? 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          <Download className="w-3.5 h-3.5 shrink-0" />
                          <span>{translations.downloadFileBtn}</span>
                        </a>

                        {/* Phone QR Code */}
                        <button
                          onClick={() => {
                            setSelectedQrFormat(fmt);
                            setIsQrModalOpen(true);
                          }}
                          className="p-2.5 sm:p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-pink-600 hover:border-pink-300 transition-colors cursor-pointer shrink-0"
                          title={`Scan QR code for ${fmt.quality} on phone`}
                        >
                          <QrCode className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                        </button>

                        {/* Mirror in New Tab */}
                        <a
                          href={fmt.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 sm:p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-pink-600 hover:border-pink-200 transition-colors shrink-0"
                          title="Open in New Tab / Mirror"
                        >
                          <ExternalLink className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* All Stories Quick Download List if Stories */}
              {result.slides && result.slides.length > 1 && (
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                    Download Each Story Individually ({result.slides.length} Available)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.slides.map((s, idx) => (
                      <a
                        key={s.id || idx}
                        href={s.downloadUrl || s.url}
                        download={`insta1000gram_story_${idx + 1}.${s.type === 'video' ? 'mp4' : 'jpg'}`}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-pink-300 hover:bg-pink-50/30 text-xs transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-[10px] flex items-center justify-center text-slate-700">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-slate-800">
                            Story #{idx + 1} ({s.type === 'video' ? 'MP4' : 'JPG'})
                          </span>
                        </div>
                        <Download className="w-3.5 h-3.5 text-pink-600" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={result.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium transition-colors"
              >
                <span>View original post on Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={onClear}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Download Another Link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHONE QR CODE TRANSFER MODAL (Rendered to document.body via Portal)       */}
      {/* ========================================================================= */}
      {isQrModalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 z-[100000]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-pink-500/20 shrink-0">
                  <QrCode className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-1.5 flex-wrap">
                    <span>Scan to Phone</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-pink-100 text-pink-700 uppercase">
                      {activeFormatForQr?.quality.split(' ')[0] || '1080p'}
                    </span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    Point camera to save directly into Camera Roll / Gallery
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer shrink-0"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Target Stream Mode Selector */}
            <div className="mt-3.5 p-1 bg-slate-100 rounded-xl flex items-center text-xs font-bold">
              <button
                onClick={() => setQrMode('direct')}
                className={`flex-1 py-1.5 px-2.5 sm:px-3 rounded-lg transition-all cursor-pointer text-[11px] sm:text-xs ${
                  qrMode === 'direct'
                    ? 'bg-white text-pink-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ⚡ Direct Mobile Stream
              </button>
              <button
                onClick={() => setQrMode('proxy')}
                className={`flex-1 py-1.5 px-2.5 sm:px-3 rounded-lg transition-all cursor-pointer text-[11px] sm:text-xs ${
                  qrMode === 'proxy'
                    ? 'bg-white text-pink-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🌐 Download Proxy
              </button>
            </div>

            {/* QR Code Container with sleek scan frame */}
            <div className="my-4 sm:my-5 flex flex-col items-center">
              <div className="p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-xl flex flex-col items-center relative w-full max-w-[250px] min-h-[220px] justify-center">
                {isGeneratingQr ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin text-pink-500 mb-2" />
                    <span className="text-xs font-semibold">Generating HD QR code...</span>
                  </div>
                ) : qrCodeDataUrl ? (
                  <>
                    <img
                      src={qrCodeDataUrl}
                      alt="Scan QR code with phone camera"
                      width={220}
                      height={220}
                      className="rounded-xl block shadow-2xs max-w-[190px] sm:max-w-[220px] w-full h-auto aspect-square object-contain"
                      loading="eager"
                    />
                    <div className="mt-2.5 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-slate-100 text-slate-800">
                        <Zap className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        {activeFormatForQr?.quality || '1080p Ultra HD'} • Scans in 0.1s
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-xs text-rose-500 p-4 font-bold">Failed to render QR. Use the link below.</div>
                )}
              </div>
              {qrShortUrl && (
                <p className="mt-2 text-[11px] text-slate-400 font-mono tracking-tight break-all text-center">
                  {qrShortUrl.replace(/^https?:\/\//, '')}
                </p>
              )}
            </div>

            {/* Platform Instructions */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <span className="text-base leading-none shrink-0">🍏</span>
                <div>
                  <p className="font-bold text-slate-900">iPhone / iPad (iOS):</p>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Open Camera app → aim at code → tap yellow banner → tap <strong>Download</strong>.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <span className="text-base leading-none shrink-0">🤖</span>
                <div>
                  <p className="font-bold text-slate-900">Android (Samsung, Pixel, Xiaomi):</p>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Open Camera or Google Lens → tap popup link → file saves directly into <strong>Gallery / Downloads</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Bar - Fully flexible on mobile, tablet, and desktop */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(qrShortUrl || fullQrTargetUrl);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer shadow-xs"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Mobile Link</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={qrShortUrl || fullQrTargetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  title="Preview this exact link in your browser"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Test Link</span>
                </a>

                <button
                  onClick={() => setIsQrModalOpen(false)}
                  className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

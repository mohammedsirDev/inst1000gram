'use client';

import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  slot: 'top_banner' | 'below_downloader' | 'pseo_content' | 'footer_banner';
  adCode?: string | null;
  className?: string;
}

export default function AdSlot({ slot, adCode, className = '' }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adCode || !containerRef.current) return;

    // Clear previous ad content safely
    containerRef.current.innerHTML = '';

    // Insert new ad script/HTML and execute embedded scripts
    const range = document.createRange();
    const fragment = range.createContextualFragment(adCode);
    containerRef.current.appendChild(fragment);
  }, [adCode]);

  // If no ad is active for this slot, don't show any blank spaces or broken borders
  if (!adCode) {
    return null;
  }

  return (
    <div className={`w-full flex flex-col items-center justify-center my-6 ${className}`}>
      <span className="text-[10px] tracking-wider uppercase text-slate-500 font-semibold mb-1">
        Sponsored Advertisement
      </span>
      <div
        ref={containerRef}
        data-ad-slot={slot}
        className="w-full flex justify-center items-center overflow-hidden min-h-[50px] sm:min-h-[90px] rounded-xl bg-slate-900/40 border border-slate-800/60 p-2"
      />
    </div>
  );
}

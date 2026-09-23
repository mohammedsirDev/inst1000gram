import React, { useState, useEffect } from 'react';
import { AdminAnalytics } from '../../types';
import { Download, Bot, Layers, Zap, TrendingUp, CheckCircle, Clock, Server, ArrowUpRight } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Analytics load error:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !analytics) {
    return (
      <div className="p-8 text-center text-slate-500">
        Loading admin telemetry &amp; crawler metrics...
      </div>
    );
  }

  const maxDaily = Math.max(...analytics.dailyTrend.map((d) => d.downloads));

  return (
    <div className="space-y-6">
      {/* Django Admin Breadcrumbs Banner */}
      <div className="bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 flex items-center gap-2">
        <span className="text-slate-800">Home</span>
        <span>›</span>
        <span className="text-slate-800">Telemetry &amp; Visualizations</span>
        <span>›</span>
        <span className="text-pink-600 font-bold">Live Overview</span>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Downloads */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Total Downloads
            </span>
            <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
            {analytics.totalDownloads.toLocaleString()}
          </p>
          <div className="mt-2 flex items-center text-xs text-emerald-600 font-semibold gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{analytics.downloadsToday.toLocaleString()} today</span>
          </div>
        </div>

        {/* Crawler Index Hits */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Search Bot Hits
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
            {analytics.crawlerHitsTotal.toLocaleString()}
          </p>
          <div className="mt-2 flex items-center text-xs text-purple-600 font-semibold gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{analytics.crawlerHitsToday.toLocaleString()} bot requests</span>
          </div>
        </div>

        {/* Active pSEO Pages */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Active Landing Pages
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
            {analytics.activePseoPages.toLocaleString()}
          </p>
          <div className="mt-2 flex items-center text-xs text-blue-600 font-semibold gap-1">
            <span>Dynamic pSEO Clusters Active</span>
          </div>
        </div>

        {/* Network Resilience */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Network Health
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900 tracking-tight">
            {analytics.successRatePercent}%
          </p>
          <div className="mt-2 flex items-center text-xs text-slate-500 font-semibold gap-1 font-mono">
            <span>Avg Latency: {analytics.averageLatencyMs}ms</span>
          </div>
        </div>
      </div>

      {/* Main Charts Row: 7-Day Download Trend & Content Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 7-Day Volume Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Download Volume vs Crawler Indexing Traffic
              </h3>
              <p className="text-xs text-slate-500">
                Daily activity across Instagram download requests and search bots (Googlebot/Bing)
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
              Last 7 Days
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-2 pt-4 border-b border-slate-200">
            {analytics.dailyTrend.map((item, idx) => {
              const heightPercent = Math.round((item.downloads / maxDaily) * 100);
              const crawlerHeightPercent = Math.round((item.crawlers / maxDaily) * 100);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-12 bg-slate-900 text-white text-[10px] py-1 px-2 rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    {item.day}: {item.downloads.toLocaleString()} DLs / {item.crawlers.toLocaleString()} Crawls
                  </div>

                  <div className="w-full flex items-end justify-center gap-1 h-36">
                    {/* Downloads Bar */}
                    <div
                      className="w-1/2 bg-gradient-to-t from-pink-600 to-rose-400 rounded-t-md transition-all group-hover:brightness-110"
                      style={{ height: `${heightPercent}%` }}
                    />
                    {/* Crawler Bar */}
                    <div
                      className="w-1/3 bg-slate-300 rounded-t-md transition-all group-hover:bg-slate-400"
                      style={{ height: `${crawlerHeightPercent}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 mt-2">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-pink-500" />
              <span>User Downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-300" />
              <span>Bot XML Ingestion</span>
            </div>
          </div>
        </div>

        {/* Format Distribution Donut/Bar Visualization */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Content Format Distribution
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Breakdown of resolved media formats by user demand
            </p>

            <div className="space-y-3.5">
              {[
                { label: 'Reels (1080p MP4)', percent: analytics.mediaBreakdown.reels, color: 'bg-pink-500' },
                { label: 'Standard Videos (MP4)', percent: analytics.mediaBreakdown.video, color: 'bg-rose-500' },
                { label: 'Photos & Carousels (JPG)', percent: analytics.mediaBreakdown.photo, color: 'bg-purple-500' },
                { label: 'Stories & Highlights', percent: analytics.mediaBreakdown.stories, color: 'bg-amber-500' },
                { label: 'IGTV Long-form (MP4)', percent: analytics.mediaBreakdown.igtv, color: 'bg-blue-500' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>{item.label}</span>
                    <span className="font-mono">{item.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Adaptive CDN: Akamai + Cloudflare Relay</span>
            <span className="text-emerald-600 font-bold">100% Operational</span>
          </div>
        </div>
      </div>

      {/* Real-time Crawler Hits Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-purple-600" />
            <h3 className="font-extrabold text-slate-900 text-sm">
              Recent Search Engine Crawler Ingestion Logs
            </h3>
          </div>
          <span className="text-xs font-mono bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-bold">
            Live Stream
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Search Bot</th>
                <th className="px-6 py-3">Ingested Search Path</th>
                <th className="px-6 py-3">Crawler IP</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {analytics.recentCrawlerPings.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-3.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-bold text-slate-900">{log.bot}</span>
                  </td>
                  <td className="px-6 py-3.5 font-mono text-pink-600 font-bold">
                    {log.path}
                  </td>
                  <td className="px-6 py-3.5 font-mono text-slate-500">
                    {log.ip}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-emerald-100 text-emerald-800 text-[10px]">
                      {log.status} OK
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-slate-500 font-normal">
                    {log.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

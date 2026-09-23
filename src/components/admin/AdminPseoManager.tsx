import React, { useState, useEffect } from 'react';
import { PseoPage, PseoTemplateConfig, MediaType } from '../../types';
import { INITIAL_PSEO_CONFIG } from '../../pseoData';
import { Sparkles, Layers, RefreshCw, FileText, Search, Filter, ExternalLink, Check, Edit3, Plus, Sliders } from 'lucide-react';

interface AdminPseoManagerProps {
  onPreviewPage: (page: PseoPage) => void;
}

export const AdminPseoManager: React.FC<AdminPseoManagerProps> = ({ onPreviewPage }) => {
  const [pages, setPages] = useState<PseoPage[]>([]);
  const [totalCount, setTotalCount] = useState<number>(3000);
  const [totalSitemaps, setTotalSitemaps] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [mediaFilter, setMediaFilter] = useState<string>('all');
  const [langFilter, setLangFilter] = useState<string>('all');
  const [chunkFilter, setChunkFilter] = useState<string>('all');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationFeedback, setGenerationFeedback] = useState<string | null>(null);

  // Template config form state
  const [config, setConfig] = useState<PseoTemplateConfig>(INITIAL_PSEO_CONFIG);
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [configSavedNotice, setConfigSavedNotice] = useState<boolean>(false);

  const fetchPages = () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(pageNumber),
      limit: '15',
      search,
      mediaType: mediaFilter,
      lang: langFilter,
    });
    if (chunkFilter !== 'all') {
      params.append('chunk', chunkFilter);
    }

    fetch(`/api/pseo/pages?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setPages(data.pages || []);
        setTotalCount(data.total || 0);
        setTotalSitemaps(data.totalSitemaps || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPages();
  }, [pageNumber, mediaFilter, langFilter, chunkFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPageNumber(1);
    fetchPages();
  };

  const handleBulkGenerate = async (count: number) => {
    setIsGenerating(true);
    setGenerationFeedback(null);
    const token = localStorage.getItem('insta1000gram_admin_token') || 'admin-token-insta1000gram_jwt_secret_token_key_998877';

    try {
      const res = await fetch('/api/pseo/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ count, template: config }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate');

      setGenerationFeedback(`Successfully synthesized ${data.totalGenerated.toLocaleString()} keyword landing pages!`);
      setTotalCount(data.totalGenerated);
      setTotalSitemaps(data.totalSitemaps);
      fetchPages();
    } catch (err: any) {
      setGenerationFeedback(`Error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('insta1000gram_admin_token') || 'admin-token-insta1000gram_jwt_secret_token_key_998877';

    try {
      await fetch('/api/pseo/template', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(config),
      });
      setConfigSavedNotice(true);
      setTimeout(() => {
        setConfigSavedNotice(false);
        setShowConfigModal(false);
      }, 1200);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Bar */}
      <div className="bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-slate-800">Home</span>
          <span>›</span>
          <span className="text-slate-800">pSEO Generator</span>
          <span>›</span>
          <span className="text-pink-600 font-bold">Dynamic Keyword Pages</span>
        </div>
        <span className="font-mono text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
          Cluster Size: {config.chunkSize} URLs / group
        </span>
      </div>

      {/* Generator Control Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 rounded-2xl border border-slate-700 shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <h2 className="text-lg sm:text-xl font-black">
                Programmatic SEO (pSEO) Bulk Engine
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Synthesize thousands of high-converting keyword landing pages optimized for search engines so crawlers like Googlebot and Bingbot can discover and index them rapidly with zero delay.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowConfigModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold transition-all"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Edit Template Patterns</span>
            </button>

            <button
              disabled={isGenerating}
              onClick={() => handleBulkGenerate(1000)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Generate 1,000 Pages</span>
            </button>

            <button
              disabled={isGenerating}
              onClick={() => handleBulkGenerate(3000)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Generate 3,000 Pages</span>
            </button>

            <button
              disabled={isGenerating}
              onClick={() => handleBulkGenerate(5000)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Generate 5,000 Pages</span>
            </button>
          </div>
        </div>

        {generationFeedback && (
          <div className="mt-4 p-3 bg-pink-500/20 border border-pink-500/40 rounded-xl text-xs font-bold text-pink-200 flex items-center gap-2">
            <Check className="w-4 h-4 text-pink-400" />
            <span>{generationFeedback}</span>
          </div>
        )}
      </div>

      {/* Index Status Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
        <span className="text-slate-700 font-bold">Search Index Database</span>
        <span className="text-slate-500 font-medium">
          Total Indexed: <strong className="text-slate-900">{totalCount.toLocaleString()}</strong> URLs
        </span>
      </div>

      {/* Django Style Search & Filter Actions Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by keyword, slug, or title pattern..."
              className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl text-xs sm:text-sm font-medium focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={mediaFilter}
              onChange={(e) => {
                setMediaFilter(e.target.value);
                setPageNumber(1);
              }}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
            >
              <option value="all">All Media Types</option>
              <option value="reels">Reels</option>
              <option value="video">Video</option>
              <option value="photo">Photo</option>
              <option value="stories">Stories</option>
              <option value="igtv">IGTV</option>
            </select>

            <select
              value={langFilter}
              onChange={(e) => {
                setLangFilter(e.target.value);
                setPageNumber(1);
              }}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
            >
              <option value="all">All Languages</option>
              <option value="en">English (EN)</option>
              <option value="ar">العربية (AR)</option>
              <option value="es">Español (ES)</option>
              <option value="fr">Français (FR)</option>
              <option value="pt">Português (PT)</option>
            </select>

            <button
              type="submit"
              className="h-10 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
            >
              Filter
            </button>
          </div>
        </form>
      </div>

      {/* Pages Change-List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Slug / URL</th>
                <th className="px-6 py-3.5">Media Type</th>
                <th className="px-6 py-3.5">Language</th>
                <th className="px-6 py-3.5">Page Group</th>
                <th className="px-6 py-3.5">Views / DLs</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    Loading pages...
                  </td>
                </tr>
              ) : pages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    No pages matched your criteria.
                  </td>
                </tr>
              ) : (
                pages.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="font-bold text-slate-900 line-clamp-1">{p.title}</div>
                      <div className="font-mono text-[11px] text-pink-600 mt-0.5">/{p.slug}</div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        {p.mediaType}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        p.lang === 'ar' ? 'bg-amber-100 text-amber-800' : 'bg-pink-100 text-pink-700'
                      }`}>
                        {p.lang}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-slate-600">
                      Group #{p.chunkId}
                    </td>
                    <td className="px-6 py-3.5 font-mono text-[11px]">
                      {p.views.toLocaleString()} / <span className="text-emerald-600">{p.downloadsCount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={() => onPreviewPage(p)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-pink-50 hover:text-pink-600 text-slate-700 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                      >
                        <span>Preview</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-semibold">
          <span>
            Showing page {pageNumber} of {Math.max(1, Math.ceil(totalCount / 15))}
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 bg-white border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-100"
            >
              Previous
            </button>
            <button
              disabled={pageNumber >= Math.ceil(totalCount / 15)}
              onClick={() => setPageNumber((prev) => prev + 1)}
              className="px-3 py-1 bg-white border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Edit Template Pattern Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="font-extrabold text-base text-slate-900">
                Configure Programmatic SEO Template Rules
              </h3>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Title Pattern
                </label>
                <input
                  type="text"
                  value={config.titlePattern}
                  onChange={(e) => setConfig({ ...config, titlePattern: e.target.value })}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
                <p className="text-[10px] text-slate-400 mt-1">Available variables: &#123;type&#125;, &#123;quality&#125;, &#123;country&#125;, &#123;device&#125;</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Meta Description Pattern
                </label>
                <textarea
                  rows={2}
                  value={config.metaDescriptionPattern}
                  onChange={(e) => setConfig({ ...config, metaDescriptionPattern: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  H1 Heading Pattern
                </label>
                <input
                  type="text"
                  value={config.h1Pattern}
                  onChange={(e) => setConfig({ ...config, h1Pattern: e.target.value })}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Page Cluster Size (URLs per group)
                </label>
                <input
                  type="number"
                  min={100}
                  max={5000}
                  value={config.chunkSize}
                  onChange={(e) => setConfig({ ...config, chunkSize: Number(e.target.value) })}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
                <p className="text-[10px] text-slate-400 mt-1">Controls how many links are grouped into partition clusters. (Default: 1000)</p>
              </div>

              {configSavedNotice && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Template saved successfully!</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

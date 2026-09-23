import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminPseoManager } from './AdminPseoManager';
import { AdminLanguageManager } from './AdminLanguageManager';
import { PseoPage } from '../../types';
import { Shield, LayoutDashboard, Sparkles, Globe, LogOut, X, ExternalLink } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPreviewPseoPage: (page: PseoPage) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onPreviewPseoPage }) => {
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('insta1000gram_admin_token');
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pseo' | 'languages'>('dashboard');

  useEffect(() => {
    // If token exists, verify with server
    if (authToken) {
      fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${authToken}` },
      })
        .then((res) => {
          if (!res.ok) {
            setAuthToken(null);
            localStorage.removeItem('insta1000gram_admin_token');
          }
        })
        .catch(() => {});
    }
  }, [authToken]);

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem('insta1000gram_admin_token');
    setAuthToken(null);
  };

  // If not authenticated, show secure login form
  if (!authToken) {
    return (
      <AdminLogin
        onSuccess={(token) => setAuthToken(token)}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white rounded-3xl w-full max-w-7xl max-h-[95vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Django-Inspired Header */}
        <header className="bg-slate-900 text-white px-5 sm:px-8 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight">
                  insta1000gram Django Administration
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ENV SECURE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Site Domain: www.insta1000gram.com • Node/Express &amp; Django-Inspired Admin Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Admin Navigation Tabs */}
        <div className="bg-slate-100/90 px-6 py-2.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'dashboard', label: 'Dashboard & Visualizations', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'pseo', label: 'Programmatic SEO Engine', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'languages', label: 'Languages & Amiri RTL (5 Locales)', icon: <Globe className="w-4 h-4" /> },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 bg-slate-50/60">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'pseo' && (
            <AdminPseoManager
              onPreviewPage={(page) => {
                onPreviewPseoPage(page);
                onClose();
              }}
            />
          )}
          {activeTab === 'languages' && <AdminLanguageManager />}
        </div>
      </div>
    </div>
  );
};

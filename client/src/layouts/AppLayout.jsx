import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import BottomNav from '../components/common/BottomNav';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CommandPalette from '../components/common/CommandPalette';
import CampusAICopilot from '../components/ai/CampusAICopilot';

export const AppLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  // Global Keyboard Shortcuts (Ctrl+K for Spotlight, Ctrl+J for Campus AI)
  useEffect(() => {
    const handleGlobalKeys = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setAiOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff]">
        <LoadingSpinner size="lg" text="Verifying institutional credential tokens..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      {/* Desktop Permanent Sidebar - hidden on small screens below 1024px (lg) */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Navbar 
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenAI={() => setAiOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] lg:pb-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Fixed Bottom Navigation Bar for Mobile (below 1024px) */}
      <BottomNav />

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenAI={() => setAiOpen(true)}
      />

      {/* Global Campus AI Copilot (Ctrl+J) */}
      <CampusAICopilot
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
      />

      {/* Floating Campus AI Floating Action Trigger */}
      <button
        type="button"
        onClick={() => setAiOpen(true)}
        aria-label="Open Campus AI"
        className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] lg:bottom-6 right-4 sm:right-6 z-30 flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-full bg-linear-to-r from-[#0b1c30] via-[#122844] to-[#1e3a5f] hover:from-[#172e4c] hover:to-[#2b5282] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-sky-400/30 group"
      >
        <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center">
          <span className="material-symbols-outlined text-[17px] group-hover:rotate-12 transition-transform">
            auto_awesome
          </span>
        </div>
        <span className="text-xs font-bold text-sky-200 group-hover:text-white">Ask AI</span>
        <span className="hidden sm:inline-block text-[9px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-sky-300">
          Ctrl+J
        </span>
      </button>
    </div>
  );
};

export default AppLayout;

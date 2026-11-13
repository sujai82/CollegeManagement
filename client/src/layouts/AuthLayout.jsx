import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

export const AuthLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff]">
        <LoadingSpinner size="lg" text="Verifying institutional security tokens..." />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f8f9ff] text-[#0b1c30]">
      {/* Top Institutional Bar with safe-area padding for status bar/notch */}
      <header className="bg-white border-b border-[#e2e8f0] pt-[env(safe-area-inset-top,0px)]">
        <div className="h-14 px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#0f172a] text-white flex items-center justify-center font-bold text-sm tracking-widest shadow-sm">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0b1c30]">Veritas University</span>
              <span className="text-[11px] text-[#515f74] font-medium">Academic Affairs & Registrar Network</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block animate-pulse"></span>
              SYS-ACTIVE: AY 2025–2026
            </span>
            <span className="text-xs text-[#94a3b8] font-mono">NODE: REG-01</span>
          </div>
        </div>
      </header>

      {/* Main Login Workspace */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-xl">
          <Outlet />
        </div>
      </main>

      {/* Institutional Security Footer with safe-area padding */}
      <footer className="border-t border-[#e2e8f0] bg-white pb-[env(safe-area-inset-bottom,0px)]">
        <div className="py-4 px-6 text-center text-xs text-[#515f74] flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
            <span>SAML 2.0 / Dual-Token Cryptographic Authentication &bull; FERPA Compliant</span>
          </div>
          <div className="font-mono text-[11px] text-[#94a3b8]">
            Veritas CMS &copy; {new Date().getFullYear()} &bull; v4.18-REGISTRAR
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;

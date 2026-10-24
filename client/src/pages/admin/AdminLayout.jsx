import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Smartphone, 
  Layers, 
  ShoppingBag, 
  LogOut, 
  ArrowLeft, 
  Sparkles,
  ShieldAlert,
  Menu,
  X
} from 'lucide-react';

import MobyTekLogo from '../../components/MobyTekLogo';

export default function AdminLayout() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (!isAdmin) return null;

  const navLinks = [
    { label: 'Vue d\'ensemble', path: '/admin', icon: LayoutDashboard },
    { label: 'Gestion Produits', path: '/admin/produits', icon: Smartphone },
    { label: 'Catégories', path: '/admin/categories', icon: Layers },
    { label: 'Commandes Clients', path: '/admin/commandes', icon: ShoppingBag },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100 flex flex-col md:flex-row">
      
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      {/* Fixed Sidebar (Stays permanently pinned on left) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800 transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:h-screen md:sticky md:top-0 ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          
          {/* Brand header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin" className="block group">
              <MobyTekLogo variant="dark" size="sm" showSubtitle={true} />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items (Scrollable if lots of items) */}
          <nav className="p-4 space-y-1.5 text-xs font-semibold overflow-y-auto flex-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition ${
                    isActive
                      ? 'bg-brand-600 text-white font-bold shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2 text-xs shrink-0 bg-slate-900">
          <Link
            to="/"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Aller sur la boutique</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 transition font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Area (Independent scroll) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header (Sticky at top of content area) */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Hamburger button for mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
              title="Ouvrir le menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">Session Active :</span>
              <span className="text-xs font-bold text-slate-800 font-mono">{user?.email || 'admin@mobytek.tn'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">Mode Administrateur Connecté</span>
              <span className="sm:hidden">Admin</span>
            </span>
          </div>
        </header>

        {/* Page Content: Only this section scrolls */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

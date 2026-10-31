import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Gift,
  User,
  LogOut,
  Compass,
  DollarSign,
  LayoutDashboard,
  Menu,
  X,
  Home,
} from 'lucide-react';
import { AiWishifyLogo } from '../common/AiWishifyLogo';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: 'home' | 'gallery' | 'dashboard' | 'pricing' | 'create') => void;
  user: { name: string; email: string; avatar?: string } | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  user,
  onOpenAuth,
  onSignOut,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNav = (view: 'home' | 'gallery' | 'dashboard' | 'pricing' | 'create') => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left section: Mobile menu button + Brand Logo */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Menu Button in Left Top Corner */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -ml-1 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none active:scale-95 flex items-center justify-center"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            >
              <span className="flex items-center justify-center">
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-800" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-800" />
                )}
              </span>
            </button>

            {/* Brand Logo */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => onNavigate('home')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onNavigate('home')}
              className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer focus:outline-none select-none"
            >
              <AiWishifyLogo size={36} className="aspect-square shrink-0" />
              <div className="flex items-center">
                <span className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
                  Ai Wishify
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1 ${
                currentView === 'home'
                  ? 'text-rose-600 bg-rose-50 font-extrabold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => onNavigate('gallery')}
              className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1 ${
                currentView === 'gallery'
                  ? 'text-rose-600 bg-rose-50 font-extrabold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Occasions</span>
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1 ${
                currentView === 'dashboard'
                  ? 'text-rose-600 bg-rose-50 font-extrabold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>My Wishes</span>
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1 ${
                currentView === 'pricing'
                  ? 'text-rose-600 bg-rose-50 font-extrabold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Pricing</span>
            </button>
          </nav>

          {/* Right CTA & User Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigate('create')}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span className="hidden xs:inline">Create a Wish</span>
              <span className="xs:hidden">Create</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-slate-300 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="hidden lg:inline text-xs font-bold text-slate-800 max-w-[100px] truncate">
                  {user.name}
                </span>
                <button
                  onClick={onSignOut}
                  className="hidden sm:inline-flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Modal */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <AiWishifyLogo size={32} className="aspect-square" />
                <div>
                  <span className="font-display font-black text-lg text-slate-900 block leading-tight">
                    Ai Wishify
                  </span>
                  <span className="text-xs text-rose-500 font-semibold block">
                    By Adiba Innovations
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Options List */}
            <div className="p-4 flex-1 overflow-y-auto space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                Navigation
              </div>

              {/* Home */}
              <button
                onClick={() => handleMobileNav('home')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                  currentView === 'home'
                    ? 'bg-rose-50 text-rose-600 font-extrabold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Home className="w-4 h-4 text-rose-500" />
                <span>Home</span>
              </button>

              {/* Occasions Gallery */}
              <button
                onClick={() => handleMobileNav('gallery')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                  currentView === 'gallery'
                    ? 'bg-rose-50 text-rose-600 font-extrabold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-rose-500" />
                  <span>Occasions</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">
                  17 Themes
                </span>
              </button>

              {/* My Wishes (Creator Dashboard) */}
              <button
                onClick={() => handleMobileNav('dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                  currentView === 'dashboard'
                    ? 'bg-rose-50 text-rose-600 font-extrabold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4 text-rose-500" />
                  <span>My Wishes</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Projects
                </span>
              </button>

              {/* Pricing */}
              <button
                onClick={() => handleMobileNav('pricing')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
                  currentView === 'pricing'
                    ? 'bg-rose-50 text-rose-600 font-extrabold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <DollarSign className="w-4 h-4 text-rose-500" />
                <span>Pricing & Plans</span>
              </button>

              {/* Create A Wish Primary Action */}
              <div className="pt-3">
                <button
                  onClick={() => handleMobileNav('create')}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create a New Wish</span>
                </button>
              </div>
            </div>

            {/* User Account / Auth Section at Bottom */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/60">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full border border-slate-300 object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In with Google</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

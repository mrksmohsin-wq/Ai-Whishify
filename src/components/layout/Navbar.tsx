import React from 'react';
import { Sparkles, Plus, Gift, User, LogOut, Compass, DollarSign, LayoutDashboard } from 'lucide-react';
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
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group"
        >
          <AiWishifyLogo size={40} className="aspect-square" />
          <div className="flex items-center">
            <span className="font-display font-black text-2xl text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
              Ai Wishify
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-2 rounded-xl transition-colors ${
              currentView === 'home' ? 'text-rose-600 bg-rose-50 font-extrabold' : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('gallery')}
            className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1 ${
              currentView === 'gallery' ? 'text-rose-600 bg-rose-50 font-extrabold' : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Occasions</span>
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1 ${
              currentView === 'dashboard' ? 'text-rose-600 bg-rose-50 font-extrabold' : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>My Wishes</span>
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1 ${
              currentView === 'pricing' ? 'text-rose-600 bg-rose-50 font-extrabold' : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Pricing</span>
          </button>
        </nav>

        {/* Right CTA & User Area */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('create')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create a Wish</span>
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
              <span className="hidden sm:inline text-xs font-bold text-slate-800 max-w-[100px] truncate">
                {user.name}
              </span>
              <button
                onClick={onSignOut}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

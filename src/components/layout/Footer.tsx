import React from 'react';
import { Sparkles, Heart, Globe, Building2, ShieldCheck } from 'lucide-react';
import { ALL_EVENT_KEYS, EVENT_TEMPLATES } from '../../config/eventsConfig';
import { EventType } from '../../types/wish';
import { AiWishifyLogo } from '../common/AiWishifyLogo';

interface FooterProps {
  onSelectOccasion: (eventType: EventType) => void;
  onNavigate: (view: 'home' | 'gallery' | 'dashboard' | 'pricing' | 'create') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectOccasion, onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info with Official Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AiWishifyLogo size={44} />
              <div>
                <span className="font-display font-black text-xl text-white block">Ai Wishify</span>
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">
                  By Adiba Innovations
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transforming heartfelt greetings into memorable, animated, interactive celebrations.
            </p>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
              <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 mb-1">
                <Building2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Developer Company</span>
              </div>
              <p className="text-xs font-semibold text-rose-300">
                Adiba Innovations
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Pioneering joyful digital celebrations & creative software.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors">
                  All 16 Occasions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  Creator Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">
                  Free vs. Pro Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Occasions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Popular Occasions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {['birthday', 'anniversary', 'mothers_day', 'fathers_day', 'eid_mubarak'].map((key) => {
                const tmpl = EVENT_TEMPLATES[key as EventType];
                return (
                  <li key={key}>
                    <button
                      onClick={() => onSelectOccasion(key as EventType)}
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span>{tmpl.icon}</span>
                      <span>{tmpl.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Developer & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company & Standards
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Adiba Innovations Verified</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>English (United States)</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Contact Adiba Innovations
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300">Adiba Innovations</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Designed & Developed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>by <strong className="text-white">Adiba Innovations</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

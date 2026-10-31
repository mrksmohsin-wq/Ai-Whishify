import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Gift,
  Heart,
  Share2,
  CheckCircle,
  Play,
  PartyPopper,
} from 'lucide-react';
import { AiWishifyLogo } from '../common/AiWishifyLogo';
import { EVENT_TEMPLATES } from '../../config/eventsConfig';
import { EventType } from '../../types/wish';
import heroCelebrationBg from '../../assets/images/festive_party_stage_bg.png';
import heroCelebrationMobileBg from '../../assets/images/whimsical_wishes_mobile_bg.png';

interface LandingPageProps {
  onStartCreating: (eventType?: EventType) => void;
  onExploreOccasions: () => void;
  onPreviewSample: (eventType: EventType) => void;
  onViewPricing: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartCreating,
  onExploreOccasions,
  onPreviewSample,
}) => {
  const [interactiveCandleLit, setInteractiveCandleLit] = useState(true);

  return (
    <div className="relative w-full overflow-hidden">
      {/* HERO SECTION WITH RESPONSIVE CELEBRATION STAGE BACKGROUND */}
      <section className="relative z-10 w-full min-h-[calc(100dvh-4rem)] sm:min-h-0 flex flex-col justify-center overflow-hidden">
        {/* HOMEPAGE CELEBRATION STAGE BACKGROUND ILLUSTRATION */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none flex items-center justify-center">
          {/* Mobile-only portrait background */}
          <img
            src={heroCelebrationMobileBg}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/aistudio/Whimsical_Wishes_Party_Stage_4b2ab239.png';
            }}
            alt="Whimsical wishes festive party stage mobile background"
            className="sm:hidden w-full h-full object-cover object-top filter brightness-[1.01] contrast-[1.01]"
          />

          {/* Desktop & tablet wide landscape background */}
          <img
            src={heroCelebrationBg}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/aistudio/Festive_Cartoon_Party_Stage_Background_177701dc.png';
            }}
            alt="Festive cartoon party celebration stage background with beloved characters"
            className="hidden sm:block w-full h-full object-cover object-center sm:object-top filter brightness-[1.01] contrast-[1.01]"
          />
          {/* Soft bottom atmospheric gradient for seamless flow into content */}
          <div className="absolute inset-x-0 bottom-0 h-28 sm:h-40 bg-gradient-to-t from-slate-50 via-slate-50/70 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 pb-8 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20 flex flex-col justify-center">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-transparent backdrop-blur-none border-0 shadow-none">
            {/* Logo Badge */}
            <div className="mb-2 sm:mb-3 transform hover:scale-105 transition-transform duration-300">
              <AiWishifyLogo size={68} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-rose-50/90 text-rose-600 text-[11px] sm:text-xs font-semibold mb-2 sm:mb-3 border border-rose-200/80 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>By Adiba Innovations</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-xs">
              Create Animated,{' '}
              <span className="text-rose-600">
                Personalized Wishes
              </span>
            </h1>

            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-slate-700 font-medium leading-relaxed max-w-xl mx-auto drop-shadow-xs">
              Interactive celebrations with secret code dialers, theatrical opening curtains, procedural music, and photo memories.
            </p>

            {/* Action buttons */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => onStartCreating('birthday')}
                className="w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span>Create a Wish</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onPreviewSample('birthday')}
                className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <Play className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Watch Live Demo</span>
              </button>
            </div>

            {/* Key Features Line */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-3.5 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-3.5 sm:gap-8 text-slate-600 text-[11px] sm:text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>17 Themes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>Curtains & Code Dialer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant Link</span>
              </div>
            </div>
          </div>

          {/* INTERACTIVE DEMO CARD */}
          <div className="mt-4 sm:mt-5 max-w-3xl mx-auto bg-white/95 rounded-2xl border-2 border-rose-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  Interactive Preview
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1.5">
                  Blow Out Mohsin's Birthday Candles 🎂
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Tap the candles to blow them out and trigger celebration confetti!
                </p>
                <div className="mt-3">
                  <button
                    onClick={() => onPreviewSample('birthday')}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-xs hover:shadow flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <span>Open Full 6-Step Experience</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Cake element */}
              <div
                onClick={() => setInteractiveCandleLit(!interactiveCandleLit)}
                className="cursor-pointer select-none bg-rose-50/60 p-3.5 sm:p-4 rounded-2xl border border-rose-200 flex flex-col items-center hover:scale-105 active:scale-95 transition-transform shrink-0"
                title="Tap to blow out candles"
              >
                <div className="text-4xl sm:text-5xl mb-1">
                  {interactiveCandleLit ? '🎂' : '🎉'}
                </div>
                <div className="text-xs font-bold text-slate-900 text-center">
                  {interactiveCandleLit ? '🔥 Candles Lit (Tap me)' : '✨ Candles Blown!'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 SIMPLE STEPS */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-md mx-auto mb-8">
            <h2 className="text-2xl font-black text-slate-900">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-lg mx-auto mb-3">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Pick an Occasion</h3>
              <p className="text-xs text-slate-600">
                Choose from 17 curated celebration themes.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-black text-lg mx-auto mb-3">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Personalize</h3>
              <p className="text-xs text-slate-600">
                Add messages, photos, secret code dialer, and curtains.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg mx-auto mb-3">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Share the Link</h3>
              <p className="text-xs text-slate-600">
                Send via WhatsApp or copy link for instant opening.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOP OCCASIONS */}
      <section className="py-14 px-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Featured Occasions
            </h2>
          </div>
          <button
            onClick={onExploreOccasions}
            className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700"
          >
            <span>All 17 Occasions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['birthday', 'teachers_day', 'mothers_day', 'anniversary'].map((key) => {
            const tmpl = EVENT_TEMPLATES[key as EventType];
            return (
              <div
                key={key}
                onClick={() => onStartCreating(key as EventType)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${tmpl.colorScheme.bgGradient} text-white flex items-center justify-center text-2xl mb-3 shadow-xs`}
                >
                  {tmpl.icon}
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-rose-600 transition-colors">
                  {tmpl.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {tmpl.tagline}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-600">
                  <span>Create</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CLEAN BOTTOM CTA */}
      <section className="py-12 px-4 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-black text-slate-900">
          Ready to Make Someone's Day Special?
        </h2>
        <p className="mt-1.5 text-xs text-slate-600">
          Create an animated interactive greeting in minutes.
        </p>
        <button
          onClick={() => onStartCreating('birthday')}
          className="mt-5 px-7 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-yellow-200" />
          <span>Create an Ai Wishify Greeting</span>
        </button>
      </section>
    </div>
  );
};

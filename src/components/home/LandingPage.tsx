import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Gift,
  Heart,
  Wand2,
  Share2,
  ShieldCheck,
  Music,
  CheckCircle,
  Play,
  PartyPopper,
  Star,
} from 'lucide-react';
import { AiWishifyLogo } from '../common/AiWishifyLogo';
import { EVENT_TEMPLATES, ALL_EVENT_KEYS } from '../../config/eventsConfig';
import { EventType } from '../../types/wish';

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
  onViewPricing,
}) => {
  const [interactiveCandleLit, setInteractiveCandleLit] = useState(true);

  return (
    <div className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-pink-400/20 via-rose-300/30 to-amber-300/20 blur-3xl -z-10 rounded-full" />

        <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
          {/* Official Scalloped Logo Badge */}
          <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
            <AiWishifyLogo size={90} />
          </div>

          {/* Sparkle badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-extrabold uppercase tracking-wider mb-6 border border-rose-200 shadow-xs animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            By Adiba Innovations • The Next Generation of Online Greetings
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Create Animated,{' '}
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
              Personalized Wishes
            </span>{' '}
            They'll Never Forget.
          </h1>

          <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Not just a flat card. Turn any birthday, anniversary, or special milestone into a magical, interactive journey with procedural music, candle blowing, photo memories, and AI-crafted letters.
          </p>

          {/* Call to action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onStartCreating('birthday')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-base shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-yellow-200" />
              <span>Create a Wish Now — It's Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onPreviewSample('birthday')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Watch Live Demo</span>
            </button>
          </div>

          {/* Social Proof metrics */}
          <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-slate-500 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>16 Unique Occasions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Interactive Activities & Music</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Instant Share via WhatsApp & Link</span>
            </div>
          </div>
        </div>

        {/* HERO INTERACTIVE SHOWCASE CARD */}
        <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-br from-pink-500 via-rose-500 to-amber-400 p-1.5 sm:p-2 rounded-3xl shadow-2xl">
          <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                Live Interactive Preview
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                Blow Out Mohsin's Birthday Candles! 🎂
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Test the interactive engine right here. Tap the flame to extinguish the candles, trigger confetti, and celebrate!
              </p>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => onPreviewSample('birthday')}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <span>Open Full 6-Step Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive mini cake */}
            <div
              onClick={() => setInteractiveCandleLit(!interactiveCandleLit)}
              className="cursor-pointer select-none bg-rose-50/60 p-6 rounded-2xl border border-rose-200 flex flex-col items-center hover:scale-105 active:scale-95 transition-transform"
              title="Click to blow out candles!"
            >
              <div className="text-6xl mb-2">
                {interactiveCandleLit ? '🎂' : '🎉'}
              </div>
              <div className="text-xs font-bold text-slate-800">
                {interactiveCandleLit ? '🔥 Candles Lit! (Tap me)' : '✨ Candles Blown! Woohoo!'}
              </div>
              <div className="text-[10px] text-rose-600 mt-1">
                {interactiveCandleLit ? 'Click to make a wish' : 'Click to re-light'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How AI Wishify Works
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Create and deliver an unforgettable interactive greeting in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-2xl mb-4">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Pick an Occasion</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose from 16 curated themes like Birthday, Mother's Day, Anniversary, Eid, Teacher's Day, and more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-black text-2xl mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Personalize with AI</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Let Gemini craft heartfelt poems, funny anecdotes, or upload your favorite photo memories and gift surprise.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-2xl mb-4">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Send as a Magic Link</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send via WhatsApp, QR code, or SMS. Watch their reaction as they blow candles, unwrap gifts, and play the song!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR OCCASIONS SHOWCASE */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Celebration Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Top Loved Occasion Sequences
            </h2>
          </div>
          <button
            onClick={onExploreOccasions}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700"
          >
            <span>View All 16 Occasions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['birthday', 'teachers_day', 'mothers_day', 'anniversary'].map((key) => {
            const tmpl = EVENT_TEMPLATES[key as EventType];
            return (
              <div
                key={key}
                onClick={() => onStartCreating(key as EventType)}
                className="group cursor-pointer bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${tmpl.colorScheme.bgGradient} text-white flex items-center justify-center text-3xl mb-4 shadow-sm`}
                >
                  {tmpl.icon}
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-rose-600 transition-colors">
                  {tmpl.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {tmpl.tagline}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-600">
                  <span>Start Crafting</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS / STATS BANNER */}
      <section className="py-16 bg-gradient-to-r from-rose-900 via-pink-950 to-indigo-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-black text-amber-300">50,000+</div>
              <div className="text-sm text-pink-200 mt-1 font-medium">Smiles Delivered Worldwide</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-rose-300">100%</div>
              <div className="text-sm text-pink-200 mt-1 font-medium">Interactive Web Audio & Confetti</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-purple-300">16+</div>
              <div className="text-sm text-pink-200 mt-1 font-medium">Curated Holiday & Milestone Themes</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Ready to Make Someone's Special Day Unforgettable?
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Start creating in seconds. No credit card required. Free forever tier available.
        </p>
        <button
          onClick={() => onStartCreating('birthday')}
          className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-base shadow-xl hover:shadow-2xl active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-yellow-200" />
          <span>Create an AI Wishify Greeting</span>
        </button>
      </section>
    </div>
  );
};

import React from 'react';
import { Check, Sparkles, Zap, Shield, Heart } from 'lucide-react';

interface PricingPageProps {
  onSelectPlan: (plan: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onSelectPlan }) => {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 my-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-800 mb-2 border border-rose-200">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          Transparent & Delightful
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
          Simple, Joyful Pricing
        </h1>
        <p className="text-sm md:text-base text-slate-600 mt-2">
          Send unlimited heartwarming greetings for free, or unlock premium audio and zero watermark with Pro.
        </p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Starter Tier
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                Free Forever
              </span>
            </div>

            <div className="text-4xl font-black text-slate-900 mb-2">$0</div>
            <p className="text-xs text-slate-500 mb-6">
              Perfect for sending beautiful personal greetings to friends and family.
            </p>

            <ul className="space-y-3 text-xs text-slate-700 mb-8">
              {[
                'Access to all 16 occasion templates',
                'Unlimited AI message generation',
                'Interactive candle blowing & gift box unwrap',
                'Up to 5 photos per memory slideshow',
                'Instant WhatsApp & shareable link',
                'Recipient reaction & thank you replies',
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('free')}
            className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors"
          >
            Start Free
          </button>
        </div>

        {/* Pro Plan */}
        <div className="relative bg-gradient-to-b from-rose-50 via-white to-pink-50 rounded-3xl border-2 border-rose-500 p-8 shadow-xl flex flex-col justify-between">
          <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-sm">
            Most Popular ⭐
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Pro Celebrations
              </span>
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                All Access
              </span>
            </div>

            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-black text-slate-900">$4.99</span>
              <span className="text-xs text-slate-500 font-medium">/ month</span>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              For unforgettable celebrations with high-definition memories & zero watermark.
            </p>

            <ul className="space-y-3 text-xs text-slate-700 mb-8">
              {[
                'Everything in Free tier',
                '100% Watermark-Free experience',
                'Up to 15 HD photos per slideshow',
                'Scheduled midnight delivery (12:00 AM)',
                'PIN / Password protection on links',
                'Custom video messages in surprise box',
                'Analytics with read timestamps & view notifications',
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="font-medium">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('pro')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-lg active:scale-95 transition-all"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
};

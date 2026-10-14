import React, { useState } from 'react';
import { Gift, Sparkles, Copy, Check, Ticket, Award, Heart, Film } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audioSynthesis';
import { GiftRevealedItem } from '../../types/wish';

interface GiftBoxActivityProps {
  giftItem?: GiftRevealedItem;
  recipientName: string;
}

export const GiftBoxActivity: React.FC<GiftBoxActivityProps> = ({
  giftItem = {
    type: 'voucher',
    title: 'Surprise Gift Voucher',
    message: 'A personalized treat chosen specially for you with lots of love!',
    code: 'WISH-SURPRISE-2026',
  },
  recipientName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const openGift = () => {
    if (isOpen) return;
    setIsOpen(true);
    sound.playGiftRevealChime();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f43f5e', '#a855f7', '#38bdf8', '#10b981'],
    });
  };

  const copyCode = () => {
    if (!giftItem.code) return;
    navigator.clipboard.writeText(giftItem.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getGiftIcon = () => {
    switch (giftItem.type) {
      case 'voucher':
        return <Ticket className="w-8 h-8 text-amber-500" />;
      case 'badge':
        return <Award className="w-8 h-8 text-yellow-500" />;
      case 'vow':
        return <Heart className="w-8 h-8 text-rose-500" />;
      case 'video':
        return <Film className="w-8 h-8 text-indigo-500" />;
      default:
        return <Sparkles className="w-8 h-8 text-purple-500" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
      {/* Step Header */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 mb-2 border border-amber-200">
          <Gift className="w-3.5 h-3.5 text-amber-600" />
          A Surprise for {recipientName}
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {isOpen ? 'Surprise Unwrapped! ✨' : 'Tap the Box to Open Your Gift!'}
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          {isOpen ? 'Here is your special present from the heart' : 'A token of love and joy is waiting inside'}
        </p>
      </div>

      {/* Gift Box / Revealed Item */}
      <div className="relative my-6 flex flex-col items-center">
        {!isOpen ? (
          /* Interactive 3D styled Gift Box */
          <div
            onClick={openGift}
            className="group relative cursor-pointer select-none transition-transform duration-300 hover:scale-105 active:scale-95 animate-float"
            title="Tap to unwrap!"
          >
            {/* Pulsing glow */}
            <div className="absolute -inset-4 bg-amber-400/20 blur-xl rounded-full animate-pulse-glow" />

            {/* Box Lid */}
            <div className="relative w-44 h-12 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-t-xl shadow-lg border-b-4 border-rose-700 flex items-center justify-center z-20 group-hover:-translate-y-1 transition-transform">
              {/* Ribbon Bow on top */}
              <div className="absolute -top-6 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-amber-500 shadow-md transform -rotate-12" />
                <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-amber-500 shadow-md transform rotate-12 -ml-3" />
                <div className="absolute w-4 h-4 rounded-full bg-amber-300 shadow-xs" />
              </div>
              {/* Vertical Gold Ribbon */}
              <div className="w-7 h-full bg-gradient-to-b from-amber-300 to-yellow-400 shadow-xs" />
            </div>

            {/* Box Body */}
            <div className="relative w-40 h-36 bg-gradient-to-b from-rose-600 via-pink-600 to-rose-700 rounded-b-xl shadow-2xl flex items-center justify-center overflow-hidden z-10 mx-auto">
              {/* Vertical Ribbon */}
              <div className="w-7 h-full bg-gradient-to-b from-yellow-300 to-amber-400 shadow-inner" />
              {/* Horizontal Ribbon */}
              <div className="absolute inset-x-0 h-7 bg-gradient-to-r from-yellow-300 to-amber-400 shadow-inner" />
              {/* Sparkle badge */}
              <div className="absolute z-10 p-2 bg-white/90 rounded-full shadow-md animate-pulse">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              <span>🎁 Tap to open!</span>
            </div>
          </div>
        ) : (
          /* Revealed Gift Card */
          <div className="relative w-full max-w-sm bg-gradient-to-br from-amber-50 via-white to-rose-50 p-6 rounded-2xl border-2 border-amber-300 shadow-xl transition-all duration-500 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100/80 mx-auto mb-3 shadow-inner">
              {getGiftIcon()}
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">{giftItem.title}</h3>
            <p className="text-sm text-slate-700 leading-relaxed my-2">{giftItem.message}</p>

            {giftItem.code && (
              <div className="mt-4 p-3 bg-white rounded-xl border border-dashed border-amber-400 flex items-center justify-between gap-2 shadow-xs">
                <div className="text-left">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Gift Voucher Code</div>
                  <div className="font-mono text-sm font-extrabold text-slate-900 tracking-wider">
                    {giftItem.code}
                  </div>
                </div>
                <button
                  onClick={copyCode}
                  className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-center gap-1.5 text-xs text-amber-800 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Enjoy your special gift!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

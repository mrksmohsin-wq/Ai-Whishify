import React, { useState } from 'react';
import { Moon, Sparkles, Star, Gift, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audioSynthesis';

interface EidActivitiesProps {
  recipientName: string;
}

export const EidCrescentActivity: React.FC<EidActivitiesProps> = ({ recipientName }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-900/60 text-amber-300 mb-2 border border-amber-400/40">
        <Moon className="w-3.5 h-3.5 text-amber-300" />
        Blessed Mubarak Occasion
      </span>

      {/* Multilingual Greetings */}
      <div className="my-2 space-y-1">
        <div className="font-serif text-3xl md:text-4xl font-bold text-amber-300 drop-shadow-md">
          عيد مبارك
        </div>
        <div className="font-serif text-2xl md:text-3xl font-semibold text-amber-200">
          عید مبارک
        </div>
        <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
          Eid Mubarak, <span className="text-amber-400">{recipientName}</span>!
        </h2>
      </div>

      {/* Glowing Crescent Moon & Lanterns */}
      <div className="relative w-64 h-64 flex items-center justify-center my-4">
        {/* Night sky glow */}
        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />

        {/* Crescent Moon */}
        <div className="relative w-48 h-48 rounded-full shadow-[inset_28px_0_0_0_#facc15] transform -rotate-12 animate-pulse-glow" />

        {/* Sparkling Star */}
        <div className="absolute top-14 right-16 animate-bounce duration-1000">
          <Star className="w-6 h-6 text-amber-300 fill-amber-300 drop-shadow-[0_0_10px_#fde047]" />
        </div>

        {/* Hanging Lantern 1 */}
        <div className="absolute left-6 -top-4 flex flex-col items-center animate-float">
          <div className="w-0.5 h-16 bg-amber-400/60" />
          <div className="w-8 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-lg shadow-lg border border-amber-300 flex items-center justify-center">
            <div className="w-3 h-5 bg-yellow-100 rounded-full blur-xs animate-pulse" />
          </div>
        </div>

        {/* Hanging Lantern 2 */}
        <div className="absolute right-4 -top-8 flex flex-col items-center animate-float [animation-delay:1.2s]">
          <div className="w-0.5 h-20 bg-amber-400/60" />
          <div className="w-7 h-10 bg-gradient-to-b from-amber-400 to-amber-600 rounded-lg shadow-lg border border-amber-300 flex items-center justify-center">
            <div className="w-2.5 h-4 bg-yellow-100 rounded-full blur-xs animate-pulse" />
          </div>
        </div>
      </div>

      <p className="text-xs md:text-sm text-emerald-100/90 max-w-sm mx-auto leading-relaxed italic">
        "Taqabbal Allahu minna wa minkum. May Allah shower your life with peace, health, happiness, and prosperity."
      </p>
    </div>
  );
};

export const EidiRevealActivity: React.FC<EidActivitiesProps> = ({ recipientName }) => {
  const [opened, setOpened] = useState(false);

  const openEidi = () => {
    if (opened) return;
    setOpened(true);
    sound.playGiftRevealChime();
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#facc15', '#10b981', '#34d399', '#fde047'],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-900/60 text-amber-300 mb-2 border border-amber-400/40">
        <Gift className="w-3.5 h-3.5 text-amber-300" />
        Traditional Eidi Surprise
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
        {opened ? 'Barakah & Eidi Unlocked! 🪙' : 'Your Special Eidi Envelope'}
      </h2>
      <p className="text-xs text-emerald-200/80 mb-6">
        {opened ? 'May your days be blessed with abundance' : 'Tap the golden wax seal to unwrap your Eidi'}
      </p>

      {/* Interactive Eidi Envelope */}
      {!opened ? (
        <div
          onClick={openEidi}
          className="relative cursor-pointer select-none transition-transform duration-300 hover:scale-105 active:scale-95 animate-float"
        >
          {/* Envelope Body */}
          <div className="relative w-64 h-40 bg-gradient-to-br from-emerald-800 to-teal-900 rounded-xl shadow-2xl border-2 border-amber-400/60 overflow-hidden flex items-center justify-center">
            {/* Islamic geometric pattern accent */}
            <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(45deg,#facc15,#facc15_5px,transparent_5px,transparent_10px)]" />

            {/* Envelope Flap Lines */}
            <div className="absolute top-0 inset-x-0 h-20 border-b-2 border-amber-400/40 bg-emerald-700/40" />

            {/* Golden Wax Seal */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-2 border-amber-600 shadow-xl flex flex-col items-center justify-center animate-pulse">
              <span className="text-xs font-serif font-black text-amber-950">عیدی</span>
              <span className="text-[9px] font-bold text-amber-900">EIDI</span>
            </div>
          </div>
          <div className="mt-4 text-xs font-semibold text-amber-300 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-amber-400/40">
            ✉️ Tap to open envelope
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-sm bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 p-6 rounded-2xl border-2 border-amber-400 shadow-2xl text-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center mx-auto mb-3">
            <Coins className="w-8 h-8 text-amber-300 animate-bounce" />
          </div>

          <h3 className="text-xl font-bold text-amber-300">A Gift of Joy & Sweetness</h3>
          <p className="text-xs md:text-sm text-emerald-100 my-3 leading-relaxed">
            "May your life be as sweet as sheer khurma, as bright as the festive lights, and filled with infinite peace."
          </p>

          <div className="mt-4 p-3 bg-emerald-950/90 rounded-xl border border-dashed border-amber-400/80">
            <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
              Eidi Blessing Token
            </span>
            <div className="font-mono text-base font-extrabold text-white mt-0.5">
              BARAKAH-EID-2026
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Heart, Sparkles, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audioSynthesis';

interface BloomingFlowersProps {
  recipientName: string;
}

export const BloomingFlowersActivity: React.FC<BloomingFlowersProps> = ({ recipientName }) => {
  const [bloomedCount, setBloomedCount] = useState(3);

  const bloomMore = () => {
    setBloomedCount((prev) => Math.min(prev + 1, 6));
    sound.playConfettiPop();
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f472b6', '#fb7185', '#fda4af', '#fef08a'],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-800 mb-2 border border-rose-200">
        <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        Garden of Blooming Love
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Flowers for You, <span className="text-rose-600">{recipientName}</span>!
      </h2>
      <p className="text-xs text-slate-600 mb-6">
        Every petal blooms with gratitude for your unconditional warmth
      </p>

      {/* Interactive Bouquet of Flowers */}
      <div className="relative w-full h-56 flex items-end justify-center gap-3 pb-4">
        {Array.from({ length: bloomedCount }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center animate-bounce duration-1000"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {/* Flower Blossom */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              {/* Petals */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400 via-rose-300 to-pink-500 shadow-md rotate-45 transform hover:rotate-90 transition-transform duration-500" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-400 via-pink-400 to-rose-300 shadow-md -rotate-45" />
              {/* Center golden pistil */}
              <div className="relative z-10 w-6 h-6 rounded-full bg-gradient-to-b from-amber-300 to-yellow-400 border border-amber-400 shadow-inner flex items-center justify-center">
                <Heart className="w-3 h-3 text-rose-600 fill-rose-600" />
              </div>
            </div>
            {/* Stem */}
            <div className="w-1.5 h-24 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-full relative">
              {/* Leaves */}
              <div
                className={`absolute w-3 h-5 bg-emerald-400 rounded-full shadow-xs ${
                  i % 2 === 0 ? '-left-2 top-6 -rotate-45' : '-right-2 top-10 rotate-45'
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {bloomedCount < 6 && (
        <button
          onClick={bloomMore}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Bloom Another Flower!
        </button>
      )}
    </div>
  );
};

interface LoveMeterProps {
  recipientName: string;
}

export const LoveMeterActivity: React.FC<LoveMeterProps> = ({ recipientName }) => {
  const [level, setLevel] = useState(100);

  const boostLove = () => {
    setLevel((prev) => (prev >= 1000 ? 100 : prev + 150));
    sound.playConfettiPop();
    if (level >= 800) {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#f43f5e', '#fda4af'],
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-pink-100 text-pink-800 mb-2 border border-pink-200">
        <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
        Love Measurement
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
        Love Meter for {recipientName}
      </h2>
      <p className="text-xs text-slate-600 mb-6">
        Warning: May exceed standard measurement scales!
      </p>

      {/* Love Meter Gauge */}
      <div className="relative w-full max-w-xs bg-white rounded-2xl p-6 shadow-xl border border-pink-200 flex flex-col items-center">
        {/* Heart scale indicator */}
        <div className="relative w-24 h-24 flex items-center justify-center my-2">
          <Heart
            className={`w-20 h-20 text-rose-500 fill-rose-500 transition-all duration-300 drop-shadow-md ${
              level >= 1000 ? 'scale-125 animate-ping' : 'animate-pulse'
            }`}
          />
          <span className="absolute z-10 text-white font-extrabold text-lg">
            {level >= 1000 ? '∞' : `${level}%`}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-4 bg-pink-100 rounded-full overflow-hidden mt-4 p-0.5 border border-pink-300">
          <div
            className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-red-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((level / 1000) * 100, 100)}%` }}
          />
        </div>

        <div className="mt-3 text-sm font-bold text-rose-700">
          {level >= 1000
            ? '🔥 LOVE LEVEL: INFINITE & BEYOND! ❤️'
            : level > 500
            ? '💖 Overflowing with pure adoration!'
            : '✨ Maximum love detected!'}
        </div>

        <button
          onClick={boostLove}
          className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold shadow-md hover:from-rose-600 hover:to-pink-600 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Heart className="w-4 h-4 fill-white" />
          Send More Love (+150%)
        </button>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { PartyPopper, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audioSynthesis';

interface ConfettiBlastActivityProps {
  recipientName: string;
  subtitle?: string;
}

export const ConfettiBlastActivity: React.FC<ConfettiBlastActivityProps> = ({
  recipientName,
  subtitle = 'Hip Hip Hooray!',
}) => {
  useEffect(() => {
    sound.playConfettiPop();

    // Multi-angle confetti cannon blast
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#fbbf24', '#10b981'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  const triggerBlastAgain = () => {
    sound.playConfettiPop();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 mb-2 border border-amber-200">
        <PartyPopper className="w-3.5 h-3.5 text-amber-600" />
        Celebration Blast
      </span>
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-2 animate-bounce">
        Cheers to <span className="text-rose-600">{recipientName}</span>! 🎉
      </h2>
      <p className="text-sm md:text-base text-slate-600 mb-6 font-medium">
        {subtitle}
      </p>

      {/* Floating Balloons and Confetti Icons */}
      <div className="relative my-4 flex items-center justify-center gap-6">
        <span className="text-6xl animate-float">🎈</span>
        <span className="text-7xl animate-float [animation-delay:0.7s]">🥳</span>
        <span className="text-6xl animate-float [animation-delay:1.4s]">✨</span>
      </div>

      <button
        onClick={triggerBlastAgain}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 text-white font-bold text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all"
      >
        <Sparkles className="w-4 h-4" />
        Pop More Confetti!
      </button>
    </div>
  );
};

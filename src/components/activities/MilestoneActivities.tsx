import React, { useState } from 'react';
import { Award, Sparkles, Heart, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audioSynthesis';

interface MilestoneProps {
  recipientName: string;
  gradDegree?: string;
}

export const GradCapActivity: React.FC<MilestoneProps> = ({
  recipientName,
  gradDegree = 'Class of 2026',
}) => {
  const [thrown, setThrown] = useState(false);

  const tossCap = () => {
    setThrown(true);
    sound.playFanfare();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#4f46e5', '#fbbf24', '#38bdf8', '#e11d48'],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-100 text-indigo-800 mb-2 border border-indigo-200">
        <Award className="w-3.5 h-3.5 text-indigo-600" />
        Commencement Moment
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Congratulations, <span className="text-indigo-600">{recipientName}</span>!
      </h2>
      <p className="text-xs text-slate-600 mb-4">{gradDegree}</p>

      {/* Graduation Cap */}
      <div
        onClick={tossCap}
        className={`relative my-6 cursor-pointer select-none transition-all duration-700 ${
          thrown ? '-translate-y-24 rotate-12 scale-110' : 'hover:scale-105 active:scale-95 animate-float'
        }`}
      >
        <div className="text-8xl drop-shadow-2xl">🎓</div>
        {!thrown && (
          <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-semibold shadow-md animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Tap to Toss the Cap!
          </div>
        )}
      </div>

      {thrown && (
        <div className="text-sm font-bold text-indigo-700 animate-in fade-in">
          🎉 The cap is in the sky! Your brilliant future awaits!
        </div>
      )}
    </div>
  );
};

export const ChampagnePopActivity: React.FC<MilestoneProps> = ({ recipientName }) => {
  const [popped, setPopped] = useState(false);

  const popCork = () => {
    if (popped) return;
    setPopped(true);
    sound.playConfettiPop();
    sound.playFanfare();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f59e0b', '#d97706', '#fef3c7'],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 mb-2 border border-amber-200">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        Grand Celebration Toast
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        A Toast to <span className="text-amber-600">{recipientName}</span>!
      </h2>
      <p className="text-xs text-slate-600 mb-6">
        Raise your glasses to victory, joy, and new heights
      </p>

      {/* Champagne Toast Visual */}
      <div
        onClick={popCork}
        className="relative cursor-pointer select-none transition-transform duration-300 hover:scale-105 active:scale-95 animate-float flex flex-col items-center"
      >
        <div className="text-8xl drop-shadow-xl">{popped ? '🥂' : '🍾'}</div>
        {!popped ? (
          <div className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold text-xs shadow-md animate-bounce">
            ✨ Tap to Pop the Champagne!
          </div>
        ) : (
          <div className="mt-4 text-sm font-extrabold text-amber-700 animate-pulse">
            Cheers! May your success multiply and shine brightly! 🥂
          </div>
        )}
      </div>
    </div>
  );
};

export const TeacupSteamActivity: React.FC<MilestoneProps> = ({ recipientName }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-100 text-teal-800 mb-2 border border-teal-200">
        <Coffee className="w-3.5 h-3.5 text-teal-600" />
        A Cup of Comfort & Care
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Get Well Soon, <span className="text-teal-600">{recipientName}</span>!
      </h2>
      <p className="text-xs text-slate-600 mb-6">
        Brewed with honey, lemon, healing thoughts, and infinite warmth
      </p>

      {/* Steaming Teacup Illustration */}
      <div className="relative my-4 flex flex-col items-center">
        {/* Steam particles */}
        <div className="flex gap-4 mb-1">
          <span className="text-xl animate-float">♨️</span>
          <span className="text-lg animate-float [animation-delay:0.5s]">❤️</span>
          <span className="text-xl animate-float [animation-delay:1s]">♨️</span>
        </div>
        <div className="text-7xl drop-shadow-md">🍵</div>
      </div>

      <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 max-w-sm leading-relaxed">
        <strong>Prescription of Love:</strong> Take three deep breaths, wrap yourself in your coziest blanket, and know that you are deeply loved and missed!
      </div>
    </div>
  );
};

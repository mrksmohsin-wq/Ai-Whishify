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

export const BadDayComfortActivity: React.FC<MilestoneProps> = ({ recipientName }) => {
  const [isHappy, setIsHappy] = useState(false);

  const handleTapJerry = () => {
    const nextState = !isHappy;
    setIsHappy(nextState);
    if (nextState) {
      sound.playGiftRevealChime();
      confetti({
        particleCount: 90,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#fbbf24', '#38bdf8', '#818cf8', '#34d399', '#f472b6'],
      });
    } else {
      sound.playDialTick();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto select-none">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 mb-2 border border-indigo-200">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
        Comfort & Cheer-Up Care
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        A Gentle Hug for You, <span className="text-indigo-600">{recipientName}</span>
      </h2>
      <p className="text-xs text-slate-600 mb-5 max-w-md">
        {isHappy
          ? 'Look at that bright, cheerful smile! The gloom has vanished into warm sunshine! ✨'
          : 'Feeling a little down and heavy today... Tap to send a warm hug and turn the day around! 🫂'}
      </p>

      {/* Interactive Sad-Happy Character & Emoji Element */}
      <div
        onClick={handleTapJerry}
        className={`cursor-pointer group relative my-2 px-8 py-6 rounded-3xl border-2 transition-all transform hover:scale-105 active:scale-95 shadow-md flex flex-col items-center max-w-sm w-full ${
          isHappy
            ? 'bg-gradient-to-tr from-amber-50 via-rose-50 to-pink-50 border-amber-300 ring-4 ring-amber-200/50'
            : 'bg-slate-100/90 hover:bg-slate-200/80 border-slate-300 ring-2 ring-slate-200/40'
        }`}
        title={isHappy ? 'Tap to replay celebration' : 'Tap to cheer up!'}
      >
        {!isHappy ? (
          <div className="flex flex-col items-center animate-in fade-in duration-300 w-full">
            {/* Sad Weather Floating Icons */}
            <div className="flex items-center gap-3 mb-2 text-slate-400">
              <span className="text-xl animate-bounce">🌧️</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gloomy Day</span>
              <span className="text-xl animate-pulse">💧</span>
            </div>

            {/* Sad Character Illustration + Sad Emoji badge */}
            <div className="relative my-1">
              <div className="w-36 h-44 sm:w-40 sm:h-48 flex items-center justify-center filter drop-shadow-md transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/assets/aistudio/Nohara_sad_ba04fada.png"
                  alt="Feeling Sad"
                  className="max-h-full max-w-full object-contain filter contrast-[1.02]"
                />
              </div>

              {/* Sad Emoji indicator */}
              <div className="absolute -top-1 -right-2 bg-white/95 rounded-full p-1.5 shadow-md border border-slate-200 text-2xl animate-pulse">
                🥺
              </div>

              {/* Little teardrop */}
              <div className="absolute bottom-6 left-4 text-base animate-bounce">
                💧
              </div>
            </div>

            {/* Sad state text badge */}
            <div className="mt-3 text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <span>😢 Feeling sad & down today</span>
            </div>

            {/* Interactive Call-To-Action Pill */}
            <div className="mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-rose-600 text-white font-extrabold text-xs shadow-md group-hover:from-indigo-700 group-hover:to-rose-700 transition-all flex items-center gap-1.5">
              <span>✨ Tap to Cheer Up with a Warm Hug! 🫂</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-in zoom-in-95 duration-500 w-full">
            {/* Happy Sunshine & Rainbow */}
            <div className="flex items-center gap-2 mb-2 text-amber-500">
              <span className="text-xl animate-spin-slow">☀️</span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">Warmth & Joy</span>
              <span className="text-xl">🌈</span>
            </div>

            {/* Happy Character Illustration with Joyful Burst */}
            <div className="relative my-1">
              <div className="w-36 h-44 sm:w-40 sm:h-48 flex items-center justify-center filter drop-shadow-lg animate-bounce">
                <img
                  src="/assets/aistudio/Nihora_happy-removebg-preview_8f31da34.png"
                  alt="Feeling Happy"
                  className="max-h-full max-w-full object-contain brightness-105 contrast-105 scale-105"
                />
              </div>

              {/* Happy Emoji indicator */}
              <div className="absolute -top-2 -right-3 bg-white rounded-full p-1.5 shadow-lg border border-amber-300 text-2xl animate-spin-slow">
                🥰
              </div>

              {/* Celebration Sparkles */}
              <div className="absolute -top-1 -left-2 text-xl animate-ping">
                ✨
              </div>
              <div className="absolute bottom-2 -right-2 text-xl animate-bounce">
                💖
              </div>
            </div>

            {/* Happy state text badge */}
            <div className="mt-3 text-xs font-extrabold text-amber-800 flex items-center gap-1.5">
              <span>🎉 Smiling bright & full of joy!</span>
            </div>

            {/* Interactive Replay Pill */}
            <div className="mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-xs shadow-md hover:from-amber-600 hover:to-rose-600 transition-all flex items-center gap-1.5">
              <span>💖 Cheered Up & Full of Smiles! (Tap to replay)</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl text-xs text-indigo-950 max-w-sm leading-relaxed text-left">
        <div className="font-bold mb-1 flex items-center gap-1 text-indigo-900">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Gentle Reminder for Today:</span>
        </div>
        Bad days are just moments in time, not a reflection of your worth or your future. Rest your mind, take it one breath at a time, and let yourself heal.
      </div>
    </div>
  );
};

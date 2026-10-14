import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Sparkles, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audioSynthesis';
import { MicBlowDetector } from '../../utils/micBlowDetector';

interface CakeCandlesActivityProps {
  recipientName: string;
  age?: number;
  cakeFlavor?: string;
  onCandlesBlown?: () => void;
}

export const CakeCandlesActivity: React.FC<CakeCandlesActivityProps> = ({
  recipientName,
  age = 25,
  cakeFlavor = 'Red Velvet & Strawberry',
  onCandlesBlown,
}) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isMicListening, setIsMicListening] = useState(false);
  const [micSupported, setMicSupported] = useState(true);
  const [detector, setDetector] = useState<MicBlowDetector | null>(null);

  // Candles to render (max 5 for clean aesthetics)
  const candleCount = Math.min(Math.max(age > 0 ? (age > 10 ? 5 : age) : 3, 3), 5);

  const extinguishCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    sound.playBlowSound();

    // Trigger celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fbbf24', '#38bdf8', '#a855f7', '#ec4899'],
    });

    // Start birthday song
    setTimeout(() => {
      sound.playBirthdaySong(true);
      if (onCandlesBlown) onCandlesBlown();
    }, 600);
  };

  const toggleMic = async () => {
    if (isMicListening && detector) {
      detector.stopListening();
      setIsMicListening(false);
      return;
    }

    const blowDetector = new MicBlowDetector(() => {
      extinguishCandles();
      setIsMicListening(false);
    });

    const success = await blowDetector.startListening();
    if (success) {
      setDetector(blowDetector);
      setIsMicListening(true);
    } else {
      setMicSupported(false);
    }
  };

  useEffect(() => {
    return () => {
      if (detector) detector.stopListening();
    };
  }, [detector]);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
      {/* Title */}
      <div className="mb-4 animate-float">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-pink-100 text-pink-700 mb-2 border border-pink-200">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          Interactive Birthday Cake
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Make a Wish, <span className="text-rose-600">{recipientName}</span>!
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          {candlesLit
            ? 'Blow into your microphone or tap the candles to blow them out!'
            : '🎉 Your wish has been made! Happy Birthday!'}
        </p>
      </div>

      {/* Interactive Birthday Cake Illustration */}
      <div
        onClick={candlesLit ? extinguishCandles : undefined}
        className={`relative my-6 cursor-pointer select-none transition-transform duration-300 ${
          candlesLit ? 'hover:scale-105 active:scale-95' : 'scale-100'
        }`}
        title={candlesLit ? 'Tap to blow out the candles!' : 'Candles blown!'}
      >
        {/* Glow halo when candles are lit */}
        {candlesLit && (
          <div className="absolute -inset-6 bg-amber-400/20 blur-2xl rounded-full pointer-events-none animate-pulse-glow" />
        )}

        {/* Candles Container */}
        <div className="relative flex justify-center gap-4 md:gap-6 mb-[-6px] z-10">
          {Array.from({ length: candleCount }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Flame */}
              {candlesLit ? (
                <div className="relative flex flex-col items-center animate-bounce duration-700">
                  <div className="w-4 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_15px_rgba(251,191,36,0.9)] animate-pulse" />
                  <div className="w-1.5 h-2 bg-slate-700 -mt-1 rounded-sm" />
                </div>
              ) : (
                /* Smoke puff */
                <div className="h-6 flex flex-col items-center">
                  <span className="text-xs text-slate-400 animate-pulse">~ 💨</span>
                </div>
              )}
              {/* Candle Body */}
              <div
                className={`w-3.5 h-12 md:h-14 rounded-t-sm shadow-md border-t border-white/60 ${
                  i % 2 === 0
                    ? 'bg-gradient-to-b from-rose-400 via-pink-400 to-rose-500'
                    : 'bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500'
                }`}
              >
                {/* Candle spiral stripes */}
                <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,#fff,#fff_3px,transparent_3px,transparent_6px)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Cake Tier 1 (Top) */}
        <div className="relative w-48 md:w-56 h-16 bg-gradient-to-b from-rose-200 via-pink-100 to-pink-200 rounded-t-2xl shadow-md border-t-4 border-pink-300/80 mx-auto flex items-center justify-center overflow-hidden">
          {/* Dripping Frosting */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/90 rounded-b-xl shadow-sm flex justify-around">
            <span className="w-4 h-5 bg-white rounded-b-full shadow-sm" />
            <span className="w-5 h-6 bg-white rounded-b-full shadow-sm" />
            <span className="w-4 h-4 bg-white rounded-b-full shadow-sm" />
            <span className="w-5 h-7 bg-white rounded-b-full shadow-sm" />
            <span className="w-4 h-5 bg-white rounded-b-full shadow-sm" />
          </div>
          <span className="font-handwriting text-xl font-bold text-rose-700 tracking-wide mt-2">
            {age ? `${age} Years Young` : 'Happy Birthday'}
          </span>
        </div>

        {/* Cake Tier 2 (Bottom Base) */}
        <div className="relative w-64 md:w-72 h-20 bg-gradient-to-b from-rose-300 via-pink-200 to-rose-400 rounded-t-xl rounded-b-md shadow-xl border-t-2 border-rose-300 mx-auto flex items-center justify-center overflow-hidden">
          {/* Frosting rosettes */}
          <div className="absolute top-0 inset-x-0 flex justify-around -mt-1">
            {Array.from({ length: 9 }).map((_, idx) => (
              <span key={idx} className="w-4 h-3 bg-white rounded-full shadow-sm" />
            ))}
          </div>
          {/* Recipient Name in celebratory golden script */}
          <div className="z-10 px-4 py-1 bg-white/80 backdrop-blur-xs rounded-full border border-pink-300/50 shadow-xs">
            <span className="font-script text-2xl font-bold text-rose-800 drop-shadow-xs">
              {recipientName}
            </span>
          </div>
        </div>

        {/* Cake Stand / Plate */}
        <div className="w-72 md:w-80 h-3 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-full shadow-lg mx-auto border-t border-amber-300" />
        <div className="w-24 h-4 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-lg mx-auto shadow-sm" />
      </div>

      {/* Flavor badge */}
      <div className="text-xs text-slate-500 font-medium">
        Flavor: <span className="text-rose-600 font-semibold">{cakeFlavor}</span>
      </div>

      {/* Action Controls: Mic listener toggle or tap hint */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {candlesLit ? (
          <>
            <button
              onClick={extinguishCandles}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:from-rose-600 hover:to-pink-600 active:scale-95 transition-all"
            >
              <Flame className="w-4 h-4 text-amber-200" />
              Tap to Blow Out Candles
            </button>

            {micSupported && (
              <button
                onClick={toggleMic}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                  isMicListening
                    ? 'bg-rose-50 border-rose-400 text-rose-700 animate-pulse'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {isMicListening ? (
                  <>
                    <Mic className="w-4 h-4 text-rose-600 animate-ping" />
                    <span>Listening... Blow now! 🎙️</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-slate-600" />
                    <span>Enable Blow via Mic</span>
                  </>
                )}
              </button>
            )}
          </>
        ) : (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 text-white font-semibold text-sm shadow-md animate-bounce">
            <Sparkles className="w-4 h-4 text-yellow-200" />
            Wishes Blown Out! Music Playing 🎶
          </div>
        )}
      </div>
    </div>
  );
};

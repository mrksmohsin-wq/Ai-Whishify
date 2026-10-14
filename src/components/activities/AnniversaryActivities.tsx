import React, { useState } from 'react';
import { Heart, Sparkles, Calendar, MapPin, Compass } from 'lucide-react';

interface CoupleHeartsProps {
  recipientName: string;
  senderName: string;
  yearsTogether?: number;
  howWeMet?: string;
}

export const CoupleHeartsActivity: React.FC<CoupleHeartsProps> = ({
  recipientName,
  senderName,
  yearsTogether = 5,
  howWeMet,
}) => {
  const daysTogether = yearsTogether * 365 + 1;

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-800 mb-2 border border-rose-200">
        <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
        Milestone Celebration
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        {yearsTogether} Beautiful Years Together
      </h2>
      <p className="text-xs text-slate-600 mb-6">
        Over {daysTogether.toLocaleString()} days of laughs, adventures, and endless love
      </p>

      {/* Interlocking Glowing Hearts */}
      <div className="relative flex items-center justify-center h-48 my-2">
        {/* Glow */}
        <div className="absolute inset-0 bg-rose-500/15 blur-2xl rounded-full" />

        {/* Heart 1 */}
        <div className="relative w-36 h-36 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-3xl rotate-45 flex items-center justify-center shadow-2xl animate-float">
          <div className="-rotate-45 text-white font-script text-2xl font-bold drop-shadow-md">
            {senderName}
          </div>
        </div>

        {/* Heart 2 Intersecting */}
        <div className="relative w-36 h-36 bg-gradient-to-tr from-pink-500 to-rose-600 rounded-3xl rotate-45 flex items-center justify-center shadow-2xl -ml-12 animate-float [animation-delay:1.5s]">
          <div className="-rotate-45 text-white font-script text-2xl font-bold drop-shadow-md">
            {recipientName}
          </div>
        </div>

        {/* Center Sparkle Badge */}
        <div className="absolute z-20 w-12 h-12 rounded-full bg-amber-400 border-2 border-white shadow-lg flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
      </div>

      {howWeMet && (
        <div className="mt-6 p-4 bg-white/90 rounded-2xl border border-rose-200 shadow-sm max-w-sm text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5" /> Where Our Story Started
          </div>
          <p className="text-xs text-slate-700 leading-relaxed italic">
            "{howWeMet}"
          </p>
        </div>
      )}
    </div>
  );
};

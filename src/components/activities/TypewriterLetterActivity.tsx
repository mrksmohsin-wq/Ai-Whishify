import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, Play, FastForward, Heart } from 'lucide-react';

interface TypewriterLetterActivityProps {
  recipientName: string;
  senderName: string;
  message: string;
  relationship?: string;
}

export const TypewriterLetterActivity: React.FC<TypewriterLetterActivityProps> = ({
  recipientName,
  senderName,
  message,
  relationship,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [speed, setSpeed] = useState(25); // ms per character

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const interval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [message, speed]);

  const handleInstantReveal = () => {
    setDisplayedText(message);
    setIsTypingComplete(true);
  };

  const handleReplay = () => {
    setDisplayedText('');
    setIsTypingComplete(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-xl mx-auto">
      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-800 mb-2 border border-rose-200">
        <Mail className="w-3.5 h-3.5 text-rose-600" />
        Heartfelt Letter
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
        A Message for You
      </h2>

      {/* Parchment / Letter Envelope Container */}
      <div className="relative w-full bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-rose-50/90 rounded-2xl p-6 md:p-8 shadow-xl border border-amber-200/80 text-left transition-all">
        {/* Decorative Stamp & Seal */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="w-10 h-12 border-2 border-dashed border-rose-300 rounded bg-white/80 flex flex-col items-center justify-center p-1 shadow-xs">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-[9px] font-bold text-rose-700 mt-0.5">AIR MAIL</span>
          </div>
        </div>

        {/* Salutation */}
        <div className="font-handwriting text-2xl md:text-3xl font-bold text-slate-800 mb-4">
          Dearest {recipientName},
        </div>

        {/* Typed Content Body */}
        <div className="font-sans text-base md:text-lg text-slate-700 leading-relaxed min-h-[140px] whitespace-pre-wrap">
          {displayedText}
          {!isTypingComplete && (
            <span className="inline-block w-2 h-5 bg-rose-500 ml-1 animate-pulse" />
          )}
        </div>

        {/* Sign-off */}
        <div className="mt-6 pt-4 border-t border-amber-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">With deepest love,</div>
            <div className="font-script text-2xl md:text-3xl text-rose-800 font-bold mt-0.5">
              {senderName || 'Your Loved One'}
            </div>
            {relationship && (
              <span className="text-xs text-rose-600/80 font-medium">({relationship})</span>
            )}
          </div>
          <div className="text-xs text-amber-800/80 flex items-center gap-1 font-medium italic">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Written with love on AI Wishify
          </div>
        </div>
      </div>

      {/* Control buttons */}
      <div className="mt-4 flex items-center gap-2 text-xs">
        {!isTypingComplete ? (
          <button
            onClick={handleInstantReveal}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 shadow-xs"
          >
            <FastForward className="w-3.5 h-3.5 text-slate-500" />
            Skip typing
          </button>
        ) : (
          <button
            onClick={handleReplay}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 shadow-xs"
          >
            <Play className="w-3.5 h-3.5 text-slate-500" />
            Replay letter
          </button>
        )}
      </div>
    </div>
  );
};

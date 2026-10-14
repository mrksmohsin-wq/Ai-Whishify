import React, { useState } from 'react';
import { Award, CheckSquare, Square, Shield, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroBadgeProps {
  recipientName: string;
}

export const HeroBadgeActivity: React.FC<HeroBadgeProps> = ({ recipientName }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 mb-2 border border-blue-200">
        <Shield className="w-3.5 h-3.5 text-blue-600" />
        Honorary Hero Badge
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        #1 Champion Award
      </h2>
      <p className="text-xs text-slate-600 mb-6">
        Awarded for unmatched strength, guidance, and endless patience
      </p>

      {/* 3D Gold Medal / Trophy */}
      <div className="relative flex flex-col items-center animate-float">
        {/* Ribbon Hanging Neck */}
        <div className="flex justify-center -mb-4 z-0">
          <div className="w-8 h-20 bg-gradient-to-b from-blue-700 to-blue-900 transform -rotate-12 rounded-t-sm shadow-md" />
          <div className="w-8 h-20 bg-gradient-to-b from-blue-700 to-blue-900 transform rotate-12 -ml-2 rounded-t-sm shadow-md" />
        </div>

        {/* Medal Circle */}
        <div className="relative z-10 w-44 h-44 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border-4 border-amber-600 shadow-2xl flex flex-col items-center justify-center p-4 text-center">
          <Award className="w-12 h-12 text-amber-800 drop-shadow-sm mb-1" />
          <div className="text-xs uppercase font-extrabold tracking-widest text-amber-950">
            WORLD'S #1
          </div>
          <div className="font-script text-2xl font-black text-amber-950 leading-tight">
            {recipientName}
          </div>
          <div className="text-[10px] uppercase font-bold text-amber-800 mt-1">
            FOREVER OUR HERO
          </div>
        </div>
      </div>
    </div>
  );
};

interface LessonsDadTaughtProps {
  lessons?: string[];
}

export const LessonsDadTaughtActivity: React.FC<LessonsDadTaughtProps> = ({
  lessons = [
    'Always stand firm and stay true to your word',
    'How to laugh through the toughest storms',
    'The value of honest, hard work',
    'How to check the tire pressure and oil',
    'That family always comes first no matter what',
  ],
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  });

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [idx]: !prev[idx] };
      if (!prev[idx]) {
        confetti({
          particleCount: 20,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#fbbf24', '#10b981'],
        });
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 mb-2 border border-blue-200">
        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
        Wisdom Passed Down
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Things You Taught Us
      </h2>
      <p className="text-xs text-slate-600 mb-6">
        Life lessons that will stay with us forever
      </p>

      {/* Checklist */}
      <div className="w-full bg-white rounded-2xl p-5 shadow-xl border border-slate-200 text-left space-y-3">
        {lessons.map((lesson, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                isChecked
                  ? 'bg-blue-50/80 border border-blue-200'
                  : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isChecked ? (
                <CheckSquare className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              )}
              <span
                className={`text-sm ${
                  isChecked ? 'text-blue-950 font-semibold line-through opacity-80' : 'text-slate-800'
                }`}
              >
                {lesson}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

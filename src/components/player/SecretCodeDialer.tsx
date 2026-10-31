import React, { useState, useEffect } from 'react';
import { Lock, Unlock, HelpCircle, Delete, KeyRound, Sparkles, Check, AlertCircle } from 'lucide-react';
import { sound } from '../../utils/audioSynthesis';

interface SecretCodeDialerProps {
  recipientName: string;
  senderName: string;
  secretCode?: string;
  hint?: string;
  onUnlocked: () => void;
  isPreview?: boolean;
}

export const SecretCodeDialer: React.FC<SecretCodeDialerProps> = ({
  recipientName,
  senderName,
  secretCode = '1234',
  hint,
  onUnlocked,
  isPreview = false,
}) => {
  const targetCode = (secretCode || '1234').trim().toUpperCase();
  const [enteredCode, setEnteredCode] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rotaryAngle, setRotaryAngle] = useState(0);

  const maxLen = Math.max(targetCode.length, 4);

  const handleDigitPress = (digit: string) => {
    if (isSuccess) return;
    if (enteredCode.length >= maxLen) return;

    sound.playDialTick();
    setIsError(false);
    const newCode = enteredCode + digit;
    setEnteredCode(newCode);

    // Visual dial spin feedback
    const digitNum = parseInt(digit, 10);
    if (!isNaN(digitNum)) {
      setRotaryAngle((prev) => (prev + 36 * (digitNum + 1)) % 360);
    }

    // Auto check if length matches
    if (newCode.length === targetCode.length) {
      verifyCode(newCode);
    }
  };

  const handleBackspace = () => {
    if (isSuccess || enteredCode.length === 0) return;
    sound.playDialTick();
    setIsError(false);
    setEnteredCode((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (isSuccess) return;
    sound.playDialTick();
    setIsError(false);
    setEnteredCode('');
  };

  const verifyCode = (codeToTest: string) => {
    if (codeToTest.toUpperCase() === targetCode) {
      setIsSuccess(true);
      sound.playAccessGranted();
      setTimeout(() => {
        onUnlocked();
      }, 700);
    } else {
      setIsError(true);
      sound.playAccessDenied();
      setTimeout(() => {
        setEnteredCode('');
        setIsError(false);
      }, 900);
    }
  };

  // Keyboard support for typing code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSuccess) return;
      if (e.key >= '0' && e.key <= '9') {
        handleDigitPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      } else if (e.key === 'Enter') {
        if (enteredCode.length > 0) {
          verifyCode(enteredCode);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enteredCode, isSuccess, targetCode]);

  const dialPad = [
    { num: '1', letters: ' ' },
    { num: '2', letters: 'ABC' },
    { num: '3', letters: 'DEF' },
    { num: '4', letters: 'GHI' },
    { num: '5', letters: 'JKL' },
    { num: '6', letters: 'MNO' },
    { num: '7', letters: 'PQRS' },
    { num: '8', letters: 'TUV' },
    { num: '9', letters: 'WXYZ' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-gradient-to-tr from-amber-500/15 via-rose-500/15 to-purple-500/15 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div
        className={`relative w-full max-w-sm bg-slate-900/95 border ${
          isError
            ? 'border-red-500 shadow-2xl shadow-red-500/30 animate-shake'
            : isSuccess
            ? 'border-emerald-400 shadow-2xl shadow-emerald-500/30'
            : 'border-amber-500/30 shadow-2xl shadow-amber-500/10'
        } rounded-3xl p-6 text-center transition-all duration-300 text-white select-none`}
      >
        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold tracking-wider uppercase mb-3">
          <KeyRound className="w-3.5 h-3.5 text-amber-400" />
          <span>Secret Code Protected</span>
        </div>

        <h2 className="text-xl font-black text-white tracking-tight">
          Special Greeting for {recipientName}
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          From <span className="text-amber-300 font-semibold">{senderName}</span> • Enter the code to open the celebration curtains
        </p>

        {/* Rotary Dial Visual Center */}
        <div className="relative my-4 flex items-center justify-center">
          <div
            className="w-24 h-24 rounded-full border-4 border-amber-500/30 bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center shadow-inner transition-transform duration-500"
            style={{ transform: `rotate(${rotaryAngle}deg)` }}
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-400/40 flex items-center justify-center bg-slate-900/80 shadow-md">
              {isSuccess ? (
                <Unlock className="w-7 h-7 text-emerald-400 animate-bounce" />
              ) : isError ? (
                <Lock className="w-7 h-7 text-red-400" />
              ) : (
                <Lock className="w-7 h-7 text-amber-400" />
              )}
            </div>
          </div>

          {/* Calibrated Tick Marks around dial */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-28 h-28 rounded-full border border-amber-400/20" />
          </div>
        </div>

        {/* Code Input Display */}
        <div className="mb-4">
          <div className="flex items-center justify-center gap-3">
            {Array.from({ length: targetCode.length }).map((_, idx) => {
              const char = enteredCode[idx];
              const isFilled = char !== undefined;
              return (
                <div
                  key={idx}
                  className={`w-10 h-12 rounded-xl flex items-center justify-center text-lg font-black transition-all duration-200 border ${
                    isError
                      ? 'border-red-500 bg-red-950/40 text-red-300'
                      : isSuccess
                      ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 scale-105'
                      : isFilled
                      ? 'border-amber-400/80 bg-amber-950/30 text-amber-200'
                      : 'border-slate-700 bg-slate-800/60 text-slate-500'
                  }`}
                >
                  {isFilled ? '●' : '•'}
                </div>
              );
            })}
          </div>

          {/* Status Message */}
          <div className="h-5 mt-2 flex items-center justify-center text-xs">
            {isSuccess ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                <Check className="w-3.5 h-3.5" /> Code Correct! Opening Curtains...
              </span>
            ) : isError ? (
              <span className="text-red-400 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Incorrect code. Try again!
              </span>
            ) : hint && showHint ? (
              <span className="text-amber-300 font-medium text-[11px] bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                Hint: {hint}
              </span>
            ) : (
              <span className="text-slate-500 text-[11px]">
                Enter {targetCode.length} digits on the dialer
              </span>
            )}
          </div>
        </div>

        {/* 3x3 Keypad + Bottom Row */}
        <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto">
          {dialPad.map(({ num, letters }) => (
            <button
              key={num}
              type="button"
              onClick={() => handleDigitPress(num)}
              className="py-2.5 px-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 active:scale-95 transition-all text-center group cursor-pointer"
            >
              <div className="text-base font-extrabold text-white group-hover:text-amber-300 leading-none">
                {num}
              </div>
              <div className="text-[9px] text-slate-400 font-semibold tracking-widest mt-0.5">
                {letters}
              </div>
            </button>
          ))}

          {/* Clear button */}
          <button
            type="button"
            onClick={handleClear}
            className="py-2.5 px-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-white active:scale-95 transition-all text-xs font-bold"
            title="Clear all"
          >
            Clear
          </button>

          {/* Zero Button */}
          <button
            type="button"
            onClick={() => handleDigitPress('0')}
            className="py-2.5 px-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 active:scale-95 transition-all text-center group cursor-pointer"
          >
            <div className="text-base font-extrabold text-white group-hover:text-amber-300 leading-none">
              0
            </div>
            <div className="text-[9px] text-slate-400 font-semibold tracking-widest mt-0.5">
              +
            </div>
          </button>

          {/* Backspace Button */}
          <button
            type="button"
            onClick={handleBackspace}
            className="py-2.5 px-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-white active:scale-95 transition-all flex items-center justify-center"
            title="Backspace"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>

        {/* Footer controls: Hint button & Preview Quick Unlock */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          {hint ? (
            <button
              type="button"
              onClick={() => {
                sound.playDialTick();
                setShowHint(!showHint);
              }}
              className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 hover:underline font-semibold"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
            </button>
          ) : (
            <div />
          )}

          {/* In preview mode or creator mode, allow quick auto-unlock */}
          {isPreview && (
            <button
              type="button"
              onClick={() => {
                setEnteredCode(targetCode);
                verifyCode(targetCode);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-[11px] font-bold border border-amber-500/30"
              title="Creator shortcut to test unlock"
            >
              <Sparkles className="w-3 h-3" />
              <span>Preview Unlock ({targetCode})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

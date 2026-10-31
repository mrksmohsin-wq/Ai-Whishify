import React, { useState, useEffect } from 'react';
import { Sparkles, Play, RotateCcw, Palette, Settings, Check, Volume2 } from 'lucide-react';
import { sound } from '../../utils/audioSynthesis';

export type CurtainColorTheme =
  | 'velvet_red'
  | 'midnight_blue'
  | 'royal_gold'
  | 'emerald_green'
  | 'romantic_rose'
  | 'deep_purple';

interface TheatricalCurtainsProps {
  recipientName: string;
  senderName: string;
  initialColor?: CurtainColorTheme;
  customMessage?: string;
  autoOpen?: boolean;
  onOpened?: () => void;
  isPreview?: boolean;
  onColorChange?: (color: CurtainColorTheme) => void;
  onMessageChange?: (msg: string) => void;
}

const COLOR_CONFIGS: Record<
  CurtainColorTheme,
  {
    name: string;
    leftGradient: string;
    rightGradient: string;
    valanceBg: string;
    accentGold: string;
    bannerBg: string;
    glowColor: string;
  }
> = {
  velvet_red: {
    name: 'Royal Velvet Red',
    leftGradient:
      'repeating-linear-gradient(90deg, #450a0a 0px, #7f1d1d 30px, #991b1b 50px, #b91c1c 70px, #450a0a 100px)',
    rightGradient:
      'repeating-linear-gradient(90deg, #450a0a 0px, #b91c1c 30px, #991b1b 50px, #7f1d1d 70px, #450a0a 100px)',
    valanceBg: 'linear-gradient(180deg, #7f1d1d 0%, #450a0a 100%)',
    accentGold: '#f59e0b',
    bannerBg: 'bg-red-950/90 border-amber-400',
    glowColor: 'from-amber-400/40 via-red-500/20 to-transparent',
  },
  midnight_blue: {
    name: 'Midnight Sapphire',
    leftGradient:
      'repeating-linear-gradient(90deg, #09132e 0px, #172554 30px, #1e3a8a 50px, #2563eb 70px, #09132e 100px)',
    rightGradient:
      'repeating-linear-gradient(90deg, #09132e 0px, #2563eb 30px, #1e3a8a 50px, #172554 70px, #09132e 100px)',
    valanceBg: 'linear-gradient(180deg, #1e3a8a 0%, #0f172a 100%)',
    accentGold: '#fbbf24',
    bannerBg: 'bg-blue-950/90 border-amber-300',
    glowColor: 'from-blue-400/40 via-indigo-500/20 to-transparent',
  },
  royal_gold: {
    name: 'Imperial Gold',
    leftGradient:
      'repeating-linear-gradient(90deg, #451a03 0px, #78350f 30px, #b45309 50px, #f59e0b 70px, #451a03 100px)',
    rightGradient:
      'repeating-linear-gradient(90deg, #451a03 0px, #f59e0b 30px, #b45309 50px, #78350f 70px, #451a03 100px)',
    valanceBg: 'linear-gradient(180deg, #b45309 0%, #451a03 100%)',
    accentGold: '#fef08a',
    bannerBg: 'bg-amber-950/90 border-yellow-300',
    glowColor: 'from-yellow-300/50 via-amber-400/30 to-transparent',
  },
  emerald_green: {
    name: 'Regal Emerald',
    leftGradient:
      'repeating-linear-gradient(90deg, #022c22 0px, #064e3b 30px, #047857 50px, #059669 70px, #022c22 100px)',
    rightGradient:
      'repeating-linear-gradient(90deg, #022c22 0px, #059669 30px, #047857 50px, #064e3b 70px, #022c22 100px)',
    valanceBg: 'linear-gradient(180deg, #065f46 0%, #022c22 100%)',
    accentGold: '#facc15',
    bannerBg: 'bg-emerald-950/90 border-amber-300',
    glowColor: 'from-emerald-300/40 via-teal-500/20 to-transparent',
  },
  romantic_rose: {
    name: 'Romantic Rose',
    leftGradient:
      'repeating-linear-gradient(90deg, #4c0519 0px, #881337 30px, #be123c 50px, #e11d48 70px, #4c0519 100px)',
    rightGradient:
      'repeating-linear-gradient(90deg, #4c0519 0px, #e11d48 30px, #be123c 50px, #881337 70px, #4c0519 100px)',
    valanceBg: 'linear-gradient(180deg, #9f1239 0%, #4c0519 100%)',
    accentGold: '#fde047',
    bannerBg: 'bg-rose-950/90 border-pink-300',
    glowColor: 'from-pink-300/40 via-rose-500/20 to-transparent',
  },
  deep_purple: {
    name: 'Majestic Amethyst',
    leftGradient:
      'repeating-linear-gradient(90deg, #2e1065 0px, #581c87 30px, #7e22ce 50px, #9333ea 70px, #2e1065 100px)',
    rightGradient:
      'repeating-linear-gradient(90deg, #2e1065 0px, #9333ea 30px, #7e22ce 50px, #581c87 70px, #2e1065 100px)',
    valanceBg: 'linear-gradient(180deg, #6b21a8 0%, #2e1065 100%)',
    accentGold: '#fbbf24',
    bannerBg: 'bg-purple-950/90 border-amber-300',
    glowColor: 'from-purple-300/40 via-fuchsia-500/20 to-transparent',
  },
};

export const TheatricalCurtains: React.FC<TheatricalCurtainsProps> = ({
  recipientName,
  senderName,
  initialColor = 'velvet_red',
  customMessage,
  autoOpen = false,
  onOpened,
  isPreview = false,
  onColorChange,
  onMessageChange,
}) => {
  const [color, setColor] = useState<CurtainColorTheme>(initialColor);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [message, setMessage] = useState(
    customMessage || `A Special Celebration for ${recipientName}`
  );

  const theme = COLOR_CONFIGS[color] || COLOR_CONFIGS.velvet_red;

  const handleOpenCurtains = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    sound.playCurtainsOpening();

    // Curtains slide animation takes 1.6s
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      onOpened?.();
    }, 1600);
  };

  const handleReplay = () => {
    setIsOpen(false);
    setIsOpening(false);
  };

  // Auto-open trigger if enabled (e.g. after secret code verified)
  useEffect(() => {
    if (autoOpen && !isOpen && !isOpening) {
      const timer = setTimeout(() => {
        handleOpenCurtains();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [autoOpen]);

  const handleSelectColor = (c: CurtainColorTheme) => {
    setColor(c);
    onColorChange?.(c);
  };

  return (
    <>
      {/* FULL-SCREEN THEATER CURTAIN OVERLAY */}
      {(!isOpen || isOpening) && (
        <div className="fixed inset-0 z-40 overflow-hidden select-none pointer-events-auto">
          {/* Central Spotlight Glow (reveals behind parting curtains) */}
          <div
            className={`absolute inset-0 bg-gradient-radial ${theme.glowColor} transition-opacity duration-1000 ${
              isOpening ? 'opacity-100 scale-125' : 'opacity-0 scale-95'
            } flex items-center justify-center`}
          />

          {/* LEFT CURTAIN */}
          <div
            style={{
              background: theme.leftGradient,
              boxShadow: 'inset -20px 0 35px rgba(0,0,0,0.85), 10px 0 25px rgba(0,0,0,0.6)',
              transform: isOpening ? 'translateX(-100%)' : 'translateX(0)',
              transition: 'transform 1.6s cubic-bezier(0.77, 0, 0.175, 1)',
            }}
            className="absolute top-0 bottom-0 left-0 w-1/2 z-20"
          >
            {/* Vertical velvet shadow folds */}
            <div className="w-full h-full bg-gradient-to-r from-black/40 via-transparent to-black/60 pointer-events-none" />

            {/* Left Gold Tassel Rope */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-3 h-20 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 rounded-full shadow-lg" />
              <div className="w-6 h-10 bg-amber-400 rounded-b-xl shadow-md border-t border-amber-600" />
            </div>
          </div>

          {/* RIGHT CURTAIN */}
          <div
            style={{
              background: theme.rightGradient,
              boxShadow: 'inset 20px 0 35px rgba(0,0,0,0.85), -10px 0 25px rgba(0,0,0,0.6)',
              transform: isOpening ? 'translateX(100%)' : 'translateX(0)',
              transition: 'transform 1.6s cubic-bezier(0.77, 0, 0.175, 1)',
            }}
            className="absolute top-0 bottom-0 right-0 w-1/2 z-20"
          >
            {/* Vertical velvet shadow folds */}
            <div className="w-full h-full bg-gradient-to-l from-black/40 via-transparent to-black/60 pointer-events-none" />

            {/* Right Gold Tassel Rope */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-3 h-20 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 rounded-full shadow-lg" />
              <div className="w-6 h-10 bg-amber-400 rounded-b-xl shadow-md border-t border-amber-600" />
            </div>
          </div>

          {/* TOP DRAPERY VALANCE / PELMET WITH GOLD FRINGE */}
          <div
            style={{
              background: theme.valanceBg,
              boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
            }}
            className="absolute top-0 left-0 right-0 h-16 sm:h-20 z-30 flex items-center justify-center border-b-4 border-amber-400"
          >
            {/* Scalloped draped pelmet curves */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-24 h-5 -mb-2 rounded-b-full bg-amber-400/90 shadow-sm border-t border-amber-600"
                />
              ))}
            </div>

            <div className="relative z-10 flex items-center gap-2 text-amber-300 font-serif font-bold text-xs sm:text-sm tracking-widest uppercase drop-shadow-md">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Grand Celebration Premiere</span>
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>

          {/* CENTER CREST BANNER & OPENING BUTTON (fades out as curtains part) */}
          <div
            className={`absolute inset-0 z-30 flex flex-col items-center justify-center p-4 transition-all duration-700 ${
              isOpening ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
            }`}
          >
            <div
              className={`max-w-md w-full ${theme.bannerBg} border-2 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-md`}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>The Stage Is Set</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display drop-shadow-lg">
                {message}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Crafted with love by <strong className="text-amber-300 font-bold">{senderName}</strong>
              </p>

              {/* Action Button: Tap to Open Curtains */}
              <button
                type="button"
                onClick={handleOpenCurtains}
                className="mt-6 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>Tap to Open Curtains</span>
              </button>

              {/* Preview Customizer Toggle */}
              {isPreview && (
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomizer(!showCustomizer)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    <span>Customise Curtains</span>
                  </button>
                </div>
              )}
            </div>

            {/* In-place Customizer Box */}
            {isPreview && showCustomizer && (
              <div className="mt-4 max-w-md w-full bg-slate-900/95 border border-slate-700 rounded-2xl p-4 shadow-xl text-left text-white animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Settings className="w-3.5 h-3.5" /> Curtains Customizer
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCustomizer(false)}
                    className="text-slate-400 hover:text-white text-xs font-bold"
                  >
                    Done
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1.5">
                      Curtain Velvet Color:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.keys(COLOR_CONFIGS) as CurtainColorTheme[]).map((cKey) => (
                        <button
                          key={cKey}
                          type="button"
                          onClick={() => handleSelectColor(cKey)}
                          className={`px-2 py-1.5 rounded-xl text-[10px] font-bold text-center border transition-all ${
                            color === cKey
                              ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                              : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {COLOR_CONFIGS[cKey].name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Curtain Banner Message:
                    </label>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        onMessageChange?.(e.target.value);
                      }}
                      placeholder="e.g. A Special Surprise for Mohsin"
                      className="w-full px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REPLAY CURTAINS FLOATING TRIGGER (Visible after curtains have opened) */}
      {isOpen && (
        <div className="fixed top-4 right-4 z-30 flex items-center gap-2 animate-in fade-in">
          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold border border-white/20 shadow-lg backdrop-blur-md transition-all active:scale-95"
            title="Replay curtains opening"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Replay Curtains</span>
          </button>
        </div>
      )}
    </>
  );
};

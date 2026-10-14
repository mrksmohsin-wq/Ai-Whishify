import React, { useState } from 'react';
import { Lock, Sparkles, Key, AlertCircle } from 'lucide-react';

interface PinGateModalProps {
  recipientName: string;
  expectedPin: string;
  onUnlocked: () => void;
}

export const PinGateModal: React.FC<PinGateModalProps> = ({
  recipientName,
  expectedPin,
  onUnlocked,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === expectedPin.trim()) {
      onUnlocked();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse-glow">
          <Lock className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-black mb-1">Protected Greeting</h2>
        <p className="text-xs text-slate-300 mb-6">
          A secret surprise has been prepared for{' '}
          <span className="text-amber-400 font-bold">{recipientName}</span>. Please enter the passcode to unlock.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              autoFocus
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN code..."
              className={`w-full px-4 py-3 rounded-2xl bg-black/30 border text-center text-lg font-mono tracking-widest text-white placeholder-slate-400 focus:outline-none transition-all ${
                error
                  ? 'border-red-500 ring-2 ring-red-400/50'
                  : 'border-white/30 focus:border-amber-400'
              }`}
            />
          </div>

          {error && (
            <div className="text-xs font-semibold text-rose-300 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Incorrect PIN. Please try again!</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-extrabold text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Key className="w-4 h-4" />
            <span>Unlock Experience</span>
          </button>
        </form>
      </div>
    </div>
  );
};

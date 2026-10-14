import React, { useState } from 'react';
import { Heart, Send, Sparkles, Check, MessageSquare, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audioSynthesis';

interface ClosingReactionProps {
  wishId: string;
  senderName: string;
  recipientName: string;
  onSendReaction?: (emoji: string, reply: string) => Promise<void>;
  onCreateOwn?: () => void;
}

export const ClosingReactionActivity: React.FC<ClosingReactionProps> = ({
  wishId,
  senderName,
  recipientName,
  onSendReaction,
  onCreateOwn,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState('❤️');
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSentReply, setHasSentReply] = useState(false);

  const emojis = ['❤️', '🥳', '🥹', '🎂', '✨', '👏', '😭', '🥂'];

  const quickPills = [
    'Thank you so much!! ❤️',
    'This made my entire year! 🥹',
    'Best surprise ever! 🎂',
    'Love you endless amounts! ✨',
  ];

  const handleSelectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
    sound.playConfettiPop();
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.7 },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() && !selectedEmoji) return;

    setIsSubmitting(true);
    try {
      if (onSendReaction) {
        await onSendReaction(selectedEmoji, replyMessage);
      } else {
        // Direct API call
        await fetch(`/api/wishes/${wishId}/reaction`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            emoji: selectedEmoji,
            reply: replyMessage,
            name: recipientName,
          }),
        });
      }
      setHasSentReply(true);
      sound.playFanfare();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#a855f7'],
      });
    } catch (err) {
      console.error('Error posting reaction:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-lg mx-auto">
      {/* Sender Ribbon */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-800 mb-2 border border-rose-200">
        <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
        Sent with all the Love in the World
      </span>

      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
        Made Especially for You
      </h2>
      <p className="text-sm text-slate-600 mb-6">
        With warm hugs & best wishes from{' '}
        <span className="font-bold text-rose-600">{senderName || 'Your Loved One'}</span>
      </p>

      {/* Recipient Reaction Card */}
      <div className="w-full bg-white rounded-2xl p-6 shadow-xl border border-slate-200 text-left">
        {!hasSentReply ? (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
                Leave a Reaction for {senderName}
              </span>
              <span className="text-[11px] text-slate-500">Instant notification sent</span>
            </div>

            {/* Emoji Selection Bar */}
            <div className="flex items-center justify-between gap-1 p-2 bg-slate-50 rounded-xl border border-slate-200 mb-4">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleSelectEmoji(emoji)}
                  className={`w-9 h-9 rounded-lg text-xl flex items-center justify-center transition-all ${
                    selectedEmoji === emoji
                      ? 'bg-white shadow-md scale-110 border border-rose-300'
                      : 'hover:bg-slate-200/60 opacity-80 hover:opacity-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Quick Pills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {quickPills.map((pill, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setReplyMessage(pill)}
                  className="text-xs px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium transition-colors border border-rose-200/60"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Reply Textarea */}
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder={`Write a quick thank-you note to ${senderName}...`}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800 placeholder-slate-400 resize-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm shadow-md hover:from-rose-600 hover:to-pink-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Thank-You Back ({selectedEmoji})</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Thank-You Sent!</h3>
            <p className="text-xs text-slate-600 mt-1">
              Your reaction and message have been delivered straight to {senderName}.
            </p>
          </div>
        )}
      </div>

      {/* "Create your own wish on AI Wishify" Call to action */}
      <div className="mt-6 w-full pt-4 border-t border-slate-200">
        <button
          onClick={onCreateOwn}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-slate-800 hover:to-indigo-900 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Create an Animated Greeting on AI Wishify</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </button>
        <p className="text-[11px] text-slate-500 mt-2">
          Pick from 16 occasions • AI personalized wishes • Interactive music & surprises
        </p>
      </div>
    </div>
  );
};

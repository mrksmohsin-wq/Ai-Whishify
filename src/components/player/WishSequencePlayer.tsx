import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';
import { AiWishifyLogo } from '../common/AiWishifyLogo';
import { WishData } from '../../types/wish';
import { EVENT_TEMPLATES } from '../../config/eventsConfig';
import { sound } from '../../utils/audioSynthesis';

// Activities
import { CakeCandlesActivity } from '../activities/CakeCandlesActivity';
import { ConfettiBlastActivity } from '../activities/ConfettiBlastActivity';
import { TypewriterLetterActivity } from '../activities/TypewriterLetterActivity';
import { PhotoSlideshowActivity } from '../activities/PhotoSlideshowActivity';
import { GiftBoxActivity } from '../activities/GiftBoxActivity';
import { ClosingReactionActivity } from '../activities/ClosingReactionActivity';
import { TeacherChalkboardActivity, TeacherCertificateActivity } from '../activities/TeacherActivities';
import { BloomingFlowersActivity, LoveMeterActivity } from '../activities/MothersDayActivities';
import { HeroBadgeActivity, LessonsDadTaughtActivity } from '../activities/FathersDayActivities';
import { CoupleHeartsActivity } from '../activities/AnniversaryActivities';
import { EidCrescentActivity, EidiRevealActivity } from '../activities/EidActivities';
import { GradCapActivity, ChampagnePopActivity, TeacupSteamActivity } from '../activities/MilestoneActivities';

interface WishSequencePlayerProps {
  wish: WishData;
  isPreview?: boolean;
  onBackToEdit?: () => void;
  onCreateOwn?: () => void;
}

export const WishSequencePlayer: React.FC<WishSequencePlayerProps> = ({
  wish,
  isPreview = false,
  onBackToEdit,
  onCreateOwn,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const template = EVENT_TEMPLATES[wish.eventType] || EVENT_TEMPLATES.birthday;
  const steps = template.steps;
  const currentStep = steps[currentStepIndex] || steps[0];

  const customAudioRef = React.useRef<HTMLAudioElement | null>(null);

  // Start background music or custom uploaded audio when player mounts
  useEffect(() => {
    if (wish.customAudioUrl) {
      const audio = new Audio(wish.customAudioUrl);
      audio.loop = true;
      audio.volume = isMuted ? 0 : 0.8;
      customAudioRef.current = audio;

      audio.play().catch((err) => {
        console.warn('Custom audio autoplay interaction required:', err);
      });
    } else {
      sound.playTrack(wish.musicTrack || template.defaultMusic);
    }

    // Track recipient view if not in preview mode
    if (!isPreview && wish.id) {
      fetch(`/api/wishes/${wish.id}?trackView=true`).catch(() => {});
    }

    return () => {
      if (customAudioRef.current) {
        customAudioRef.current.pause();
        customAudioRef.current.src = '';
        customAudioRef.current = null;
      }
      sound.stopMusic();
    };
  }, [wish.musicTrack, wish.customAudioUrl, wish.id, isPreview]);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    sound.setMuted(nextMuted);
    setIsMuted(nextMuted);

    if (customAudioRef.current) {
      if (nextMuted) {
        customAudioRef.current.pause();
      } else {
        customAudioRef.current.play().catch(() => {});
      }
    } else {
      if (!nextMuted) {
        sound.playTrack(wish.musicTrack || template.defaultMusic);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const goToNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const resetSequence = () => {
    setCurrentStepIndex(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, steps.length]);

  // Render the current interactive activity
  const renderStepActivity = () => {
    switch (currentStep.interactiveType) {
      case 'cake_candles':
        return (
          <CakeCandlesActivity
            recipientName={wish.recipientName}
            age={wish.age}
            cakeFlavor={wish.cakeFlavor}
            onCandlesBlown={goToNext}
          />
        );
      case 'confetti_blast':
        return (
          <ConfettiBlastActivity
            recipientName={wish.recipientName}
            subtitle={currentStep.subtitle}
          />
        );
      case 'chalkboard':
        return (
          <TeacherChalkboardActivity
            teacherName={wish.recipientName}
            subject={wish.teacherSubject}
            school={wish.teacherSchool}
          />
        );
      case 'teacher_cert':
        return (
          <TeacherCertificateActivity
            teacherName={wish.recipientName}
            senderName={wish.senderName}
            school={wish.teacherSchool}
          />
        );
      case 'hero_badge':
        return <HeroBadgeActivity recipientName={wish.recipientName} />;
      case 'blooming_flowers':
        return <BloomingFlowersActivity recipientName={wish.recipientName} />;
      case 'love_meter':
        return <LoveMeterActivity recipientName={wish.recipientName} />;
      case 'couple_hearts':
        return (
          <CoupleHeartsActivity
            recipientName={wish.recipientName}
            senderName={wish.senderName}
            yearsTogether={wish.yearsTogether}
            howWeMet={wish.howWeMet}
          />
        );
      case 'crescent_moon':
        return <EidCrescentActivity recipientName={wish.recipientName} />;
      case 'eidi_reveal':
        return <EidiRevealActivity recipientName={wish.recipientName} />;
      case 'grad_cap_throw':
        return (
          <GradCapActivity
            recipientName={wish.recipientName}
            gradDegree={wish.gradDegree}
          />
        );
      case 'champagne_pop':
        return <ChampagnePopActivity recipientName={wish.recipientName} />;
      case 'teacup_steam':
        return <TeacupSteamActivity recipientName={wish.recipientName} />;
      case 'typed_letter':
        return (
          <TypewriterLetterActivity
            recipientName={wish.recipientName}
            senderName={wish.senderName}
            message={wish.personalMessage}
            relationship={wish.relationship}
          />
        );
      case 'photo_slideshow':
        return (
          <PhotoSlideshowActivity
            photos={wish.photos}
            recipientName={wish.recipientName}
          />
        );
      case 'gift_box':
        return (
          <GiftBoxActivity
            giftItem={wish.giftRevealedItem}
            recipientName={wish.recipientName}
          />
        );
      case 'closing_reaction':
        return (
          <ClosingReactionActivity
            wishId={wish.id}
            senderName={wish.senderName}
            recipientName={wish.recipientName}
            onCreateOwn={onCreateOwn}
          />
        );
      default:
        return (
          <TypewriterLetterActivity
            recipientName={wish.recipientName}
            senderName={wish.senderName}
            message={wish.personalMessage}
            relationship={wish.relationship}
          />
        );
    }
  };

  const bgGradient = wish.colorTheme?.bgGradient || template.colorScheme.bgGradient;

  return (
    <div className={`relative min-h-screen w-full flex flex-col justify-between bg-gradient-to-br ${bgGradient} text-slate-900 overflow-x-hidden selection:bg-rose-500 selection:text-white`}>
      {/* Background ambient particles / lights */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

      {/* Top Header Bar */}
      <header className="relative z-30 p-4 flex items-center justify-between backdrop-blur-md bg-white/20 border-b border-white/20">
        <div className="flex items-center gap-3">
          {isPreview && onBackToEdit && (
            <button
              onClick={onBackToEdit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-semibold text-slate-800 shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Edit</span>
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <AiWishifyLogo size={36} />
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-white uppercase tracking-wider drop-shadow-sm flex items-center gap-1.5">
                <span>Ai Wishify</span>
                <span className="opacity-70">•</span>
                <span>{template.name}</span>
              </div>
              <div className="text-[11px] text-white/90 font-medium flex items-center gap-2">
                <span>For {wish.recipientName}</span>
                {wish.customAudioUrl && (
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-black/20 text-yellow-200 border border-yellow-300/30">
                    🎵 {wish.customAudioName || 'Custom Music'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Badge Warning */}
        {isPreview && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/90 text-amber-950 font-bold text-xs shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preview Mode (Unsent)</span>
          </div>
        )}

        {/* Audio Mute & Fullscreen Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetSequence}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-sm transition-all"
            title="Replay from Beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleSound}
            className={`p-2 rounded-full shadow-sm transition-all flex items-center gap-1.5 px-3 text-xs font-semibold ${
              isMuted
                ? 'bg-white/70 text-slate-700'
                : 'bg-rose-500 text-white animate-pulse'
            }`}
            title={isMuted ? 'Unmute Celebratory Music' : 'Mute Music'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Music On'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-sm transition-all"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Activity Showcase Container */}
      <main className="relative z-20 flex-1 flex items-center justify-center p-3 md:p-6 my-auto">
        <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-4 md:p-8 transition-all duration-500 animate-in fade-in zoom-in-95">
          {renderStepActivity()}
        </div>
      </main>

      {/* Bottom Step Navigation & Progress Bar */}
      <footer className="relative z-30 p-4 flex flex-col items-center gap-3 backdrop-blur-md bg-white/20 border-t border-white/20">
        {/* Step Dots indicator */}
        <div className="flex items-center gap-2">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentStepIndex === idx
                  ? 'w-8 bg-white shadow-md'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              title={`Step ${idx + 1}: ${step.title}`}
            />
          ))}
        </div>

        {/* Step Title & Navigation Buttons */}
        <div className="w-full max-w-md flex items-center justify-between gap-4">
          <button
            onClick={goToPrev}
            disabled={currentStepIndex === 0}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-xs font-bold text-slate-800 shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="text-center text-xs font-semibold text-white drop-shadow-sm">
            <span>
              {currentStepIndex + 1} of {steps.length}
            </span>
            <span className="hidden sm:inline text-white/80 ml-1.5">• {currentStep.title}</span>
          </div>

          <button
            onClick={goToNext}
            disabled={currentStepIndex === steps.length - 1}
            className="inline-flex items-center gap-1 px-5 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-xs font-bold text-white shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};

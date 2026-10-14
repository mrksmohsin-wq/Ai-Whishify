import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Wand2,
  Smile,
  Heart,
  FileText,
  Clock,
  Lock,
  Image as ImageIcon,
  Gift,
  Upload,
  Trash2,
  Eye,
  Check,
  Music,
  Palette,
  Volume2,
} from 'lucide-react';
import { EventType, ToneType, WishData, PhotoMemory, GiftRevealedItem } from '../../types/wish';
import { EVENT_TEMPLATES, ALL_EVENT_KEYS } from '../../config/eventsConfig';

interface WishCreationWizardProps {
  initialEvent?: EventType;
  initialWish?: WishData;
  onSaveWish: (wish: WishData, publishNow: boolean) => Promise<void>;
  onLivePreview: (wish: WishData) => void;
  onCancel: () => void;
}

export const WishCreationWizard: React.FC<WishCreationWizardProps> = ({
  initialEvent = 'birthday',
  initialWish,
  onSaveWish,
  onLivePreview,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Selected event template
  const [eventType, setEventType] = useState<EventType>(
    initialWish?.eventType || initialEvent
  );

  const template = EVENT_TEMPLATES[eventType] || EVENT_TEMPLATES.birthday;

  // Basic Info State
  const [recipientName, setRecipientName] = useState(initialWish?.recipientName || '');
  const [recipientNickname, setRecipientNickname] = useState(initialWish?.recipientNickname || '');
  const [senderName, setSenderName] = useState(initialWish?.senderName || '');
  const [relationship, setRelationship] = useState(initialWish?.relationship || 'Best Friend');
  const [tone, setTone] = useState<ToneType>(initialWish?.tone || 'emotional');
  const [language, setLanguage] = useState(initialWish?.language || 'English (United States)');

  // Message State
  const [personalMessage, setPersonalMessage] = useState(
    initialWish?.personalMessage || template.sampleWish.personalMessage || ''
  );
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isRefiningAI, setIsRefiningAI] = useState(false);

  // Theme & Music
  const [selectedMusic, setSelectedMusic] = useState(
    initialWish?.musicTrack || template.defaultMusic
  );
  const [customAudioUrl, setCustomAudioUrl] = useState<string | undefined>(
    initialWish?.customAudioUrl
  );
  const [customAudioName, setCustomAudioName] = useState<string | undefined>(
    initialWish?.customAudioName
  );
  const [isPlayingAudioPreview, setIsPlayingAudioPreview] = useState(false);
  const audioPreviewRef = React.useRef<HTMLAudioElement | null>(null);

  const [selectedTheme, setSelectedTheme] = useState(
    initialWish?.colorTheme || template.colorScheme
  );

  // Event-specific fields
  const [age, setAge] = useState<number>(initialWish?.age || 25);
  const [cakeFlavor, setCakeFlavor] = useState(initialWish?.cakeFlavor || 'Red Velvet & Strawberry');
  const [teacherSubject, setTeacherSubject] = useState(initialWish?.teacherSubject || 'Literature');
  const [teacherSchool, setTeacherSchool] = useState(initialWish?.teacherSchool || 'Oakridge High');
  const [yearsTogether, setYearsTogether] = useState<number>(initialWish?.yearsTogether || 5);
  const [howWeMet, setHowWeMet] = useState(initialWish?.howWeMet || '');
  const [duaMessage, setDuaMessage] = useState(initialWish?.duaMessage || '');

  // Photos
  const [photos, setPhotos] = useState<PhotoMemory[]>(
    initialWish?.photos || [
      {
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
        caption: 'Our favorite sunny adventure together ✨',
      },
    ]
  );
  const [isGeneratingCaptions, setIsGeneratingCaptions] = useState(false);

  // Gift Box
  const [giftItem, setGiftItem] = useState<GiftRevealedItem>(
    initialWish?.giftRevealedItem || {
      type: 'voucher',
      title: 'VIP Celebration Voucher',
      message: 'A special day of pure pampering and fun on us!',
      code: 'WISHIFY-GIFT-2026',
    }
  );

  // Delivery & Security
  const [isScheduled, setIsScheduled] = useState(initialWish?.isScheduled || false);
  const [scheduledDate, setScheduledDate] = useState(initialWish?.scheduledDate || '');
  const [password, setPassword] = useState(initialWish?.password || '');
  const [isSaving, setIsSaving] = useState(false);

  // Construct current working wish object
  const buildCurrentWish = (publish: boolean = true): WishData => ({
    id: initialWish?.id || 'wish-' + Math.random().toString(36).substring(2, 9),
    eventType,
    title: `${recipientName}'s ${template.name}`,
    recipientName: recipientName.trim() || 'Someone Special',
    recipientNickname: recipientNickname.trim() || undefined,
    senderName: senderName.trim() || 'Your Loved One',
    relationship,
    personalMessage: personalMessage.trim() || template.sampleWish.personalMessage || '',
    tone,
    language,
    colorTheme: selectedTheme,
    musicTrack: customAudioUrl ? 'custom' : selectedMusic,
    customAudioUrl,
    customAudioName,
    age: eventType === 'birthday' ? age : undefined,
    cakeFlavor: eventType === 'birthday' ? cakeFlavor : undefined,
    teacherSubject: eventType === 'teachers_day' ? teacherSubject : undefined,
    teacherSchool: eventType === 'teachers_day' ? teacherSchool : undefined,
    yearsTogether: eventType === 'anniversary' ? yearsTogether : undefined,
    howWeMet: eventType === 'anniversary' ? howWeMet : undefined,
    duaMessage: eventType === 'eid_mubarak' ? duaMessage : undefined,
    photos,
    giftRevealedItem: giftItem,
    password: password.trim() || undefined,
    isScheduled,
    scheduledDate: isScheduled ? scheduledDate : undefined,
    status: publish ? 'published' : 'draft',
    viewsCount: initialWish?.viewsCount || 0,
    reactions: initialWish?.reactions || [],
    createdAt: initialWish?.createdAt || new Date().toISOString(),
  });

  // AI Message Generation Handler
  const generateAIMessage = async (formatType: 'wish' | 'poem' | 'quote' = 'wish') => {
    if (!recipientName) {
      alert('Please enter the recipient name first!');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/ai/generate-wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          recipientName,
          recipientNickname,
          senderName,
          relationship,
          tone,
          language,
          formatType,
          specialDetails: {
            age: eventType === 'birthday' ? age : undefined,
            years: eventType === 'anniversary' ? yearsTogether : undefined,
            howWeMet: eventType === 'anniversary' ? howWeMet : undefined,
          },
        }),
      });
      const data = await res.json();
      if (data.result) {
        setPersonalMessage(data.result);
      }
    } catch (err) {
      console.error('Failed to generate AI message:', err);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // AI Refine Handler
  const refineAIMessage = async (action: 'funnier' | 'emotional' | 'shorter' | 'poem') => {
    if (!personalMessage) return;

    setIsRefiningAI(true);
    try {
      const res = await fetch('/api/ai/refine-wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalText: personalMessage,
          action,
          language,
        }),
      });
      const data = await res.json();
      if (data.result) {
        setPersonalMessage(data.result);
      }
    } catch (err) {
      console.error('Failed to refine AI message:', err);
    } finally {
      setIsRefiningAI(false);
    }
  };

  // AI Photo Captions Handler
  const generatePhotoCaptions = async () => {
    setIsGeneratingCaptions(true);
    try {
      const res = await fetch('/api/ai/photo-captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          recipientName: recipientName || 'Friend',
          count: photos.length,
        }),
      });
      const data = await res.json();
      if (data.captions && data.captions.length > 0) {
        setPhotos((prev) =>
          prev.map((photo, i) => ({
            ...photo,
            caption: data.captions[i] || photo.caption,
          }))
        );
      }
    } catch (err) {
      console.error('Error generating photo captions:', err);
    } finally {
      setIsGeneratingCaptions(false);
    }
  };

  // Custom Music Audio File Upload Handler
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('Audio file size exceeds 15MB. Please choose a smaller track.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCustomAudioUrl(event.target.result as string);
        setCustomAudioName(file.name);
        setSelectedMusic('custom');
      }
    };
    reader.readAsDataURL(file);
  };

  const removeCustomAudio = () => {
    if (audioPreviewRef.current) {
      audioPreviewRef.current.pause();
    }
    setIsPlayingAudioPreview(false);
    setCustomAudioUrl(undefined);
    setCustomAudioName(undefined);
    setSelectedMusic(template.defaultMusic);
  };

  const toggleAudioPreview = () => {
    if (!customAudioUrl) return;

    if (!audioPreviewRef.current) {
      audioPreviewRef.current = new Audio(customAudioUrl);
      audioPreviewRef.current.onended = () => setIsPlayingAudioPreview(false);
    }

    if (isPlayingAudioPreview) {
      audioPreviewRef.current.pause();
      setIsPlayingAudioPreview(false);
    } else {
      audioPreviewRef.current.play().then(() => {
        setIsPlayingAudioPreview(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  // Photo File Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhotos((prev) => [
            ...prev,
            {
              url: uploadEvent.target!.result as string,
              caption: 'Special memory ✨',
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinish = async (publish: boolean) => {
    setIsSaving(true);
    try {
      const finalWish = buildCurrentWish(publish);
      await onSaveWish(finalWish, publish);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Top Header & Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Create Your Animated Wish
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Step {currentStep} of {totalSteps}:{' '}
              <span className="font-semibold text-rose-600">
                {currentStep === 1 && 'Occasion & Event'}
                {currentStep === 2 && 'Recipient & Details'}
                {currentStep === 3 && 'Heartfelt Message & AI'}
                {currentStep === 4 && 'Event-Specific Magic'}
                {currentStep === 5 && 'Photos & Surprise Gift'}
                {currentStep === 6 && 'Review & Send Options'}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLivePreview(buildCurrentWish(false))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-xs border border-rose-200 transition-all shadow-xs"
            >
              <Eye className="w-4 h-4 text-rose-500" />
              <span>Live Test Player</span>
            </button>
            <button
              onClick={onCancel}
              className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: OCCASION SELECTION */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Select Celebration Occasion (16 Available)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ALL_EVENT_KEYS.map((key) => {
                const tmpl = EVENT_TEMPLATES[key];
                const isSelected = eventType === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setEventType(key);
                      setSelectedMusic(tmpl.defaultMusic);
                      setSelectedTheme(tmpl.colorScheme);
                      if (!personalMessage) {
                        setPersonalMessage(tmpl.sampleWish.personalMessage || '');
                      }
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/70 shadow-md ring-2 ring-rose-300/50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="text-3xl mb-2">{tmpl.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-slate-900">{tmpl.name}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{tmpl.category}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme & Music Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-rose-500" /> Background Music
                </label>
                <span className="text-[11px] text-rose-600 font-semibold">Custom Upload Available</span>
              </div>

              <select
                value={selectedMusic}
                onChange={(e) => {
                  setSelectedMusic(e.target.value);
                  if (e.target.value !== 'custom') {
                    // keep custom if desired or reset
                  }
                }}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-rose-500"
              >
                <option value="birthday_melody">🎂 Birthday Melody (Synthesized Chimes)</option>
                <option value="acoustic_love">🎸 Acoustic Romance & Warm Guitar</option>
                <option value="warm_ambient">🌸 Gentle Piano & Ambient Chimes</option>
                <option value="celebration_brass">🎺 Celebratory Fanfare & Cheers</option>
                <option value="cheerful_pop">✨ Cheerful Upbeat Pop Synth</option>
                <option value="custom">🎵 Custom Music (Upload Your Own Audio)</option>
                <option value="none">🔇 No Music (Silent)</option>
              </select>

              {/* Custom Music Upload Box */}
              {(selectedMusic === 'custom' || customAudioUrl) && (
                <div className="mt-3 p-3 bg-rose-50/80 rounded-2xl border border-rose-200 animate-in fade-in">
                  {!customAudioUrl ? (
                    <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-rose-300 hover:border-rose-400 rounded-xl bg-white cursor-pointer transition-colors text-center">
                      <Upload className="w-5 h-5 text-rose-500 mb-1" />
                      <span className="text-xs font-bold text-slate-800">Choose Audio File</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">MP3, WAV, M4A, OGG up to 15MB</span>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-rose-200 shadow-xs">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                          <Music className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-xs font-bold text-slate-900 block truncate">
                            {customAudioName || 'Uploaded Custom Audio'}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-semibold block">
                            Ready to play
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={toggleAudioPreview}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isPlayingAudioPreview ? 'Pause' : 'Test'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={removeCustomAudio}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Remove custom audio"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-rose-500" /> Color Atmosphere
              </label>
              <div className="flex items-center gap-2">
                {[
                  { name: 'Rose Petal', gradient: 'from-pink-500 via-rose-500 to-amber-400' },
                  { name: 'Emerald Oasis', gradient: 'from-emerald-700 via-teal-800 to-slate-900' },
                  { name: 'Royal Twilight', gradient: 'from-indigo-800 via-blue-900 to-purple-950' },
                  { name: 'Sunset Gold', gradient: 'from-amber-500 via-orange-500 to-rose-500' },
                ].map((palette, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() =>
                      setSelectedTheme((prev) => ({ ...prev, bgGradient: palette.gradient }))
                    }
                    className={`h-9 flex-1 rounded-xl bg-gradient-to-r ${palette.gradient} border-2 transition-all ${
                      selectedTheme.bgGradient === palette.gradient
                        ? 'border-slate-900 scale-105 shadow-md'
                        : 'border-transparent opacity-80'
                    }`}
                    title={palette.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: RECIPIENT & SENDER INFO */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Recipient's Full Name *
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Mohsin"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Nickname / Pet Name (Optional)
              </label>
              <input
                type="text"
                value={recipientNickname}
                onChange={(e) => setRecipientNickname(e.target.value)}
                placeholder="e.g. Mo, Champ, Bestie"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Your Name (Sender) *
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Liam, The Family, Sarah"
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Relationship
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-rose-500"
              >
                <option value="Best Friend">Best Friend</option>
                <option value="Spouse">Spouse / Partner</option>
                <option value="Mother">Mother / Mom</option>
                <option value="Father">Father / Dad</option>
                <option value="Teacher">Teacher / Mentor</option>
                <option value="Sibling">Sibling (Brother / Sister)</option>
                <option value="Child">Child (Son / Daughter)</option>
                <option value="Colleague">Colleague / Coworker</option>
                <option value="Loved One">Loved One</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Greeting Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-rose-500"
              >
                <option value="English (United States)">English (United States)</option>
                <option value="Urdu">Urdu (اردو)</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Arabic">Arabic (العربية)</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="French">French (Français)</option>
                <option value="German">German (Deutsch)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Tone of Voice
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'emotional', label: 'Emotional 🥹' },
                  { id: 'funny', label: 'Funny 😂' },
                  { id: 'poetic', label: 'Poetic 📜' },
                  { id: 'formal', label: 'Formal 👔' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id as ToneType)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      tone === t.id
                        ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: MESSAGE & AI GENERATOR */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-in fade-in">
          {/* AI Generation Toolbar */}
          <div className="p-4 bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 rounded-2xl border border-rose-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-900 block">
                  Gemini AI Wish Assistant
                </span>
                <span className="text-xs text-rose-700">
                  Generate personal messages or refine tone in 1 click
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => generateAIMessage('wish')}
                disabled={isGeneratingAI}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white text-xs font-bold shadow-md active:scale-95 transition-all disabled:opacity-50"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>{isGeneratingAI ? 'Writing Magic...' : 'Generate with AI'}</span>
              </button>

              <button
                type="button"
                onClick={() => generateAIMessage('poem')}
                disabled={isGeneratingAI}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold shadow-xs"
              >
                <span>Write Poem / Shayari 📜</span>
              </button>
            </div>
          </div>

          {/* Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Personal Message (will be typed out dynamically for recipient)
              </label>
              <span className="text-xs text-slate-400">{personalMessage.length} characters</span>
            </div>
            <textarea
              value={personalMessage}
              onChange={(e) => setPersonalMessage(e.target.value)}
              rows={6}
              placeholder="Write something heartfelt or use the AI generator above..."
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-2xl focus:ring-2 focus:ring-rose-500 leading-relaxed text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Quick-Refine Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Quick AI Edit:
            </span>
            <button
              type="button"
              onClick={() => refineAIMessage('funnier')}
              disabled={isRefiningAI}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            >
              Make Funnier 😂
            </button>
            <button
              type="button"
              onClick={() => refineAIMessage('emotional')}
              disabled={isRefiningAI}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            >
              More Emotional 🥹
            </button>
            <button
              type="button"
              onClick={() => refineAIMessage('shorter')}
              disabled={isRefiningAI}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            >
              Make Shorter ✂️
            </button>
            <button
              type="button"
              onClick={() => refineAIMessage('poem')}
              disabled={isRefiningAI}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            >
              Turn into Rhyming Poem ✨
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: EVENT-SPECIFIC DETAILS */}
      {currentStep === 4 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
            Customize details specific to the <strong>{template.name}</strong> experience!
          </div>

          {eventType === 'birthday' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Age Turning
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Cake Flavor & Frosting
                </label>
                <input
                  type="text"
                  value={cakeFlavor}
                  onChange={(e) => setCakeFlavor(e.target.value)}
                  placeholder="e.g. Belgian Chocolate Truffle"
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl"
                />
              </div>
            </div>
          )}

          {eventType === 'teachers_day' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Subject / Discipline
                </label>
                <input
                  type="text"
                  value={teacherSubject}
                  onChange={(e) => setTeacherSubject(e.target.value)}
                  placeholder="e.g. World History, Physics, Art"
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  School / University / Institute
                </label>
                <input
                  type="text"
                  value={teacherSchool}
                  onChange={(e) => setTeacherSchool(e.target.value)}
                  placeholder="e.g. Oakridge Academy"
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl"
                />
              </div>
            </div>
          )}

          {eventType === 'anniversary' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Years Together
                </label>
                <input
                  type="number"
                  value={yearsTogether}
                  onChange={(e) => setYearsTogether(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  How We Met / First Date Memory
                </label>
                <input
                  type="text"
                  value={howWeMet}
                  onChange={(e) => setHowWeMet(e.target.value)}
                  placeholder="e.g. Rainy coffee shop in Seattle, 2019"
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl"
                />
              </div>
            </div>
          )}

          {eventType === 'eid_mubarak' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Special Dua / Prayer Blessing
              </label>
              <textarea
                value={duaMessage}
                onChange={(e) => setDuaMessage(e.target.value)}
                placeholder="May Allah grant your home happiness, peace, barakah, and health..."
                rows={3}
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
            </div>
          )}

          {/* Surprise Gift Box Configuration */}
          <div className="pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-rose-500" /> Surprise Gift Box Setup
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 font-semibold mb-1">
                  Gift Type
                </label>
                <select
                  value={giftItem.type}
                  onChange={(e) =>
                    setGiftItem((prev) => ({
                      ...prev,
                      type: e.target.value as any,
                    }))
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                >
                  <option value="voucher">🎟️ Gift Voucher / Pass</option>
                  <option value="badge">🏆 Badge / Trophy</option>
                  <option value="quote">💖 Heartfelt Vow / Promise</option>
                  <option value="video">🎥 Video Message Link</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 font-semibold mb-1">
                  Surprise Title
                </label>
                <input
                  type="text"
                  value={giftItem.title}
                  onChange={(e) =>
                    setGiftItem((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. VIP Spa Weekend Pass"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 font-semibold mb-1">
                  Voucher / Promo Code (Optional)
                </label>
                <input
                  type="text"
                  value={giftItem.code || ''}
                  onChange={(e) =>
                    setGiftItem((prev) => ({ ...prev, code: e.target.value }))
                  }
                  placeholder="e.g. SOPH-BDAY-25"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono"
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="block text-[11px] text-slate-500 font-semibold mb-1">
                Surprise Instructions / Message
              </label>
              <input
                type="text"
                value={giftItem.message}
                onChange={(e) =>
                  setGiftItem((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="e.g. Valid for brunch or dinner anytime this month!"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: PHOTOS & MEMORIES */}
      {currentStep === 5 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Photo Memories Slideshow ({photos.length}/10)
              </h3>
              <p className="text-xs text-slate-500">
                Upload up to 10 photos of your best times together
              </p>
            </div>

            {photos.length > 0 && (
              <button
                type="button"
                onClick={generatePhotoCaptions}
                disabled={isGeneratingCaptions}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-semibold border border-purple-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span>{isGeneratingCaptions ? 'Suggesting...' : 'AI Suggest Captions'}</span>
              </button>
            )}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo, idx) => (
              <div
                key={idx}
                className="relative group bg-white p-2 rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src={photo.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(idx)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-red-600/80 hover:bg-red-700 text-white shadow-xs"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={photo.caption || ''}
                  onChange={(e) => {
                    const newCaption = e.target.value;
                    setPhotos((prev) =>
                      prev.map((p, i) => (i === idx ? { ...p, caption: newCaption } : p))
                    );
                  }}
                  placeholder="Photo caption..."
                  className="w-full mt-2 px-2 py-1 text-xs border border-slate-200 rounded-md"
                />
              </div>
            ))}

            {photos.length < 10 && (
              <label className="border-2 border-dashed border-slate-300 hover:border-rose-400 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all aspect-square bg-slate-50 hover:bg-rose-50/40">
                <Upload className="w-6 h-6 text-slate-400 mb-2" />
                <span className="text-xs font-bold text-slate-700">Add Photos</span>
                <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WebP</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      )}

      {/* STEP 6: REVIEW & SEND OPTIONS */}
      {currentStep === 6 && (
        <div className="space-y-6 animate-in fade-in">
          {/* Summary Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{template.icon}</span>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {recipientName}'s {template.name}
                </h3>
                <p className="text-xs text-slate-600">
                  From: {senderName} • Tone: {tone} • {photos.length} Photos
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onLivePreview(buildCurrentWish(false))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs shadow-xs"
            >
              <Eye className="w-4 h-4 text-rose-500" />
              <span>Full Preview Before Send</span>
            </button>
          </div>

          {/* Delivery & Security Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PIN Protection */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-500" /> Optional PIN Protection
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="e.g. 1234 (Leave blank for public link)"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Recipient must enter this code to unlock the greeting
              </span>
            </div>

            {/* Scheduled Send */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> Schedule Delivery
                </label>
                <input
                  type="checkbox"
                  checked={isScheduled}
                  onChange={(e) => setIsScheduled(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
              </div>
              {isScheduled ? (
                <input
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                />
              ) : (
                <span className="text-[11px] text-slate-500 block">
                  Greeting will be live immediately for sharing!
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Step Navigation Bar */}
      <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          disabled={currentStep === 1}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-3">
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, totalSteps))}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleFinish(true)}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg active:scale-95 transition-all disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'Creating Wish...' : 'Create & Get Shareable Link'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

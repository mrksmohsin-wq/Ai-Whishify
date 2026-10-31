export type EventType =
  | 'birthday'
  | 'teachers_day'
  | 'fathers_day'
  | 'mothers_day'
  | 'anniversary'
  | 'wedding_congrats'
  | 'friendship_day'
  | 'valentines_day'
  | 'eid_mubarak'
  | 'new_year'
  | 'graduation'
  | 'new_baby'
  | 'get_well_soon'
  | 'thank_you'
  | 'farewell'
  | 'congratulations'
  | 'bad_sad_day';

export type ToneType = 'emotional' | 'funny' | 'formal' | 'poetic' | 'playful';

export interface PhotoMemory {
  url: string;
  caption?: string;
  date?: string;
}

export interface GiftRevealedItem {
  type: 'voucher' | 'quote' | 'video' | 'vow' | 'eidi' | 'badge';
  title: string;
  message: string;
  code?: string;
  videoUrl?: string;
}

export interface RecipientReaction {
  id: string;
  emoji: string;
  name: string;
  reply: string;
  createdAt: string;
}

export interface WishData {
  id: string;
  userId?: string;
  userEmail?: string;
  eventType: EventType;
  title?: string;
  recipientName: string;
  recipientNickname?: string;
  senderName: string;
  relationship: string;
  personalMessage: string;
  tone: ToneType;
  language: string;

  // Visuals & Themes
  colorTheme: {
    primary: string;
    secondary: string;
    accent: string;
    bgGradient: string;
    cardBg: string;
    textColor: string;
  };
  musicTrack: string; // 'birthday_melody' | 'acoustic_love' | 'warm_ambient' | 'celebration_brass' | 'oriental_lute' | 'cheerful_pop' | 'custom' | 'none';
  customAudioUrl?: string; // base64 data url or audio link
  customAudioName?: string; // filename of uploaded music

  // Event-specific details
  age?: number;
  birthDate?: string;
  cakeFlavor?: string;
  teacherSubject?: string;
  teacherSchool?: string;
  yearsTogether?: number;
  howWeMet?: string;
  specialMemories?: string[];
  lessonsLearned?: string[];
  duaMessage?: string;
  babyBirthWeight?: string;
  gradDegree?: string;
  insideJokes?: string;

  // Media
  photos: PhotoMemory[];
  giftRevealedItem: GiftRevealedItem;

  // Options & Meta
  password?: string;
  isScheduled: boolean;
  scheduledDate?: string;
  status: 'draft' | 'published';
  viewsCount: number;
  lastViewedAt?: string;
  reactions: RecipientReaction[];
  createdAt: string;
  updatedAt?: string;
  isPreview?: boolean;

  // Secret Code Dialer (Customizable & Personalisable)
  hasSecretCode?: boolean;
  secretCode?: string; // e.g. "1234"
  secretCodeHint?: string; // e.g. "Mohsin's Birthday"

  // Curtains Opening Animation (Customizable)
  hasCurtains?: boolean;
  curtainColor?: 'velvet_red' | 'midnight_blue' | 'royal_gold' | 'emerald_green' | 'romantic_rose' | 'deep_purple';
  curtainMessage?: string;
}

export interface EventStepConfig {
  id: string;
  title: string;
  subtitle: string;
  interactiveType:
    | 'cake_candles'
    | 'confetti_blast'
    | 'chalkboard'
    | 'teacher_cert'
    | 'hero_badge'
    | 'blooming_flowers'
    | 'love_meter'
    | 'couple_hearts'
    | 'crescent_moon'
    | 'eidi_reveal'
    | 'grad_cap_throw'
    | 'baby_lullaby'
    | 'teacup_steam'
    | 'bad_day_comfort'
    | 'champagne_pop'
    | 'typed_letter'
    | 'photo_slideshow'
    | 'gift_box'
    | 'closing_reaction';
  duration?: number; // suggested auto-advance seconds
}

export interface EventTemplateConfig {
  id: EventType;
  name: string;
  tagline: string;
  category: 'Celebration' | 'Gratitude' | 'Love' | 'Milestone' | 'Seasonal' | 'Comfort & Care';
  icon: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    bgGradient: string;
    cardBg: string;
    textColor: string;
  };
  defaultMusic: string;
  steps: EventStepConfig[];
  sampleWish: Partial<WishData>;
}

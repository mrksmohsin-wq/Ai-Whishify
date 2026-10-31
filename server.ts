import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// In AI Studio and Cloud Run environments, port 8080 is reserved for nginx.
// The Node applet dev server must listen on port 3000.
function resolvePort(): number {
  const portArgIndex = process.argv.indexOf('--port');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    const parsed = parseInt(process.argv[portArgIndex + 1], 10);
    if (!isNaN(parsed) && parsed !== 8080) return parsed;
  }
  if (process.env.APP_PORT && process.env.APP_PORT !== '8080') {
    return parseInt(process.env.APP_PORT, 10);
  }
  return 3000;
}

const PORT = resolvePort();

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Gemini SDK with telemetry header
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// JSON Data storage helper for persistent wishes and reactions
const DATA_DIR = path.join(__dirname, '.data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const WISHES_FILE = path.join(DATA_DIR, 'wishes.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

function readWishes(): any[] {
  try {
    if (fs.existsSync(WISHES_FILE)) {
      const data = fs.readFileSync(WISHES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading wishes:', err);
  }
  return [];
}

function writeWishes(wishes: any[]) {
  try {
    fs.writeFileSync(WISHES_FILE, JSON.stringify(wishes, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving wishes:', err);
  }
}

// Seed default sample wishes if empty so new users immediately have examples
if (readWishes().length === 0) {
  const seedWishes = [
    {
      id: 'demo-birthday',
      eventType: 'birthday',
      title: "Mohsin's Birthday Celebration",
      recipientName: 'Mohsin',
      recipientNickname: 'Mo',
      senderName: 'Liam & Friends',
      relationship: 'Best Friend',
      tone: 'funny',
      language: 'English (United States)',
      age: 26,
      birthDate: '1998-10-14',
      favoriteColor: '#ec4899',
      cakeFlavor: 'Red Velvet Sparkler',
      personalMessage: "Happy Birthday, Mohsin! You're not getting older, you're just leveling up to new heights of greatness. Thank you for always bringing endless laughs, brilliant energy, and great vibes into our lives! Here's to making this year your most memorable and successful chapter yet! 🎂🥂",
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
          caption: 'That unforgettable road trip adventure',
        },
        {
          url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
          caption: 'Laughing till our stomachs hurt',
        },
        {
          url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
          caption: 'Celebrating big wins together',
        }
      ],
      musicTrack: 'birthday_melody',
      giftRevealedItem: {
        type: 'voucher',
        title: 'VIP Celebration Getaway Pass',
        code: 'MOHSIN-BDAY-2026',
        message: 'A day of celebration and dining on us!',
      },
      password: '',
      isScheduled: false,
      scheduledDate: '',
      status: 'published',
      viewsCount: 18,
      createdAt: new Date().toISOString(),
      reactions: [
        {
          id: 'rx-1',
          emoji: '🥹',
          name: 'Mohsin',
          reply: 'Thank you so much everyone! This is the most thoughtful and coolest birthday greeting ever! 😭❤️❤️',
          createdAt: new Date().toISOString(),
        }
      ]
    },
    {
      id: 'demo-anniversary',
      eventType: 'anniversary',
      title: 'Our 5 Glorious Years Together',
      recipientName: 'Elena',
      recipientNickname: 'My Love',
      senderName: 'David',
      relationship: 'Spouse',
      tone: 'emotional',
      language: 'English',
      yearsTogether: 5,
      howWeMet: 'In a rainy little coffee shop in Seattle, sharing an umbrella',
      favoriteColor: '#e11d48',
      personalMessage: "Five years ago today, you took my hand and changed my whole world. Every single day with you is filled with kindness, laughter, and an overwhelming gratitude. Happy 5th Anniversary, Elena. Forever wouldn't be enough with you.",
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
          caption: 'The day we said yes to forever',
        },
        {
          url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80',
          caption: 'Quiet mornings together',
        }
      ],
      musicTrack: 'acoustic_love',
      giftRevealedItem: {
        type: 'vow',
        title: 'Our 5-Year Vow Renewal',
        code: '',
        message: 'A trip back to the Seattle coffee shop where our story first started.',
      },
      password: '',
      isScheduled: false,
      status: 'published',
      viewsCount: 22,
      createdAt: new Date().toISOString(),
      reactions: [
        {
          id: 'rx-2',
          emoji: '❤️',
          name: 'Elena',
          reply: 'David, this made my whole morning! You are my greatest adventure. I love you endlessly!',
          createdAt: new Date().toISOString(),
        }
      ]
    }
  ];
  writeWishes(seedWishes);
}

// ==========================================
// API ROUTES
// ==========================================

// AI Message Generation Route
app.post('/api/ai/generate-wish', async (req: Request, res: Response) => {
  try {
    const {
      eventType,
      recipientName,
      recipientNickname,
      senderName,
      relationship,
      tone = 'emotional',
      language = 'English',
      specialDetails = {},
      formatType = 'wish' // 'wish' | 'poem' | 'quote'
    } = req.body;

    if (!eventType || !recipientName) {
      return res.status(400).json({ error: 'eventType and recipientName are required' });
    }

    if (!ai) {
      // Fallback generator when API key is not configured
      const fallbackWish = getFallbackMessage(eventType, recipientName, senderName, relationship, tone, formatType);
      return res.json({ result: fallbackWish });
    }

    let prompt = `You are a world-class greeting card writer and celebratory storyteller for the platform "AI Wishify".
Write a ${formatType === 'poem' ? 'poetic rhyming greeting (4-6 lines)' : formatType === 'quote' ? 'inspirational celebratory quote' : 'warm, heartfelt, personalized message (2-3 paragraphs, around 80-120 words)'}.

Event: ${eventType}
Recipient Name: ${recipientName} ${recipientNickname ? `(Nickname: ${recipientNickname})` : ''}
Sender Name: ${senderName || 'Someone who loves you'}
Relationship: ${relationship || 'Friend / Loved one'}
Desired Tone: ${tone} (Options: emotional, funny, formal, poetic, playful)
Language: ${language} (Write directly in this language: e.g. English, Urdu, Hindi, Arabic, Spanish, French, etc.)
Special Details: ${JSON.stringify(specialDetails)}

Rules:
- Make it deeply personal, warm, celebratory, and authentic.
- No boilerplate or placeholder tokens (like [insert name here]).
- If funny tone is requested, include witty, relatable charm.
- If poetic, make the meter and rhythm beautiful.
- Output ONLY the final greeting text, without any conversational preamble or markdown code blocks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const result = response.text?.trim() || getFallbackMessage(eventType, recipientName, senderName, relationship, tone, formatType);
    return res.json({ result });
  } catch (error: any) {
    console.error('Gemini generate-wish error:', error);
    // Return high quality fallback on error
    const fallback = getFallbackMessage(req.body.eventType, req.body.recipientName, req.body.senderName, req.body.relationship, req.body.tone, req.body.formatType);
    return res.json({ result: fallback, fallbackUsed: true });
  }
});

// AI Quick Refine Route (make funnier, more emotional, shorter, etc.)
app.post('/api/ai/refine-wish', async (req: Request, res: Response) => {
  try {
    const { originalText, action, language = 'English' } = req.body;
    if (!originalText || !action) {
      return res.status(400).json({ error: 'originalText and action are required' });
    }

    if (!ai) {
      return res.json({ result: originalText + " ✨ Wishing you all the love and happiness in the world!" });
    }

    let instruction = '';
    switch (action) {
      case 'funnier':
        instruction = 'Make this message significantly more humorous, witty, and playful while keeping it affectionate.';
        break;
      case 'emotional':
        instruction = 'Make this message deeply emotional, moving, heartfelt, and touching with tears-of-joy warmth.';
        break;
      case 'shorter':
        instruction = 'Condense this message to a punchy, powerful, 2-3 sentence greeting while preserving its heart.';
        break;
      case 'poem':
        instruction = 'Transform this sentiment into a beautiful, rhythmic 4-line rhyming poem / shayari.';
        break;
      default:
        instruction = 'Polish and elevate the warmth and beauty of this greeting.';
    }

    const prompt = `You are a master writer for greeting cards.
Original Message: "${originalText}"
Task: ${instruction}
Language: ${language}
Output ONLY the rewritten text, with no preamble.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({ result: response.text?.trim() || originalText });
  } catch (error) {
    console.error('Gemini refine-wish error:', error);
    return res.status(500).json({ error: 'Failed to refine message' });
  }
});

// AI Photo Caption Suggestion
app.post('/api/ai/photo-captions', async (req: Request, res: Response) => {
  try {
    const { eventType, recipientName, count = 3 } = req.body;
    if (!ai) {
      return res.json({
        captions: [
          'Unforgettable moments with you ✨',
          'A memory we will always cherish ❤️',
          'Laughing through every chapter together 🌟'
        ]
      });
    }

    const prompt = `Give me ${count} short, touching, or fun photo caption ideas (under 10 words each) for a photo slideshow for a ${eventType} celebration for ${recipientName}.
Return them as a JSON array of strings, for example: ["Caption 1", "Caption 2", "Caption 3"].`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    try {
      const parsed = JSON.parse(response.text?.trim() || '[]');
      return res.json({ captions: Array.isArray(parsed) ? parsed : [] });
    } catch {
      return res.json({
        captions: [
          'Moments that mean the world ✨',
          'Pure smiles and genuine joy ❤️',
          'Here is to forever memories 🥂'
        ]
      });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate captions' });
  }
});

// Get all wishes (or filter by user/status)
app.get('/api/wishes', (req: Request, res: Response) => {
  const wishes = readWishes();
  return res.json({ wishes });
});

// Get single wish by ID
app.get('/api/wishes/:id', (req: Request, res: Response) => {
  const wishes = readWishes();
  const wish = wishes.find((w: any) => w.id === req.params.id);
  if (!wish) {
    return res.status(404).json({ error: 'Wish not found' });
  }

  // Increment view count if requested as recipient view
  if (req.query.trackView === 'true') {
    wish.viewsCount = (wish.viewsCount || 0) + 1;
    wish.lastViewedAt = new Date().toISOString();
    writeWishes(wishes);
  }

  return res.json({ wish });
});

// Create or update a wish
app.post('/api/wishes', (req: Request, res: Response) => {
  const wishes = readWishes();
  const wishData = req.body;

  if (!wishData.eventType || !wishData.recipientName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = wishData.id || 'wish-' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  const existingIndex = wishes.findIndex((w: any) => w.id === id);

  const fullWish = {
    ...wishData,
    id,
    viewsCount: wishData.viewsCount || 0,
    createdAt: wishData.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: wishData.status || 'published',
    reactions: wishData.reactions || [],
  };

  if (existingIndex >= 0) {
    wishes[existingIndex] = fullWish;
  } else {
    wishes.unshift(fullWish);
  }

  writeWishes(wishes);
  return res.json({ success: true, wish: fullWish });
});

// Post a recipient reaction and reply
app.post('/api/wishes/:id/reaction', (req: Request, res: Response) => {
  const wishes = readWishes();
  const wish = wishes.find((w: any) => w.id === req.params.id);
  if (!wish) {
    return res.status(404).json({ error: 'Wish not found' });
  }

  const { emoji, reply, name } = req.body;
  if (!emoji && !reply) {
    return res.status(400).json({ error: 'Emoji or reply is required' });
  }

  const newReaction = {
    id: 'rx-' + Math.random().toString(36).substring(2, 8),
    emoji: emoji || '❤️',
    name: name || wish.recipientName || 'Recipient',
    reply: reply || '',
    createdAt: new Date().toISOString(),
  };

  if (!wish.reactions) wish.reactions = [];
  wish.reactions.unshift(newReaction);

  writeWishes(wishes);
  return res.json({ success: true, reaction: newReaction, allReactions: wish.reactions });
});

// Delete wish
app.delete('/api/wishes/:id', (req: Request, res: Response) => {
  let wishes = readWishes();
  const initialLength = wishes.length;
  wishes = wishes.filter((w: any) => w.id !== req.params.id);
  if (wishes.length === initialLength) {
    return res.status(404).json({ error: 'Wish not found' });
  }
  writeWishes(wishes);
  return res.json({ success: true, message: 'Wish deleted' });
});

// Helper for fallback wishes if offline / no API key
function getFallbackMessage(
  eventType: string,
  recipientName: string,
  senderName: string,
  relationship: string,
  tone: string,
  formatType: string
): string {
  if (formatType === 'poem') {
    return `Another year of laughter, another year of light,
May all your brightest dreams today shine ever pure and bright.
With joy that fills your happy heart and smiles along the way,
We celebrate your wonderful soul on this special day! ✨`;
  }
  if (formatType === 'quote') {
    return `"Count your life by smiles, not tears. Count your age by friends, not years." Wishing you endless wonder, ${recipientName}!`;
  }

  switch (eventType) {
    case 'birthday':
      return `Dearest ${recipientName}, happy, happy birthday! 🎉 On this incredible day, I want to celebrate the remarkable person you are. Your laughter brings sunshine into every room, and your kindness inspires everyone lucky enough to know you. May your year ahead overflow with wild adventures, fulfilled dreams, and endless joy!`;
    case 'teachers_day':
      return `Dear ${recipientName}, words can hardly express how deeply grateful I am for your guidance, wisdom, and patience. You haven't just taught lessons—you've ignited curiosity and shaped the way we see the world. Thank you for being the world's most wonderful educator! 🍎📚`;
    case 'fathers_day':
      return `Happy Father's Day, ${recipientName}! Thank you for being my rock, my greatest teacher, and the hero I've looked up to my entire life. Your strength, wisdom, and comforting guidance have guided me through every storm. Today we celebrate you! 🏆`;
    case 'mothers_day':
      return `Happy Mother's Day to the queen of our hearts, ${recipientName}! Your endless warmth, unconditional love, and gentle patience are the glue that holds our universe together. May your day be as pure, vibrant, and blooming as the love you give so freely! 🌸💖`;
    case 'anniversary':
      return `Happy Anniversary, ${recipientName}! Every chapter of this journey together has been sweeter than the last. Looking back at all the laughs, dreams, and memories we've shared, I know with certainty that loving you is the best choice I've ever made. Here's to forever! 🥂💍`;
    case 'eid_mubarak':
      return `Eid Mubarak, ${recipientName}! Taqabbal Allahu minna wa minkum. May the blessings of this holy celebration shower your home with tranquility, joy, health, and prosperity. Wishing you and your loved ones an unforgettable Eid! 🌙✨`;
    case 'bad_sad_day':
      if (relationship === 'Dushman') {
        return `Look ${recipientName}, even though we act like arch-enemies and trade banter, today is not the day for rivalry. Take a breath, shake off the gloom, and get back on your feet—because who else am I going to compete with? Wishing you strength and better days ahead! 🌧️➡️🌤️`;
      }
      return `Dearest ${recipientName}, I know today felt heavy and everything seemed exhausting. It is completely okay to not be okay right now. Take a deep breath, curl up with something warm, and remember that bad days do not make a bad life. You are resilient, deeply valued, and never alone. Tomorrow is a brand new page! 🌧️➡️🌤️💙`;
    default:
      if (relationship === 'Dushman') {
        return `To my favorite rival, ${recipientName}! Even though we are officially in "Dushman" mode, I have to take a ceasefire today to acknowledge you. May you find happiness, stay sharp, and keep the game exciting! From your worthy nemesis, ${senderName || 'Your Dushman'}.`;
      }
      return `Dearest ${recipientName}, sending you my warmest and most heartfelt wishes on this special occasion! You deserve all the happiness, success, and beauty that life has to offer. Thank you for being such an extraordinary light! With all my love, ${senderName || 'Your loved one'}.`;
  }
}

// ==========================================
// VITE DEV SERVER INTEGRATION
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  } else {
    // Mount Vite middlewares in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

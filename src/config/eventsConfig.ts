import { EventTemplateConfig, EventType } from '../types/wish';

export const EVENT_TEMPLATES: Record<EventType, EventTemplateConfig> = {
  birthday: {
    id: 'birthday',
    name: 'Birthday Extravaganza',
    tagline: 'Light the candles, make a wish, and pop the confetti!',
    category: 'Celebration',
    icon: '🎂',
    colorScheme: {
      primary: '#f43f5e',
      secondary: '#fb7185',
      accent: '#fbbf24',
      bgGradient: 'from-pink-500 via-rose-500 to-amber-400',
      cardBg: 'bg-white/95',
      textColor: 'text-rose-950',
    },
    defaultMusic: 'birthday_melody',
    steps: [
      { id: 'cake', title: 'A Sweet Celebration', subtitle: 'The party begins here', interactiveType: 'cake_candles' },
      { id: 'celebrate', title: 'Confetti & Cheers', subtitle: 'Make some noise!', interactiveType: 'confetti_blast' },
      { id: 'letter', title: 'A Letter from the Heart', subtitle: 'Written specially for you', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Memory Lane', subtitle: 'Our favorite snapshots', interactiveType: 'photo_slideshow' },
      { id: 'gift', title: 'Open Your Surprise', subtitle: 'Tap the ribbon to unwrap', interactiveType: 'gift_box' },
      { id: 'closing', title: 'Send Love Back', subtitle: 'React and leave a note', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: "Happy Birthday, Mohsin!",
      recipientName: 'Mohsin',
      recipientNickname: 'Mo',
      senderName: 'Liam & Friends',
      relationship: 'Best Friend',
      age: 26,
      cakeFlavor: 'Velvet Confetti Sprinkles',
      tone: 'funny',
      personalMessage: "Happy Birthday, Mohsin! You bring endless laughter, incredible energy, and unforgettable memories everywhere you go. May this year level up your happiness and success to the highest peak!",
      giftRevealedItem: {
        type: 'voucher',
        title: 'VIP Celebration Dinner Pass',
        code: 'MOHSIN-BDAY-2026',
        message: 'A fantastic celebration dinner on us!',
      }
    }
  },

  teachers_day: {
    id: 'teachers_day',
    name: "Teacher's Day Tribute",
    tagline: 'Chalkboards, golden apples, and lifelong gratitude.',
    category: 'Gratitude',
    icon: '🍎',
    colorScheme: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#f59e0b',
      bgGradient: 'from-emerald-700 via-teal-800 to-slate-900',
      cardBg: 'bg-emerald-950/90 text-emerald-50 border-emerald-600/40',
      textColor: 'text-emerald-950',
    },
    defaultMusic: 'warm_ambient',
    steps: [
      { id: 'chalkboard', title: 'Classroom Memories', subtitle: 'Lessons that shaped our lives', interactiveType: 'chalkboard' },
      { id: 'certificate', title: "World's Best Teacher Diploma", subtitle: 'An official honorary award', interactiveType: 'teacher_cert' },
      { id: 'letter', title: 'Grateful Reflection', subtitle: 'Thank you for believing in me', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Hall of Memories', subtitle: 'Moments from class and beyond', interactiveType: 'photo_slideshow' },
      { id: 'gift', title: 'Token of Appreciation', subtitle: 'A heartfelt gesture', interactiveType: 'gift_box' },
      { id: 'closing', title: 'From Your Student', subtitle: 'Send your teacher a note', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: "To the World's Greatest Mentor",
      recipientName: 'Mrs. Anderson',
      senderName: 'Your Grateful Class',
      relationship: 'Teacher & Mentor',
      teacherSubject: 'Literature & Philosophy',
      teacherSchool: 'Oakridge Academy',
      personalMessage: "Dear Mrs. Anderson, you didn't just teach us books; you taught us how to think, dream, and stand tall. Thank you for your endless patience and inspiring wisdom!",
      giftRevealedItem: {
        type: 'badge',
        title: 'Golden Educator Badge',
        message: 'Recognized for inspiring generations of young minds.',
      }
    }
  },

  mothers_day: {
    id: 'mothers_day',
    name: "Mother's Day Garden",
    tagline: 'Blooming flowers, infinite love, and sweetest memories.',
    category: 'Love',
    icon: '🌸',
    colorScheme: {
      primary: '#db2777',
      secondary: '#f472b6',
      accent: '#fbcfe8',
      bgGradient: 'from-pink-600 via-rose-400 to-amber-200',
      cardBg: 'bg-white/95',
      textColor: 'text-rose-950',
    },
    defaultMusic: 'acoustic_love',
    steps: [
      { id: 'flowers', title: 'Garden of Love', subtitle: 'Flowers blooming for Mom', interactiveType: 'blooming_flowers' },
      { id: 'love_meter', title: "Mom's Love Meter", subtitle: 'Measuring the immeasurable', interactiveType: 'love_meter' },
      { id: 'letter', title: 'From the Bottom of My Heart', subtitle: 'Words for the queen of our home', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Our Cherished Moments', subtitle: 'A mother-child journey', interactiveType: 'photo_slideshow' },
      { id: 'gift', title: 'A Gift for Queen Mom', subtitle: 'Unwrap a special surprise', interactiveType: 'gift_box' },
      { id: 'closing', title: 'With Eternal Love', subtitle: 'Send Mom an instant reply', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: "Happy Mother's Day, Mom!",
      recipientName: 'Mom',
      recipientNickname: 'Mama',
      senderName: 'Your Kids',
      relationship: 'Mother',
      personalMessage: "To the kindest, strongest, and most loving woman in the world: thank you for every sacrifice, warm hug, and gentle advice. You are our forever home.",
      giftRevealedItem: {
        type: 'voucher',
        title: 'Royal Spa & Breakfast in Bed',
        code: 'BEST-MOM-FOREVER',
        message: 'A day of relaxation strictly without any cooking or chores!',
      }
    }
  },

  fathers_day: {
    id: 'fathers_day',
    name: "Father's Day Hero",
    tagline: "Honoring our #1 Dad, hero, coach, and rock.",
    category: 'Love',
    icon: '🏆',
    colorScheme: {
      primary: '#1d4ed8',
      secondary: '#38bdf8',
      accent: '#eab308',
      bgGradient: 'from-blue-700 via-indigo-800 to-slate-900',
      cardBg: 'bg-slate-900/90 text-blue-50 border-blue-500/30',
      textColor: 'text-slate-900',
    },
    defaultMusic: 'acoustic_love',
    steps: [
      { id: 'badge', title: '#1 Dad of the Universe', subtitle: 'The legendary hero medal', interactiveType: 'hero_badge' },
      { id: 'letter', title: 'Things You Taught Me', subtitle: 'Timeless fatherly wisdom', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Adventures with Dad', subtitle: 'From fishing trips to backyard games', interactiveType: 'photo_slideshow' },
      { id: 'celebrate', title: 'Dad Cheers', subtitle: 'Raising a toast to the legend', interactiveType: 'confetti_blast' },
      { id: 'gift', title: 'Dad Box of Honor', subtitle: 'Tap to inspect your prize', interactiveType: 'gift_box' },
      { id: 'closing', title: 'Love You Always Dad', subtitle: 'Drop a warm reply', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: "Happy Father's Day, Dad!",
      recipientName: 'Dad',
      senderName: 'Your Loving Family',
      relationship: 'Father',
      personalMessage: "Dad, thank you for standing by me through every high and low. You taught me resilience, humor, and integrity. Proud to be your child!",
      giftRevealedItem: {
        type: 'badge',
        title: 'Universal Hall of Fame Trophy',
        message: 'Awarded for outstanding patience, barbecue mastery, and wisdom.',
      }
    }
  },

  anniversary: {
    id: 'anniversary',
    name: 'Wedding Anniversary',
    tagline: 'Celebrate love, milestones, and forever promises.',
    category: 'Love',
    icon: '💍',
    colorScheme: {
      primary: '#be123c',
      secondary: '#fb7185',
      accent: '#fbbf24',
      bgGradient: 'from-rose-900 via-red-800 to-pink-900',
      cardBg: 'bg-white/95',
      textColor: 'text-rose-950',
    },
    defaultMusic: 'acoustic_love',
    steps: [
      { id: 'hearts', title: 'Two Hearts, One Journey', subtitle: 'Celebrating our love story', interactiveType: 'couple_hearts' },
      { id: 'letter', title: 'Our Love Story', subtitle: 'Looking back at our milestone years', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Moments of Us', subtitle: 'From our first date to today', interactiveType: 'photo_slideshow' },
      { id: 'fireworks', title: 'Sparkling Fireworks', subtitle: 'Lighting up the night for our love', interactiveType: 'confetti_blast' },
      { id: 'gift', title: 'Vow & Surprise', subtitle: 'Our private anniversary token', interactiveType: 'gift_box' },
      { id: 'closing', title: 'To Infinity & Beyond', subtitle: 'Send a romantic reply', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: "Happy Anniversary, My Love!",
      recipientName: 'Elena',
      senderName: 'David',
      relationship: 'Spouse',
      yearsTogether: 5,
      howWeMet: 'In a cozy Seattle coffee shop on a rainy afternoon',
      personalMessage: "Every day with you feels like a gift. 5 years flew by in a heartbeat of laughter, shared dreams, and quiet morning coffees. I would choose you a million times over.",
      giftRevealedItem: {
        type: 'vow',
        title: 'Our Secret Sunset Getaway',
        message: 'Tickets booked for our favorite seaside cottage next weekend!',
      }
    }
  },

  eid_mubarak: {
    id: 'eid_mubarak',
    name: 'Eid Mubarak Blessings',
    tagline: 'Crescent lights, heartfelt duas, and festive Eidi.',
    category: 'Seasonal',
    icon: '🌙',
    colorScheme: {
      primary: '#047857',
      secondary: '#10b981',
      accent: '#fbbf24',
      bgGradient: 'from-emerald-950 via-teal-900 to-amber-950',
      cardBg: 'bg-emerald-950/90 text-amber-100 border-amber-400/30',
      textColor: 'text-emerald-950',
    },
    defaultMusic: 'warm_ambient',
    steps: [
      { id: 'crescent', title: 'The Holy Crescent Shines', subtitle: 'Eid Mubarak to you & your family', interactiveType: 'crescent_moon' },
      { id: 'eidi', title: 'Festive Eidi Envelope', subtitle: 'Tap the gold seal to reveal your Eidi', interactiveType: 'eidi_reveal' },
      { id: 'letter', title: 'Dua & Warm Greetings', subtitle: 'Prayers for peace, joy, and health', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Eid Gatherings', subtitle: 'Celebrations with loved ones', interactiveType: 'photo_slideshow' },
      { id: 'celebrate', title: 'Festive Sparkles', subtitle: 'Celebration across the skies', interactiveType: 'confetti_blast' },
      { id: 'closing', title: 'Eid Mubarak Reply', subtitle: 'Send prayers and smiles back', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: 'Eid Mubarak Kareem!',
      recipientName: 'Zain & Family',
      senderName: 'Ahmed & Family',
      relationship: 'Family Friend',
      personalMessage: "May the divine blessings of Allah bring peace, happiness, and prosperity to you and your home. Taqabbal Allahu minna wa minkum. Have a blessed and joyous Eid!",
      giftRevealedItem: {
        type: 'eidi',
        title: 'Blessed Eidi Token',
        code: 'EIDI-BARAKAH',
        message: 'May your days be sweet like sheer khurma and filled with light!',
      }
    }
  },

  friendship_day: {
    id: 'friendship_day',
    name: 'Best Friend Forever',
    tagline: 'Inside jokes, late-night talks, and unbreakable bonds.',
    category: 'Celebration',
    icon: '✨',
    colorScheme: {
      primary: '#ea580c',
      secondary: '#f97316',
      accent: '#facc15',
      bgGradient: 'from-amber-500 via-orange-500 to-rose-500',
      cardBg: 'bg-white/95',
      textColor: 'text-amber-950',
    },
    defaultMusic: 'cheerful_pop',
    steps: [
      { id: 'badge', title: 'Partners in Crime Award', subtitle: 'For surviving all my crazy antics', interactiveType: 'hero_badge' },
      { id: 'celebrate', title: 'BFF Confetti Rain', subtitle: 'Celebration time!', interactiveType: 'confetti_blast' },
      { id: 'letter', title: 'Real Talk, Bestie', subtitle: 'Why you mean the world to me', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Crazy Memories', subtitle: 'Uncensored laugh reels', interactiveType: 'photo_slideshow' },
      { id: 'gift', title: 'Surprise Treat', subtitle: 'Tap to crack open the box', interactiveType: 'gift_box' },
      { id: 'closing', title: 'Friendship Reply', subtitle: 'Send an inside joke back', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: 'Happy Friendship Day, Partner!',
      recipientName: 'Maya',
      senderName: 'Chloe',
      relationship: 'Best Friend',
      personalMessage: "From surviving college all-nighters to our 2 AM phone calls, you are family by choice. Thank you for never judging my terrible decisions and always laughing with me!",
      giftRevealedItem: {
        type: 'voucher',
        title: 'Boba Tea & Pizza on Me',
        code: 'BFF-BOBA-2026',
        message: 'Valid for unlimited snacks next time we hang out!',
      }
    }
  },

  valentines_day: {
    id: 'valentines_day',
    name: "Valentine's Romance",
    tagline: 'Floating hearts, romantic letters, and love in the air.',
    category: 'Love',
    icon: '💖',
    colorScheme: {
      primary: '#e11d48',
      secondary: '#f43f5e',
      accent: '#fda4af',
      bgGradient: 'from-rose-600 via-pink-700 to-purple-800',
      cardBg: 'bg-white/95',
      textColor: 'text-rose-950',
    },
    defaultMusic: 'acoustic_love',
    steps: [
      { id: 'hearts', title: 'You Have My Heart', subtitle: 'Floating in sweet romance', interactiveType: 'couple_hearts' },
      { id: 'love_meter', title: 'Love Overflow', subtitle: 'Past 100% and into infinity', interactiveType: 'love_meter' },
      { id: 'letter', title: 'My Valentine', subtitle: 'Every word written with love', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Snapshots of Us', subtitle: 'Every glance and smile', interactiveType: 'photo_slideshow' },
      { id: 'gift', title: 'Unwrap the Romance', subtitle: 'A special token for you', interactiveType: 'gift_box' },
      { id: 'closing', title: 'Forever Yours', subtitle: 'Send back a kiss & note', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: "Happy Valentine's Day!",
      recipientName: 'Julian',
      senderName: 'Amara',
      relationship: 'Partner',
      personalMessage: "Being with you turns everyday moments into pure magic. Thank you for making my heart skip a beat and for being my favorite person in the whole universe.",
      giftRevealedItem: {
        type: 'quote',
        title: 'A Lifetime of Adventures',
        message: 'Candlelight dinner reservation confirmed for this Friday evening!',
      }
    }
  },

  wedding_congrats: {
    id: 'wedding_congrats',
    name: 'Wedding Congratulations',
    tagline: 'Rings, champagne clinks, and cheers for the newlyweds!',
    category: 'Milestone',
    icon: '🥂',
    colorScheme: {
      primary: '#d97706',
      secondary: '#f59e0b',
      accent: '#fef3c7',
      bgGradient: 'from-amber-600 via-yellow-600 to-stone-800',
      cardBg: 'bg-white/95',
      textColor: 'text-amber-950',
    },
    defaultMusic: 'celebration_brass',
    steps: [
      { id: 'hearts', title: 'A Union of Two Souls', subtitle: 'Cheers to Mr. & Mrs.!', interactiveType: 'couple_hearts' },
      { id: 'champagne', title: 'Champagne Toast', subtitle: 'Clinking glasses for lifelong happiness', interactiveType: 'champagne_pop' },
      { id: 'letter', title: 'Warmest Wedding Wishes', subtitle: 'Advice and love for your journey', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Wedding Photo Gallery', subtitle: 'Capturing pure radiance', interactiveType: 'photo_slideshow' },
      { id: 'gift', title: 'Wedding Gift Card', subtitle: 'A celebratory token', interactiveType: 'gift_box' },
      { id: 'closing', title: 'Blessings to the Couple', subtitle: 'Sign the digital guestbook', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: 'Congratulations on Your Big Day!',
      recipientName: 'Liam & Olivia',
      senderName: 'The Miller Family',
      relationship: 'Close Friends',
      personalMessage: "May your marriage be filled with endless laughter, sweet understanding, and boundless adventures. Here's to a lifetime of love and joy together!",
      giftRevealedItem: {
        type: 'voucher',
        title: 'Honeymoon Champagne & Dinner',
        code: 'JUST-MARRIED-2026',
        message: 'A private seaside dinner on us during your honeymoon!',
      }
    }
  },

  graduation: {
    id: 'graduation',
    name: 'Graduation Cap Toss',
    tagline: 'Toss the cap high! Your hard work has paid off.',
    category: 'Milestone',
    icon: '🎓',
    colorScheme: {
      primary: '#4338ca',
      secondary: '#6366f1',
      accent: '#fbbf24',
      bgGradient: 'from-indigo-800 via-blue-900 to-purple-950',
      cardBg: 'bg-white/95',
      textColor: 'text-indigo-950',
    },
    defaultMusic: 'celebration_brass',
    steps: [
      { id: 'cap_throw', title: 'Cap in the Sky!', subtitle: 'You did it! Class of 2026', interactiveType: 'grad_cap_throw' },
      { id: 'celebrate', title: 'Graduation Confetti', subtitle: 'Cheers to the graduate', interactiveType: 'confetti_blast' },
      { id: 'letter', title: 'The Next Great Adventure', subtitle: 'Proud of your dedication', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'College Memories', subtitle: 'Late nights, friends & triumph', interactiveType: 'photo_slideshow' },
      { id: 'gift', title: 'Graduate Gift Unboxing', subtitle: 'Your career launchpad reward', interactiveType: 'gift_box' },
      { id: 'closing', title: 'Cheers to the Grad', subtitle: 'Leave celebratory advice', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: 'Congratulations, Graduate!',
      recipientName: 'Marcus',
      senderName: 'Mom & Dad',
      relationship: 'Parents',
      gradDegree: 'B.S. in Computer Science (Summa Cum Laude)',
      personalMessage: "Watching you walk across that stage was one of the proudest moments of our lives. You worked tirelessly and overcame every hurdle. The world is yours to conquer!",
      giftRevealedItem: {
        type: 'voucher',
        title: 'Graduation Wardrobe & Tech Fund',
        code: 'GRAD-HONOR-2026',
        message: 'Time to suit up for your new career chapter!',
      }
    }
  },

  new_baby: {
    id: 'new_baby',
    name: 'New Baby Welcome',
    tagline: 'Tiny fingers, little toes, and infinite bundles of joy.',
    category: 'Milestone',
    icon: '👶',
    colorScheme: {
      primary: '#0891b2',
      secondary: '#38bdf8',
      accent: '#fef08a',
      bgGradient: 'from-cyan-500 via-sky-400 to-amber-200',
      cardBg: 'bg-white/95',
      textColor: 'text-cyan-950',
    },
    defaultMusic: 'warm_ambient',
    steps: [
      { id: 'lullaby', title: 'Welcome to the World', subtitle: 'A precious angel has arrived', interactiveType: 'baby_lullaby' },
      { id: 'flowers', title: 'Shower of Blessings', subtitle: 'Gentle warmth for baby & mom', interactiveType: 'blooming_flowers' },
      { id: 'letter', title: 'A Letter for the Little One', subtitle: 'Words of love for the new parents', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'First Moments', subtitle: 'Tiny feet and sleepy yawns', interactiveType: 'photo_slideshow' },
      { id: 'gift', title: 'Welcome Box', subtitle: 'Baby essentials & cuddles', interactiveType: 'gift_box' },
      { id: 'closing', title: 'Blessings to the Family', subtitle: 'Send your warmest wishes', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: 'Welcome Baby Leo!',
      recipientName: 'Sarah & Ben',
      senderName: 'Auntie Jessica',
      relationship: 'Sister & Aunt',
      babyBirthWeight: '7 lbs 4 oz',
      personalMessage: "Congratulations on your tiny miracle! Welcome to the wildest, most rewarding adventure of parenthood. Can't wait to shower baby Leo with hugs!",
      giftRevealedItem: {
        type: 'voucher',
        title: 'Baby Stroller & Nursery Voucher',
        code: 'BABY-LEO-LOVE',
        message: 'Plus unlimited babysitting coupons from Auntie!',
      }
    }
  },

  get_well_soon: {
    id: 'get_well_soon',
    name: 'Get Well Soon Care',
    tagline: 'Warm teas, healing thoughts, and giant virtual hugs.',
    category: 'Gratitude',
    icon: '🍵',
    colorScheme: {
      primary: '#0d9488',
      secondary: '#2dd4bf',
      accent: '#fed7aa',
      bgGradient: 'from-teal-600 via-emerald-600 to-amber-300',
      cardBg: 'bg-white/95',
      textColor: 'text-teal-950',
    },
    defaultMusic: 'warm_ambient',
    steps: [
      { id: 'teacup', title: 'Warm Tea & Comfort', subtitle: 'A soothing brew for your soul', interactiveType: 'teacup_steam' },
      { id: 'flowers', title: 'Healing Blossoms', subtitle: 'Bright petals to lift your spirits', interactiveType: 'blooming_flowers' },
      { id: 'letter', title: 'Sending Healing Energy', subtitle: 'Take all the rest you need', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Smiles & Happy Times', subtitle: 'Reminders of great days ahead', interactiveType: 'photo_slideshow' },
      { id: 'gift', title: 'Care Package Unbox', subtitle: 'Prescription of love & laughter', interactiveType: 'gift_box' },
      { id: 'closing', title: 'Feel Better Soon!', subtitle: 'Reply whenever you have energy', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: 'Thinking of You & Sending Hugs',
      recipientName: 'Claire',
      senderName: 'Your Coworkers',
      relationship: 'Colleague',
      personalMessage: "The office isn't the same without your vibrant energy and infectious laugh! Rest up, take it easy, and know that we are all cheering for your speedy recovery.",
      giftRevealedItem: {
        type: 'voucher',
        title: 'Gourmet Soup & Fruit Basket',
        message: 'Delivered straight to your doorstep for maximum comfort.',
      }
    }
  },

  new_year: {
    id: 'new_year',
    name: 'New Year Countdown',
    tagline: 'Midnight countdown, fireworks, and fresh resolutions.',
    category: 'Seasonal',
    icon: '🎆',
    colorScheme: {
      primary: '#9333ea',
      secondary: '#c084fc',
      accent: '#facc15',
      bgGradient: 'from-indigo-950 via-purple-900 to-amber-900',
      cardBg: 'bg-slate-900/90 text-white border-purple-500/40',
      textColor: 'text-white',
    },
    defaultMusic: 'celebration_brass',
    steps: [
      { id: 'champagne', title: 'Midnight Toast', subtitle: '3... 2... 1... Happy New Year!', interactiveType: 'champagne_pop' },
      { id: 'celebrate', title: 'Grand Fireworks Show', subtitle: 'Lighting up the new horizon', interactiveType: 'confetti_blast' },
      { id: 'letter', title: '365 New Chances', subtitle: 'Hopes and aspirations for the year', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Year in Review', subtitle: 'Highlights we will never forget', interactiveType: 'photo_slideshow' },
      { id: 'gift', title: 'New Year Fortune Box', subtitle: 'Your lucky mantra and blessing', interactiveType: 'gift_box' },
      { id: 'closing', title: 'Happy New Year!', subtitle: 'Send your new year resolution', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: 'Happy New Year 2027!',
      recipientName: 'Everyone',
      senderName: 'Alex',
      relationship: 'Friend',
      personalMessage: "May this coming year open new doors, heal old wounds, and bring boundless peace, success, and prosperity to you and your loved ones!",
      giftRevealedItem: {
        type: 'quote',
        title: 'Golden Resolution',
        message: 'May your days be filled with purpose, courage, and radiant joy!',
      }
    }
  },

  thank_you: {
    id: 'thank_you',
    name: 'Gratitude & Thank You',
    tagline: 'Golden envelopes, heartfelt words, and sincere appreciation.',
    category: 'Gratitude',
    icon: '💌',
    colorScheme: {
      primary: '#d97706',
      secondary: '#f59e0b',
      accent: '#fef3c7',
      bgGradient: 'from-amber-600 via-yellow-700 to-emerald-800',
      cardBg: 'bg-white/95',
      textColor: 'text-amber-950',
    },
    defaultMusic: 'warm_ambient',
    steps: [
      { id: 'flowers', title: 'Bouquet of Gratitude', subtitle: 'From the bottom of my heart', interactiveType: 'blooming_flowers' },
      { id: 'letter', title: 'A Thank-You Letter', subtitle: 'Your kindness made all the difference', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Kindness in Action', subtitle: 'Remembering when you helped me', interactiveType: 'photo_slideshow' },
      { id: 'celebrate', title: 'Appreciation Burst', subtitle: 'You deserve the highest praise', interactiveType: 'confetti_blast' },
      { id: 'gift', title: 'Little Token of Thanks', subtitle: 'A small gesture for your big heart', interactiveType: 'gift_box' },
      { id: 'closing', title: 'Thank You Reply', subtitle: 'Exchange warm notes', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: 'A Giant Thank You!',
      recipientName: 'Rachel',
      senderName: 'Daniel',
      relationship: 'Friend',
      personalMessage: "I cannot thank you enough for stepping up when I needed help the most. Your generosity and kindness are rare treasures in this world.",
      giftRevealedItem: {
        type: 'voucher',
        title: 'Coffee & Treat on Me',
        code: 'THANKS-A-MILLION',
        message: 'A warm beverage and pastry whenever you want!',
      }
    }
  },

  farewell: {
    id: 'farewell',
    name: 'Bittersweet Farewell',
    tagline: 'Goodbyes are not the end; they are just new beginnings.',
    category: 'Milestone',
    icon: '✈️',
    colorScheme: {
      primary: '#0284c7',
      secondary: '#38bdf8',
      accent: '#fdba74',
      bgGradient: 'from-sky-700 via-blue-800 to-indigo-950',
      cardBg: 'bg-white/95',
      textColor: 'text-sky-950',
    },
    defaultMusic: 'acoustic_love',
    steps: [
      { id: 'hearts', title: 'Journey to New Horizons', subtitle: 'You will be so dearly missed', interactiveType: 'couple_hearts' },
      { id: 'letter', title: 'Farewell & Good Luck', subtitle: 'Reflecting on our journey together', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Farewell Memory Wall', subtitle: 'All the laughs and triumphs', interactiveType: 'photo_slideshow' },
      { id: 'champagne', title: 'Toast to New Adventures', subtitle: 'Wishing you the grandest success', interactiveType: 'champagne_pop' },
      { id: 'gift', title: 'Going-Away Keepsake', subtitle: 'Never forget us', interactiveType: 'gift_box' },
      { id: 'closing', title: 'Stay in Touch', subtitle: 'Leave your new contact and farewell reply', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: 'We Will Miss You So Much!',
      recipientName: 'Kavita',
      senderName: 'The Whole Engineering Team',
      relationship: 'Colleague & Friend',
      personalMessage: "It has been an absolute honor working beside you. Your brilliance, warmth, and supportive spirit left an indelible mark on our team. Crush it in your new role!",
      giftRevealedItem: {
        type: 'voucher',
        title: 'Team Farewell Dining Fund',
        code: 'FAREWELL-KAVITA-2026',
        message: 'A feast in honor of your new journey!',
      }
    }
  },

  congratulations: {
    id: 'congratulations',
    name: 'Promotion & Success',
    tagline: 'Level up! Celebrating hard-earned victory and milestones.',
    category: 'Milestone',
    icon: '🌟',
    colorScheme: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#fbbf24',
      bgGradient: 'from-purple-800 via-violet-900 to-amber-800',
      cardBg: 'bg-white/95',
      textColor: 'text-purple-950',
    },
    defaultMusic: 'celebration_brass',
    steps: [
      { id: 'champagne', title: 'Champagne & Cheers', subtitle: 'To your massive accomplishment', interactiveType: 'champagne_pop' },
      { id: 'celebrate', title: 'Confetti Cannon Blast', subtitle: 'A standing ovation for you', interactiveType: 'confetti_blast' },
      { id: 'letter', title: 'Hard Work Recognized', subtitle: 'You earned every bit of this triumph', interactiveType: 'typed_letter' },
      { id: 'memories', title: 'Road to Success', subtitle: 'The hustle and the victory', interactiveType: 'photo_slideshow' },
      { id: 'gift', title: 'Celebration Prize Box', subtitle: 'Unwrap your honor', interactiveType: 'gift_box' },
      { id: 'closing', title: 'Send Congratulations Back', subtitle: 'Reply to the cheer squad', interactiveType: 'closing_reaction' }
    ],
    sampleWish: {
      title: 'Huge Congratulations on the Promotion!',
      recipientName: 'Jordan',
      senderName: 'Sam & Family',
      relationship: 'Friend & Cheerleader',
      personalMessage: "Senior Director looks so good on you! Nobody works harder, cares more deeply, or delivers with such grace. Here is to your soaring success!",
      giftRevealedItem: {
        type: 'badge',
        title: 'Peak Achiever Award',
        message: 'Official acknowledgment of mastery, grit, and visionary leadership.',
      }
    }
  }
};

export const ALL_EVENT_KEYS = Object.keys(EVENT_TEMPLATES) as EventType[];

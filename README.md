<div align="center">

# ✨ AI Wishify (Adiba Innovations)

### Create beautiful, personalized, animated greetings for every occasion, and send them with a single link.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

[Live Demo](https://ai-wishify.ai.studio) · [Report a Bug](../../issues) · [Request a Feature](../../issues)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Supported Events](#-supported-events)
- [How It Works](#-how-it-works)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Adding a New Event Template](#-adding-a-new-event-template)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎉 About the Project

**AI Wishify** is a full-stack web platform that turns an ordinary greeting into an interactive, animated experience. Instead of sending a flat card, users choose an occasion, fill in the recipient's details, personalize the content (with optional AI assistance), preview the result, and send it as a shareable link.

Each occasion has its own **theme, color palette, music, animations, and step-by-step activities**. A birthday wish opens with a cake and candles to blow out. A Teacher's Day wish starts on a chalkboard. An anniversary wish plays a love timeline that ends in fireworks.

> 💡 **Core idea:** a wish should feel like a small celebration, not a text message.

---

## 🚀 Key Features

| Category | Highlights |
|---|---|
| 🎨 **Event-specific experiences** | Every occasion has a unique themed sequence of 5-7 interactive steps |
| 🤖 **AI writing assistant** | Generate wishes, poems, shayari, and quotes with tone and length controls |
| 🌍 **Multi-language** | English, Urdu, Hindi, Arabic, and more |
| 👀 **Live preview** | Play the full experience before sending, with a "Back to edit" option |
| 📨 **Preview-to-recipient** | Send a clearly marked preview link to a trusted friend (or the recipient) for a test run |
| ⏰ **Scheduled delivery** | Deliver the wish at an exact date and time, e.g. 12:00 AM on the birthday |
| 🔒 **Privacy controls** | Optional PIN/password protection and link expiry |
| 💬 **Reactions & replies** | Recipients can react with emojis and send a reply message back |
| 🔔 **Open notifications** | Senders are notified when their wish is opened |
| 📱 **Mobile-first design** | Responsive, accessible, with dark/light mode |
| 📊 **Dashboard** | Manage sent wishes, drafts, scheduled deliveries, reactions, and analytics |

---

## 🎊 Supported Events

Birthday · Teacher's Day · Father's Day · Mother's Day · Wedding Anniversary · Wedding Congratulations · Friendship Day · Valentine's Day · Eid Mubarak · New Year · Graduation · New Baby · Get Well Soon · Thank You · Farewell · Congratulations / Promotion

### Example experience sequences

<details>
<summary><b>🎂 Birthday</b></summary>

1. Cake appears with the recipient's name and age
2. Candles are lit, and the recipient taps or blows into the mic to put them out
3. Confetti, balloons, and the birthday song
4. Personalized message typed out letter by letter
5. Photo memories slideshow
6. Surprise gift box (reveals a voucher, quote, or video)
7. Final screen with the sender's name, a reply button, and "Send a thank-you back"

</details>

<details>
<summary><b>📚 Teacher's Day</b></summary>

Chalkboard intro → apple on the desk → handwritten thank-you note animation → student-memory quotes → "World's Best Teacher" certificate → closing message

</details>

<details>
<summary><b>👨 Father's Day</b></summary>

"Hero Dad" badge → trophy animation → memory timeline → "Things Dad taught me" list → heartfelt letter

</details>

<details>
<summary><b>💍 Wedding Anniversary</b></summary>

Couple heart animation → "years together" counter → love timeline (how we met, first date, proposal) → photo gallery → vow-style message → fireworks finale

</details>

<details>
<summary><b>🌙 Eid Mubarak</b></summary>

Crescent moon and lanterns → greeting in Arabic, Urdu, and English → Eidi gift reveal → dua message

</details>

---

## 🔄 How It Works

```
Choose Event  →  Customize  →  Preview  →  (Optional) Send Preview  →  Send / Schedule  →  Recipient Experience
```

1. **Choose** an occasion from the event gallery.
2. **Customize** through a multi-step wizard: names, message, photos, music, theme, language, and tone.
3. **Generate** or refine the message with AI.
4. **Preview** the full animated experience.
5. **Send a preview** to the recipient or a friend (optional).
6. **Deliver** via link, QR code, email, WhatsApp, SMS, or social sharing, immediately or on a schedule.
7. **Track** opens and reactions from your dashboard.

---

## 🛠 Tech Stack

**Frontend**
- React + TypeScript
- Tailwind CSS
- Framer Motion, Lottie, canvas-confetti

**Backend**
- Node.js (or Supabase / Firebase)
- Authentication, database, and file storage

**AI**
- LLM API for message, poem, and caption generation

**Communication**
- Email: Resend / SendGrid
- SMS / WhatsApp: Twilio or equivalent provider

**Core database tables**
`users` · `events` · `wishes` · `media` · `scheduled_deliveries` · `reactions` · `previews`

---

## 🏁 Getting Started

### Prerequisites

- Node.js `>= 18`
- npm, yarn, or pnpm
- API keys for your chosen AI, email, and storage providers

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/ai-wishify.git
cd ai-wishify

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# then fill in the values (see below)

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run the linter |
| `npm run test` | Run the test suite |

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
# App
VITE_APP_URL=http://localhost:5173

# Database & Auth (Supabase example)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI
AI_API_KEY=your_llm_api_key

# Email
EMAIL_API_KEY=your_email_provider_key
EMAIL_FROM=wishes@yourdomain.com

# SMS / WhatsApp
SMS_ACCOUNT_SID=your_sid
SMS_AUTH_TOKEN=your_token
```

> ⚠️ Never commit your `.env` file. Keep API keys on the server side wherever possible.

---

## 📁 Project Structure

```
ai-wishify/
├── src/
│   ├── components/        # Shared UI components
│   ├── events/            # Event templates (one folder per event)
│   │   ├── birthday/
│   │   ├── teachers-day/
│   │   ├── fathers-day/
│   │   ├── anniversary/
│   │   └── ...
│   ├── pages/             # Landing, wizard, preview, send, dashboard
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # API clients, utilities, AI helpers
│   ├── config/            # Event registry and theme config
│   └── styles/            # Global styles
├── server/                # API routes, schedulers, delivery logic
├── public/                # Static assets, audio, Lottie files
├── .env.example
└── README.md
```

---

## ➕ Adding a New Event Template

AI Wishify is built to be modular. To add a new occasion:

1. Create a folder in `src/events/<event-name>/`.
2. Define the event config: theme colors, fonts, music, form fields, and sequence steps.
3. Build the step components (e.g., `StepIntro.tsx`, `StepMessage.tsx`).
4. Register the event in `src/config/events.ts`.

```ts
// src/config/events.ts
export const events = [
  {
    id: "birthday",
    title: "Birthday",
    theme: { primary: "#FF6B9D", secondary: "#FFD166" },
    fields: ["age", "birthDate", "favoriteColor", "cakeStyle"],
    steps: ["cake", "candles", "confetti", "message", "memories", "giftbox", "finale"],
  },
  // add your event here
];
```

---

## 🗺 Roadmap

- [x] Landing page and event gallery
- [x] Birthday flow (form → preview → send → recipient experience)
- [ ] Teacher's Day, Father's Day, Mother's Day, Anniversary templates
- [ ] AI message and poem generator
- [ ] Preview-to-recipient link
- [ ] Scheduled delivery
- [ ] Reactions, replies, and open notifications
- [ ] User dashboard and analytics
- [ ] Pricing plans (Free / Pro)
- [ ] Admin panel for managing templates
- [ ] Video and voice message support
- [ ] Mobile app (PWA)

See the [open issues](../../issues) for a full list of proposed features and known issues.

---

## 🤝 Contributing

Contributions are what make open source great. To contribute:

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for our code style and pull request guidelines.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 📬 Contact

**Your Name** · [@your-handle](https://twitter.com/your-handle) · your.email@example.com

Project Link: [https://github.com/your-username/ai-wishify](https://github.com/your-username/ai-wishify)

---

<div align="center">

Made with ❤️ to make every celebration a little more special.

⭐ If you like this project, please give it a star!

</div>

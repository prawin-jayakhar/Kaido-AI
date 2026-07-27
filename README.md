# KAIDO | AI-Powered Reminder Assistant

**Live Demo**: [https://kaido-ai-9g3e.onrender.com/](https://kaido-ai-9g3e.onrender.com/)

KAIDO is an AI-driven reminder assistant that works seamlessly across **Discord** and **Telegram**. It turns natural language (text or voice notes in any language) into structured reminders, notifying users exactly when they need them.

---

## Features

- **Natural Language Parsing**: "Remind me to call Mom tomorrow at 5pm" or "Kal subah 9 baje meeting hai".
- **Voice Notes**: Send voice messages directly in Telegram or Discord DMs; they are transcribed and processed using Groq Whisper.
- **Multilingual Support**: Speak naturally in your preferred language. KAIDO understands you perfectly.
- **Smart Recurrence**: Daily, Weekly, Monthly, and Custom Interval support.
- **Admin Dashboard**: Manage users, view stats, ban spammers, and monitor system logs.
- **Abuse Prevention**: Rate limiting, spam detection, and daily reminder limits.

---

## Prerequisites

Before running the project, ensure you have:

1. Node.js (v18 or higher)
2. MongoDB (Atlas Connection URI)
3. Telegram Bot Token (via @BotFather)
4. Discord Bot Token (via Discord Developer Portal)
5. Groq API Key (for Whisper transcription and LLM semantic parsing)

---

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
# Server
PORT=3005
NODE_ENV=production

# Database
MONGO_URI=your_mongodb_atlas_connection_string

# Security
ADMIN_SECRET=your_admin_secret_key

# Telegram
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# Discord
DISCORD_BOT_TOKEN=your_discord_bot_token

# AI / NLP
GROQ_API_KEY=your_groq_api_key
ENABLE_NLP=true
```

### 3. Start the Server
```bash
npm run dev
```

---

## Admin Dashboard

Access the live admin panel at `https://kaido-ai-9g3e.onrender.com/admin/index.html` (or `http://localhost:3005/admin` locally) to view users, manage reminders, and monitor system logs.

---

## License

This project is proprietary software. See the [LICENSE](./LICENSE) file for full terms.

Copyright (c) 2026 Prawin Jayakhar. All rights reserved.

# Telegram Joke Bot 🤖😂

A scalable Telegram bot built using **Node.js, Express, MongoDB Atlas**, and the **Telegram Bot API**.  
The bot sends random jokes to users at configurable intervals and allows users to pause or resume joke delivery at any time.

---

## 🚀 Features

- Automatically sends jokes every **n minutes** (default: 1 minute)
- Users can configure joke frequency
- Users can **ENABLE / DISABLE** joke delivery anytime
- Slash command support (`/start`, `/enable`, `/disable`, `/set`)
- Scalable cron-based scheduler (no per-user timers)
- MongoDB Atlas for persistent storage

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB Atlas**
- **node-telegram-bot-api**
- **node-cron**
- **Official Joke API**

---
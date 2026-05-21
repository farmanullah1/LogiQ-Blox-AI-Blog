# 🧠 WordWise Correctify — AI-Powered Spelling & Grammar Corrector

**WordWise Correctify** is a world-class, AI-driven writing suite. Built with a focus on speed, accuracy, and user experience, it doesn't just point out your mistakes—it explains them, helping you become a more confident and effective communicator.

![Status](https://img.shields.io/badge/Status-Complete-success)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node%20%7C%20Python%20%7C%20MongoDB-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 🔴 **Real-time Error Detection:** Catch misspellings and grammatical slips instantly as you type.
- 🟢 **AI Grammar Correction:** Advanced NLP engine provides context-aware sentence restructuring.
- ⚡ **AI Paraphraser:** Instantly rewrite text in **Professional**, **Creative**, or **Simple** styles.
- 📊 **Linguistic Insights:** Get real-time data on **Tone**, **Mood (Sentiment)**, **Reading Time**, and **Complexity (Grade Level)**.
- 🔄 **Split-View Comparison:** Toggle a side-by-side view to compare original and corrected text.
- 📚 **Dynamic Knowledge Hub:** Over 30 pages of guides on grammar, professional writing, and AI technology.
- 🎯 **Focus Mode:** A distraction-free environment for deep writing sessions.
- 📋 **One-Click Export:** Generate professional Markdown reports of your polished work.
- 🌙 **Dark Mode:** A beautiful, eye-friendly interface for any environment.
- ⌨️ **Power-User Shortcuts:** Navigate and execute commands instantly with global key bindings.

---

## 🚀 Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion, React Three Fiber (3D), GSAP, canvas-confetti.
- **Backend:** Node.js, Express, MongoDB (History & Sessions).
- **AI Core:** Python Flask, LanguageTool, PySpellChecker, TextBlob (NLP & Insights).

---

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js & npm
- Python 3.8+
- MongoDB (Local or Cloud URI)

### 2. Python NLP Service
```bash
cd nlp-service
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### 3. Node.js Server
```bash
cd server
npm install
# Ensure .env has MONGODB_URI and NLP_SERVICE_URL
npm start
```

### 4. React Frontend
```bash
cd client
npm install
npm run dev
```

---

## 📁 Project Structure

```
wordwise-correctify/
├── client/              # React + Vite Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI, Layout, Animations
│   │   ├── data/        # Articles & Templates data
│   │   ├── pages/       # Route-level components
│   │   └── services/    # API integration
├── nlp-service/         # Python Flask AI Core
│   ├── app.py           # API endpoints
│   └── corrector.py     # NLP logic & Insights
└── server/              # Node.js + Express Bridge
    ├── models/          # MongoDB schemas
    └── routes/          # API routing
```

---

## 👤 Credits

Built with ❤️ by **Farmanullah Ansari**.

- 🌐 [Portfolio](https://farmanullah1.github.io/My-Portfolio)
- 💼 [LinkedIn](https://www.linkedin.com/in/farmanullah-ansari/)
- 🐙 [GitHub](https://github.com/farmanullah1)

---

## 📄 License

MIT License © 2025 Farmanullah Ansari

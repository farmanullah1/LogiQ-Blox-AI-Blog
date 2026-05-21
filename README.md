# 🧠 WordWise Correctify — AI-Powered Spelling & Grammar Corrector

**WordWise Correctify** is a world-class, AI-driven spelling and grammar corrector. Built with a focus on speed, accuracy, and user experience, it doesn't just point out your mistakes—it explains them, helping you become a more confident writer.

![Status](https://img.shields.io/badge/Status-Complete-success)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node%20%7C%20Python%20%7C%20MongoDB-blue)

---

## ✨ Features

- 🔴 **Real-time Error Detection:** Catch misspellings and grammatical slips instantly as you type.
- 🟢 **AI Grammar Correction:** Advanced NLP engine provides context-aware sentence restructuring.
- ⚡ **Real-time Detection:** Debounced auto-correction as you type (can be toggled).
- 📊 **Readability Insights:** Get instant Reading Grade scores based on your input complexity.
- 💡 **Smart Explanations:** Click any correction to learn why it was changed.
- 📋 **One-Click Copy:** Grab your perfectly polished text and go.
- 🔄 **Clear All & Auto-save:** Efficient input management with session-based cloud syncing.
- 🌙 **Dark Mode:** A beautiful, eye-friendly interface for any environment.
- 📱 **Fully Responsive:** Works seamlessly on desktop, tablet, and mobile.

---

## 🚀 Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion, Three.js, GSAP.
- **Backend:** Node.js, Express, MongoDB.
- **AI Core:** Python Flask, LanguageTool, PySpellChecker.

---

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js & npm
- Python 3.8+
- MongoDB (running locally or a cloud URI)

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
# Create .env file with MONGODB_URI
npm start
```

### 4. React Frontend
```bash
cd client
npm install
npm run dev
```

---

## 👤 Credits

Built with ❤️ by **Farman Ullah Ansari**.

- 🌐 [Portfolio](https://farmanullah1.github.io/My-Portfolio)
- 💼 [LinkedIn](https://www.linkedin.com/in/farmanullah-ansari/)
- 🐙 [GitHub](https://github.com/farmanullah1)

---

## 📄 License

MIT License © 2025 Farman Ullah Ansari

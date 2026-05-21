# 🧠 WordWise Correctify — Complete AI-Powered Spelling & Grammar Corrector
### Full Build Specification for the Antigravity Agent

> **Agent Instructions:** Work through sub-prompts **one at a time, in order**. Before starting each sub-prompt:
> 1. **Check** if this feature/page/component already exists in the codebase.
> 2. **Verify** it works correctly. If it's broken, fix it first before building new features.
> 3. **Never duplicate** existing features — refine and extend them instead.
> 4. After each sub-prompt is done, **mark it complete** and move to the next.

---

## 🏷️ Project Identity

| Field | Value |
|-------|-------|
| **App Name** | WordWise Correctify |
| **Tagline** | *Write with confidence. Correct with intelligence.* |
| **Type** | AI-powered web app — spelling & grammar corrector chatbot |
| **Stack** | React + Tailwind CSS (Frontend) · Node.js + Express (Backend API) · Python Flask (NLP Microservice) · MongoDB (Database) |
| **Owner** | Farman Ullah Ansari |
| **Portfolio** | [https://farmanullah1.github.io/My-Portfolio](https://farmanullah1.github.io/My-Portfolio) |
| **LinkedIn** | [https://www.linkedin.com/in/farmanullah-ansari/](https://www.linkedin.com/in/farmanullah-ansari/) |
| **GitHub** | [https://github.com/farmanullah1](https://github.com/farmanullah1) |

---

## 🎨 Design System (Strictly Follow)

```css
/* Primary Palette */
--primary:        #2563EB;   /* Deep trustworthy blue — buttons, headers, active states */
--primary-dark:   #1D4ED8;   /* Hover/pressed state */
--primary-light:  #DBEAFE;   /* Subtle backgrounds, badges */
--accent-correct: #10B981;   /* Green — correct/fixed state */
--accent-dark:    #059669;   /* Hover on green */
--error:          #EF4444;   /* Red — spelling/grammar errors */
--error-light:    #FEE2E2;   /* Background tint for error words */

/* Backgrounds & Cards */
--bg-base:        #F8FAFC;   /* Overall page background */
--bg-card:        #FFFFFF;   /* Cards, chat bubbles, panels */
--bg-code:        #F1F5F9;   /* Code blocks, secondary panels */

/* Text */
--text-primary:   #1E293B;   /* Body text, headings */
--text-secondary: #64748B;   /* Subtitles, labels, timestamps */
--text-muted:     #94A3B8;   /* Placeholder, disabled */

/* Borders & Shadows */
--border:         #E2E8F0;   /* Default borders */
--shadow-sm:      0 1px 3px rgba(0,0,0,0.08);
--shadow-md:      0 4px 20px rgba(37,99,235,0.10);
--shadow-lg:      0 20px 60px rgba(37,99,235,0.15);

/* Typography */
--font-display: 'Clash Display', 'Plus Jakarta Sans', sans-serif;
--font-body:    'Inter', 'DM Sans', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', 'Fira Code', monospace;
```

> **Permission granted:** If you believe an alternate or complementary color set creates a more impressive result, you may tastefully extend this palette (e.g., subtle gradients, dark-mode variants). The above colors remain the **core** identity.

---

## 📁 Project Structure (Target)

```
wordwise-correctify/
├── client/                          # React Frontend
│   ├── public/
│   │   └── assets/ (icons, 3D models, lottie files)
│   └── src/
│       ├── components/
│       │   ├── chat/                # Chat interface components
│       │   ├── ui/                  # Reusable UI (buttons, badges, tooltips)
│       │   ├── layout/              # Navbar, Footer, Sidebar
│       │   └── animations/          # Lottie, Three.js, GSAP components
│       ├── pages/
│       │   ├── Home.jsx             # Landing page
│       │   ├── Corrector.jsx        # Main chat/corrector app
│       │   ├── About.jsx            # Why I created this
│       │   ├── HowItWorks.jsx       # What the site is about + tech
│       │   ├── Features.jsx         # Full feature showcase
│       │   └── Creator.jsx          # About the creator (Farman Ullah)
│       ├── hooks/                   # useDebounce, useCorrection, useTheme
│       ├── context/                 # ThemeContext, ChatContext
│       ├── services/                # API calls (api.js)
│       ├── utils/                   # Highlight helpers, text diff
│       └── styles/                  # Global CSS, animations
├── server/                          # Node.js + Express
│   ├── routes/
│   │   ├── correction.js
│   │   └── history.js
│   ├── models/
│   │   └── Session.js               # MongoDB session/history model
│   ├── middleware/
│   └── server.js
└── nlp-service/                     # Python Flask Microservice
    ├── app.py
    ├── corrector.py
    └── requirements.txt
```

---

---

# 📦 SUB-PROMPTS — BUILD IN ORDER

---

## 🔵 SUB-PROMPT 1 — Project Scaffold & Design System Foundation

**Goal:** Create the full project scaffold and global design system. This is the foundation everything else builds on.

### What to build:

1. **Initialize React app** using Vite (`npm create vite@latest client -- --template react`). Install Tailwind CSS v3.
2. **Install animation/3D libraries:**
   - `framer-motion` — for React animations and page transitions
   - `@react-three/fiber` + `@react-three/drei` — for 3D scenes
   - `gsap` — for scroll-triggered and timeline animations
   - `lottie-react` — for Lottie JSON animations
   - `react-tooltip` — for correction tooltips
   - `react-hot-toast` — for toast notifications
   - `react-copy-to-clipboard` — copy corrected text
   - `axios` — HTTP client

3. **Set up Tailwind config** (`tailwind.config.js`) with the exact color tokens from the Design System above. Map them as:
   ```js
   colors: {
     primary: { DEFAULT: '#2563EB', dark: '#1D4ED8', light: '#DBEAFE' },
     correct: { DEFAULT: '#10B981', dark: '#059669' },
     error:   { DEFAULT: '#EF4444', light: '#FEE2E2' },
     bg:      { base: '#F8FAFC', card: '#FFFFFF', code: '#F1F5F9' },
     slate:   { ... } // full slate scale
   }
   ```

4. **Import Google Fonts** in `index.html`: `Plus Jakarta Sans` (400, 500, 600, 700) + `JetBrains Mono`. Apply via Tailwind.

5. **Global CSS** (`src/styles/globals.css`):
   - Smooth scrolling (`scroll-behavior: smooth`)
   - Custom scrollbar (thin, blue-tinted)
   - Text selection color (blue bg, white text)
   - Page transition keyframes (fade-in, slide-up, scale-in)
   - CSS custom properties for all Design System tokens
   - Backdrop blur utility classes
   - A subtle animated gradient background class (for hero sections)

6. **Router setup:** Install `react-router-dom` v6. Create routes for: `/` (Home), `/app` (Corrector), `/about` (About), `/how-it-works`, `/features`, `/creator`.

7. **Theme Context** (`src/context/ThemeContext.jsx`): Implement light/dark mode toggle with `localStorage` persistence. Dark mode should invert backgrounds while keeping blue/green/red accents vivid.

### Acceptance Criteria:
- `npm run dev` starts without errors
- Tailwind colors work in any component
- Routing navigates between placeholder pages
- Light/dark toggle works and persists

---

## 🔵 SUB-PROMPT 2 — Stunning Landing Page (Home.jsx)

**Goal:** Build a world-class, animated, scroll-driven landing page that showcases the product and wows the visitor.

### Sections to build (in order, top to bottom):

#### 2.1 — Hero Section
- **Full viewport height** (`min-h-screen`), centered content.
- **Animated gradient mesh background:** Three overlapping radial gradients in blue (#2563EB at 15% opacity), green (#10B981 at 10% opacity), and slate. These gradients should **slowly animate** (rotate/shift) using CSS keyframes — a living, breathing background.
- **Floating 3D Word Bubbles:** Using `@react-three/fiber`, render 5–8 floating text-mesh spheres labeled with words like "grammar", "spelling", "correct", "clarity". They should slowly rotate and bob in 3D space. Place this behind the hero text using `position: absolute` with a z-index.
- **Headline:** `"Write Without Limits."` — Large (~80–96px), semi-bold, text color `#1E293B`. Use a typewriter animation (character by character) on page load via Framer Motion. Second line: `"AI-powered spelling & grammar that just works."` — smaller, `#64748B`.
- **CTA Buttons:**
  - `"Try It Free →"` — filled, `#2563EB` background, white text, hover scale + shadow effect.
  - `"See How It Works"` — outlined, border `#2563EB`, text `#2563EB`, hover fill.
  - Buttons entrance: slide-up + fade with 0.2s delay using Framer Motion.
- **Social proof strip** (below CTA): small logos/icons for "Spelling Engine", "Grammar AI", "NLP Powered", styled as trust badges.
- **Scroll indicator:** animated chevron-down pulsing at the bottom of the hero.

#### 2.2 — Feature Highlights (Horizontal Scroll Section)
- **Implement a horizontal scroll strip** using CSS `overflow-x: scroll` with `scroll-snap-type: x mandatory` or a GSAP ScrollTrigger horizontal pin.
- Show **4 feature cards** in a horizontal row that the user scrolls through:
  1. 🔴 **Real-time Error Detection** — "Misspellings highlighted instantly as you type."
  2. 🟢 **AI Grammar Correction** — "Full sentence restructuring powered by NLP."
  3. 💡 **Smart Explanations** — "Click any correction to learn why it was changed."
  4. 📋 **One-Click Copy** — "Grab your corrected text and go."
- Each card: white background, 2px `#E2E8F0` border, 16px radius, shadow-md. Icon (SVG or emoji), bold title, body text, colored accent strip at bottom (blue/green/red based on feature).
- Cards should have a **3D tilt effect on hover** (CSS `perspective` + `rotateX/Y` via JavaScript `mousemove`).

#### 2.3 — How It Works (3-Step Visual Flow)
- Three steps with large numbered circles: `01`, `02`, `03`.
- Use a **diagonal layout** — each step is offset left/right, connected by a dashed animated SVG line.
- Step text animates in as user scrolls (Framer Motion `useInView`).
- Steps:
  1. **Type your text** — "Paste or write any sentence in the correction box."
  2. **AI analyzes it** — "Our NLP engine detects spelling and grammar issues in real time."
  3. **Review & copy** — "See highlighted corrections and explanations. Copy with one click."

#### 2.4 — Live Demo Preview (Teaser)
- A **mock browser window** (with fake traffic-light buttons) showing the corrector in action as a static or animated GIF-like CSS animation.
- Below it, a `"Try it yourself →"` button linking to `/app`.

#### 2.5 — Stats Bar
- Three animated counters (count up on scroll into view):
  - `99.2%` — Grammar accuracy
  - `< 500ms` — Average correction time
  - `50+` — Error types detected
- Horizontal bar, dark blue background (`#1E3A8A`), white numbers, white secondary text.

#### 2.6 — Footer (first occurrence)
- Logo + tagline left.
- Nav links center.
- Social icons right (Portfolio, LinkedIn, GitHub — linked to Farman Ullah's profiles).
- Bottom bar: `© 2025 WordWise Correctify · Built by Farman Ullah Ansari`.

### Animation Requirements for Home Page:
- Page entrance: hero fades in over 0.8s.
- On scroll, each section slides up from 30px below using Framer Motion `whileInView`.
- Staggered children animations (cards, steps) with 0.1s delay between each.
- Smooth parallax on hero gradient background as user scrolls (use GSAP ScrollTrigger or simple `window.scrollY` listener).
- Counter numbers count up (0 → final value) over 1.5s when scrolled into view.

---

## 🔵 SUB-PROMPT 3 — App Shell: Navigation & Layout

**Goal:** Build the persistent navigation bar, app shell layout, and page transition system.

### 3.1 — Navbar
- **Sticky top**, blurred glass effect (`backdrop-blur-md bg-white/80 dark:bg-slate-900/80`), subtle bottom border.
- **Logo (left):** Animated SVG logo for "WordWise Correctify" — a stylized `W` with a green checkmark integrated, followed by text "WordWise" in bold blue and "Correctify" in normal weight. Logo should have a subtle pulse/glow animation on hover.
- **Nav links (center):** Home · Features · How It Works · About · Creator
  - Hover: underline slides in from left (CSS `::after` pseudo-element animation).
  - Active page: blue underline, slightly bolder text.
- **Right actions:**
  - `"Try It Free"` CTA button (filled blue, small).
  - 🌙/☀️ dark mode toggle with smooth icon rotation transition.
- **Mobile hamburger menu:** Slides in from right with a smooth overlay. Full-screen mobile nav with large links.
- Navbar entrance: slide down from above on page load with Framer Motion.

### 3.2 — Page Transitions
- Wrap all routes in a Framer Motion `AnimatePresence`.
- Each page: `initial: { opacity: 0, y: 20 }` → `animate: { opacity: 1, y: 0 }` → `exit: { opacity: 0, y: -20 }`.
- Transition duration: 0.35s ease-in-out.

### 3.3 — Global Footer
- Two-row footer:
  - Row 1: Logo, tagline, and links to all pages.
  - Row 2: Social links (Portfolio · LinkedIn · GitHub) with hover color transitions.
  - Each social link shows the full URL on hover via a tooltip.
- Small animated wave SVG at the very top of the footer (blue wave divider).
- Background: `#1E293B` (dark slate), text: `#94A3B8`.

### 3.4 — Scroll Progress Bar
- A 2px tall blue progress bar at the very top of the viewport that fills as the user scrolls down the page.
- Use `window.scrollY` / `document.body.scrollHeight` to calculate percentage.

### 3.5 — Custom Cursor (Desktop only)
- Replace the default cursor with a small circular dot (`12px`, `#2563EB`, 80% opacity).
- A larger ring (`30px`, blue, 30% opacity) follows with a `0.1s` lag (use `lerp` interpolation in a `useEffect` with `requestAnimationFrame`).
- On hover over buttons/links: dot scales up to `20px` and changes to green (`#10B981`).

---

## 🔵 SUB-PROMPT 4 — Core Corrector Chat Interface (Corrector.jsx)

**Goal:** Build the main product page — the AI corrector chat interface. This is the heart of the app.

### 4.1 — Page Layout
- Two-panel layout on desktop:
  - **Left panel (35% width):** Preferences, history sidebar, example prompts.
  - **Right panel (65% width):** Main chat area + input zone.
- On mobile/tablet: single column, left panel collapses to a slide-out drawer.
- Background: `#F8FAFC`. Both panels are `#FFFFFF` cards with `shadow-md` and `border-radius: 16px`.

### 4.2 — Welcome State (empty chat)
- When no messages yet, show a centered welcome card:
  - Lottie animation (or CSS animation): a pencil writing → corrections appearing → green checkmark.
  - Heading: `"Hi! I'm WordWise Correctify 👋"`.
  - Subtext: `"Type a sentence below and I'll fix spelling and grammar errors instantly."`.
  - **Three example prompt chips** (clickable, they auto-fill the input):
    1. `"She go to the store yesterday and buyed milk."`
    2. `"I has been working hear for too years."`
    3. `"Their going to the park tommorrow with there dog."`
  - Chips: pill-shaped, `bg-primary-light` border, blue text, hover scale + shadow.

### 4.3 — Chat Message Bubbles
Each exchange consists of two bubbles:

**User bubble (right-aligned):**
- Light gray background (`#F1F5F9`), rounded corners, max-width 75%.
- Shows the raw original sentence the user submitted.
- Misspelled/grammar-error words are underlined with a red dotted underline (`text-decoration: underline dotted #EF4444`).
- Timestamp (small, `#94A3B8`) bottom-right.

**Bot bubble (left-aligned):**
- White card with `1px solid #E2E8F0` border, `shadow-sm`, max-width 80%.
- Header: small WordWise logo + `"WordWise Correctify"` label + green `"Corrected ✓"` badge.
- **Corrected sentence:** Render the text with **green-highlighted spans** (`bg-[#D1FAE5] text-[#065F46] rounded px-0.5`) around every changed word/phrase.
- Each green-highlighted word has a small `ℹ️` info icon after it. **On hover/click, a tooltip** pops up showing the explanation (e.g., `"Past tense needed for 'yesterday'"`).
- Below the corrected text:
  - A `"📋 Copy corrected text"` button (outlined, small).
  - A `"🔁 Compare"` toggle that shows/hides a side-by-side diff (original vs corrected).
  - A `"Corrections: N changes"` count badge.

**Loading bubble (while Python processes):**
- Same bot bubble card, but content replaced by:
  - Three animated dots bouncing (CSS keyframe animation, blue dots).
  - Text: `"Analyzing your text…"` (fades in/out subtly).

**Bubble entrance animations:**
- User bubble: slides in from the right.
- Bot bubble: slides in from the left.
- Use Framer Motion `initial: { opacity: 0, x: ±30 }` → `animate: { opacity: 1, x: 0 }`.

### 4.4 — Input Area (bottom of right panel)
- Fixed to the bottom of the right panel.
- A `<textarea>` (auto-resizes as user types, max 5 rows, then scroll):
  - Placeholder: `"Type or paste your text here…"`
  - As user types, debounce 500ms then hit the Node/Python API for real-time error detection.
  - Words identified as errors get a **red dotted underline** rendered via a custom overlay technique (absolute positioned `<span>` layer or `contenteditable` div with styled spans).
- **Toolbar below textarea:**
  - `"✨ Correct"` button (filled blue, disabled/gray when textarea empty, glows green when errors detected).
  - Character counter: `"0 / 500"` — turns red at 450, shows warning toast at 500.
  - `Ctrl+Enter` keyboard shortcut label (small, muted).
  - **Toggle switches:**
    - `"Auto-detect"` — toggle red underlines on/off.
    - `"Auto-correct"` — if on, corrects 1s after typing stops without clicking button.
- When character limit (500) is hit: shake animation on input border + red toast notification.

### 4.5 — Left Sidebar Panel
- **Preferences section:**
  - Auto-detect toggle.
  - Auto-correct toggle.
  - "Highlight only" mode (show underlines but no bot bubble, just inline correction).
  - Language selector (English US / English UK).
- **Correction History:**
  - List of previous corrections in this session (last 10).
  - Each item: truncated original text, timestamp, "N changes" badge.
  - Click to re-load that correction into the chat view.
  - `"Clear History"` button with a confirmation modal.
- **Tips card:** Rotating tips about grammar/spelling, one new tip per session load.

---

## 🔵 SUB-PROMPT 5 — Backend: Node.js/Express API

**Goal:** Build the full Node.js + Express backend that bridges the React frontend to the Python NLP service and MongoDB.

### What to build:

#### 5.1 — Express Server (`server/server.js`)
```js
// Minimal shape — agent must implement fully
const express = require('express');
const cors    = require('cors');
const app     = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
// Routes:
app.use('/api/correct',  require('./routes/correction'));
app.use('/api/history',  require('./routes/history'));
app.listen(5000);
```

#### 5.2 — `/api/correct` Route
- `POST /api/correct` — accepts `{ text: string, sessionId: string }`.
- Validates: `text` must be non-empty string, max 2000 characters.
- Forwards the request to Python microservice at `POST http://localhost:8000/nlp/correct` using `axios`.
- On success: saves result to MongoDB `corrections` collection (text, result, sessionId, timestamp).
- Returns the Python response JSON to the client.
- Error handling: if Python service is down, return `503 Service Unavailable` with message `"NLP service unavailable. Please try again."`.
- Response shape:
```json
{
  "original": "She go to the store yesterday.",
  "corrected": "She went to the store yesterday.",
  "changes": [
    {
      "original": "go",
      "corrected": "went",
      "start_index": 4,
      "end_index": 6,
      "explanation": "Past tense needed because of 'yesterday'."
    }
  ],
  "correction_count": 1,
  "session_id": "abc123"
}
```

#### 5.3 — `/api/history` Route
- `GET /api/history/:sessionId` — returns last 20 corrections for a session, sorted by newest first.
- `DELETE /api/history/:sessionId` — deletes all history for a session.

#### 5.4 — MongoDB Model (`server/models/Session.js`)
```js
{
  sessionId:    String,   // UUID, generated client-side
  originalText: String,
  correctedText: String,
  changes:       Array,
  correctionCount: Number,
  createdAt:    Date
}
```
Connect via `MONGODB_URI` environment variable (`.env`). Use `mongoose`.

#### 5.5 — Environment Variables (`.env` template)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wordwise
NLP_SERVICE_URL=http://localhost:8000
```

---

## 🔵 SUB-PROMPT 6 — Python NLP Microservice (Flask)

**Goal:** Build the Flask NLP microservice that performs actual spelling and grammar correction.

### What to build (`nlp-service/app.py`):

#### 6.1 — Flask Setup
```python
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
```

#### 6.2 — Libraries to Install (`requirements.txt`)
```
flask
flask-cors
language-tool-python
pyspellchecker
```

#### 6.3 — `/nlp/correct` Endpoint
```python
@app.post('/nlp/correct')
def correct():
    data = request.json
    text = data.get('text', '')
    # 1. Run language_tool_python for grammar
    # 2. Run pyspellchecker for spelling
    # 3. Merge results, deduplicate, sort by position
    # 4. Build changes array with explanations
    # Return JSON matching the shape defined in SUB-PROMPT 5.2
```

#### 6.4 — Correction Logic (`nlp-service/corrector.py`)
- Initialize `language_tool_python.LanguageTool('en-US')`.
- For each match from LanguageTool:
  - Extract `offset`, `errorLength`, `replacements[0]`, `message` (explanation).
  - Build a change object: `{ original, corrected, start_index, end_index, explanation }`.
- Apply corrections from **end to start** (to preserve index accuracy as text length changes).
- Return the fully corrected string + changes array.

#### 6.5 — `/nlp/health` Endpoint
- `GET /nlp/health` → `{ "status": "ok", "engine": "language_tool_python" }`
- Node.js backend should ping this on startup.

#### 6.6 — Performance
- Initialize the LanguageTool instance **once** at module load (not per-request) — this is crucial for performance since LanguageTool startup is slow.
- Add basic in-memory caching: if the exact same text was corrected in the last 60 seconds, return cached result.

---

## 🔵 SUB-PROMPT 7 — Animations, 3D Effects & Micro-Interactions

**Goal:** Layer in all the advanced animations and interactions across every page. This is what makes the site feel extraordinary.

### 7.1 — Global Mouse Animation (Custom Cursor)
*(Described in Sub-Prompt 3.5 — verify it exists, then enhance:)*
- Add a **magnetic effect** to all buttons: when the cursor comes within 80px of a button, the button gently shifts `(x, y)` toward the cursor by 20% of the distance. Uses `mousemove` + `useRef` + `requestAnimationFrame`.

### 7.2 — Hero 3D Floating Words
*(Described in Sub-Prompt 2.1 — verify it exists, then enhance:)*
- Add **physics simulation**: floating word spheres should have gentle collision avoidance. Use `@react-three/rapier` or a simple boids-like algorithm.
- Words should cast soft shadows onto each other.
- On hover, a word sphere scales up 1.3× and its text label appears.

### 7.3 — Particle Background (Corrector Page)
- On the `/app` (Corrector) page, render a subtle **particle canvas** in the background using vanilla Canvas API (no extra library).
- 80–120 tiny dots (`#2563EB` at 20% opacity), drifting slowly.
- Lines drawn between dots within 120px distance.
- Mouse position influences dot drift direction (repel within 100px radius).

### 7.4 — Scroll-Triggered Section Reveals (All Pages)
- Every section that enters the viewport for the first time should animate in using Framer Motion `whileInView`:
  - Text: fade up (`y: 30 → 0`, `opacity: 0 → 1`).
  - Cards in a row: staggered, each 0.1s after the previous.
  - Stats numbers: count up.
  - Images/illustrations: scale in (`scale: 0.9 → 1`).

### 7.5 — 3D Tilt Cards (Features & How It Works sections)
- Any card with the class `.tilt-card` should respond to mouse movement:
  - On `mouseenter`: begin tracking.
  - On `mousemove`: calculate cursor position relative to card center. Apply `transform: perspective(800px) rotateX(Ydeg) rotateY(Xdeg)` in real-time.
  - On `mouseleave`: spring back to flat (0,0) over 0.3s using CSS transition.
  - Max tilt: ±10 degrees.
  - A subtle `radial-gradient` light reflection moves with the cursor (the "gloss" effect).

### 7.6 — Chat Bubble Physics
- When a new bot bubble appears in the corrector, it doesn't just fade in — it **bounces in** from slightly below using Framer Motion spring: `type: "spring", stiffness: 260, damping: 20`.
- The loading dots bounce with a staggered spring animation.

### 7.7 — Button Micro-Interactions
- All primary buttons:
  - Hover: slight scale up (1.04×), shadow increases, background lightens slightly.
  - Click/tap: scale down briefly (0.96×) then spring back.
  - Success state (after correction): button briefly turns green with a checkmark icon.
  - Use Framer Motion `whileTap` and `whileHover`.

### 7.8 — Smooth Page Transitions
*(Described in Sub-Prompt 3.2 — verify and enhance:)*
- Add a **full-screen wipe transition**: before navigating to a new page, a blue `#2563EB` panel sweeps across from left to right, then the new page slides in beneath it, then the panel sweeps away to the right.
- Implemented via Framer Motion `AnimatePresence` with a shared layout key.

### 7.9 — Loading Screen (App Initial Load)
- On the very first load of the site, show a **3-second loading splash screen**:
  - Dark background (`#1E293B`).
  - Animated logo: the `W` letterform draws itself via SVG `stroke-dashoffset` animation.
  - Below logo: `"Initializing AI Engine…"` with a progress bar filling from 0% to 100% over 2.5s.
  - Screen sweeps away (slide up) to reveal the landing page.

### 7.10 — Scroll Smoother (Lenis)
- Install `@studio-freight/lenis` for buttery-smooth scroll inertia across the entire site.
- Initialize Lenis in `main.jsx` and connect to GSAP ScrollTrigger if used.

### 7.11 — Hover Word Explosion (Hero Headline)
- On the hero headline (`"Write Without Limits."`), each word is wrapped in a `<span>`.
- On hover of any word: it scales up 1.1× and shifts color to `#2563EB`, while adjacent words scatter slightly away (translateX/Y by ±5px) then spring back.

---

## 🔵 SUB-PROMPT 8 — Extra Pages

**Goal:** Build the additional informational/brand pages of the site.

---

### 8.1 — Features Page (`/features`)

**Full showcase of all product capabilities.**

- **Hero:** `"Everything you need to write perfectly."` + animated SVG illustration of a document with corrections appearing.
- **Feature Grid (3 columns):** 9 feature cards, each with:
  - Large icon (SVG, colored in blue/green/red based on feature type).
  - Feature name (bold).
  - Description (2–3 sentences).
  - Cards have 3D tilt hover effect (from Sub-Prompt 7.5).
  - Features to include:
    1. 🔴 Real-time spelling detection
    2. 🟢 Grammar & tense correction
    3. 💡 AI-powered explanations per correction
    4. 📋 One-click copy of corrected text
    5. 🔁 Side-by-side original vs corrected diff view
    6. ⚡ Sub-500ms correction speed
    7. 🌙 Dark mode support
    8. 📱 Fully mobile responsive
    9. 🔒 Session-based history (no account needed)
- **Horizontal scroll comparison:** A horizontal scrolling strip showing 3 "before/after" sentence pairs with animated underlines. Use CSS scroll snap.
- **CTA banner** at bottom: `"Ready to write better?"` with button to `/app`.

---

### 8.2 — How It Works Page (`/how-it-works`)

**Technical + visual explanation of the product.**

- **Hero:** `"Smart correction, explained."` with animated diagram of the data flow.
- **Section 1 — The User Experience:** Step-by-step UI walkthrough with annotated screenshots (use mock/illustrated browser windows, not real screenshots). Each step animates in on scroll.
- **Section 2 — Under the Hood (Technical):** Animated flow diagram (SVG or React-rendered) showing:
  - React Frontend → Node.js API → Python Flask NLP → MongoDB → Response back.
  - Each arrow animates (draws itself) as the user scrolls through.
  - Short description for each layer: what it does and why.
- **Section 3 — NLP Engine:** Explain what LanguageTool and PySpellChecker do. Use an interactive demo card: type a broken sentence in a mini-input, and a simulated (hardcoded) correction appears with color highlights.
- **Section 4 — Why It's Fast:** Explain debouncing, caching, and single LanguageTool instance. Use a timeline/chart showing latency breakdown.
- **CTA** at bottom → `/app`.

---

### 8.3 — About Page (`/about`)

**"Why I created WordWise Correctify."**

- **Hero:** Full-width, dark background (`#1E293B`). Headline: `"I built this because writing matters."` Large, white, impactful.
- **Origin Story section:** A personal narrative from Farman Ullah about the frustration of inconsistent spelling tools and the vision for an AI-first solution. 3–4 paragraphs, comfortable reading width (65ch max).
- **The Problem** (illustrated card): `"Most spell checkers just underline errors. They don't explain them or suggest context-aware fixes."` Visual: a mock "bad spell-check" UI crossed out in red vs. the WordWise approach.
- **The Solution** (illustrated card): Show WordWise approach with green highlights.
- **The Mission statement block:** Large quote typography: `"WordWise Correctify exists to make clear, confident writing accessible to everyone, regardless of their first language."` — centered, styled as a pull quote.
- **Values section (3 cards):**
  - ⚡ Speed — corrections in milliseconds, not seconds.
  - 🎓 Education — every fix comes with an explanation.
  - 🌍 Accessibility — works for ESL speakers and native writers alike.
- **CTA → `/creator`** (Meet the person behind it).

---

### 8.4 — Creator Page (`/creator`)

**About Farman Ullah Ansari — the person who built this.**

- **Hero:** Split layout — left: large animated avatar placeholder (geometric/abstract illustration, not a photo), right: name + title + one-liner.
  - Name: `"Farman Ullah Ansari"` — large, bold.
  - Title: `"Full-Stack Developer · AI Enthusiast · Builder"`.
  - One-liner: `"I build tools that make people's lives a little easier — one line of code at a time."`.
- **Links section (prominent, animated):**
  - Three animated cards (hover: lifts up with shadow + color accent):
    - 🌐 **Portfolio** → `https://farmanullah1.github.io/My-Portfolio` — description: "See all my projects"
    - 💼 **LinkedIn** → `https://www.linkedin.com/in/farmanullah-ansari/` — description: "Connect professionally"
    - 🐙 **GitHub** → `https://github.com/farmanullah1` — description: "Explore my code"
  - Each card has the platform's logo color as an accent, animated border on hover.
- **Skills/Tech section:** Animated skill pills (React, Node.js, Python, MongoDB, AI/NLP, Tailwind, GSAP, Three.js). Each pill floats in with a slight delay.
- **What I'm building next:** Two teaser cards (blurred/locked) showing upcoming features of WordWise or other projects.
- **Contact CTA:** `"Have a project? Let's talk."` → links to LinkedIn.

---

## 🔵 SUB-PROMPT 9 — Dark Mode Implementation

**Goal:** Implement a polished, complete dark mode across every page and component.

### Rules:
- Use Tailwind's `dark:` variant throughout. Toggle by adding/removing the `dark` class on `<html>`.
- Persist preference in `localStorage` and respect `prefers-color-scheme` on first load.

### Dark Mode Color Mappings:
| Light | Dark |
|-------|------|
| `#F8FAFC` (bg-base) | `#0F172A` |
| `#FFFFFF` (bg-card) | `#1E293B` |
| `#1E293B` (text-primary) | `#F1F5F9` |
| `#64748B` (text-secondary) | `#94A3B8` |
| `#E2E8F0` (border) | `#334155` |
| `#DBEAFE` (primary-light) | `#1E3A8A` |
| Particle canvas: 20% opacity | 15% opacity |

### Animated Toggle:
- The navbar toggle button: animated sun/moon icon swap using Framer Motion `layoutId` shared animation or CSS rotate/scale transition.
- Page background transitions smoothly (CSS `transition: background-color 0.3s`).

### Check all components:
- Chat bubbles
- Input area
- Sidebar
- All page sections
- Cards
- Footer
- Loading screen

---

## 🔵 SUB-PROMPT 10 — Polish, Responsiveness & Accessibility

**Goal:** Final quality pass — mobile responsiveness, accessibility, performance, and extra polish.

### 10.1 — Mobile Responsiveness
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).
- Corrector page: stacks to single column below `md`. Sidebar becomes a bottom sheet drawer.
- Navbar: hamburger below `md`. Full-screen menu overlay.
- Hero headline: scales from 80px (desktop) to 36px (mobile). CTA buttons stack vertically.
- Cards: 3-column → 2-column → 1-column.
- Feature horizontal scroll: works via touch swipe on mobile (ensure `-webkit-overflow-scrolling: touch`).
- Touch targets: all buttons minimum 44×44px.

### 10.2 — Accessibility
- All images have `alt` text.
- All interactive elements are keyboard-navigable (visible focus rings in blue).
- Color contrast ratios: all text passes WCAG AA (4.5:1 for body text).
- Tooltips are ARIA-described (`aria-describedby`).
- Screen reader skip link: `"Skip to main content"` hidden until focused.
- Form inputs have associated `<label>` elements.

### 10.3 — Performance
- Lazy-load all pages with `React.lazy` + `Suspense`.
- 3D/Three.js components: load only on non-mobile (use `window.matchMedia` check).
- Images: use `loading="lazy"` and ensure WebP format where possible.
- Debounce all scroll and resize listeners.
- Memoize heavy components with `React.memo`.

### 10.4 — Toast Notifications (`react-hot-toast`)
- ✅ `"Text corrected successfully! N changes made."` — green
- ⚠️ `"Character limit reached (500)."` — yellow/orange
- ❌ `"NLP service unavailable. Please try again."` — red
- 📋 `"Corrected text copied to clipboard!"` — blue

### 10.5 — Keyboard Shortcuts
- `Ctrl+Enter`: Submit for correction.
- `Escape`: Close any open modal/tooltip.
- `Ctrl+/`: Toggle sidebar on the Corrector page.
- Show a keyboard shortcut cheat-sheet on `?` key press — a small modal listing all shortcuts.

### 10.6 — Error States
- If Python NLP service is offline: show a friendly error card in the chat: `"⚠️ AI engine is warming up. Please retry in a moment."` with a `"Retry"` button.
- Empty input submitted: gently shake the textarea border + small inline message `"Please type something first."`.
- Network error: persistent banner at top: `"Connection issue detected. Check your internet."`.

### 10.7 — SEO & Meta Tags (`index.html`)
```html
<title>WordWise Correctify — AI Spelling & Grammar Corrector</title>
<meta name="description" content="Fix spelling and grammar errors instantly with AI-powered corrections and explanations. Built by Farman Ullah Ansari." />
<meta property="og:title" content="WordWise Correctify" />
<meta property="og:description" content="AI-powered spelling & grammar corrector. Real-time errors, smart explanations." />
<meta name="theme-color" content="#2563EB" />
```

---

## 🔵 SUB-PROMPT 11 — Creator Links Integration (Everywhere)

**Goal:** Ensure Farman Ullah's personal links appear tastefully throughout the site.

### Where to place links:

| Location | Implementation |
|----------|----------------|
| **Footer (all pages)** | Social icon row with Portfolio, LinkedIn, GitHub icons. Hover: tooltip with full URL. |
| **Creator Page** | Prominent animated cards (see Sub-Prompt 8.4). |
| **Navbar (desktop)** | A small `"By Farman ↗"` link in the far right, styled as muted text with hover color. |
| **About Page bottom** | `"Built by Farman Ullah Ansari"` as a clickable link. |
| **README.md** | Full credits with all three links. |
| **Corrector Page sidebar bottom** | Small creator credit strip: `"Made with ❤️ by Farman"` as a link to `/creator`. |

### Link Targets:
- Portfolio: `https://farmanullah1.github.io/My-Portfolio`
- LinkedIn: `https://www.linkedin.com/in/farmanullah-ansari/`
- GitHub: `https://github.com/farmanullah1`

All links must open in a new tab (`target="_blank" rel="noopener noreferrer"`).

---

## 🔵 SUB-PROMPT 12 — Final Integration, Testing & README

**Goal:** Wire everything together, test end-to-end, and write the project README.

### 12.1 — End-to-End Test Flow
1. Start Python Flask service: `cd nlp-service && python app.py`
2. Start Node server: `cd server && npm start`
3. Start React frontend: `cd client && npm run dev`
4. Open `http://localhost:5173`.
5. Navigate to `/app`.
6. Type `"She go to the store yesterday and buyed milk."`.
7. Click `"✨ Correct"`.
8. Verify:
   - Bot bubble appears with corrected text.
   - `"went"` and `"bought"` are highlighted in green.
   - Hover on `"went"` shows tooltip `"Past tense needed for 'yesterday'."`.
   - `"Copy"` button copies to clipboard.
   - Session correction appears in history sidebar.

### 12.2 — README.md
Create a `README.md` at root with:
- Project title + badge (status: live).
- One-paragraph description.
- Screenshot / GIF (placeholder note).
- Features list.
- Tech stack.
- **Setup instructions** (Python service, Node server, React client).
- Environment variables table.
- Project structure tree.
- **Credits:** `Built by Farman Ullah Ansari` with all three links.
- License: MIT.

### 12.3 — Final Checklist (Agent must verify all before marking complete)
- [ ] All 6 routes render without errors.
- [ ] Correction flow works end-to-end.
- [ ] Dark mode works on all pages.
- [ ] Mobile layout works at 375px width.
- [ ] All animations play correctly.
- [ ] All creator links are present and correct.
- [ ] No console errors in production build.
- [ ] `npm run build` succeeds.

---

## 📎 Quick Reference

### API Shapes

**POST `/api/correct` → Request:**
```json
{ "text": "She go to the store.", "sessionId": "uuid-here" }
```

**POST `/api/correct` → Response:**
```json
{
  "original": "She go to the store.",
  "corrected": "She went to the store.",
  "changes": [
    {
      "original": "go",
      "corrected": "went",
      "start_index": 4,
      "end_index": 6,
      "explanation": "Past tense required here."
    }
  ],
  "correction_count": 1,
  "session_id": "uuid-here"
}
```

### Key Library Versions (Recommended)
```json
{
  "react": "^18.2.0",
  "framer-motion": "^11.0.0",
  "@react-three/fiber": "^8.0.0",
  "@react-three/drei": "^9.0.0",
  "gsap": "^3.12.0",
  "lottie-react": "^2.4.0",
  "@studio-freight/lenis": "^1.0.0",
  "react-router-dom": "^6.0.0",
  "react-hot-toast": "^2.4.0",
  "axios": "^1.6.0",
  "tailwindcss": "^3.4.0"
}
```

---

*End of Build Specification — WordWise Correctify v1.0*
*Specification authored for Farman Ullah Ansari*
*GitHub: https://github.com/farmanullah1 | LinkedIn: https://www.linkedin.com/in/farmanullah-ansari/ | Portfolio: https://farmanullah1.github.io/My-Portfolio*

# Wanderly — Premium Travel Discovery Platform

> **"Explore the World. Create Unforgettable Memories."**

WANDERLY is a production-quality, luxury travel web application created for the **Design Esthetics / TAP Academy Front-End Developer Assessment**.

It unifies modern travel platform aesthetics with real-time weather telemetry, Pexels photographic discovery, browser location awareness, and Google Gemini AI itinerary generation.

---

## 🌟 Overview & Key Features

- **Luxury Travel Platform Aesthetics**: Deep Navy (`#0F172A`), Ocean Blue (`#0284C7`), Sky Blue (`#38BDF8`), Off-White (`#F8FAFC`), and Sunset Orange (`#F97316`) accent design system.
- **Overlapping Booking Search Widget**: Professional travel booking widget card overlapping the hero section (Destination, Check-in, Check-out, Travelers selector, Search button).
- **Cinematic Looping Video Hero**: Ambient background video with dark gradient overlay mask for crisp text readability.
- **Travel Categories Showcase**: 8 travel categories (Beaches, Mountains, Adventure, Cities, Wildlife, Luxury, Road Trips, Cultural) with hover zoom and destination count badges.
- **Asymmetric Featured Spotlight**: Asymmetric showcase with large spotlight card, star ratings (`★★★★★`), price tags (`$1,450 / person`), and image text overlays.
- **Dynamic Destination Explorer**: Search bar with real-time query matching ("Par" -> Paris, "Japan" -> Tokyo) and regional filter tabs (Asia, Europe, Americas, Africa, Oceania).
- **Dedicated Destination Pages**: Comprehensive view for 10 global destinations featuring hero banners, metadata grid, and famous places galleries.
- **Real-Time Live Weather**: Weather widget fetching current temperature, condition, feels-like, humidity, and wind speed via OpenWeather API with Open-Meteo live fallback.
- **Location Awareness**: Browser Geolocation API ("Use my location") + Geocoding city search (e.g. searching for "Bengaluru", "Tokyo", "Paris", "London").
- **Wanderly AI Travel Concierge**: Interactive chatbot powered by Google Gemini API pre-loaded with destination context and quick starter question chips.
- **Structured Day-by-Day Itinerary Generator**: Custom duration (1-7 days) and travel style selector (Relaxed, Balanced, Adventure, Culture, Food). Gemini API returns structured JSON rendered into an interactive vertical timeline.
- **Why Choose Us & Special Offers**: Benefit cards (Explore Everywhere, Easy Trip Planning, Best Options, Safe & Reliable) and discount package cards ("20% OFF").
- **Testimonials & Multi-Column Footer**: Reviews with traveler avatars, star ratings, and 4-column footer (TRAVEL, SUPPORT, LEGAL, SOCIAL).

---

## 🎨 Design System

### Color Palette
- **Primary Navy / Text**: `#0F172A` / `#0F4C81`
- **Primary Action (Ocean Blue)**: `#0284C7` / `linear-gradient(135deg, #0F4C81 0%, #1FA2FF 100%)`
- **Secondary Accent (Sky Blue)**: `#38BDF8` / `#E0F2FE`
- **Sunset Orange Accent**: `#F97316` / `#FB923C`
- **Backgrounds**: Pure White `#FFFFFF`, Slate Off-White `#F8FAFC`, Light Blue-Gray `#F0F4F8`

### Typography & Spacing
- **Headings**: *Playfair Display* for serif titles.
- **UI & Body**: *Plus Jakarta Sans* for clean readability.
- **Corner Radii**: Uniform 16px–24px card corner radii with soft elevation shadows.

---

## 🌐 APIs Integrated

1. **OpenWeather API** (`VITE_OPENWEATHER_API_KEY`): Real-time live temperature, weather icons, humidity, and wind speed by coordinates. (Open-Meteo fallback included).
2. **Pexels API** (`VITE_PEXELS_API_KEY`): High-resolution dynamic photography search by destination keywords. (Curated Unsplash HD fallback included).
3. **Google Gemini API** (`VITE_GEMINI_API_KEY`): Conversational travel assistant & structured JSON itinerary engine. (Smart local AI generator fallback included).
4. **Browser Geolocation API**: `navigator.geolocation` for user location telemetry with friendly permission denied handling.

---

## 📸 Screenshots

- **Hero & Overlapping Search Widget**: Full-width video background with travel search card.
- **Categories & Popular Destinations**: Category cards and filter tabs.
- **Destination Details & Live Weather**: Detailed overview, weather telemetry, and famous places grid.
- **Day-by-Day AI Itinerary**: Interactive timeline with hour slots and day icons.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Styling**: Vanilla Modern CSS & CSS Custom Properties

---

## 🚀 How to Run the Project Locally

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/your-username/wanderly-travel.git
cd wanderly-travel
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your API keys (optional; intelligent fallbacks work automatically if keys are left blank):
```env
VITE_OPENWEATHER_API_KEY=your_openweather_key
VITE_PEXELS_API_KEY=your_pexels_key
VITE_GEMINI_API_KEY=your_gemini_key
```

### 3. Launch Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📦 Deployment (Vercel / Netlify)

1. Push your repository to GitHub.
2. Log into **Vercel** or **Netlify** and click **Add New Project**.
3. Select your GitHub repository.
4. Select Framework Preset: **Vite**.
5. Set Environment Variables (`VITE_OPENWEATHER_API_KEY`, `VITE_PEXELS_API_KEY`, `VITE_GEMINI_API_KEY`).
6. Click **Deploy**.

---

## ♿ Accessibility & Performance

- **Semantic HTML5**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- **Keyboard Navigation**: Focus rings, skip navigation, full keyboard modal controls.
- **Image Optimization**: `loading="lazy"` on all grid images and explicit `alt` text.
- **Reduced Motion**: Respects system `prefers-reduced-motion` settings.

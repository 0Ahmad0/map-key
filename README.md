<div align="center">
  <br />
  <img src="https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/RTL%2FLTR-Enabled-00A859?style=for-the-badge&logoColor=white" alt="RTL/LTR" />
  <br /><br />
</div>

# Map-Key — The Secure Real Estate Gateway

**Map-Key** is a production-grade, enterprise-secure real estate digital platform built with **Zero-Trust architecture** and **OWASP Top 10 compliance**. Supports **Arabic (RTL)** and **English (LTR)** with **Dark & Light themes**.

> **Version:** 0.1.0 — Active Development

---

## Features

### 🌐 Multi-Language (RTL/LTR)
- Full Arabic (`ar`) & English (`en`) support via `next-intl`
- Automatic RTL/LTR direction switching
- Locale-aware routing (`/ar/...` & `/en/...`)
- Arabic-optimized Tajawal & Cairo fonts / English-optimized Inter & Poppins fonts

### 🎨 Dark & Light Mode
- System-aware theme detection with `next-themes`
- Persistent theme preference
- Smooth transitions with no flash of incorrect theme
- Deep Navy (#0A1128) dark scheme & Off-White (#F8F9FA) light scheme

### 🔐 Enterprise Security
| Layer | Implementation |
|---|---|
| **Content Security Policy** | Strict CSP headers via middleware |
| **HSTS** | Strict-Transport-Security with includeSubDomains |
| **XSS Prevention** | X-XSS-Protection + input sanitization |
| **CSRF Protection** | Origin validation on all API routes |
| **Rate Limiting** | IP-based throttling with configurable windows |
| **Password Policy** | Strength validation (min 8 chars, uppercase, lowercase, number, special) |
| **Input Validation** | Email, Saudi phone, name, and text sanitization |
| **Security Headers** | X-Frame-Options: DENY, X-Content-Type-Options: nosniff |
| **Permissions Policy** | Geolocation only, camera/microphone disabled |

### 🎬 Animations
- Framer Motion powered micro-interactions
- Staggered card reveal animations
- Smooth page transitions
- Glowing gold accent animations
- Slide-up & fade-in effects

### 📱 Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly UI elements
- Animated mobile navigation

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) + CSS Variables |
| **Animation** | [Framer Motion 12](https://www.framer.com/motion/) |
| **i18n** | [next-intl 4](https://next-intl-docs.vercel.app/) |
| **Theme** | [next-themes 0.4](https://github.com/pacocoursey/next-themes) |
| **Utilities** | clsx + tailwind-merge |
| **Fonts** | Inter, Poppins, Tajawal, Cairo (via next/font) |

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/               # Internationalized routes
│   │   ├── page.tsx            # Homepage (Hero + Featured Properties)
│   │   ├── properties/         # Property listings page
│   │   ├── auth/
│   │   │   ├── login/          # Login page
│   │   │   └── register/       # Registration page
│   │   ├── dashboard/          # User dashboard
│   │   └── not-found.tsx       # 404 page
│   ├── api/
│   │   ├── auth/               # Authentication API
│   │   ├── properties/         # Properties CRUD API
│   │   └── webhooks/           # Webhook handler
│   ├── error.tsx               # Error boundary
│   ├── global-error.tsx        # Critical error boundary
│   ├── loading.tsx             # Loading state
│   └── layout.tsx              # Root layout (fonts, providers)
├── components/
│   ├── layout/
│   │   ├── header.tsx          # Responsive nav + language/theme toggle
│   │   └── footer.tsx          # Footer with links
│   └── ui/
│       ├── property-card.tsx   # Animated property card
│       └── theme-toggle.tsx    # Theme switch button
├── lib/
│   ├── utils.ts                # cn(), formatPrice(), sanitizeInput(), etc.
│   └── security.ts             # Rate limiting, CSRF, validation, etc.
├── i18n/
│   ├── routing.ts              # Locale routing config
│   ├── navigation.ts           # Typed navigation hooks
│   ├── request.ts              # Message loader
│   └── messages/
│       ├── ar/common.json      # Arabic translations
│       └── en/common.json      # English translations
├── providers/
│   └── theme-provider.tsx      # next-themes provider
├── types/
│   └── index.ts                # TypeScript interfaces
└── middleware.ts               # Security headers + i18n routing
```

---

## Design System

### Dark Mode
| Token | Value | Usage |
|---|---|---|
| `bg-primary` | `#0A1128` | Main background |
| `bg-secondary` | `#1A233A` | Sections, containers |
| `bg-card` | `rgba(26,35,58,0.85)` | Cards with backdrop-blur |
| `text-primary` | `#FFFFFF` | Headings, primary text |
| `text-secondary` | `#B0BEC5` | Body text, labels |
| `accent-gold` | `#F5B041` | CTAs, highlights, active states |
| `accent-gold-hover` | `#E6A817` | Gold hover state |
| `accent-cyan` | `#00B4D8` | Secondary actions, tech elements |
| `accent-cyan-hover` | `#0096B8` | Cyan hover state |
| `border` | `rgba(245,176,65,0.2)` | Subtle gold borders |

### Light Mode
| Token | Value | Usage |
|---|---|---|
| `bg-primary` | `#F8F9FA` | Main background |
| `bg-secondary` | `#FFFFFF` | Sections, containers |
| `bg-card` | `rgba(255,255,255,0.9)` | Cards with backdrop-blur |
| `text-primary` | `#0A1128` | Headings, primary text |
| `text-secondary` | `#4A5568` | Body text, labels |
| `accent-gold` | `#D4A017` | CTAs, highlights, active states |
| `accent-gold-hover` | `#B8860B` | Gold hover state |
| `accent-cyan` | `#0088A8` | Secondary actions, tech elements |
| `accent-cyan-hover` | `#007694` | Cyan hover state |
| `border` | `rgba(10,17,40,0.1)` | Subtle navy borders |

### Typography
| Style | Size | Weight | Line Height | English Font | Arabic Font |
|---|---|---|---|---|---|
| **H1** | `clamp(2.5rem, 8vw, 5rem)` | 900 | 1.1 | Inter | Tajawal |
| **H2** | `clamp(2rem, 5vw, 3.5rem)` | 700 | 1.1 | Inter | Tajawal |
| **H3** | `clamp(1.5rem, 3vw, 2.5rem)` | 600 | 1.1 | Inter | Cairo |
| **Body** | `clamp(1rem, 1.2vw, 1.2rem)` | 400 | 1.8 | Inter | Tajawal |
| **Small** | `clamp(0.8rem, 1vw, 0.95rem)` | 500 | 1.8 | Poppins | Cairo |

### Spacing Scale
`4px` base: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128

---

## Getting Started

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/map-key.git
cd map-key

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000).

---

## Internationalization

Routes are auto-prefixed with locale:

| URL | Language | Direction |
|---|---|---|
| `localhost:3000/ar` | العربية | RTL → |
| `localhost:3000/en` | English | LTR ← |

Toggle language from the header button. Translation files live in `src/i18n/messages/{locale}/`.

---

## Security Headers

Every response includes the following via middleware:

```
Content-Security-Policy: default-src 'self'; script-src 'self' ...; ...
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(self), interest-cohort=()
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Production build with type checking |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint across the codebase |

---

## License

This project is **private** and **proprietary**. All rights reserved.

---

<div align="center">
  <br />
  <strong>Built with ❤️ by the Map-Key Team</strong>
  <br /><br />
  <sub>Enterprise Security · Zero Trust · Arabic & English · Dark & Light</sub>
</div>

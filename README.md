# CANDI — The Craft of Sushi & Asian Cuisine

An editorial, high-fidelity digital restaurant experience crafted for **CANDI**, a contemporary sushi and Asian cuisine sanctuary.

Built with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS v4**, **GSAP (ScrollTrigger)**, and **Lenis Smooth Scroll**, this project delivers fluid momentum scrolling, zero-clip typography, and rich interactive features.

---

## Brand Philosophy

> *"The craft of sushi & Asian cuisine — fresh fish, bold flavors, and a welcoming dining experience."*

Fresh catches from pristine waters meet modern culinary precision. Every roll, nigiri, and sashimi plate is prepared with balance, harmony, and Japanese culinary reverence.

- **Location**: 256th North Neusvill Avenue, Canggu, Bali 80361
- **Service Hours**: Mon–Thu: 11:30 AM – 9:30 PM | Fri–Sat: 11:30 AM – 10:30 PM | Sun: 12:00 PM – 9:00 PM
- **Cuisine**: Omakase, Nigiri, Specialty Maki, Handcraft Rolls, Sake

---

## Design System & Palette

| Token | Value | Description |
| :--- | :--- | :--- |
| **Forest Deep** | `#0e2016` | Background dark accents, luxury framing |
| **Forest** | `#152619` | Primary deep green brand color, dark cards |
| **Cream** | `#f6fae1` | Root background, warm parchment aesthetic |
| **Ivory** | `#f8f6ed` | Crisp editorial contrast, light card text |
| **Lime** | `#e8fc81` | Accent buttons, active highlights, badges |
| **Card Sage** | `#dee3c5` | Surface cards, soft muted backdrop |
| **Ink** | `#101010` | Deepest contrast for reservation form backdrops |

### Typography
- **Display Serif**: `Cinzel` — Monumental, elegant headings with classical proportion and generous descender masks.
- **Body Serif**: `Lora` — Warm editorial prose, quotes, and descriptions.
- **Label / Sans**: `Noto Sans JP` — Clean Japanese aesthetic for badges, categories, and tabs.

---

## Animation & Kinetic Architecture

### 1. Unified Inertial Smooth Scrolling (`components/SmoothScroll.tsx`)
- Driven by **Lenis** integrated directly into the **GSAP ticker** (`gsap.ticker.add`, `gsap.ticker.lagSmoothing(0)`).
- Synchronized with `ScrollTrigger.update()` on every frame for buttery 120Hz smooth scrolling.
- Seamless anchor scrolling for navigation links (`#start`, `#story`, `#explore`, `#dishes`, `#connect`).

### 2. Header (`components/landing/site-header.tsx`)
- Elegant downward glide on mount.
- Real-time scroll state detection (`isScrolled`) with glassmorphic blur and border transition.
- Dynamic IntersectionObserver for active section highlights.
- Interactive cart drawer trigger with animated count bounce on addition.

### 3. Hero Section (`components/landing/hero-section.tsx`)
- Atmospheric sushi platter background with subtle scroll parallax scrub (`yPercent: 12`, `scrub: 0.8`).
- Split headline words reveal with zero clipping (`yPercent: 110 -> 0`, `stagger: 0.045`, `ease: "power4.out"`).
- Floating fine dining status badge with pulsing live indicator.
- Interactive reserve CTA button.

### 4. Story Section (`components/landing/story-section.tsx`)
- Main portrait image with settle entrance (`scale: 1.05 -> 1`) and depth parallax scrub.
- Masked editorial typography rise on scroll into view.
- Secondary nigiri image and service hours block with staggered reveal.

### 5. Signature Categories (`components/landing/category-marquee.tsx`)
- Bold oversized typography (*Bluefin, Maki bites, Nori tacos, Sake, Sushi wraps*).
- Staggered row reveals on scroll.
- Interactive hover transitions with image zoom (`scale-110`) and lime tint glow.

### 6. Featured Menu Grid (`components/landing/featured-menu-grid.tsx`)
- Staggered card cascade on scroll into view (`stagger: 0.08`, `ease: "power3.out"`).
- Card lift on hover with deep shadow.
- Interactive "+ Add to Bag" with visual confirmation state and cart integration.

### 7. CTA Banner (`components/landing/cta-banner.tsx`)
- Full-bleed chef imagery with continuous scroll scrub parallax.
- Masked headline entrance and lime CTA button.

### 8. À La Carte Menu (`components/landing/menu-list-section.tsx`)
- Dynamic tab switching between Nigiri, House rolls, Sake, and Maki.
- Fluid dish cross-fade and slide animation on tab changes.
- Item thumbnail zoom and hover highlights.

### 9. Gallery Strip (`components/landing/gallery-strip.tsx`)
- Seamless infinite marquee ribbon (`animate-marquee-slow`) pausing on hover.
- Edge gradient vignettes for depth.
- Image zoom on hover (`scale-108`).

### 10. Notes From Our Guests (`components/landing/testimonials-section.tsx`)
- Editorial quotes slideshow with slide-in typography and active portrait transitions.
- Parallax depth on guest portraits.
- Progress dots with animated width expansion (`w-8` active).
- Previous / Next buttons with hover elevation.

### 11. Journal Stories (`components/landing/blog-section.tsx`)
- Asymmetric 3-card editorial layout with staggered scroll entrance.
- Deep hover zoom on food photography.

### 12. Reservation Section (`components/landing/reservation-section.tsx`)
- Rich dark form container with decorative Japanese botanical motif.
- Floating leaf accent with continuous organic drift (`animate-float`).
- Smooth focus transitions and live validation state.
- Location and service hours aside.

### 13. Shopping Bag Drawer & Toast (`components/cart/`)
- Off-canvas slide-in drawer with backdrop blur.
- Live item counter, quantity increments, subtotal calculation, and clear cart functionality.
- Floating toast notification with auto-dismiss.

---

## Getting Started

Run the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the site.

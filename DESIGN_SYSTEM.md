# Cristedor Group - Official Corporate Design System
**Document ID:** `DESIGN_SYSTEM.md`  
**Version:** 1.0.0  
**Phase:** Phase 3 (Design System & Foundations)  

---

## 1. Executive Design Philosophy

The **Cristedor Group Design System** establishes a sovereign, high-precision visual and technical language. Designed to convey authority, technological leadership, and long-term trust, it draws inspiration from the minimalist sophistication of **Apple**, the developer-grade precision of **Vercel & Linear**, and the financial authority of **Stripe & Alphabet**.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Theme Palette Matrix

```
                          OBSIDIAN DARK MODE (DEFAULT)
┌───────────────────────┬───────────────────────┬───────────────────────┐
│ Primary Base          │ Surface Glass         │ Electric Cyan Accent  │
│ #07080E (Obsidian)    │ rgba(255,255,255,0.03)│ #00F0FF (Primary Cyan)│
├───────────────────────┼───────────────────────┼───────────────────────┤
│ Secondary Base        │ Surface Elevated      │ Champagne Gold        │
│ #0F111A (Midnight)    │ #141724               │ #D4AF37 (ESG & Impact)│
├───────────────────────┼───────────────────────┼───────────────────────┤
│ Text Primary          │ Text Muted            │ Border Glass          │
│ #F8FAFC (White 98%)   │ #94A3B8 (Slate 400)   │ rgba(255,255,255,0.08)│
└───────────────────────┴───────────────────────┴───────────────────────┘

                          LIGHT CORPORATE MODE
┌───────────────────────┬───────────────────────┬───────────────────────┐
│ Primary Base          │ Surface Glass         │ Deep Cobalt Accent    │
│ #FAFAFC (Off-White)   │ rgba(255,255,255,0.85)│ #0284C7 (Primary Blue)│
├───────────────────────┼───────────────────────┼───────────────────────┤
│ Secondary Base        │ Surface Elevated      │ Muted Gold            │
│ #F1F5F9 (Slate 100)   │ #FFFFFF               │ #B45309 (Gold Accent) │
├───────────────────────┼───────────────────────┼───────────────────────┤
│ Text Primary          │ Text Muted            │ Border Light          │
│ #0F172A (Slate 900)   │ #64748B (Slate 500)   │ rgba(15,23,42,0.12)   │
└───────────────────────┴───────────────────────┴───────────────────────┘
```

### 2.2 Functional Status Colors
- **Success / Live**: `#10B981` (Emerald 500) | `rgba(16, 185, 129, 0.15)` background glow.
- **Warning / Pending**: `#F59E0B` (Amber 500) | `rgba(245, 158, 11, 0.15)` background glow.
- **Error / Critical**: `#EF4444` (Red 500) | `rgba(239, 68, 68, 0.15)` background glow.
- **Information / Notice**: `#3B82F6` (Blue 500) | `rgba(59, 130, 246, 0.15)` background glow.

---

## 3. Typography Architecture

### 3.1 Font Stack Specifications
- **Display & Headings**: `Plus Jakarta Sans`, sans-serif (Geometric, high-prestige structural letterforms).
- **Body & Interface**: `Inter`, system-ui, sans-serif (Optimized for legibility and dense data screens).
- **Data, Tickers & Code**: `JetBrains Mono`, monospace (Fixed-pitch precision for metrics, AUM, and stock tickers).

### 3.2 Typographic Scale (CSS Variable Tokens)

```css
:root {
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Type Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1.00rem;  /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.50rem;   /* 24px */
  --text-3xl: 2.00rem;   /* 32px */
  --text-4xl: 2.50rem;   /* 40px */
  --text-5xl: 3.50rem;   /* 56px */
  --text-6xl: 4.50rem;   /* 72px */
}
```

---

## 4. Spacing System & Layout Grid

### 4.1 8px Baseline Rhythm
- `--space-1`: `4px` (Tight padding, internal badge gaps)
- `--space-2`: `8px` (Icon gaps, compact button padding)
- `--space-3`: `12px` (Standard input vertical padding)
- `--space-4`: `16px` (Card internal padding, standard gap)
- `--space-6`: `24px` (Section sub-elements, grid gaps)
- `--space-8`: `32px` (Component block spacing)
- `--space-12`: `48px` (Major section headers)
- `--space-16`: `64px` (Standard section vertical padding)
- `--space-24`: `96px` (Hero section padding)
- `--space-32`: `128px` (Major page breaks)

### 4.2 Breakpoints & Container Boundaries
- `--breakpoint-sm`: `640px`
- `--breakpoint-md`: `768px`
- `--breakpoint-lg`: `1024px`
- `--breakpoint-xl`: `1280px`
- `--breakpoint-2xl`: `1440px` (Max container width)

---

## 5. Glassmorphism & Elevation Rules

### 5.1 Glass Surface Tiers

```css
/* Glass Tier 1: Subdued Background Containers */
.glass-panel-sm {
  background: rgba(15, 17, 26, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Glass Tier 2: Interactive Cards & Hover Elevate */
.glass-panel-md {
  background: rgba(20, 23, 36, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

/* Glass Tier 3: Sticky Navbar & Slide-Over Modals */
.glass-panel-lg {
  background: rgba(7, 8, 14, 0.85);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
}
```

---

## 6. Imagery, Illustration & Photography Art Direction

### 6.1 Photography Guidelines
- **Leadership Portraits**: Dark, moody studio lighting with cool ambient rim highlights. Professional, composed, authoritative expression.
- **Enterprise Facilities**: High-tech architecture, clean server labs, quantum compute facilities, and modern glass headquarters. High dynamic range, deep shadows.
- **Abstract Venture Assets**: 3D geometric glass forms, quantum particle visualizations, and clean line-art renderings.

### 6.2 Iconography (Lucide Suite)
- **Stroke Width**: `1.5px` constant line weight for elegance.
- **Sizing Tokens**: `16px` (sm), `20px` (md), `24px` (lg), `32px` (xl).
- **Behavior**: Color matches parent text or shifts to `#00F0FF` on hover.

---

## 7. Motion Principles & Physics Easing

- **Primary Easing Curve**: `cubic-bezier(0.16, 1, 0.3, 1)` (Ultra-smooth spring exit curve).
- **Fast Micro Interaction**: `150ms` (Hover states, button press).
- **Standard Transition**: `300ms` (Dropdown expansions, tab switches).
- **Modal Slide-In**: `400ms` (Slide-over drawer entry).
- **Background Node Canvas**: Constant 60fps loop via `requestAnimationFrame`.

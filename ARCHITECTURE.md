# Cristedor Group - Comprehensive Technical & Frontend Architecture
**Document ID:** `ARCHITECTURE.md`  
**Version:** 1.0.0  
**Phase:** Phase 6 (Technical Architecture & Engineering Design)  

---

## 1. Executive Technology Stack Selection

To achieve the quality, speed, and elegance of **Apple, Vercel, Linear, Stripe, and Alphabet**, we select a zero-bloat, high-performance tech stack:

```
┌───────────────────────────┬────────────────────────────────────────────────────────┐
│ Layer                     │ Technology Choice & Rationale                          │
├───────────────────────────┼────────────────────────────────────────────────────────┤
│ Core Framework            │ React 18 + TypeScript (Strict Mode)                    │
│                           │ Fast HMR, type safety, modular component lifecycle.    │
├───────────────────────────┼────────────────────────────────────────────────────────┤
│ Build Tool & Server       │ Vite 5+                                                │
│                           │ Instant server start, lightning-fast ES module bundling│
├───────────────────────────┼────────────────────────────────────────────────────────┤
│ Styling & Design Tokens   │ Native CSS Variables + Glassmorphism Utility Layers   │
│                           │ Zero CSS-in-JS runtime overhead; 60fps animations.     │
├───────────────────────────┼────────────────────────────────────────────────────────┤
│ Graphics & Animation      │ HTML5 Canvas 2D Engine + CSS GPU Transforms            │
│                           │ Non-blocking particle graph & magnetic cursor physics. │
├───────────────────────────┼────────────────────────────────────────────────────────┤
│ Iconography Suite         │ Lucide React                                           │
│                           │ Clean, customizable 1.5px stroke vector icons.         │
├───────────────────────────┼────────────────────────────────────────────────────────┤
│ Routing Architecture      │ Custom Lightweight Route Engine with Browser History   │
│                           │ Instant page switching, clean URLs, zero bundle bloat. │
└───────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 2. Component & System Architecture

### 2.1 Layered Component Taxonomy

```
                       [ PAGES LAYER ]
   (HomePage, PortfolioPage, AboutPage, InvestorsPage, CareersPage...)
                              │
                              ▼
                     [ FEATURES LAYER ]
   (HeroSection, PortfolioFilter, VentureDetailModal, GlobalMapCanvas...)
                              │
                              ▼
                     [ PRIMITIVES LAYER ]
    (Button, GlassCard, Badge, Input, StatCounter, SectionHeader...)
                              │
                              ▼
                     [ FOUNDATION LAYER ]
   (CSS Variables, ThemeContext, CanvasEngine, TypeScript Interfaces)
```

---

## 3. State Management & Data Flow Architecture

- **Theme Context (`ThemeContext.tsx`)**: Manages `dark` (Obsidian) vs `light` (Corporate) mode state, persisting preference in `localStorage` and syncing with system media query (`prefers-color-scheme`).
- **Modal Drawer Context (`ModalContext.tsx`)**: Controls active slide-over drawers (Venture details, Job application form, Press reader) and handles focus trapping & ESC key dismissals.
- **Filter State (`useFilterMatrix.ts`)**: Manages search query, division sector tab, stage filter, and sorting order for the Portfolio Matrix and Careers portal.

---

## 4. Routing & SEO Architecture

- **Route Engine**: Instant route resolution supporting `/`, `/portfolio`, `/divisions`, `/about`, `/investors`, `/newsroom`, `/careers`, `/contact`, `/privacy`, `/terms`, `/cookies`, and `/404`.
- **Dynamic Head Manager (`useSEO.ts`)**: Automatically updates `document.title`, meta description, OpenGraph tags, and injects Schema.org JSON-LD scripts upon route changes.

---

## 5. Performance, Security & Accessibility

1. **Performance Target (Lighthouse 95+)**:
   - LCP < 1.2s via pre-loaded typography and hardware-accelerated canvas.
   - Zero Cumulative Layout Shift (CLS = 0.00) using fixed aspect ratios for cards and images.
2. **Accessibility (WCAG 2.1 AA)**:
   - Complete ARIA attributes (`aria-expanded`, `aria-label`, `role="dialog"`).
   - Dynamic focus indicator ring (`:focus-visible`).
   - Reduced motion safety (`prefers-reduced-motion: reduce`).
3. **Security & Deployment**:
   - Sanitized input fields preventing XSS.
   - Clean static build ready for immediate edge deployment (Vercel / Cloudflare Pages).

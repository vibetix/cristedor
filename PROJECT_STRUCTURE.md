# Cristedor Group - Comprehensive Workspace & Project Structure
**Document ID:** `PROJECT_STRUCTURE.md`  
**Version:** 1.0.0  
**Phase:** Phase 6 (Project Structure & Directory Architecture)  

---

## 1. Workspace Directory File Tree

```
d:\Codes\cristedor\
├── index.html                  # HTML5 Entry Point (Google Fonts, Meta Tags)
├── package.json                # Dependencies (React, TypeScript, Lucide Icons, Vite)
├── vite.config.ts              # Vite Build Configuration
├── tsconfig.json               # TypeScript Compiler Rules
├── CRISTEDOR_PRODUCT_DISCOVERY.md
├── UX_STRATEGY.md
├── WIREFRAMES.md
├── DESIGN_SYSTEM.md
├── COMPONENT_GUIDE.md
├── CONTENT_STRATEGY.md
├── SEO_CONTENT.md
├── HIGH_FIDELITY_DESIGNS.md
├── ARCHITECTURE.md
├── PROJECT_STRUCTURE.md
└── src/
    ├── main.tsx                # Application Initialization
    ├── App.tsx                 # Root Component & Route Provider
    ├── styles/
    │   ├── variables.css       # CSS Variables (Colors, Fonts, Spacing, Shadows)
    │   ├── reset.css           # Modern CSS Reset
    │   └── global.css          # Global Component & Utility Styles
    ├── types/
    │   └── index.ts            # TypeScript Interfaces for Portfolio, Leadership, News, Careers
    ├── data/
    │   ├── portfolioData.ts    # 12 Subsidiary Company Datasets
    │   ├── leadershipData.ts   # Executive Board Bios & Metadata
    │   ├── financialData.ts    # Live Ticker Metrics & ESG Filings
    │   ├── newsData.ts         # Official Press Releases & Articles
    │   └── careersData.ts      # Global Open Job Listings
    ├── context/
    │   └── ThemeContext.tsx    # Light/Dark Theme Provider State
    ├── hooks/
    │   ├── useSEO.ts           # Dynamic Document Title & Head Manager
    │   ├── useCanvasEngine.ts  # Particle Node Network Loop Controller
    │   └── useFilterMatrix.ts  # Search & Multi-Category Filter Logic
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx      # Glassmorphic Sticky Header
    │   │   ├── Footer.tsx      # Corporate 4-Column Footer
    │   │   └── MobileNav.tsx   # Mobile Navigation Overlay Drawer
    │   ├── common/
    │   │   ├── Button.tsx      # Reusable Button Primitive (Primary, Glass, Outline)
    │   │   ├── GlassCard.tsx   # Reusable Elevation Panel
    │   │   ├── Badge.tsx       # Live Status & Category Pills
    │   │   ├── SectionHeader.tsx # Standardized Section Titles
    │   │   ├── ThemeToggle.tsx  # Dark/Light Mode Switcher
    │   │   ├── CustomCursor.tsx # Magnetic Dual-Ring Pointer
    │   │   ├── StatCounter.tsx  # Animated Numerical Counter
    │   │   └── Modal.tsx       # Slide-Over Drawer Container
    │   ├── visual/
    │   │   ├── NetworkCanvas.tsx   # Interactive Node Particle Background
    │   │   └── GlobalMapCanvas.tsx # World Map HQ Pin Hotspots
    │   └── features/
    │       ├── HeroSection.tsx        # Homepage Hero & Live Ticker
    │       ├── HoldingEcosystem.tsx   # Tabbed Division Showcase
    │       ├── FinancialMetrics.tsx   # Live Metric & Chart Showcase
    │       ├── LeadershipGrid.tsx     # Board of Directors Spotlight
    │       ├── VentureDetailModal.tsx # Venture Drawer Quick View
    │       ├── JobApplicationModal.tsx # Career Application Drawer
    │       └── ContactForm.tsx        # Global HQ Form Handler
    ├── pages/
    │   ├── HomePage.tsx        # Homepage Overview View
    │   ├── PortfolioPage.tsx   # Subsidiary Search & Filter Matrix View
    │   ├── DivisionsPage.tsx   # Deep Dive Division Showcase View
    │   ├── AboutPage.tsx       # Company History & Leadership View
    │   ├── InvestorsPage.tsx   # Financials, Stock & Reports View
    │   ├── NewsroomPage.tsx    # Press Releases & Media Kit View
    │   ├── CareersPage.tsx     # Culture & Open Positions View
    │   ├── ContactPage.tsx     # Global HQ Locations & Contact View
    │   ├── PrivacyPage.tsx     # Privacy & Terms Legal View
    │   └── NotFoundPage.tsx    # 404 Route Not Found View
    └── utils/
        └── formatters.ts       # Currency & Metric Formatting Helpers
```

---

## 2. File Responsibilities & Modules

1. **`src/types/index.ts`**: Centralized TypeScript definitions for `Subsidiary`, `Leader`, `FinancialReport`, `NewsArticle`, `JobPosting`, and `ContactInquiry`.
2. **`src/data/*`**: Immutable, highly detailed mock datasets powering all 6 divisions and 12 subsidiaries.
3. **`src/hooks/useCanvasEngine.ts`**: Pure canvas render loop managing particle velocities, mouse attraction forces, and spatial connection lines.
4. **`src/components/visual/NetworkCanvas.tsx`**: High-performance HTML5 canvas component bound to viewport resize events and reduced-motion preferences.

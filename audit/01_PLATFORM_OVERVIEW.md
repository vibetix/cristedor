# 01 — Platform Overview

**Purpose:** Snapshot of the technology platform and repo layout for the audit.

## Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Bundler | Vite 5 | Fast dev/build; emits ~973 kB JS chunk warning |
| Framework | React 18 + TypeScript | `strict` mode in use |
| Routing | None (no react-router) | Custom `useRoute` hook parses `window.location.pathname`; `/portfolio/:id` → VentureDetailPage |
| Styling | CSS files + inline styles | Tailwind NOT used; page-scoped CSS, gradient color system |
| Maps | Leaflet + react-leaflet | InvestorsPage, CareersPage |
| Icons | lucide-react | Icon maps per page (see 03) |
| Fonts | Google Fonts: Inter, JetBrains Mono, Plus Jakarta Sans | loaded in index.html |
| SEO | `useSEO` hook + static index.html meta + JSON-LD | see 16 |

## Key files

| Area | Files |
|------|-------|
| Entry | `index.html`, `src/main.tsx`, `src/App.tsx` |
| Hooks | `useRoute.ts`, `useSEO.ts`, `usePortfolioFilter.ts`, `useInView` (per page) |
| Data | `src/data/*.ts` (financialData, aboutData, careersData, newsData, contactData, privacyData, leadershipData, portfolioData, stageData.tsx, portfolioMeta.tsx) |
| Types | `src/types/index.ts` |
| Components | Navbar, MobileNav, BottomNav, Footer, SectionHeading, GlowCard, VentureCard, PortfolioSection, CareersModal, etc. |
| Pages | HomePage, AboutPage, DivisionsPage, InvestorsPage, NewsroomPage, CareersPage, ContactPage, PrivacyPage, NotFoundPage, VentureDetailPage |
| Public | `public/` — 20 assets (see 15) |
| Docs | 15 root `.md` planning docs (no README.md) |

## Build / tooling
- `npm run dev`, `npm run build`, `npm run typecheck` all pass (verified prior to audit).
- No test framework present.

## Verification status
- All 11 pages, all data files, all hooks and components read (audit session complete).
- Source of truth for facts = `src/data/*`; planning docs are aspirational and must not be treated as confirmations.

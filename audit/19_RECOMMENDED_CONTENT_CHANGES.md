# 19 — Recommended Content Changes

**Purpose:** Concrete, file-pinned change list. Items marked **[owner]** need an answer from 17_PAGE_BY_PAGE_QUESTIONS.md first; items marked **[immediate]** can be done now.

---

## A. Immediate fixes (no owner input required)

| # | Change | File(s) | Ref |
|---|--------|---------|-----|
| R1 | Wire footer social buttons to real URLs (or remove them) | `src/components/layout/Footer.tsx` | I4 |
| R2 | Add `public/og-image.jpg` (1200×630) | `public/` | I3 |
| R3 | Remove or replace `https://youtube.com/watch?v=example` | `src/data/newsData.ts:205` | I5 |
| R4 | Rename `cristedor logo.png` / `mobile logo.png` to URL-safe names; update JSON-LD logo URL | `public/`, `index.html:38` | I19 |
| R5 | Add `public/robots.txt` and `public/sitemap.xml` | `public/` | M1/M2 |
| R6 | Update `/investors` SEO copy — remove "stock simulation" and "quarterly earnings" (no such features exist) | `src/hooks/useSEO.ts` | S4 |
| R7 | Correct `/contact` SEO office list (Lagos/Nairobi are planned; don't claim as open) | `src/hooks/useSEO.ts` | S5 |
| R8 | Align JSON-LD `sameAs` with contactData social handles | `index.html:41-44` | I14 |
| R9 | Fix About leadership grid `href="#"` social links (wire or remove) | AboutPage / LeadershipGrid | I20 |
| R10 | Canonicalize static vs runtime home title ("Building Companies That Shape Tomorrow" vs "Empowering Human Advancement") | `index.html:11`, `useSEO.ts:7` | I21 |

## B. Number reconciliation **[owner]**

| # | Decision needed | Files to update once decided |
|---|-----------------|-----------------------------|
| R11 | AUM: pick `$2.8B` or `$2B+` (suggest $2.8B, update all 4 About refs) | `aboutData.ts:194,212,163,286` |
| R12 | Headcount: pick `500+` or `8,400+` (suggest reconcile wording: "500+ team members across 6 divisions" in About; remove "8,400+" from Careers SEO or keep only if true) | `aboutData.ts:287`, `useSEO.ts:32`, CONTENT_STRATEGY ticker |
| R13 | Industries: pick `5` or `7` | `financialData.ts:11`, `aboutData.ts:142,156` |
| R14 | Countries: pick `12+` or `15+` | `financialData.ts:12,69`, `aboutData.ts:279` |
| R15 | Hubs: replace "30+ Global Hubs" with actual count (3, 7, or real list) | `aboutData.ts:288`, `careersData.ts:195` |
| R16 | Education reach: reconcile 1,200+ / 1.2M / 10,000+ / 100,000+ with time-horizon labels | `aboutData.ts:278,370`, `financialData.ts:52,62` |
| R17 | Patents: align 1,280+ (doc) / 85 (Labs) / 35 (Sarah Lin) | portfolioData, leadershipData, CONTENT_STRATEGY |
| R18 | Marcus Thorne "$14.2B portfolio" vs AUM | `leadershipData.ts` |
| R19 | "5 Years of Innovation" → 6 (2020–2026) | `financialData.ts:13` |
| R20 | Neuralis params: label v1 100B+ vs v3 500B+ | `financialData.ts:58,135` |

## C. Structural/naming reconciliations **[owner]**

| # | Decision needed | Files |
|---|-----------------|-------|
| R21 | Division label: Future Labs (careers) vs Frontier Labs (portfolioOverview) vs Labs (hero) | careersData divisionLabels, financialData portfolioOverview |
| R22 | "Cristedor Tech": rename Sarah Lin's role / Newsroom COMPANIES filter / About timeline to "Cristedor Labs", or add a Cristedor Tech entity | leadershipData, newsData:22, aboutData timeline |
| R23 | "Cristedor Capital" division vs no such subsidiary (jobs mention it) | careersData jobs, financialData portfolioOverview |
| R24 | Contact offices: decide planned-office display policy | financialData:164-166, ContactPage |

## D. Content additions/upgrades (post owner answers)

| # | Item | Detail |
|---|------|--------|
| R25 | Wire contact form to real backend (no endpoint exists) | ContactPage / ContactForm |
| R26 | Host the 5 report PDFs/ZIPs and link them (or mark as coming soon) | financialData:146-150 |
| R27 | Real product names for subsidiaries (only Cristedor Labs has brandable products) | portfolioData descriptions |
| R28 | Real executive headshots (local assets) | leadershipData, public/ |
| R29 | Backfill 2023–2025 newsroom articles or narrow ARCHIVE_YEARS | newsData:30 |
| R30 | Verify 15 subdomain sites live (or gate "Visit Website" buttons) | portfolioData websiteUrl |
| R31 | Add jobPosting + NewsArticle structured data | useSEO / newsroom |
| R32 | Route-level code-splitting to cut ~973 kB chunk | main.tsx / App |
| R33 | Add `og:image` generation and per-article og images | newsData / index.html |

## E. Suggested execution order
1. R1–R10 (immediate, ~1 session)
2. Owner answers Q1–Q52 → R11–R24
3. R25–R32 after confirmations
4. Re-audit + rebuild + typecheck

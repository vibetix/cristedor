# 18 — Critical Issues

**Purpose:** Prioritized list of the most damaging issues found in the audit, with owner action required. Severity: **CRITICAL / HIGH / MEDIUM / LOW**.

---

## CRITICAL

### I1 — Conflicting headline financials (AUM)
- **Where:** Investors page `$2.8B` (`financialData.ts:170`) vs About page `$2B+` (`aboutData.ts:286` + 3 more references).
- **Why it matters:** An institutional investor portal showing two different AUM figures for the same group destroys credibility.
- **Fix:** Owner picks one canonical value; update all references.

### I2 — Conflicting headcount (500+ vs 8,400+)
- **Where:** About `500+ Team Members` (`aboutData.ts:287`) vs Careers SEO "Join 8,400+ researchers & engineers" (`useSEO.ts:32`) and CONTENT_STRATEGY ticker.
- **Why it matters:** Two orders of magnitude apart on a page whose SEO description is user-facing.
- **Fix:** Owner picks canonical team metric; decide whether "8,400+" belongs in SEO at all.

### I3 — Broken Open Graph image (`og-image.jpg` missing)
- **Where:** `index.html:23` (`og:image`), `index.html:29` (`twitter:image`) reference `https://cristedor.com/og-image.jpg`; **no such file in `public/`**.
- **Why it matters:** Every social share of the site renders with a broken image.
- **Fix:** Generate/place `public/og-image.jpg` (1200×630) or remove the tag.

### I4 — Footer social links are dead (no href)
- **Where:** `src/components/Footer.tsx` — LinkedIn/Twitter/YouTube/Instagram icons render with no URL.
- **Why it matters:** Visible broken navigation on every page; social handles already exist in `contactData.ts` (canonical: `linkedin.com/company/cristedor-group`, `x.com/cristedorgroup`, `youtube.com/@cristedorgroup`, `github.com/cristedor`).
- **Fix:** Wire footer icons to the contactData URLs (owner confirm handles — Q42).

---

## HIGH

### I5 — Placeholder YouTube URL in published news article
- **Where:** `newsData.ts:205` — podcast article `videoUrl: 'https://youtube.com/watch?v=example'`.
- **Why it matters:** A live "watch video" link pointing to `watch?v=example` is an obvious placeholder to visitors and crawlers.
- **Fix:** Owner provides real podcast URL, or remove the video link.

### I6 — Hub count claim "30+ Global Hubs" unsupported
- **Where:** `aboutData.ts:288`, `careersData.ts:195`.
- **Why it matters:** Only 3 hubs are listed (`globalHubs`, `aboutData.ts:291`) and 7 offices exist in `financialData.ts:160-166` (3 planned). Claiming 30+ with no listing invites scrutiny.
- **Fix:** Owner corrects the number or provides the full hub list.

### I7 — Sector count conflict (5 Industries vs 7 Sectors)
- **Where:** `financialData.ts:11` (5) vs `aboutData.ts:142` + `aboutData.ts:156` (7).
- **Fix:** Pick one canonical framing; align heroStats and whoWeAre.

### I8 — Country count conflict (12+ vs 15+)
- **Where:** `financialData.ts:12` (12+) vs `aboutData.ts:279` (15+).
- **Fix:** Pick one.

### I9 — No README.md / owner-context gap
- **Where:** repo root.
- **Why it matters:** 15 planning docs exist but no single "source of truth" for owner-approved facts; this audit documents that gap.
- **Fix:** After owner answers 17_PAGE_BY_PAGE_QUESTIONS.md, create the content master (20) as the canonical reference.

### I10 — LIKELY FICTIONAL headline news: "$1.5B fusion & AI compute commitment"
- **Where:** `newsData.ts:34-40` (featured + pinned press release, Jul 18 2026).
- **Why it matters:** Featured item on the News page; if not real, it is the most visible false claim on the site.
- **Fix:** Owner confirms or the article is removed/downgraded.

### I11 — Leadership credibility claims unverified
- **Where:** `leadershipData.ts` — Marcus Thorne "$14.2B portfolio" (conflicts with AUM), Sarah Lin "35 Tech Patents", NASA/MIT/Stanford/Wharton credentials, AI-generated Unsplash headshots.
- **Why it matters:** Fabricated-looking bios + stock headshots on the About leadership grid (social links `href="#"`).
- **Fix:** Owner confirms bios; replace AI/stock headshots with real photos; wire social links (Q42).

---

## MEDIUM

### I12 — Four different education-reach numbers
- **Where:** `aboutData.ts:278` (1,200+), `aboutData.ts:370` (1.2M), `financialData.ts:52` (10,000+ students served), `financialData.ts:62` (100,000+ by 2030).
- **Fix:** Label time-horizons or pick one program metric.

### I13 — "5 Years of Innovation" understates 2026
- **Where:** `financialData.ts:13` heroStats.
- **Fix:** Recompute to 6.

### I14 — JSON-LD `sameAs` handles mismatch site social links
- **Where:** `index.html:41-44` (`linkedin.com/company/cristedor`, `twitter.com/cristedor`) vs `contactData.ts:92-95` (`/cristedor-group`, `x.com/cristedorgroup`).
- **Fix:** Align structured data with canonical handles.

### I15 — All 6 news articles dated 2026 while archive offers 2023–2025
- **Where:** `newsData.ts:30` + article dates.
- **Fix:** Backfill real older posts or narrow archive years.

### I16 — Financial disclosure download links
- **Where:** `financialData.ts:146-150` — five reports with names/sizes/dates but no download URLs in code (dummy-looking).
- **Fix:** Owner confirms whether real PDFs/ZIP exist and where they are hosted.

### I17 — Build size warning (~973 kB JS chunk)
- **Where:** build output.
- **Fix:** Route-level code-splitting (React.lazy per page) — the app has no router library but a custom `useRoute`; consider lazy-loading heavy pages (Investors uses Leaflet, Newsroom, Careers).

---

## LOW

### I18 — `og:url` hardcoded to `https://cristedor.com` while per-page canonical uses `window.location.origin`
- **Where:** `index.html:22` vs `useSEO.ts:87`.
- **Fix:** Harmless if domain is cristedor.com; confirm (Q50).

### I19 — JSON-LD logo URL contains a space (`cristedor logo.png`)
- **Where:** `index.html:38`.
- **Fix:** Rename asset or URL-encode.

### I20 — `href="#"` placeholders in About leadership grid
- **Where:** AboutPage.
- **Fix:** Wire to social URLs or remove.

### I21 — HTML title/description and `useSEO` home title differ
- **Where:** `index.html:11` "Building Companies That Shape Tomorrow" vs `useSEO.ts:7` "Empowering Human Advancement".
- **Fix:** Decide canonical home title; runtime `useSEO` overrides static HTML at mount anyway.

---

## Priority order to execute (suggested)

1. I4 (dead footer links) — trivial, high visibility.
2. I3 (og-image) — trivial, high visibility.
3. I5 (YouTube placeholder) — trivial.
4. I1, I2, I6, I7, I8 (number conflicts) — need owner answers first (Q1–Q4, Q5).
5. I10, I11 (fictional risk) — need owner answers (Q13, Q30).
6. I9 + I16 (canonical content master + report hosting) — after owner answers.
7. I17 (code-splitting) — schedule.

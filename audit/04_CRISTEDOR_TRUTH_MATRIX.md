# 04 — Cristedor Content Truth Matrix

**Purpose:** Cross-reference every factual claim that appears in more than one place on the site, flag conflicts, and assign verification statuses.
**Status code:** CONFIRMED (internally consistent / owner-confirmed) · USER TO CONFIRM (plausible, needs owner) · PLACEHOLDER (obviously placeholder) · LIKELY FICTIONAL · OUTDATED (date/number past) · UNKNOWN · CONFLICT (two sources disagree).

---

## 1. High-priority conflicts (different numbers for the same fact)

| # | Fact | Claim A | Claim B | Notes | Status |
|---|------|---------|---------|-------|--------|
| C1 | Assets Under Management | `$2.8B` — `financialData.ts:170` (`financialMetricsData.aum`) | `$2B+` — `aboutData.ts:286` (`groupStats`) + `aboutData.ts:194` (timeline "$2B+ Assets Under Management") + `aboutData.ts:212` ("With $2B+ AUM") + `aboutData.ts:163` ("Group surpasses $2B AUM", year 2025) | Investors page uses $2.8B; About page uses $2B+. Same group, two figures. | CONFLICT |
| C2 | Team size | `500+ Team Members` — `aboutData.ts:287` | `8,400+ researchers & engineers` — `useSEO.ts:32` (/careers meta) + CONTENT_STRATEGY ticker "8,400+ Engineers & Researchers" | Careers SEO claims 8,400+; About claims 500+. Orders of magnitude apart. | CONFLICT |
| C3 | R&D reinvestment | `28%` — `financialData.ts:172` (`rdReinvestment`); "Over 28% of operating revenue reinvested into R&D annually" — `financialData.ts:19` | `28.4%` — CONTENT_STRATEGY.md (planning doc) | In-code consistent at 28%; CONTENT_STRATEGY aspirational at 28.4%. | CONFIRMED (code) / OUTDATED (doc) |
| C4 | Sectors / Industries | `5 Industries` — `financialData.ts:11` (heroStats) | `7 Sectors` — `aboutData.ts:142` (whoWeAre facts) + `aboutData.ts:156` ("operates across seven sectors") | Investors hero says 5, About says 7. | CONFLICT |
| C5 | Countries | `12+ Countries Served` — `financialData.ts:12` (heroStats) + `financialData.ts:69` ("12+ countries served") | `15+ Countries Reached` — `aboutData.ts:279` (impactStats) | | CONFLICT |
| C6 | Global hubs | `30+ Global Hubs` — `aboutData.ts:288` + `careersData.ts:195` ("Work from any of our 30+ hubs worldwide") | Only **3** listed in `globalHubs` — `aboutData.ts:291` (New York, Zurich, Singapore); **7** in `mapHubs`/contactOffices — `financialData.ts:160-166` (NY, London, Zurich, Singapore active; Lagos, Nairobi, Tokyo planned) | 30+ claim unsupported by the 3–7 hubs actually listed. | CONFLICT / LIKELY FICTIONAL |
| C7 | Patents | `1,280+ Patents` — CONTENT_STRATEGY.md (planning doc) | `85 Core Synthesized Patents` — portfolioData (Cristedor Labs) | Also `35 Tech Patents` in Sarah Lin credentials (`leadershipData.ts`). Only 85/35 have in-code basis. | CONFLICT |
| C8 | Subsidiaries count | `15` subsidiaries in `portfolioData.ts` (actual data) | `10+` — `aboutData.ts:143` (whoWeAre "Operating Companies 10+") + `aboutData.ts:285` (`groupStats` "10+ Subsidiaries") + `aboutData.ts:212` ("10+ subsidiaries") | 15 actual vs 10+ stated. "10+" is technically true (15≥10) but understates. | CONFIRMED (15 actual) |
| C9 | Founding year | `2020` everywhere (index.html JSON-LD `foundingDate`, aboutData founderStory timeline, financialData milestones, groupStats) | CONTENT_STRATEGY.md says "Founded 2020" | Consistent. | CONFIRMED |
| C10 | Founded location | "Founded in New York" — `aboutData.ts:170` + `financialData.ts` | index.html og:url + all | Consistent. | CONFIRMED |

---

## 2. Claims worth owner confirmation (plausible, no public evidence)

| # | Claim | Location | Suggested status |
|---|-------|----------|------------------|
| K1 | "$1.5 Billion Commitment to Next-Generation Magnet Fusion & AI Compute" (tokamak reactors powering AI data centers) | `newsData.ts:34-40` (press release, featured + pinned, July 18 2026, 4 min, 2,847 views) | USER TO CONFIRM / LIKELY FICTIONAL |
| K2 | "Carbon-neutral operations since 2024" + "100% renewable-powered data centres and offices across all global hubs since 2024" | `financialData.ts:21`, `financialData.ts:83`, milestone `financialData.ts:134` ("Achieved 100% carbon neutral operations across all divisions") | USER TO CONFIRM |
| K3 | "AAA ESG Rating for Third Consecutive Year" | `financialData.ts:155` (press release `pr-esg-2026`); `esgScore: 'AAA'` `financialData.ts:171` | USER TO CONFIRM |
| K4 | "$280K – $420K" Principal Quantum Compute Architect, Zurich (posted 2026-06-15) | `careersData.ts:24` | USER TO CONFIRM |
| K5 | "Zero Security Breaches Since Inception" | Krypton (Cristedor Labs) portfolio card | USER TO CONFIRM / LIKELY FICTIONAL |
| K6 | "1.2 million students in underserved regions" (Education sustainability stat) | `aboutData.ts:370` | USER TO CONFIRM |
| K7 | "500,000+ Lives Impacted" | `aboutData.ts:280` | USER TO CONFIRM |
| K8 | "50+ Products Built" | `aboutData.ts:277` | USER TO CONFIRM |
| K9 | "4.2 Exaflops" compute | portfolioData / newsData / DivisionsPage | USER TO CONFIRM |
| K10 | "Veritas 45M readers" | portfolioData (Cristedor Media) | USER TO CONFIRM |

---

## 3. Internally consistent facts (repeat across sources without conflict)

- **6 divisions** — heroStats (`financialData.ts:10`), portfolioOverview (`financialData.ts:34-40`), DivisionsPage, useSEO `/divisions`, whyInvestItems ("Six operating divisions"), risk pillars ("6 operating divisions"). CONFIRMED.
- **Brand line** — "Architecting the Infrastructure of Human Advancement Across Dimensions" — ARCHITECTURE.md + multiple planning docs. CONFIRMED (documents).
- **Mission/tagline** — "Building Companies That Shape Tomorrow" (index.html `<title>`). CONFIRMED.
- **Founder name** — Alexander Cristedor, Group Founder & CEO — `leadershipData.ts:5` + aboutData quoteAuthor. CONFIRMED.
- **Incorporation** — New York, 2020. CONFIRMED (C9).
- **Financial metric consistency** — `aum $2.8B`, `esgScore AAA`, `rdReinvestment 28%` all live in one object (`financialData.ts:170-172`). CONFIRMED (single source).
- **First subsidiaries** — Cristedor Tech and Cristedor Media launched 2021 — `aboutData.ts:161,209` + financialData milestones. CONFIRMED.
- **Board** — 7 members, 5 independent — `boardStats` + risk pillar "5 independent directors" (`financialData.ts:68`). CONFIRMED (internally).
- **Newsroom filter taxonomies** — 4 categories, 6 companies, 15 tags, archive years 2026–2023 — `newsData.ts`. CONFIRMED (single source).

---

## 4. Confirmed placeholders & broken references

| # | Item | Location | Status |
|---|------|----------|--------|
| P1 | `https://youtube.com/watch?v=example` | `newsData.ts:205` (podcast article videoUrl) | PLACEHOLDER |
| P2 | `og-image.jpg` referenced but **file does not exist** in `public/` | `index.html:23,29` | PLACEHOLDER / BROKEN |
| P3 | Footer social icons (LinkedIn/Twitter/YouTube/Instagram) have **no href** | `src/components/Footer.tsx` | PLACEHOLDER / BROKEN |
| P4 | About leadership grid social links use `href="#"` | AboutPage | PLACEHOLDER |
| P5 | JSON-LD `sameAs` uses `linkedin.com/company/cristedor` and `twitter.com/cristedor` while ContactPage social links use `linkedin.com/company/cristedor-group`, `x.com/cristedorgroup`, `youtube.com/@cristedorgroup`, `github.com/cristedor` | `index.html:41-44` vs `contactData.ts:92-95` | CONFLICT (handle mismatch) |
| P6 | JSON-LD `logo` = `https://cristedor.com/cristedor logo.png` (URL with space, no explicit encoding) | `index.html:38` | RISK (browser may encode, but fragile) |

---

## 5. Status-count snapshot (by section)

| Status | Count |
|--------|-------|
| CONFIRMED (internally consistent) | ~14 |
| CONFLICT | 8 (C1–C7, P5) |
| USER TO CONFIRM / LIKELY FICTIONAL | 10 (K1–K10) |
| PLACEHOLDER / BROKEN | 6 (P1–P6) |

**See also:** 05_NUMBERS_AND_METRICS_AUDIT.md (full numeric inventory), 18_CRITICAL_ISSUES.md (prioritized fix list), 17_PAGE_BY_PAGE_QUESTIONS.md (owner Q&A list).

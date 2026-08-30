# 05 — Numbers & Metrics Audit

**Purpose:** Every hard number on the site, with source location and verification status.
**Status code:** CONFIRMED (single/consistent source) · CONFLICT · USER TO CONFIRM · PLACEHOLDER · LIKELY FICTIONAL · OUTDATED.

---

## 1. Group-level headline numbers

| # | Metric | Value | Source (file:line) | Status |
|---|--------|-------|--------------------|--------|
| N1 | Founded | 2020 | `aboutData.ts:140,160,208,284`; `index.html:40`; `financialData.ts:130` | CONFIRMED |
| N2 | Divisions | 6 | `financialData.ts:10` (heroStats); `financialData.ts:34-40`; useSEO `/divisions` | CONFIRMED |
| N3 | Industries (Investors hero) | 5 | `financialData.ts:11` | CONFLICT (vs 7 Sectors, N4) |
| N4 | Sectors (About) | 7 | `aboutData.ts:142,156` | CONFLICT (vs 5, N3) |
| N5 | Countries served | 12+ | `financialData.ts:12` (hero); `financialData.ts:69` (risk pillar) | CONFLICT (vs 15+, N6) |
| N6 | Countries reached | 15+ | `aboutData.ts:279` (impactStats) | CONFLICT (vs 12+, N5) |
| N7 | AUM | $2.8B | `financialData.ts:170` | CONFLICT (vs $2B+, N8) |
| N8 | AUM | $2B+ | `aboutData.ts:286`; `aboutData.ts:194,212,163` | CONFLICT (vs $2.8B, N7) |
| N9 | Team members | 500+ | `aboutData.ts:287` | CONFLICT (vs 8,400+, N10) |
| N10 | Researchers & engineers | 8,400+ | `useSEO.ts:32` (/careers) | CONFLICT (vs 500+, N9) |
| N11 | Global hubs | 30+ | `aboutData.ts:288`; `careersData.ts:195` | CONFLICT / LIKELY FICTIONAL (only 3–7 hubs actually listed) |
| N12 | Subsidiaries | 10+ (stated) / 15 (actual) | `aboutData.ts:143,285`; actual count = `portfolioData.ts` entries | CONFIRMED (15 actual; statement understates) |
| N13 | Years of innovation | 5 | `financialData.ts:13` | CONFIRMED (2020–2025); OUTDATED by 2026 — "5 Years" now understates |
| N14 | Products built | 50+ | `aboutData.ts:277` | USER TO CONFIRM |
| N15 | Companies launched | 10+ | `aboutData.ts:276` | CONFIRMED (15 ≥ 10) |
| N16 | Students served (STEM) | 1,200+ (impactStats `aboutData.ts:278`) / 1.2M (sustainability `aboutData.ts:370`) / 10,000+ (investment priorities `financialData.ts:52`) / 100,000+ (2030 roadmap `financialData.ts:62`) | multiple | CONFLICT — four different education numbers across site |
| N17 | Lives impacted | 500,000+ | `aboutData.ts:280` | USER TO CONFIRM |
| N18 | R&D reinvestment | 28% (code) / 28.4% (CONTENT_STRATEGY doc) | `financialData.ts:172,19`; CONTENT_STRATEGY.md | CONFIRMED (code) / OUTDATED (doc) |
| N19 | ESG score | AAA | `financialData.ts:171` | USER TO CONFIRM |

---

## 2. Portfolio/division numbers

| # | Metric | Value | Source | Status |
|---|--------|-------|--------|--------|
| N20 | Compute capacity | 4.2 Exaflops | portfolioData / newsData / DivisionsPage | USER TO CONFIRM |
| N21 | Veritas readers | 45M | portfolioData (Cristedor Media) | USER TO CONFIRM |
| N22 | Cristedor Labs patents | 85 Core Synthesized Patents | portfolioData | USER TO CONFIRM |
| N23 | Sarah Lin tech patents | 35 | `leadershipData.ts` (credentials) | USER TO CONFIRM |
| N24 | Synapse Compute Systems headcount | 500+ Engineers & Product Designers | `portfolioData.ts:11` | USER TO CONFIRM |
| N25 | Vanguard Materials headcount | 130+ Material Scientists | `portfolioData.ts:199` | USER TO CONFIRM |
| N26 | Neuralis model | 100B+ parameters (milestone `financialData.ts:135`); 500B+ parameters (roadmap Neuralis v3, `financialData.ts:58`) | both financialData | CONFLICT (two parameter counts, different versions — plausible but confirm) |
| N27 | Fusion pilot output | 50MW sustained | `financialData.ts:60` | USER TO CONFIRM |

---

## 3. Financial disclosures & filings

| # | Item | Value | Source | Status |
|---|------|-------|--------|--------|
| N28 | Annual Report FY2025 | 8.2 MB PDF, Jan 2026 | `financialData.ts:146` | USER TO CONFIRM (are these real downloadable files?) |
| N29 | Company Profile | 3.4 MB PDF, Mar 2026 | `financialData.ts:147` | USER TO CONFIRM |
| N30 | Sustainability & ESG Report | 5.6 MB PDF, Apr 2026 | `financialData.ts:148` | USER TO CONFIRM |
| N31 | Governance Report | 2.8 MB PDF, Jun 2026 | `financialData.ts:149` | USER TO CONFIRM |
| N32 | Brand & Media Kit | 12.1 MB ZIP, Jul 2026 | `financialData.ts:150` | USER TO CONFIRM |
| N33 | Board size | 7 members / 5 independent | `boardStats`; `financialData.ts:68` | CONFIRMED (internally) |
| N34 | IPO-track | "IPO-track preparation" milestone 2026 | `financialData.ts:136`; press release `pr-ipo-track` `financialData.ts:154` | USER TO CONFIRM |
| N35 | Big Four audits | "Annual Big Four audits", "Big Four annual audits" | `financialData.ts:68,98` | USER TO CONFIRM |

---

## 4. Compensation & careers numbers

| # | Metric | Value | Source | Status |
|---|--------|-------|--------|--------|
| N36 | Principal Quantum Compute Architect | $280K–$420K, Zurich, posted 2026-06-15 | `careersData.ts:24` | USER TO CONFIRM |
| N37 | Senior Staff AI Cognitive Scientist | $220K–$350K, New York, 2026-07-01 | `careersData.ts:38` | USER TO CONFIRM |
| N38 | Managing Director, DeepTech | $350K–$550K, London, 2026-05-20 | `careersData.ts:52` | USER TO CONFIRM |
| N39 | Learning & development budget | $10K annual | `careersData.ts:196` | CONFIRMED (internal) |
| N40 | Equipment budget | $5K | `careersData.ts:199` | CONFIRMED (internal) |
| N41 | Open roles | 12 (careersData jobs array) | `careersData.ts` | CONFIRMED (internal count) |
| N42 | Offer decision time | "within 48 hours of final interview" | `careersData.ts:207` | CONFIRMED (internal) |

---

## 5. Newsroom numbers

| # | Metric | Value | Source | Status |
|---|--------|-------|--------|--------|
| N43 | Featured article views | 2,847 | `newsData.ts` (`fusion-compute-commitment`) | USER TO CONFIRM |
| N44 | Article count | 6 articles | `newsData.ts` | CONFIRMED (internal) |
| N45 | Fusion/AI commitment | $1.5B over 3 years | `newsData.ts:36` | USER TO CONFIRM / LIKELY FICTIONAL |
| N46 | Podcast series | "The Sovereign Signal" | `newsData.ts` | USER TO CONFIRM |
| N47 | Newsroom archive years | 2026, 2025, 2024, 2023 | `newsData.ts:30` | CONFIRMED (internal) — note all 6 articles are dated 2026 |

---

## 6. Privacy/legal numbers

| # | Metric | Value | Source | Status |
|---|--------|-------|--------|--------|
| N48 | GDPR breach notification | within 72 hours | `privacyData.ts:132` | CONFIRMED (matches GDPR) |
| N49 | Data request window | 30 days | `privacyData.ts:158-159` | CONFIRMED (matches GDPR) |
| N50 | Retention — account data | account duration + 12 months | `privacyData.ts:81` | USER TO CONFIRM |
| N51 | Retention — legal records | 7 years | `privacyData.ts:84` | USER TO CONFIRM |
| N52 | Analytics retention | 13 months | `privacyData.ts:83` | USER TO CONFIRM |
| N53 | Cert roadmap years | 2024–2027 (SOC 2 2024, ISO 27001 2024/2025, GDPR 2025, post-quantum 2026, ISO 27701 2027) | `privacyData.ts:164-169` | USER TO CONFIRM |
| N54 | SOC 2 Type II claim | "Independently audited security controls" | `privacyData.ts:124` | USER TO CONFIRM |

---

## 7. Awards (About page)

| # | Award | Year/Issuer | Source | Status |
|---|-------|-------------|--------|--------|
| N55 | Global Innovation Leader | 2025, World Economic Forum | `aboutData.ts:420` | USER TO CONFIRM / LIKELY FICTIONAL |
| N56 | Best Sovereign Holding Structure | 2024, Institutional Investor | `aboutData.ts:421` | USER TO CONFIRM |
| N57 | Top 50 Frontier Technology Companies | 2024, MIT Technology Review | `aboutData.ts:422` | USER TO CONFIRM |
| N58 | Responsible AI Pioneer | 2023, AI Ethics Board | `aboutData.ts:423` | USER TO CONFIRM |

---

## 8. Timeline date tensions

| # | Tension | Sources | Status |
|---|---------|---------|--------|
| N59 | AUM milestone year | `aboutData.ts:163` says "2025: Group surpasses $2B AUM"; `financialData.ts:130-136` milestones put carbon-neutral at 2024, Neuralis 100B+ at 2025, IPO-track at 2026; `aboutData.ts:212` (2026) says "$2B+ AUM, 10+ subsidiaries" | OUTDATED/CONFLICT — $2B+ claimed as current in a 2026 timeline while financial metrics show $2.8B |
| N60 | "5 Years of Innovation" | heroStats `financialData.ts:13` counts 2020→2025; today is 2026 | OUTDATED |

---

## 9. Consolidated numeric discrepancy register (owner must pick canonical values)

1. AUM: `$2.8B` (Investors) vs `$2B+` (About) → pick one.
2. Headcount: `500+` (About) vs `8,400+` (Careers SEO) → pick one.
3. Industries: `5` (Investors) vs `7 Sectors` (About) → pick one.
4. Countries: `12+` (Investors) vs `15+` (About) → pick one.
5. Hubs: `30+` (claim) vs 3 listed (About) vs 7 offices (Investors/Contact) → align.
6. Education reach: `1,200+` / `1.2M` / `10,000+` / `100,000+` → four numbers, one fact; align and label time-horizon.
7. Neuralis params: `100B+` vs `500B+` → label as "v1 milestone" vs "v3 roadmap".
8. Patents: `1,280+` (doc) vs `85` (Labs) vs `35` (Sarah Lin) → align.

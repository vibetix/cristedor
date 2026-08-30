# 08 — Locations Audit

**Purpose:** All office/hub/location claims and their consistency.

---

## 1. Contact offices (7) — `financialData.ts:160-166` (also Investors mapHubs)

| id | City | Country | Role | Status | Address | Phone | Email |
|----|------|---------|------|--------|---------|-------|-------|
| nyc | New York | USA | Global Headquarters | active | 75 Rockefeller Plaza, 32nd Floor, NY 10019 | +1 (212) 555-0100 | hello@cristedor.com |
| london | London | UK | European Finance Hub | active | 10 Upper Bank Street, Canary Wharf, London E14 5JJ | +44 20 7946 0958 | london@cristedor.com |
| zurich | Zurich | Switzerland | Research & Quantum Centre | active | Gotthardstrasse 26, 8002 Zurich | +41 44 299 3000 | zurich@cristedor.com |
| singapore | Singapore | Singapore | Asia-Pacific HQ | active | Marina Bay Financial Centre Tower 1, Singapore 018981 | +65 6100 0100 | apac@cristedor.com |
| lagos | Lagos | Nigeria | Africa Operations Hub | planned | Victoria Island, Lagos | +234 1 271 0100 | africa@cristedor.com |
| nairobi | Nairobi | Kenya | EdTech & Innovation Lab | planned | Westlands, Nairobi | +254 20 360 0100 | nairobi@cristedor.com |
| tokyo | Tokyo | Japan | Frontier Research Lab | planned | Roppongi Hills Mori Tower, Minato-ku, Tokyo 106-6108 | +81 3 6434 0100 | tokyo@cristedor.com |

> **Note:** Phone numbers use fictional-style `555-0100`/`0100` exchange patterns (NYC +1 (212) 555-0100, Zurich +41 44 299 3000, etc.). LIKELY FICTIONAL — owner must provide real numbers. Lagos/Nairobi/Tokyo status `planned` — owner confirm whether these should be public.

## 2. Global hubs (About page) — `aboutData.ts:291` (globalHubs, only 3)

| City | Country | Type | Role |
|------|---------|------|------|
| New York | United States | Global Headquarters | strategy, capital, governance |
| Zurich | Switzerland | (hub) | (European) |
| Singapore | (APAC) | (hub) | (Asia-Pacific) |

## 3. Country/hub claim register

| # | Claim | Value | Conflict |
|---|-------|-------|----------|
| L1 | "12+ Countries Served" (hero) | Investors | vs "15+ Countries Reached" (About) |
| L2 | "30+ Global Hubs" (groupStats + careers benefit) | claimed | only 3 hubs listed in `globalHubs`; 7 offices in data |
| L3 | Division hub claims (portfolioData `hubs` arrays) | see matrix | overlaps city set |

## 4. Subsidiary hub matrix (portfolioData `hubs`)

| Company | Hubs |
|---------|------|
| Cristedor Labs | Lagos, London, San Francisco |
| Cristedor Media | New York, London, Lagos |
| Future Ventures | Zurich, Singapore, San Francisco |
| Synapse Compute | San Francisco, Zurich, Singapore |
| Krypton Security | London, New York |
| Veritas News | New York, London, Tokyo |
| Immerse | Los Angeles, London |
| Academia | Boston, Singapore, Nairobi |
| Quantum AM | New York, Zurich, Singapore |
| Equinox VC | San Francisco, London |
| Neuralis | New York, Zurich |
| BioSyn | Tokyo, Boston |
| Aether Fusion | Oxford, Zurich |
| Hyperion | El Segundo, Munich |
| Vanguard Materials | Tokyo, Singapore |

## 5. City-set vs office-set mismatches

| # | Mismatch | Detail |
|---|----------|--------|
| L4 | Lagos/Nairobi listed as subsidiary hubs but office status = `planned` | e.g., Academia hubs include Nairobi (planned office); Cristedor Labs hubs include Lagos (planned). |
| L5 | Cities on site with no contact office | San Francisco, Los Angeles, Boston, El Segundo, Munich, Oxford — subsidiary hubs with no office entry. "12+/15+ countries" can only be substantiated via these. |
| L6 | Tokyo listed in Veritas hubs and office list (planned) | consistent within data. |
| L7 | "Europe + APAC expansion 2023" (timeline) vs Zurich/Singapore offices | consistent story (Zurich, Singapore opened 2023 — financialData milestone "Opened European and APAC hubs in Zurich and Singapore"). |

## 6. Owner actions
- Provide real phone numbers (L1 pattern) or remove phones.
- Decide whether `planned` offices (Lagos/Nairobi/Tokyo) should appear as "opening soon" or be removed.
- Canonicalize hub count (30+ vs 3 vs 7) — this is the single most-flagged location inconsistency (C6).
- Confirm the "12+"/"15+" country count and reconcile.

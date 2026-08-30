# 09 — People & Leadership Audit

**Purpose:** All named people, roles, and credentials on the site.

**Source:** `leadershipData.ts`, `aboutData.ts` (founder story, awards), careers listings.

---

## 1. Executive team (4 leaders) — `leadershipData.ts`

| Name | Role | Credentials | Image |
|------|------|-------------|-------|
| Alexander Cristedor | Group Founder & CEO | M.S. Computer Science, MIT; B.S. Economics, Wharton; 15+ Years Sovereign Asset Management | Unsplash photo (1507003211169...) |
| Dr. Evelyn Vance | CSO & Head of Future Labs | Ph.D. (MIT); former NASA Principal Investigator | Unsplash photo (1573496359142...) |
| Marcus Thorne | Group Managing Partner & CIO | MBA, Stanford; 20+ yrs; **manages $14.2B portfolio** | Unsplash photo (1500648767791...) |
| Sarah Lin | Managing Director, Cristedor Tech | B.S. Stanford; 35 Tech Patents; former VP Cloud Engineering | Unsplash photo (1580489944761...) |

## 2. Founder story quotes
- Quote: "I wanted to build something that would outlast me — companies that solve real problems, powered by patient capital and sovereign vision." — Alexander Cristedor (`aboutData.ts:150-151`).

## 3. Named entities / implied staff
- "Cristedor Group DPO" (Data Protection Officer) — privacyData contactOptions.
- "European Data Protection Representative" — privacyData.
- "Cristedor Communications Office" — author of newsroom press releases.
- No other named individuals on site (no news bylines besides "Cristedor Communications Office").

## 4. Red flags / owner confirmation

| # | Issue | Detail | Status |
|---|-------|--------|--------|
| PE1 | $14.2B portfolio vs AUM $2.8B/$2B+ | Marcus Thorne "manages a $14.2B portfolio" (bio) exceeds stated group AUM by 5–7x. Must reconcile or the bio is fiction. | CONFLICT (see C1) |
| PE2 | Unsplash stock photos for leadership | All 4 headshots are stock images (`images.unsplash.com`). Not real headshots. | PLACEHOLDER — owner must supply photos |
| PE3 | "35 Tech Patents" for Sarah Lin | Unverifiable. | USER TO CONFIRM |
| PE4 | "Cristedor Tech" role but no such subsidiary | Sarah Lin is "Managing Director, Cristedor Tech" — Cristedor Tech is only referenced in About timeline (2021) and Newsroom COMPANIES filter; no Cristedor Tech in portfolioData (Tech division = Cristedor Labs). | CONFLICT (naming) |
| PE5 | NASA PI / MIT Ph.D. (Dr. Vance), MIT/Wharton (Founder), Stanford MBA (Thorne) | Unverifiable academic claims. | USER TO CONFIRM |
| PE6 | No PeopleOps/other leadership | Site only names 4 executives; board members not named despite "7 members, 5 independent". | GAP |
| PE7 | About leadership grid social links = `href="#"` | Dead links. | PLACEHOLDER (see 18/I20) |
| PE8 | Founder bio vs origin story "after years at intersection of sovereign capital and deep technology" | Consistent internally; ownership of the claim is the question. | USER TO CONFIRM |

## 5. Awards (credited to the company, About page) — `aboutData.ts:419-423`

| Year | Award | Issuer |
|------|-------|--------|
| 2025 | Global Innovation Leader | World Economic Forum |
| 2024 | Best Sovereign Holding Structure | Institutional Investor |
| 2024 | Top 50 Frontier Technology Companies | MIT Technology Review |
| 2023 | Responsible AI Pioneer | AI Ethics Board |

All 4: USER TO CONFIRM / LIKELY FICTIONAL (owner must verify real issuers exist and awards were won).

## 6. Owner actions
- Reconcile Thorne's $14.2B portfolio claim with group AUM (Q14).
- Provide real executive headshots (or remove images).
- Confirm credentials; remove/adjust anything not real.
- Name Cristedor Tech or rename the role (Q5, S4).
- Wire social links; update JSON-LD sameAs (Q42, I14).

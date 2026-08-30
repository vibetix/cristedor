# 11 — Careers Audit

**Purpose:** All careers content: jobs, compensation, benefits, process, SEO.

**Source:** `src/data/careersData.ts`, `CareersPage.tsx`, `useSEO.ts`.

---

## 1. Open roles (12) — `careersData.ts:24-190`

| # | Title | Division | Location | Compensation | Posted |
|---|-------|----------|----------|--------------|--------|
| 1 | Principal Quantum Compute Architect | (labs color) | Zurich | $280K–$420K | 2026-06-15 |
| 2 | Senior Staff AI Cognitive Scientist | ai | New York | $220K–$350K | 2026-07-01 (featuredRoleId) |
| 3 | Managing Director, DeepTech Investments | finance (Cristedor Capital) | London | $350K–$550K | 2026-05-20 |
| 4 | Senior Magnet Fusion Systems Engineer | labs (Aether Fusion Labs) | Oxford | — | — |
| 5 | Staff Product Designer | tech | — | — | — |
| 6 | Head of Media Strategy & Distribution | media | — | — | — |
| 7 | Senior Machine Learning Engineer | ai | — | — | — |
| 8 | Director of Education Products | edu | — | — | — |
| 9 | Research Fellow — Quantum Error Correction | labs | — | — | — |
| 10 | VP of Engineering | tech | — | $? | (15+ yrs, 50+ engineer orgs) |
| 11 | Full-Stack Engineer | tech | — | — | — |
| 12 | Computational Materials Scientist | labs | — | — | — |

> Fields with `—` were not captured in the audit grep (salary/date present on first 3 only). Compensation range only on 3 roles. Featured role: `senior-staff-ai-scientist` (careersData:233).

## 2. Jobs filter behavior (CareersPage)
- Filters: division (6 via `divisionColors`), type (Full-Time/Contract etc.), search query.
- Empty state: Briefcase icon, "No positions match your search", Reset Filters button → `setSelectedDivision('all'); setSelectedType('all'); setSelectedSearchQuery('')` (approx. — exact reset confirmed: `setSelectedDivision('all'); setSelectedType('all'); setSearchQuery('')`).

## 3. Division naming/colors — `careersData` `divisionColors`/`divisionLabels`

| key | Label | Color |
|-----|-------|-------|
| tech | Technology | #00F0FF |
| ai | AI & Robotics | #8B5CF6 |
| media | Media | #D4AF37 |
| edu | Education | #10B981 |
| finance | Finance | #6366F1 |
| labs | Future Labs | #F59E0B |

> **Note:** "Future Labs" (careers) vs "Frontier Labs" (portfolioOverview/Divisions) vs "Labs" (hero) — naming inconsistency (S3).

## 4. Benefits (8) — `careersData.ts:193-200`

1. Competitive Base + Equity (#D4AF37)
2. Premium Healthcare (#FF5C72)
3. Global Hub Access — "Work from any of our 30+ hubs worldwide — New York, Zurich, Singapore, and more." (#4F7CCF) ← conflicts C6
4. Learning & Development — $10K annual budget (#3DDC97)
5. Unlimited PTO (#63A8FF)
6. Remote-Friendly (#8B5CF6)
7. Equipment Budget — $5K (#00F0FF)
8. Team Retreats — quarterly (#F59E0B)

## 5. Process (4 steps) — `careersData.ts:204-207`
1. Submit Application
2. Initial Screening (30-min call)
3. Technical Interview
4. Final Decision — "Offer extended within 48 hours of final interview"

## 6. Other sections
- hiringTraits (5): Curious Minds, Long-Term Thinkers, Builders, Team Players, Ownership Mentality (careersData:302-306).
- Internships & Graduate Programmes (section 10): Graduate Programme, Summer Internship, Research Fellowship, Apprenticeship (careersData:311-332).
- Diversity, Equity & Inclusion (4 commitments): Equal Opportunity, Inclusive Culture, Accessibility, Continuous Progress (careersData:344-347).
- Work Flexibility / remotePolicy (careersData:352).
- Onboarding: Join → 4-week onboarding programme (careersData:363-364).
- Employee stories, team cards, learning timeline, recruitment stats, candidate resources, hiring locations (Leaflet), application progress steps.

## 7. SEO claim conflict
- `/careers` meta: "Join **8,400+ researchers & engineers**" (`useSEO.ts:32`) vs About "**500+** Team Members" (`aboutData.ts:287`). CONFLICT (C2).

## 8. Owner actions
- Confirm 12 roles are real/open; confirm salary bands (Q34).
- Canonicalize "8,400+" vs "500+" headcount (Q35).
- Canonicalize "30+ hubs" claim (Q36).
- Confirm $10K/$5K budgets and remote policy (Q37/Q38).
- Confirm division label: Future Labs vs Frontier Labs (Q11).

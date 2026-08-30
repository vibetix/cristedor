# Cristedor Group — Content & Structure Audit: Executive Summary

**Audit type:** Read-only content, structure, and truthfulness audit. No code changes made.
**Scope:** All 11 pages, all data files, all hooks/components, `index.html`, `public/`, and 15 planning docs.
**Date:** 2026-08-08

---

## What was audited
- **11 pages** (Home, Portfolio, VentureDetail, Divisions, About, Investors, Newsroom, Careers, Contact, Privacy, 404).
- **All data sources** (`src/data/*.ts` — the single source of claims), hooks (`useRoute`, `useSEO`), components, `index.html` meta/JSON-LD, and the `public/` asset folder.
- **15 root planning docs** — treated as aspirational, NOT as owner confirmations.

## Headline results

| Measure | Count |
|---------|-------|
| Total claims catalogued | ~60 (numbers/companies/locations/people/products/links) |
| Internally consistent facts (CONFIRMED) | ~14 |
| Cross-source conflicts (same fact, different number) | 8 |
| Claims requiring owner confirmation | 10 groups (K1–K10) |
| Placeholder / broken references | 6 |
| Reports produced | 20 numbered docs + this summary |

## Critical issues found (top 5)
1. **Conflicting AUM** — Investors page `$2.8B` vs About page `$2B+`. (04/C1, 18/I1)
2. **Conflicting headcount** — About `500+` vs Careers SEO `8,400+`. (04/C2, 18/I2)
3. **Missing `og-image.jpg`** — referenced in og:image/twitter:image, file absent → every social share is broken. (18/I3)
4. **Dead footer social icons** — LinkedIn/Twitter/YouTube/Instagram render with no URL. (18/I4)
5. **Placeholder YouTube URL** in a live news article (`watch?v=example`). (18/I5)

## Top 20 owner confirmations (see 17 for full list)
1. Canonical AUM ($2.8B vs $2B+) · 2. Canonical headcount (500+ vs 8,400+) · 3. Sectors (5 vs 7) · 4. Countries (12+ vs 15+) · 5. Hub count (30+ vs 3 vs 7) · 6. Education reach (4 different numbers) · 7. Patents (85/35/1,280) · 8. Marcus Thorne "$14.2B portfolio" · 9. $1.5B fusion/AI press release · 10. "Carbon-neutral since 2024" · 11. AAA ESG rating · 12. 4 awards (WEF etc.) · 13. 4 executive bios + real headshots · 14. 15 `.cristedor.com` subdomains live · 15. 12 job listings + salary bands · 16. 5 report PDFs (hosting) · 17. Certifications (SOC 2/ISO/GDPR) · 18. 7 offices + real phone numbers · 19. 18+ emails monitored · 20. Social handles + canonical domain.

## Recommended next steps
1. Owner answers 17_PAGE_BY_PAGE_QUESTIONS.md.
2. Apply 19_RECOMMENDED_CONTENT_CHANGES.md (R1–R10 are safe to do immediately).
3. Rebuild + typecheck after any edits; update 20_CRISTEDOR_CONTENT_MASTER.md.

## Deliverable index
| Doc | Title |
|-----|-------|
| 01 | Platform Overview |
| 02 | Complete Site Map |
| 03 | Page Inventory |
| 04 | Cristedor Content Truth Matrix |
| 05 | Numbers & Metrics Audit |
| 06 | Company Structure Audit |
| 07 | Products & Services Audit |
| 08 | Locations Audit |
| 09 | People & Leadership Audit |
| 10 | Newsroom Audit |
| 11 | Careers Audit |
| 12 | Contact Audit |
| 13 | Privacy & Legal Audit |
| 14 | External Link Audit |
| 15 | Images & Assets Audit |
| 16 | SEO Metadata Audit |
| 17 | Page-by-Page Owner Questions |
| 18 | Critical Issues |
| 19 | Recommended Content Changes |
| 20 | Cristedor Content Master |

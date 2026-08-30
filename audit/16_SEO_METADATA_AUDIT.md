# 16 — SEO Metadata Audit

**Purpose:** Every title/description/canonical/structured-data on the site and its correctness.

**Source:** `index.html`, `src/hooks/useSEO.ts`.

---

## 1. Static head (index.html)

| Tag | Value | Verdict |
|-----|-------|---------|
| title | "Cristedor Group \| Building Companies That Shape Tomorrow" | CONFIRMED (but overridden at runtime — see §3) |
| meta description | "Cristedor Group is a diversified holding company building technology, media, and future-focused businesses that create lasting impact across Africa and beyond." | CONFIRMED (static) |
| meta keywords | "Cristedor Group, holding company, technology, media, ventures, Africa, innovation, investment" | NOTE — keywords meta is deprecated/ignored by Google; harmless |
| og:type | website | CONFIRMED |
| og:site_name | Cristedor Group | CONFIRMED |
| og:title | same as title | CONFIRMED |
| og:description | "A diversified company building technology, media, and future-focused businesses..." | CONFIRMED (shorter variant) |
| og:url | https://cristedor.com | CONFIRMED if domain is correct (Q50) |
| og:image | https://cristedor.com/og-image.jpg | **BROKEN — file missing (I3)** |
| twitter:card | summary_large_image | CONFIRMED |
| twitter:image | https://cristedor.com/og-image.jpg | **BROKEN — same (I3)** |
| theme-color | #050914 | CONFIRMED |
| JSON-LD Organization | name, url, logo (space in filename), description, foundingDate 2020, sameAs [linkedin.com/company/cristedor, twitter.com/cristedor] | sameAs handles mismatch site socials (I14); logo URL space (I19) |

## 2. Runtime SEO (useSEO.ts — per-route title/description/canonical/JSON-LD)

| Route | Title | Description | Flags |
|-------|-------|-------------|-------|
| `/` | "Cristedor Group \| Empowering Human Advancement" | "...building leading ventures across Technology, Media, Education, Finance, AI, and Future Labs." | DIFFERS from static title; runtime wins |
| `/portfolio` | "Portfolio Matrix & Ventures \| Cristedor Group" | "Explore Cristedor Group's 12+ market-defining subsidiaries..." | "12+" understates 15 (N12) |
| `/divisions` | "Enterprise Divisions \| Cristedor Group" | "6 operational divisions: Tech, Media, Education, Finance, AI & Robotics, and Future Labs." | division naming variant ("Future Labs") |
| `/about` | "About & Governance \| Cristedor Group" | "Corporate history, founding mission, core values, executive leadership, and ESG commitment" | CONFIRMED |
| `/investors` | "Investor Relations & Capital \| Cristedor Group" | "...quarterly earnings, stock simulation, ESG disclosures, and audited financial filings." | **"stock simulation" + "quarterly earnings" — no such features found in code** |
| `/newsroom` | "Press & Newsroom \| Cristedor Group" | "Official press releases, executive thought leadership, downloadable media kit" | CONFIRMED |
| `/careers` | "Global Careers & Culture \| Cristedor Group" | "Join 8,400+ researchers & engineers..." | **CONFLICT with 500+ (C2)** |
| `/contact` | "Global HQs & Contact \| Cristedor Group" | "Locate Cristedor Group offices in New York, London, Tokyo, Singapore, and Zurich." | **lists 5 offices but actual set = NY/London/Zurich/Singapore active (Tokyo planned)** |
| `/privacy` | "Privacy Policy & Terms \| Cristedor Group" | "...technical telemetry policies" | CONFIRMED |
| `/404` | "404 Route Not Found \| Cristedor Group" | "The requested page or asset does not exist in the Cristedor Group ecosystem directory." | CONFIRMED |
| `/portfolio/:id` | "{Company Name} \| Cristedor Group" | tagline + description (≤160 chars) | CONFIRMED; JSON-LD Organization + BreadcrumbList |

## 3. Behavior notes

| # | Behavior | Detail |
|---|----------|--------|
| S1 | Runtime overrides static | `useSEO` replaces document.title + og:title/description/url + adds canonical + JSON-LD on mount, so the static index.html tags only matter pre-hydration. Static og:image/twitter:image are NOT touched by useSEO — so the missing og-image remains a bug for social scrapers. |
| S2 | canonical | Set from `window.location.origin + pathname` for every route (including /portfolio/:id). Good. |
| S3 | og:type fixed "website" for ventures | Venture detail pages are company profile pages; "website" is acceptable but "profile"/"organization" is more accurate for the schema.org graph. |
| S4 | Investors SEO claims "stock simulation" & "quarterly earnings" | No stock simulator or earnings data exists in code — SEO copy describes features not implemented. |
| S5 | `/contact` SEO omits Lagos/Nairobi (planned) | Consistent-ish, but "Tokyo" listed without "planned" qualifier. |

## 4. Missing SEO elements

| # | Element | Verdict |
|---|---------|---------|
| M1 | sitemap.xml | NOT present in `public/`. | HIGH — add |
| M2 | robots.txt | NOT present in `public/`. | HIGH — add |
| M3 | Open Graph image file | missing (I3). | CRITICAL |
| M4 | favicon variants | only favicon.ico; no apple-touch-icon / PNG sizes. | LOW |
| M5 | Per-venture JSON-LD `jobPosting` | Careers roles are modal-driven; no jobPosting structured data even though 12 roles exist. | MEDIUM — opportunity |
| M6 | Article JSON-LD | Newsroom articles have no Article/NewsArticle structured data. | MEDIUM — opportunity |
| M7 | hreflang | none (site is en only). | NOTE |
| M8 | LocalBusiness/HQ address structured data | Contact page has full addresses but no schema.org ContactPoint/PostalAddress. | LOW |

## 5. Owner actions
- Add og-image.jpg (Q49), sitemap.xml, robots.txt.
- Correct /investors SEO copy (remove "stock simulation"/"quarterly earnings" or implement features).
- Canonicalize /careers headcount claim (Q35).
- Canonicalize /contact office list (Q39) and /divisions division naming (Q11).
- Align JSON-LD sameAs (Q42).
- Consider jobPosting + NewsArticle structured data.

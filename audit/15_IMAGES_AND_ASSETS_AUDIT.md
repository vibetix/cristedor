# 15 — Images & Assets Audit

**Purpose:** Every static asset in `public/`, its usage, and gaps.

**Source:** `public/` directory listing; grep for asset references.

---

## 1. Public asset inventory (20 files)

| File | Size | Likely usage |
|------|------|--------------|
| favicon.ico | 4.3 KB | site favicon (index.html:6) — CONFIRMED used |
| cristedor logo.png | 106.9 KB | Navbar/Footer logo (name contains space) |
| mobile logo.png | 93.4 KB | mobile nav logo |
| card_labs.jpg | 884 KB | portfolio/division card image |
| card_media.jpg | 685 KB | portfolio/division card image |
| card_ventures.jpg | 772 KB | portfolio/division card image |
| news_podcast.jpg | 696 KB | Newsroom podcast article image |
| news_team.jpg | 996 KB | Newsroom article image |
| icons8-artificial-intelligence-64.png | 1.8 KB | AI section icon |
| icons8-aws-logo-96.png | 2.6 KB | tech logo |
| icons8-banknotes-100.png | 1.7 KB | finance icon |
| icons8-education-64.png | 1.4 KB | education icon |
| icons8-electronics-96.png | 1.0 KB | hardware icon |
| icons8-innovation-64.png | 2.0 KB | innovation icon |
| icons8-media-64.png | 1.4 KB | media icon |
| icons8-microsoft-96.png | 1.0 KB | partner logo |
| icons8-notion-96.png | 2.5 KB | partner logo |
| icons8-real-estate-96.png | 1.9 KB | real estate icon |
| icons8-research-64.png | 2.3 KB | research icon |

## 2. Asset gaps / broken references

| # | Issue | Detail | Severity |
|---|-------|--------|----------|
| A1 | `og-image.jpg` missing | Referenced in index.html og:image + twitter:image (`https://cristedor.com/og-image.jpg`); NOT in `public/`. Social shares break. | CRITICAL (I3) |
| A2 | Filenames with spaces | `cristedor logo.png`, `mobile logo.png` — referenced in JSON-LD as `cristedor logo.png` (unencoded). Works in local file system, fragile in URLs. | LOW (I19) |
| A3 | Logo asset duplication | Both `cristedor logo.png` and `mobile logo.png` exist — intended (desktop vs mobile) but confirm. | NOTE |
| A4 | Unsplash remote images | Leadership avatars are remote `images.unsplash.com` URLs (4). Not in `public/`. If replaced, must be localized. | HIGH (09/PE2) |
| A5 | Only 3 card images | `card_labs`, `card_media`, `card_ventures` — only 3 of 15 subsidiaries have card imagery; others rely on CSS/gradients. | NOTE / GAP |
| A6 | Newsroom images | `news_podcast.jpg`, `news_team.jpg` cover 2 of 6 articles; remaining articles have no images (CSS gradients used). | NOTE |
| A7 | icons8 third-party art | 12 icons from icon8 (pragmatic brand icons); licensing is free-with-attribution — confirm attribution requirements are met. | LOW |

## 3. Owner actions
- Add `public/og-image.jpg` (1200×630 recommended) (Q49).
- Rename logo files to URL-safe names or URL-encode references (Q50).
- Confirm which subsidiaries need real card imagery (Q5).
- Localize/replace leadership headshots (Q13).

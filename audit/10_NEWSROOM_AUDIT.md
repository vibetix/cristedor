# 10 — Newsroom Audit

**Purpose:** All newsroom content, taxonomy, and integrity flags.

**Source:** `src/data/newsData.ts` (6 articles, 252 lines), `NewsroomPage.tsx`.

---

## 1. Taxonomy

| Item | Values | Source |
|------|--------|--------|
| Categories (4) | Press Release · Executive Insight · Innovation · Acquisition | newsData:3-20 (CATEGORY_GRADIENTS) |
| Company filter (6) | All Companies, Cristedor Group, Cristedor Labs, Cristedor Tech, Cristedor Media, Future Ventures | newsData:22 |
| Tags (15) | AI, Technology, Media, Investment, Education, Innovation, Research, Leadership, Partnership, Events, Fusion, Cloud, Cybersecurity, Data, Sustainability | newsData:24-28 |
| Archive years | 2026, 2025, 2024, 2023 | newsData:30 |

## 2. Articles (6)

| # | id | Title | Date | Category |
|---|-----|-------|------|----------|
| 1 | fusion-compute-commitment | Cristedor Group Announces $1.5 Billion Commitment to Next-Generation Magnet Fusion & AI Compute | July 18, 2026 | Press Release (featured + pinned, 2,847 views, 4 min) |
| 2 | holding-model-insight | Executive Insight: Why Corporate Holding Models Outperform Traditional Venture Funds in DeepTech | June 29, 2026 | Executive Insight |
| 3 | synapse-expansion | Synapse Compute Systems Expands Sovereign Cloud Infrastructure to Zurich Tech Hub | May 14, 2026 | Press Release |
| 4 | krypton-encryption-launch | Cristedor Labs Launches Krypton: Post-Quantum Encryption for the Sovereign Cloud Era | April 22, 2026 | Press Release |
| 5 | podcast-series-launch | Cristedor Media Launches "The Sovereign Signal" — A Podcast on DeepTech and Sovereign Innovation | March 10, 2026 | Press Release (has `videoUrl`) |
| 6 | edu-labs-partnership | Cristedor Labs and Oxford University Announce Research Partnership in Quantum Computing | February 5, 2026 | Press Release |

## 3. Integrity flags

| # | Flag | Detail | Status |
|---|------|--------|--------|
| N1 | All 6 articles dated 2026 | Archive offers 2023–2025 but no older articles exist. Looks like a fresh/empty archive. | GAP — backfill real history or narrow years |
| N2 | Featured article = biggest claim | $1.5B fusion & AI compute commitment is featured + pinned with view count 2,847. If not real, it is the most visible false claim on the site. | USER TO CONFIRM / LIKELY FICTIONAL |
| N3 | View counts | 2,847 views on featured article; other articles have counts too (read in data). Unverifiable; analytics not wired anywhere. | USER TO CONFIRM |
| N4 | Placeholder video URL | Podcast article `videoUrl: 'https://youtube.com/watch?v=example'` (newsData:205). | PLACEHOLDER — broken link (18/I5) |
| N5 | "Cristedor Tech" company filter | COMPANIES includes Cristedor Tech — not in portfolioData. | CONFLICT (S4) |
| N6 | Authors | All articles authored "Cristedor Communications Office". No named journalist/executive bylines. | NOTE |
| N7 | Category usage | No article uses "Acquisition" or "Executive Insight" category beyond article 2. Taxonomy richer than content. | NOTE |
| N8 | Content/facts referenced | Article 1 (fusion) matches roadmap item "Fusion Pilot Plant 2028"; article 3 (Zurich) matches office; article 6 (Oxford) matches Aether hub. Internally consistent. | CONFIRMED (internal) |

## 4. UI/share features (NewsroomPage)
- Share: LinkedIn intent, X intent, in-app copy-link (`copiedLink` state with CheckCircle feedback). Real working handlers.
- Inline mobile share variant present.
- Filter state combines category, company, tag, year.

## 5. Owner actions
- Confirm or remove the $1.5B press release (Q30).
- Provide real podcast URL or remove video link (Q31).
- Decide whether view counts should be displayed without a real analytics source (Q33).
- Backfill 2023–2025 news or trim archive years (Q32).
- Align "Cristedor Tech" filter with actual company set (Q5).

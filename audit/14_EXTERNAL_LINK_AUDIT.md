# 14 — External Link Audit

**Purpose:** Every external URL on the site, with live-status risk assessment.

---

## 1. Portfolio subdomain links (15) — `portfolioData.ts` websiteUrl

| Company | URL | Risk |
|---------|-----|------|
| Cristedor Labs | https://labs.cristedor.com | UNVERIFIED — owner must confirm DNS/live |
| Cristedor Media | https://media.cristedor.com | UNVERIFIED |
| Future Ventures | https://ventures.cristedor.com | UNVERIFIED |
| Synapse Compute | https://synapsecompute.cristedor.com | UNVERIFIED |
| Krypton Security | https://kryptonsec.cristedor.com | UNVERIFIED |
| Veritas News | https://veritas.cristedor.com | UNVERIFIED |
| Immerse | https://immerse.cristedor.com | UNVERIFIED |
| Academia | https://academia.cristedor.com | UNVERIFIED |
| Quantum AM | https://quantumam.cristedor.com | UNVERIFIED |
| Equinox VC | https://equinoxvc.cristedor.com | UNVERIFIED |
| Neuralis | https://neuralis.cristedor.com | UNVERIFIED |
| BioSyn | https://biosyn.cristedor.com | UNVERIFIED |
| Aether Fusion | https://aetherfusion.cristedor.com | UNVERIFIED |
| Hyperion | https://hyperion.cristedor.com | UNVERIFIED |
| Vanguard Materials | https://vanguardmaterials.cristedor.com | UNVERIFIED |

All are `https://*.cristedor.com` pattern (consistent). Live-status cannot be verified from the repo. If these subdomains do not resolve, every "Visit Website" button on portfolio cards is broken.

## 2. Privacy subprocessor URLs — `privacyData.ts:107-110`
Cloudflare (`https://www.cloudflare.com/privacypolicy/`) · Vercel (`https://vercel.com/legal/privacy-policy`) · Google Analytics (`https://policies.google.com/privacy`) · Stripe (`https://stripe.com/privacy`)

These are real vendor privacy pages. CONFIRMED (URLs valid).

## 3. Newsroom URLs
- `https://youtube.com/watch?v=example` — placeholder (18/I5, CRITICAL).
- Share handlers (NewsroomPage): LinkedIn intent `https://www.linkedin.com/sharing/share-offsite/?url=...` and X intent — real patterns.
- JobApplicationModal LinkedIn share: `https://www.linkedin.com/sharing/share-offsite/?url=...` — real.
- JobApplicationModal Google Scholar placeholder: `https://scholar.google.com/citations?user=...` — placeholder text input default.

## 4. Social URLs — `contactData.ts:92-95`
| Platform | URL | Verdict |
|----------|-----|---------|
| LinkedIn | https://linkedin.com/company/cristedor-group | UNVERIFIED handle |
| X | https://x.com/cristedorgroup | UNVERIFIED handle |
| YouTube | https://youtube.com/@cristedorgroup | UNVERIFIED handle |
| GitHub | https://github.com/cristedor | UNVERIFIED handle |

## 5. Leadership images — `leadershipData.ts`
4 × `https://images.unsplash.com/photo-...` — external CDN; if Unsplash URL rotates, avatars break. Also they are stock photos, not real headshots (09/PE2).

## 6. Dead/placeholder link register (no href at all)

| # | Location | Detail | Severity |
|---|----------|--------|----------|
| E1 | Footer social icons (LinkedIn/Twitter/YouTube/Instagram) | buttons, no href, no onClick | CRITICAL (I4) |
| E2 | About leadership grid socials | `href="#"` | HIGH (I20) |
| E3 | Podcast videoUrl | `watch?v=example` | CRITICAL (I5) |
| E4 | index.html og:image / twitter:image | `https://cristedor.com/og-image.jpg` — file absent | CRITICAL (I3) |
| E5 | JSON-LD logo | `https://cristedor.com/cristedor logo.png` — file exists in public but URL contains unencoded space | LOW (I19) |
| E6 | JSON-LD sameAs | `linkedin.com/company/cristedor`, `twitter.com/cristedor` — mismatch with live handles | MEDIUM (I14) |

## 7. Owner actions
- Verify all 15 `.cristedor.com` subdomains resolve (Q6).
- Verify 4 social handles exist (Q42).
- Replace placeholder/break links (E1–E4).
- Confirm GitHub handle vs company brand (Q42).

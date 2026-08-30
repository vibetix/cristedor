# Cristedor Group — Complete UI/UX Brand Consistency Audit

**Audit Date:** July 2026  
**Scope:** Every page, component, modal, dropdown, form, and hidden page  
**Standard:** Cristedor Design System v1.0  

---

## Executive Summary

The Cristedor Group website has **significant brand consistency issues** that undermine its enterprise positioning. The two most damaging problems are:

1. **A parallel colour system (`#6C63FF` purple / `#3B82F6` blue / Tailwind zinc palette) has been introduced across ~40% of the codebase** — contradicting the official `#4F7CCF` accent system.
2. **Pure black `#000` backgrounds are used instead of the brand's deep navy `#050914`** — creating a jarring, non-corporate appearance on 4 of 11 pages.

**Overall Brand Score: 5.2/10**

---

## Page-by-Page Audit

### 1. HomePage.tsx — Score: 4.0/10

| Category | Score |
|----------|-------|
| Colour Consistency | 3/10 |
| Gradient Consistency | 3/10 |
| Background Colours | 4/10 |
| Typography | 6/10 |
| Component Consistency | 4/10 |
| Animation | 7/10 |
| Accessibility | 5/10 |

**Critical Issues:**
- Root background is `#000` (pure black) instead of `#050914`
- `GradientHeading` uses `#6C63FF → #3B82F6` — both colours are outside the brand palette
- `SectionLabel`, `NewsCard` badges, and chevrons all use `#6C63FF` indigo
- Modal background is `#09090b` (Tailwind zinc-950) instead of brand surfaces
- Modal borders use `#27272a` (Tailwind zinc-800) instead of `#22324B`
- `#a1a1aa`, `#71717a`, `#e4e4e7` (Tailwind neutral/zinc) used for text — not brand tokens
- Secondary button uses `rgba(0,0,0,0.9)` background and `#27272a` border
- All section borders use `rgba(255,255,255,0.05-0.12)` instead of `#22324B`

**High Issues:**
- Hero subtitle uses `#a1a1aa` (Tailwind neutral-400)
- "View All News" button uses `rgba(255,255,255,0.06)` background and `rgba(255,255,255,0.12)` border
- Missing keyboard focus states on CTA buttons

**Medium Issues:**
- IndustryPill border opacity is 0.12 instead of standard 0.18
- CompanyCard description uses `rgba(255,255,255,0.65)` instead of `#D6DEE8`
- Stats labels use `rgba(255,255,255,0.45)` instead of `#A2B2C7`

---

### 2. PortfolioPage.tsx — Score: 4.5/10

| Category | Score |
|----------|-------|
| Colour Consistency | 3/10 |
| Gradient Consistency | 3/10 |
| Background Colours | 3/10 |
| Typography | 6/10 |
| Component Consistency | 5/10 |
| Animation | 7/10 |
| Accessibility | 4/10 |

**Critical Issues:**
- Page background is `#000` instead of `#050914`
- Hero bottom gradient fades to `#000` instead of `#050914`
- Hero tagline gradient uses `#6C63FF → #3B82F6` — neither colour is in the brand
- Hero section tag label uses `#6C63FF`
- Ambient orb uses `rgba(99,102,241,0.08)` (indigo `#6366F1`)

**High Issues:**
- Featured card shadow uses custom composite value outside shadow scale
- Featured card border uses `rgba(255,255,255,0.08)` instead of glass border
- Subsidiary card background opacity is 0.4 — not in glass scale (0.5/0.72/0.85)
- Subsidiary card border opacity is 0.12 instead of 0.18
- Empty state background uses non-standard opacity 0.3

**Medium Issues:**
- All muted text uses arbitrary `rgba(255,255,255,0.35-0.55)` opacities
- Section dividers use `rgba(255,255,255,0.06/0.1)` instead of `#22324B`
- Search input background is `rgba(10,18,32,0.7)` — not a design token
- No focus-visible styles on clickable cards

---

### 3. VentureDetailPage.tsx — Score: 5.0/10

| Category | Score |
|----------|-------|
| Colour Consistency | 4/10 |
| Gradient Consistency | 5/10 |
| Background Colours | 3/10 |
| Typography | 6/10 |
| Component Consistency | 5/10 |
| Animation | 6/10 |
| Accessibility | 5/10 |

**Critical Issues:**
- Page background is `#000`
- Hero gradient overlay ends at `#000`
- Back button shadow uses `rgba(59,107,199,...)` — not brand accent

**High Issues:**
- Related company card border uses `rgba(79,124,207,0.1)` instead of glass border (0.18)
- Hub badge borders use `rgba(255,255,255,0.06)` instead of `#22324B`
- CTA button shadow uses wrong blue (`rgba(59,107,199,...)` instead of `rgba(79,124,207,...)`)

**Medium Issues:**
- Stat cards and sidebar use `rgba(17,28,46,0.4)` — non-standard opacity
- Muted text uses arbitrary `rgba(255,255,255,0.4-0.55)` values
- No focus-visible on interactive related-company cards
- Back button missing `aria-label`

---

### 4. AboutPage.tsx — Score: 4.5/10

| Category | Score |
|----------|-------|
| Colour Consistency | 3/10 |
| Gradient Consistency | 3/10 |
| Background Colours | 5/10 |
| Typography | 7/10 |
| Component Consistency | 5/10 |
| Animation | 7/10 |
| Accessibility | 6/10 |

**Critical Issues:**
- Scroll progress bar gradient uses `#6C63FF → #3B82F6`
- Scroll progress bar glow uses `rgba(108,99,255,0.5)`
- CTA gradient button uses `#6C63FF → #3B82F6`
- CTA button shadow uses `rgba(108,99,255,...)`
- Hero title gradient uses `#6C63FF → #3B82F6 → #00F0FF`
- Hero tag label uses `#6C63FF`
- Skip-to-content link uses `#6C63FF` background
- Map markers/paths use `#6C63FF` / `#8B7DFF`

**High Issues:**
- Corporate timeline line gradient uses `#6C63FF, #3B82F6, #D4AF37`
- Timeline nodes, year badges, step indicators, culture cards all use `#6C63FF`
- Design Principles section uses `#F59E0B` (not in core brand accent)
- FAQ open state border uses `rgba(108,99,255,0.3)`
- Culture card hover uses `#6C63FF`-based rgba values
- CTA ambient orbs use `rgba(108,99,255,0.1)` and `rgba(59,130,246,0.08)`

**Medium Issues:**
- Cards throughout use `rgba(17,28,46,0.4)` — non-standard glass opacity
- Section borders use `rgba(79,124,207,0.08)` instead of standard borders
- Ambient orbs use `#6C63FF`, `#3B82F6`, `#00F0FF` instead of brand colours
- Leader role text uses `#00F0FF`

---

### 5. CareersPage.tsx — Score: 6.5/10

| Category | Score |
|----------|-------|
| Colour Consistency | 7/10 |
| Gradient Consistency | 8/10 |
| Background Colours | 7/10 |
| Typography | 5/10 |
| Component Consistency | 6/10 |
| Animation | 7/10 |
| Accessibility | 6/10 |

**Critical Issues:** None

**High Issues:**
- Body descriptions use `rgba(255,255,255,0.45)` — disabled-level contrast (~4.8:1)
- Stat labels use `rgba(255,255,255,0.35)` — below WCAG AA 4.5:1

**Medium Issues:**
- Glass button hover uses `rgba(17,28,46,0.7)` instead of 0.72
- Glass border uses `rgba(79,124,207,0.2)` instead of 0.18
- Search input and filter pill borders use 0.15 instead of 0.18
- Cards use `16px` and `14px` border-radius — not in the radius scale (6/12/20/9999)
- Apply/reset buttons use `10px` border-radius — off the scale

**Note:** This is one of the better-aligned pages. Primary gradients correctly use `#4F7CCF → #335EAA`. Section labels use brand accent `#4F7CCF`.

---

### 6. ContactPage.tsx — Score: 6.5/10

| Category | Score |
|----------|-------|
| Colour Consistency | 7/10 |
| Gradient Consistency | 8/10 |
| Background Colours | 7/10 |
| Typography | 5/10 |
| Component Consistency | 6/10 |
| Animation | 7/10 |
| Accessibility | 6/10 |

**Critical Issues:** None

**High Issues:**
- Body descriptions use `rgba(255,255,255,0.45)` — disabled-level contrast

**Medium Issues:**
- Input background uses `rgba(17,28,46,0.6)` — non-standard glass opacity
- Glass button border uses 0.2 instead of 0.18
- Input and company pill borders use 0.15 instead of 0.18
- Form container border uses 0.12 instead of 0.18

**Note:** Gradients are correct (`#4F7CCF → #335EAA`). Primary buttons are well-styled.

---

### 7. InvestorsPage.tsx — Score: 6.0/10

| Category | Score |
|----------|-------|
| Colour Consistency | 6/10 |
| Gradient Consistency | 7/10 |
| Background Colours | 6/10 |
| Typography | 6/10 |
| Component Consistency | 6/10 |
| Animation | 7/10 |
| Accessibility | 6/10 |

**Critical Issues:** None

**High Issues:**
- Body descriptions use `rgba(255,255,255,0.45)` — disabled-level contrast
- Privacy text uses `rgba(255,255,255,0.3)` — below disabled token

**Medium Issues:**
- Cards use `rgba(17,28,46,0.35)` — non-standard opacity
- Glass borders use 0.15 and 0.2 instead of 0.18
- Card shadows use `0 20px 50px rgba(0,0,0,0.3)` instead of shadow-md

---

### 8. NewsroomPage.tsx — Score: 5.5/10

| Category | Score |
|----------|-------|
| Colour Consistency | 4/10 |
| Gradient Consistency | 5/10 |
| Background Colours | 4/10 |
| Typography | 6/10 |
| Component Consistency | 5/10 |
| Animation | 7/10 |
| Accessibility | 5/10 |

**Critical Issues:**
- Root background is `#000` instead of `#050914`

**High Issues:**
- Hero gradient text uses `#6C63FF` and `#3B82F6`
- Reading progress bar gradient uses `#4F7CCF → #00F0FF` (cyan not in gradient spec)
- Hero radial gradient blob uses `rgba(99,102,241,0.08)` (indigo)

**Medium Issues:**
- Body text uses `rgba(255,255,255,0.6)` instead of `#D6DEE8`
- Metadata uses `rgba(255,255,255,0.4)` instead of `#73829A`
- Secondary labels use `rgba(255,255,255,0.5)` instead of `#A2B2C7`
- Glass borders use inconsistent opacities (0.1/0.12/0.15/0.18)
- Shadows use `0 8px 32px` instead of `0 10px 30px`
- Featured card hover shadow uses wrong greenish tone

---

### 9. PrivacyPage.tsx — Score: 7.0/10

| Category | Score |
|----------|-------|
| Colour Consistency | 7/10 |
| Gradient Consistency | 8/10 |
| Background Colours | 8/10 |
| Typography | 6/10 |
| Component Consistency | 7/10 |
| Animation | 7/10 |
| Accessibility | 7/10 |

**Critical Issues:** None

**High Issues:**
- All structural borders use `rgba(79,124,207,0.08/0.1)` instead of `#22324B`

**Medium Issues:**
- Body copy uses `rgba(255,255,255,0.5)` instead of `#A2B2C7`
- Descriptions use `rgba(255,255,255,0.45)` instead of `#A2B2C7`
- Metadata/labels use `rgba(255,255,255,0.3/0.35)` instead of `#73829A`
- Glass borders use 0.1 instead of 0.18

**Note:** This is one of the cleaner pages. Background correctly uses `#050914`. No off-brand accent colours.

---

### 10. NotFoundPage.tsx — Score: 6.5/10

| Category | Score |
|----------|-------|
| Colour Consistency | 6/10 |
| Gradient Consistency | 7/10 |
| Background Colours | 8/10 |
| Typography | 7/10 |
| Component Consistency | 6/10 |
| Animation | 8/10 |
| Accessibility | 6/10 |

**Critical Issues:** None

**High Issues:**
- All structural borders use `rgba(79,124,207,0.06/0.1)` instead of `#22324B`
- Primary CTA hover gradient uses `#5C88DA → #3C69B7` — different from brand
- Missing `*:focus-visible` global style

**Medium Issues:**
- Body text uses `rgba(255,255,255,0.5)` instead of `#A2B2C7`
- Metadata uses `rgba(255,255,255,0.25-0.35)` instead of `#73829A`
- Pill/link items use `rgba(255,255,255,0.45-0.5)` instead of `#A2B2C7`
- Search input background is `rgba(255,255,255,0.03)` instead of glass

**Note:** Background correctly uses `#050914`. No off-brand accent colours in the base design (the `#6C63FF` contamination is absent).

---

### 11. DivisionsPage.tsx — Score: 7.0/10

| Category | Score |
|----------|-------|
| Colour Consistency | 6/10 |
| Gradient Consistency | 7/10 |
| Background Colours | 7/10 |
| Typography | 7/10 |
| Component Consistency | 7/10 |
| Animation | 7/10 |
| Accessibility | 6/10 |

**Critical Issues:**
- Button component's primary variant references `var(--accent-cyan)` which is **not defined** in variables.css

**High Issues:**
- Division icons use `var(--accent-cyan)` — undefined variable
- Finance & Labs icons use `var(--accent-gold)` — undefined variable

---

## Component Audit

### Button.tsx — Score: 3.0/10

**Critical Issues:**
- Primary gradient uses `var(--accent-cyan) → #0284C7` — neither is in the brand
- Primary button text colour is `#07080E` (dark) on blue background — should be `#FFFFFF`

**High Issues:**
- Missing `:focus-visible` ring or keyboard accessibility
- Outline border uses `rgba(148,163,184,0.3)` — not a brand colour

### NewsletterSection.tsx — Score: 4.0/10

**Critical Issues:**
- Container background is `rgb(0,0,0)` — pure black
- Subscribe button gradient is `#3B6BC7 → #4F7CCF → #6B8FD4` — 3-stop off-brand
- Button hover gradient uses `#4578D4 → #5A88D8 → #7599DC` — off-brand

**High Issues:**
- No focus state on input or button — accessibility violation
- Input removes outline with no replacement

### ThemeToggle.tsx — Score: 3.5/10

**Critical Issues:**
- Sun icon colour is `#00F0FF` — not in brand palette
- Moon icon colour is `#0284C7` — not in brand palette

### MobileNav.tsx — Score: 3.0/10

**Critical Issues:**
- Active nav background uses `rgba(108,99,255,0.15)` — `#6C63FF` purple, not `#4F7CCF` blue
- Active nav border uses `rgba(108,99,255,0.35)` — same wrong colour
- Chevron colour uses `#6C63FF`
- CTA gradient uses `#6C63FF → #3B82F6` — entirely wrong colours

### Navbar.tsx — Score: 5.5/10

**High Issues:**
- Contact button uses solid `#FFFFFF` background instead of brand gradient
- Mobile hamburger uses solid `#FFFFFF` background with `#0C1E34` icon

**Medium Issues:**
- Inactive text uses `rgba(255,255,255,0.55)` — not a brand token
- All borders use `rgba(255,255,255,0.06)` instead of brand tokens

### Modal.tsx — Score: 7.0/10

**High Issues:**
- Uses `var(--shadow-lg)` which is not defined in the brand system

**Medium Issues:**
- Overlay uses `rgba(7,8,14,0.75)` instead of `rgba(5,9,20,0.75)`

### Footer.tsx — Score: 6.0/10

**Medium Issues:**
- All borders use `rgba(255,255,255,0.06)` instead of `#22324B`
- Link text uses `rgba(255,255,255,0.5)` — not a brand token
- Copyright text uses `rgba(255,255,255,0.3)` — very low contrast

---

## Systemic Issues (Site-Wide)

### 1. Off-Brand Accent Colour (`#6C63FF`)
**Severity: CRITICAL**  
**Impact: 40% of the codebase**

The purple `#6C63FF` has been introduced as an accent colour across HomePage, PortfolioPage, AboutPage, NewsroomPage, MobileNav, and ThemeToggle. It contradicts the official brand accent `#4F7CCF`. This is the single most damaging brand violation.

**Pages affected:** HomePage, PortfolioPage, VentureDetailPage, AboutPage, NewsroomPage, MobileNav, ThemeToggle

### 2. Pure Black Backgrounds (`#000`)
**Severity: CRITICAL**  
**Impact: 4 pages**

HomePage, PortfolioPage, VentureDetailPage, and NewsroomPage use `#000` instead of `#050914`. This creates a harsh, non-corporate appearance.

### 3. Tailwind Zinc/Neutral Palette Contamination
**Severity: CRITICAL**  
**Impact: HomePage modal system**

`#09090b`, `#18181b`, `#27272a`, `#3f3f46`, `#71717a`, `#a1a1aa`, `#e4e4e7` appear throughout HomePage's modal, secondary buttons, and text. These are Tailwind CSS colour tokens, not Cristedor brand colours.

### 4. White-Based Opacity Borders
**Severity: HIGH**  
**Impact: All pages**

Every page uses `rgba(255,255,255,0.05-0.12)` for borders instead of the defined tokens `#22324B` (soft) / `#2B3E5C` (normal) / `rgba(79,124,207,0.18)` (glass).

### 5. Arbitrary Text Opacities
**Severity: HIGH**  
**Impact: All pages**

`rgba(255,255,255,0.3-0.65)` is used everywhere instead of the defined tokens `#D6DEE8` (secondary), `#A2B2C7` (muted), `#73829A` (disabled). This creates inconsistent text appearance and accessibility failures.

### 6. Undefined CSS Variables
**Severity: HIGH**  
**Impact: Button.tsx, DivisionsPage, HoldingEcosystem**

`--accent-cyan`, `--accent-cyan-glow`, `--accent-gold`, `--shadow-lg` are referenced but never defined in variables.css. These will fall back to nothing or browser defaults.

### 7. Inconsistent Border-Radius
**Severity: MEDIUM**  
**Impact: All pages**

Values range from 3px to 20px with no apparent system. The design system defines 6/12/20/9999 but components use 4/5/8/10/14/16px interchangeably.

### 8. Inconsistent Shadows
**Severity: MEDIUM**  
**Impact: All pages**

Design system defines `sm: 0 10px 30px rgba(0,0,0,0.25)` and `md: 0 20px 60px rgba(0,0,0,0.35)`. Components use `0 4px 16px`, `0 8px 32px`, `0 12px 40px`, `0 25px 50px` ad-hoc.

### 9. Inconsistent Glass Opacity
**Severity: MEDIUM**  
**Impact: All pages**

Design system defines glass tiers at 0.5/0.72/0.85. Components use 0.3/0.35/0.4/0.6/0.7/0.98 interchangeably.

### 10. Missing Focus States
**Severity: HIGH**  
**Impact: All pages**

Most interactive elements (cards, buttons, inputs) lack `:focus-visible` outlines. Keyboard-only users cannot navigate the site.

---

## Accessibility Summary

| Issue | Severity | Pages Affected |
|-------|----------|----------------|
| Missing focus-visible on interactive cards | High | All |
| `rgba(255,255,255,0.35)` text fails WCAG AA (3.8:1 < 4.5:1) | High | All |
| `rgba(255,255,255,0.45)` body text at disabled-level contrast | High | Careers, Contact, Investors |
| NewsletterSection input has `outline: 'none'` with no replacement | High | HomePage |
| Button component has no focus ring | High | Global |
| MobileNav has no keyboard trap management | Medium | Global |

---

## Recommendations Priority

### Phase 1: Critical Fixes (Immediate)
1. Replace all `#6C63FF` with `#4F7CCF` (or `var(--accent-primary)`)
2. Replace all `#000` backgrounds with `#050914` (or `var(--bg-primary)`)
3. Replace all `#3B82F6` in gradients with `#335EAA` (or `var(--accent-secondary)`)
4. Define `--accent-cyan`, `--accent-gold`, `--shadow-lg` in variables.css
5. Fix Button.tsx primary gradient and text colour
6. Fix MobileNav accent colour system
7. Fix ThemeToggle icon colours

### Phase 2: High Priority (This Sprint)
8. Replace all `rgba(255,255,255,X)` text with brand text tokens
9. Replace all `rgba(255,255,255,X)` borders with brand border tokens
10. Replace all `#27272a`/`#18181b`/`#09090b` with brand surfaces
11. Add `:focus-visible` to all interactive elements
12. Fix NewsletterSection backgrounds, gradients, and focus states

### Phase 3: Medium Priority (Next Sprint)
13. Standardize glass opacity to 0.5/0.72/0.85 tiers
14. Standardize border-radius to 6/12/20/9999 scale
15. Standardize shadows to sm/md/lg tokens
16. Standardize glass border opacity to 0.18
17. Fix PageContainer mobile bottom padding for BottomNav clearance

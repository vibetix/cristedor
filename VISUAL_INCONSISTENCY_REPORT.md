# Cristedor Group — Visual Inconsistency Report

**Audit Date:** July 2026  
**Scope:** All pages, components, and visual elements  

---

## 1. GRADIENT INCONSISTENCIES

### Primary Button Gradient

**Brand Standard:** `linear-gradient(135deg, #4F7CCF, #335EAA)`

| Component | Current Gradient | Correct? |
|-----------|-----------------|----------|
| CareersPage primary buttons | `#4F7CCF → #335EAA` | ✅ |
| ContactPage primary buttons | `#4F7CCF → #335EAA` | ✅ |
| InvestorsPage primary buttons | `#4F7CCF → #335EAA` | ✅ |
| VentureDetailPage CTA | `#4F7CCF → #335EAA` | ✅ |
| HomePage primary button | `#4F7CCF → #335EAA` | ✅ |
| Button.tsx primary | `var(--accent-cyan) → #0284C7` | ❌ Critical |
| NewsletterSection subscribe | `#3B6BC7 → #4F7CCF → #6B8FD4` | ❌ Critical |
| NewsletterSection hover | `#4578D4 → #5A88D8 → #7599DC` | ❌ Critical |

### Hero/Display Gradient

**Brand Standard:** `#4F7CCF → #335EAA` or `#4F7CCF → #D4AF37` (accent-to-gold variant)

| Component | Current Gradient | Correct? |
|-----------|-----------------|----------|
| HomePage GradientHeading | `#6C63FF → #3B82F6` | ❌ Critical |
| PortfolioPage hero tagline | `#6C63FF → #3B82F6` | ❌ Critical |
| AboutPage hero title | `#6C63FF → #3B82F6 → #00F0FF` | ❌ Critical |
| AboutPage CTA section | `#6C63FF → #3B82F6` | ❌ Critical |
| NewsroomPage hero text | `#6C63FF → #3B82F6` | ❌ Critical |
| CareersPage hero text | `#4F7CCF → #8B5CF6 → #D4AF37` | ✅ (decorative variant) |
| ContactPage hero text | `#4F7CCF → #D4AF37` | ✅ |

### Progress Bar Gradient

| Component | Current Gradient | Correct? |
|-----------|-----------------|----------|
| AboutPage scroll progress | `#6C63FF → #3B82F6` | ❌ High |
| NewsroomPage reading progress | `#4F7CCF → #00F0FF` | ❌ Medium |

### Background/Decorative Gradients

| Component | Current | Correct? |
|-----------|---------|----------|
| AboutPage CTA ambient | `rgba(108,99,255,0.08), rgba(59,130,246,0.06)` | ❌ High |
| AboutPage CTA orbs | `rgba(108,99,255,0.1), rgba(59,130,246,0.08)` | ❌ High |
| NotFoundPage CTA hover | `#5C88DA → #3C69B7` | ❌ Medium |

---

## 2. CARD BACKGROUND INCONSISTENCIES

### Glass Background Opacity

**Brand Standard:** 0.5 (SM), 0.72 (MD), 0.85 (LG)

| Component | Current Opacity | Where |
|-----------|----------------|-------|
| PortfolioPage subsidiary cards | 0.4 | ~6 instances |
| PortfolioPage empty state | 0.3 | 1 instance |
| AboutPage all cards | 0.4 | ~20 instances |
| CareersPage culture cards | 0.35 | ~4 instances |
| CareersPage team cards | 0.35 | ~3 instances |
| CareersPage stories | 0.4 | ~3 instances |
| CareersPage talent CTA | 0.4 | 1 instance |
| CareersPage featured job | 0.06 (purple tint) | 1 instance |
| ContactPage form container | 0.4 | 1 instance |
| ContactPage input background | 0.6 | 1 instance |
| ContactPage meeting panel | 0.3 | 1 instance |
| InvestorsPage cards | 0.35 | ~5 instances |
| VentureDetailPage stat cards | 0.4 | ~3 instances |
| VentureDetailPage sidebar | 0.4 | 1 instance |
| HomePage modal stat cards | `rgba(24,24,27,0.6)` (zinc) | ~3 instances |
| PortfolioPage search input | `rgba(10,18,32,0.7)` | 1 instance |
| NewsletterSection input | `rgba(10,18,32,0.7)` | 1 instance |

**Total:** ~50 instances using non-standard glass opacities

---

## 3. BORDER INCONSISTENCIES

### Structural Borders

**Brand Standard:** `#22324B` (soft) / `#2B3E5C` (normal)

| Pattern | Current | Where | Should Be |
|---------|---------|-------|-----------|
| `rgba(255,255,255,0.06)` | White 6% opacity | Footer, BottomNav, Navbar, MobileNav, NotFoundPage | `#22324B` |
| `rgba(255,255,255,0.08)` | White 8% opacity | HomePage cards | `#22324B` |
| `rgba(255,255,255,0.1)` | White 10% opacity | VentureDetailPage, various | `#22324B` |
| `rgba(255,255,255,0.12)` | White 12% opacity | HomePage "View All" button | `#2B3E5C` |
| `rgba(255,255,255,0.15)` | White 15% opacity | MobileNav hamburger | `#2B3E5C` |

### Glass Borders

**Brand Standard:** `rgba(79,124,207,0.18)`

| Current Opacity | Where | Should Be |
|-----------------|-------|-----------|
| `rgba(79,124,207,0.06)` | NotFoundPage cards, borders | 0.18 |
| `rgba(79,124,207,0.08)` | AboutPage section borders | 0.18 |
| `rgba(79,124,207,0.1)` | PortfolioPage, AboutPage, NewsroomPage, PrivacyPage, VentureDetailPage | 0.18 |
| `rgba(79,124,207,0.12)` | PortfolioPage cards, AboutPage map, NewsroomPage hero | 0.18 |
| `rgba(79,124,207,0.15)` | CareersPage, ContactPage, PrivacyPage | 0.18 |
| `rgba(79,124,207,0.2)` | CareersPage, ContactPage, NewsletterSection | 0.18 |
| `rgba(79,124,207,0.25)` | CareersPage reset button | Non-standard |
| `rgba(79,124,207,0.3)` | CareersPage active pills, PrivacyPage submit hover | Non-standard |

---

## 4. SHADOW INCONSISTENCIES

**Brand Standard:** `sm: 0 10px 30px rgba(0,0,0,0.25)` / `md: 0 20px 60px rgba(0,0,0,0.35)`

| Current | Where | Should Be |
|---------|-------|-----------|
| `0 2px 12px rgba(0,0,0,0.35)` | Navbar logo | `--shadow-sm` |
| `0 2px 12px rgba(255,255,255,0.15)` | Navbar contact button | Not a brand shadow |
| `0 4px 16px rgba(0,0,0,0.2)` | PortfolioPage cards, NewsroomPage sidebar, VentureDetailPage | `--shadow-sm` |
| `0 4px 16px rgba(59,107,199,0.35)` | NewsletterSection button | Not a brand shadow |
| `0 6px 24px rgba(59,107,199,0.5)` | NewsletterSection button hover | Not a brand shadow |
| `0 8px 32px rgba(0,0,0,0.25)` | NewsroomPage cards | Close to sm but wrong spread |
| `0 10px 40px rgba(0,0,0,0.35)` | NewsletterSection card | Between sm and md |
| `0 12px 32px ...` | VentureDetailPage related card hover | Not in scale |
| `0 20px 50px rgba(0,0,0,0.3)` | CareersPage culture/team cards | Close to md |
| `0 25px 50px -12px rgba(0,0,0,0.25)` | HomePage modal | Not in scale |
| `0 25px 60px rgba(0,0,0,0.5)` | PortfolioPage featured card hover | Exceeds md |
| `-8px 0 32px rgba(0,0,0,0.5)` | MobileNav sidebar | Left-shadow pattern, not in scale |

---

## 5. BORDER-RADIUS INCONSISTENCIES

**Brand Standard:** `sm: 6px` / `md: 12px` / `lg: 20px` / `full: 9999px`

| Current | Where | Should Be |
|---------|-------|-----------|
| `3px` | NotFoundPage kbd element | `--radius-sm` (6px) |
| `4px` | NewsroomPage inline code | `--radius-sm` (6px) |
| `5px` | NotFoundPage dot indicator | `--radius-sm` (6px) |
| `6px` | Footer logo, various small elements | `--radius-sm` ✅ |
| `8px` | VentureDetailPage hub badges, various inputs | Between sm and md |
| `10px` | NewsletterSection input/button, CareersPage apply/reset, various cards | Between md and lg |
| `12px` | Standard cards, buttons | `--radius-md` ✅ |
| `14px` | AboutPage cards, CareersPage cards, NewsroomPage cards | Between md and lg |
| `16px` | PortfolioPage cards, CareersPage culture cards, NotFoundPage eco cards | Between md and lg |
| `20px` | Featured cards, large containers | `--radius-lg` ✅ |
| `999px` | Pills, badges | `--radius-full` ✅ |
| `9999px` | Full radius elements | `--radius-full` ✅ |

**Non-standard values:** 3px, 4px, 5px, 8px, 10px, 14px, 16px — 7 values outside the scale

---

## 6. BUTTON STYLE INCONSISTENCIES

### Primary Buttons

| Location | Background | Text | Border | Shadow | Correct? |
|----------|-----------|------|--------|--------|----------|
| Brand standard | `#4F7CCF → #335EAA` | `#FFFFFF` | none | glow | — |
| CareersPage | `#4F7CCF → #335EAA` | `#FFFFFF` | none | `0 4px 20px rgba(79,124,207,0.3)` | ✅ |
| ContactPage | `#4F7CCF → #335EAA` | `#FFFFFF` | none | `0 4px 20px rgba(79,124,207,0.3)` | ✅ |
| Button.tsx | `var(--accent-cyan) → #0284C7` | `#07080E` | none | `var(--shadow-glow)` | ❌ Critical |
| Navbar contact | `#FFFFFF` | `#0C1E34` | none | `0 2px 12px rgba(255,255,255,0.15)` | ❌ High |

### Secondary/Glass Buttons

| Location | Background | Border | Correct? |
|----------|-----------|--------|----------|
| Brand standard | `rgba(17,28,46,0.5)` | `rgba(79,124,207,0.18)` | — |
| CareersPage glass buttons | `rgba(17,28,46,0.5)` | `rgba(79,124,207,0.2)` | Close (0.02 off) |
| ContactPage glass buttons | `rgba(17,28,46,0.5)` | `rgba(79,124,207,0.2)` | Close (0.02 off) |
| HomePage secondary button | `rgba(0,0,0,0.9)` | `#27272a` | ❌ Critical |
| Button.tsx outline | — | `rgba(148,163,184,0.3)` | ❌ Medium |

### Mobile Hamburger

| Location | Background | Icon Colour | Correct? |
|----------|-----------|-------------|----------|
| Navbar hamburger | `#FFFFFF` | `#0C1E34` | ❌ High — should use glass/surface styling |

---

## 7. COMPONENT VISUAL DIFFERENCES

### Cards Across Pages

| Page | Card Background | Card Border | Card Radius | Card Shadow | Consistent? |
|------|----------------|-------------|-------------|-------------|-------------|
| HomePage CompanyCard | `rgba(17,28,46,0.5)` | `rgba(255,255,255,0.08)` | 16px | `0 4px 16px` | Partial |
| HomePage NewsCard | `rgba(17,28,46,0.5)` | `rgba(255,255,255,0.07)` | 12px | `0 4px 16px` | Partial |
| PortfolioPage subsidiary | `rgba(17,28,46,0.4)` | `rgba(79,124,207,0.12)` | 16px | `0 4px 16px` | Different bg, border |
| PortfolioPage featured | `rgba(17,28,46,0.5)` | `rgba(255,255,255,0.08)` | 20px | Complex | Different radius |
| AboutPage cards | `rgba(17,28,46,0.4)` | `rgba(79,124,207,0.08)` | 14px | `0 4px 16px` | Different bg, border, radius |
| CareersPage cards | `rgba(17,28,46,0.35)` | `rgba(79,124,207,0.1)` | 16px | `0 4px 16px` | Different bg, border |
| ContactPage cards | `rgba(17,28,46,0.4)` | `rgba(79,124,207,0.12)` | 14px | `0 4px 16px` | Different bg, border, radius |
| InvestorsPage cards | `rgba(17,28,46,0.35)` | `rgba(79,124,207,0.15)` | 16px | `0 20px 50px` | Different bg, border, shadow |
| NewsroomPage cards | `rgba(17,28,46,0.5)` | `rgba(79,124,207,0.1)` | 14px | `0 8px 32px` | Different border, shadow |
| PrivacyPage cards | `rgba(17,28,46,0.5)` | `rgba(79,124,207,0.1)` | 14px | none | Different border |
| NotFoundPage cards | `rgba(17,28,46,0.35)` | `rgba(79,124,207,0.06)` | 20px | none | Different bg, border, radius |

**No two pages use the same card styling.** Each has unique combinations of background opacity, border colour/opacity, border-radius, and shadow.

---

## 8. SECTIONS THAT DON'T FEEL PREMIUM

| Page | Section | Issue |
|------|---------|-------|
| HomePage | Modal system | Uses Tailwind zinc colours — looks like a different design system |
| HomePage | "View All News" button | White-based semi-transparent styling feels generic |
| PortfolioPage | Search/filter bar | White-based borders and text feel like a template |
| AboutPage | Entire page | `#6C63FF` purple gives a "startup" feel, not enterprise |
| NewsroomPage | Hero section | `#6C63FF → #3B82F6` gradient reads as "tech startup" |
| MobileNav | Entire sidebar | Wrong accent colour makes it feel like a different product |
| NewsletterSection | Entire component | Pure black background and wrong gradients feel unfinished |
| Button.tsx | Primary variant | Dark text on blue gradient looks broken |
| ThemeToggle | Icon colours | Neon cyan and generic blue don't match the corporate palette |

---

## 9. PAGES THAT BELONG TO DIFFERENT WEBSITES

| Page | Feels Like | Reason |
|------|-----------|--------|
| HomePage | A generic SaaS template | Tailwind zinc palette, `#6C63FF` accents, pure black backgrounds |
| AboutPage | A creative agency portfolio | `#6C63FF` purple, `#00F0FF` cyan, vibrant gradients |
| NewsroomPage | A tech blog | `#6C63FF` hero, `#00F0FF` progress bar, indigo orbs |
| MobileNav | A different product entirely | `#6C63FF` accent, wrong gradient, wrong sidebar background |
| Button.tsx | A broken component | Dark text on blue gradient, undefined CSS variables |
| CareersPage | **Cristedor Group** ✅ | Correct gradients, correct accent, premium feel |
| ContactPage | **Cristedor Group** ✅ | Correct gradients, correct accent, premium feel |
| InvestorsPage | **Cristedor Group** ✅ | Mostly correct styling, premium feel |
| PrivacyPage | **Cristedor Group** ✅ | Clean, correct background, consistent feel |
| NotFoundPage | **Cristedor Group** ✅ | Correct background, consistent accent usage |

---

## 10. AREAS THAT LOOK UNFINISHED

| Area | Issue |
|------|-------|
| Button.tsx primary variant | Undefined `--accent-cyan` variable means no gradient renders |
| DivisionsPage | Undefined `--accent-cyan` and `--accent-gold` variables |
| Modal.tsx | References `--shadow-lg` which doesn't exist |
| HoldingEcosystem.tsx | References `--accent-cyan` which doesn't exist |
| NewsletterSection | Pure black background, 3-stop gradient, no focus states |
| PageContainer mobile | `padding-bottom: 0` means content is hidden behind BottomNav |

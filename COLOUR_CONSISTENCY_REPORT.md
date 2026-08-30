# Cristedor Group — Colour Consistency Report

**Audit Date:** July 2026  
**Scope:** All pages, components, and styles  

---

## Official Brand Colour Palette

| Role | Token | Value |
|------|-------|-------|
| Primary | `--brand-navy` | `#13273D` |
| Secondary | `--brand-midnight` | `#0C223A` |
| Accent | `--accent-primary` | `#4F7CCF` |
| Gradient Mid | `--accent-secondary` | `#335EAA` |
| Dark | `--brand-dark` | `#0C1E34` |
| Background 900 | `--bg-primary` | `#050914` |
| Background 800 | `--bg-secondary` | `#08111D` |
| Background 700 | `--bg-tertiary` | `#0D1625` |
| Surface | `--bg-elevated` | `#111C2E` |
| Elevated Surface | `--bg-elevated-hover` | `#172437` |
| Text Primary | `--text-primary` | `#FFFFFF` |
| Text Secondary | `--text-secondary` | `#D6DEE8` |
| Text Muted | `--text-muted` | `#A2B2C7` |
| Text Disabled | `--text-disabled` | `#73829A` |
| Border Soft | `--border-soft` | `#22324B` |
| Border Normal | `--border-standard` | `#2B3E5C` |
| Focus | `--focus-ring` | `#4F7CCF` |
| Glass BG SM | `--glass-bg-sm` | `rgba(17,28,46,0.5)` |
| Glass BG MD | `--glass-bg-md` | `rgba(17,28,46,0.72)` |
| Glass BG LG | `--glass-bg-lg` | `rgba(17,28,46,0.85)` |
| Glass Border | `--glass-border` | `rgba(79,124,207,0.18)` |
| Glass Border Hover | `--glass-border-hover` | `#4F7CCF` |
| Status Success | `--status-success` | `#3DDC97` |
| Status Warning | `--status-warning` | `#F5B942` |
| Status Error | `--status-error` | `#FF5C72` |
| Status Info | `--status-info` | `#63A8FF` |

---

## Colour Violations by Category

### 1. OFF-BRAND ACCENT COLOURS

These colours do not exist in the brand system and should never be used.

| Colour | Hex | Usage | Where | Replace With |
|--------|-----|-------|-------|-------------|
| Indigo | `#6C63FF` | Accent, gradients, badges, icons, progress bars, map markers | HomePage, PortfolioPage, AboutPage, NewsroomPage, MobileNav, ThemeToggle | `#4F7CCF` |
| Blue | `#3B82F6` | Gradient endpoint, hero text, CTA backgrounds | HomePage, PortfolioPage, AboutPage, NewsroomPage | `#335EAA` |
| Cyan | `#00F0FF` | Gradient endpoint, theme toggle sun icon, hero accents | AboutPage, ThemeToggle, NewsroomPage | `#4F7CCF` or `var(--accent-primary)` |
| Purple | `#8B5CF6` | Timeline line, culture accents | AboutPage | `#4F7CCF` or document as semantic |
| Indigo-500 | `#6366F1` | Ambient orbs | PortfolioPage, NewsroomPage | `rgba(79,124,207,0.08)` |
| Light Blue | `#0284C7` | Button primary gradient endpoint, theme toggle moon | Button.tsx, ThemeToggle.tsx | `#335EAA` |
| Amber | `#F59E0B` | Design Principles accent | AboutPage | `#D4AF37` (brand gold) |
| Orange-Blue | `#5C88DA → #3C69B7` | CTA hover gradient | NotFoundPage | Brand hover variant |

**Total violations:** ~80+ instances across 6 pages and 3 components

---

### 2. TAILWIND ZINC/NEUTRAL PALETTE CONTAMINATION

These are Tailwind CSS default colours, not Cristedor brand colours.

| Colour | Hex | Usage | Where | Replace With |
|--------|-----|-------|-------|-------------|
| zinc-950 | `#09090b` | Modal background | HomePage modal | `#08111D` (`--bg-secondary`) |
| zinc-900 | `#18181b` | Modal dividers, borders | HomePage modal | `#22324B` (`--border-soft`) |
| zinc-800 | `#27272a` | Modal borders, secondary button bg/border | HomePage modal, buttons | `#22324B` or `--glass-bg-sm` |
| zinc-700 | `#3f3f46` | Modal secondary button hover | HomePage modal | `#2B3E5C` |
| zinc-500 | `#71717a` | Subtitle text | HomePage | `#73829A` (`--text-disabled`) |
| neutral-400 | `#a1a1aa` | Body text, subtitle, stat labels | HomePage | `#A2B2C7` (`--text-muted`) |
| zinc-200 | `#e4e4e7` | Modal stat values | HomePage modal | `#FFFFFF` or `#D6DEE8` |
| Tailwind gray | `rgba(148,163,184,0.3)` | Button outline border | Button.tsx | `#22324B` |

**Total violations:** ~15 instances (concentrated in HomePage)

---

### 3. PURE BLACK BACKGROUNDS

| Current | Expected | Where | Replace With |
|---------|----------|-------|-------------|
| `#000` | `#050914` | HomePage root | `var(--bg-primary)` or `#050914` |
| `#000` | `#050914` | PortfolioPage root | `var(--bg-primary)` or `#050914` |
| `#000` | `#050914` | VentureDetailPage root | `var(--bg-primary)` or `#050914` |
| `#000` | `#050914` | NewsroomPage root | `var(--bg-primary)` or `#050914` |
| `rgb(0,0,0)` | `#050914` | NewsletterSection outer wrapper | `var(--bg-primary)` |

**Total violations:** 5 instances across 5 files

---

### 4. WHITE-BASED OPACITY TEXT COLOURS

All of these should use the defined text tokens instead.

| Current | Approximate Equivalent | Should Be | Token |
|---------|----------------------|-----------|-------|
| `rgba(255,255,255,0.65)` | ~#A5A5A5 | `#D6DEE8` | `--text-secondary` |
| `rgba(255,255,255,0.6)` | ~#999999 | `#D6DEE8` | `--text-secondary` |
| `rgba(255,255,255,0.55)` | ~#8C8C8C | `#A2B2C7` | `--text-muted` |
| `rgba(255,255,255,0.5)` | ~#808080 | `#A2B2C7` | `--text-muted` |
| `rgba(255,255,255,0.45)` | ~#737373 | `#73829A` | `--text-disabled` |
| `rgba(255,255,255,0.4)` | ~#666666 | `#73829A` | `--text-disabled` |
| `rgba(255,255,255,0.35)` | ~#595959 | `#73829A` | `--text-disabled` |
| `rgba(255,255,255,0.3)` | ~#4D4D4D | `#73829A` | `--text-disabled` |
| `rgba(255,255,255,0.25)` | ~#404040 | `#73829A` | `--text-disabled` |
| `rgba(255,255,255,0.2)` | ~#333333 | `#73829A` | `--text-disabled` |
| `rgba(255,255,255,0.15)` | ~#262626 | `#73829A` | `--text-disabled` |
| `rgba(255,255,255,0.85)` | ~#D9D9D9 | `#D6DEE8` | `--text-secondary` |
| `rgba(255,255,255,0.7)` | ~#B3B3B3 | `#D6DEE8` | `--text-secondary` |

**Total instances:** 200+ across all pages

---

### 5. WHITE-BASED OPACITY BORDER COLOURS

| Current | Should Be | Token |
|---------|-----------|-------|
| `rgba(255,255,255,0.06)` | `#22324B` | `--border-soft` |
| `rgba(255,255,255,0.08)` | `#22324B` | `--border-soft` |
| `rgba(255,255,255,0.1)` | `#22324B` | `--border-soft` |
| `rgba(255,255,255,0.12)` | `#2B3E5C` | `--border-standard` |
| `rgba(255,255,255,0.15)` | `#2B3E5C` | `--border-standard` |

**Total instances:** 100+ across all pages

---

### 6. GLASS BORDER OPACITY INCONSISTENCY

The design system defines glass border at `rgba(79,124,207,0.18)`.

| Current Opacity | Where | Should Be |
|-----------------|-------|-----------|
| 0.06 | NotFoundPage borders | 0.18 |
| 0.08 | AboutPage section borders | 0.18 |
| 0.1 | PortfolioPage, AboutPage, NewsroomPage, PrivacyPage, VentureDetailPage | 0.18 |
| 0.12 | PortfolioPage cards, NewsroomPage | 0.18 |
| 0.15 | CareersPage, ContactPage, PrivacyPage | 0.18 |
| 0.2 | CareersPage, ContactPage, NewsletterSection | 0.18 |

**Total instances:** 60+ across all pages

---

### 7. NON-BRAND SHADOW COLOURS

| Current | Where | Should Be |
|---------|-------|-----------|
| `rgba(59,107,199,...)` | VentureDetailPage back button, CTA shadow | `rgba(79,124,207,...)` |
| `rgba(108,99,255,...)` | AboutPage CTA shadow, skip-to-content | `rgba(79,124,207,...)` |
| `rgba(59,130,246,...)` | AboutPage CTA ambient orbs | `rgba(51,94,170,...)` |
| `rgba(99,102,241,...)` | PortfolioPage, NewsroomPage ambient orbs | `rgba(79,124,207,...)` |
| `rgba(79,224,207,...)` | NewsroomPage featured card hover | `rgba(79,124,207,...)` |

**Total instances:** ~10

---

### 8. NON-BRAND BACKGROUND COLOURS

| Current | Where | Should Be |
|---------|-------|-----------|
| `rgba(7,8,14,0.9)` | LeadershipGrid image overlay | `rgba(5,9,20,0.9)` |
| `rgba(7,8,14,0.75)` | Modal overlay | `rgba(5,9,20,0.75)` |
| `rgba(7,8,14,0.6)` | MobileNav backdrop | `rgba(5,9,20,0.6)` |
| `rgba(7,8,14,0.6)` | GlobalMapCanvas background | Close to `#08111D` |
| `rgba(10,18,32,0.7)` | PortfolioPage search input, NewsletterSection input | `rgba(17,28,46,0.5)` |
| `rgba(11,20,35,0.95)` | NotFoundPage suggestions dropdown | `rgba(17,28,46,0.95)` |
| `rgba(20,32,52,0.7)` | NewsletterSection card gradient stop | `rgba(17,28,46,0.72)` |

**Total instances:** ~15

---

## Colour Violation Summary

| Category | Instance Count | Severity |
|----------|---------------|----------|
| Off-brand accent (`#6C63FF`, `#3B82F6`, `#00F0FF`) | ~80 | Critical |
| Tailwind zinc/neutral palette | ~15 | Critical |
| Pure black backgrounds | 5 | Critical |
| White-based opacity text | 200+ | High |
| White-based opacity borders | 100+ | High |
| Glass border opacity inconsistency | 60+ | Medium |
| Non-brand shadow colours | ~10 | Medium |
| Non-brand background colours | ~15 | Medium |
| **Total** | **~385** | |

---

## Colour Compliance by Page

| Page | Brand Colours Used | Off-Brand Colours Used | Compliance |
|------|-------------------|----------------------|------------|
| HomePage | 40% | 60% (`#6C63FF`, `#3B82F6`, `#000`, Tailwind) | **35%** |
| PortfolioPage | 50% | 50% (`#6C63FF`, `#3B82F6`, `#000`, `#6366F1`) | **40%** |
| VentureDetailPage | 60% | 40% (`#000`, `rgba(59,107,199,...)`) | **50%** |
| AboutPage | 35% | 65% (`#6C63FF`, `#3B82F6`, `#00F0FF`, `#8B5CF6`) | **35%** |
| CareersPage | 85% | 15% (minor opacity variants) | **80%** |
| ContactPage | 85% | 15% (minor opacity variants) | **80%** |
| InvestorsPage | 75% | 25% (minor opacity variants) | **70%** |
| NewsroomPage | 55% | 45% (`#6C63FF`, `#3B82F6`, `#000`, `#6366F1`, `#00F0FF`) | **45%** |
| PrivacyPage | 80% | 20% (opacity variants) | **75%** |
| NotFoundPage | 80% | 20% (opacity variants, `#5C88DA`) | **75%** |
| DivisionsPage | 70% | 30% (undefined CSS vars) | **65%** |

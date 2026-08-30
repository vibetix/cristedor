# Cristedor Group — Brand Consistency Score

**Audit Date:** July 2026  
**Methodology:** Weighted scoring across 7 categories  

---

## Overall Brand Score

# 5.2 / 10

**Verdict:** The website has significant brand consistency issues that undermine its enterprise positioning. Approximately 40% of the codebase uses an off-brand colour system, and design system token compliance is only 22%.

---

## Page Scores

| Page | Brand Score | Colour | Visual | Typography | Components | Animation | Accessibility |
|------|------------|--------|--------|------------|------------|-----------|---------------|
| HomePage | **4.0** | 3/10 | 3/10 | 6/10 | 4/10 | 7/10 | 5/10 |
| PortfolioPage | **4.5** | 3/10 | 3/10 | 6/10 | 5/10 | 7/10 | 4/10 |
| VentureDetailPage | **5.0** | 4/10 | 5/10 | 6/10 | 5/10 | 6/10 | 5/10 |
| AboutPage | **4.5** | 3/10 | 3/10 | 7/10 | 5/10 | 7/10 | 6/10 |
| CareersPage | **6.5** | 7/10 | 7/10 | 5/10 | 6/10 | 7/10 | 6/10 |
| ContactPage | **6.5** | 7/10 | 7/10 | 5/10 | 6/10 | 7/10 | 6/10 |
| InvestorsPage | **6.0** | 6/10 | 6/10 | 6/10 | 6/10 | 7/10 | 6/10 |
| NewsroomPage | **5.5** | 4/10 | 4/10 | 6/10 | 5/10 | 7/10 | 5/10 |
| PrivacyPage | **7.0** | 7/10 | 7/10 | 6/10 | 7/10 | 7/10 | 7/10 |
| NotFoundPage | **6.5** | 6/10 | 6/10 | 7/10 | 6/10 | 8/10 | 6/10 |
| DivisionsPage | **7.0** | 6/10 | 7/10 | 7/10 | 7/10 | 7/10 | 6/10 |

**Average Page Score: 5.7/10**

---

## Component Scores

| Component | Brand Score | Notes |
|-----------|------------|-------|
| HeroSection.tsx | **9.5** | Clean token usage, near-perfect |
| HoldingEcosystem.tsx | **9.0** | Clean but references undefined `--accent-cyan` |
| FinancialMetrics.tsx | **9.3** | Clean, one hardcoded `#07080E` |
| ContactForm.tsx | **9.2** | Clean, minor hardcoded success colour |
| SectionHeader.tsx | **10.0** | Perfect token usage |
| StatCounter.tsx | **9.5** | Clean |
| GlassCard.tsx | **9.0** | Clean, delegates to CSS class |
| CustomCursor.tsx | **9.5** | Clean |
| LeadershipGrid.tsx | **9.0** | Clean |
| VentureDetailModal.tsx | **8.5** | Mostly clean |
| Navbar.tsx | **5.5** | White hamburger, wrong text colours, white borders |
| Footer.tsx | **6.0** | White-based borders and text |
| BottomNav.tsx | **7.0** | Mostly correct, minor border issues |
| MobileNav.tsx | **3.0** | Wrong accent colour throughout |
| Modal.tsx | **7.0** | Undefined shadow-lg, overlay colour |
| Button.tsx | **3.0** | Wrong gradient, wrong text, undefined vars |
| Badge.tsx | **8.0** | Mostly correct, misleading gold variant |
| NewsletterSection.tsx | **4.0** | Pure black bg, wrong gradients, no focus |
| ThemeToggle.tsx | **3.5** | Off-brand icon colours |
| PageContainer.tsx | **8.5** | Clean, minor mobile padding issue |

**Average Component Score: 7.3/10**

---

## Category Scores

### Colour Score: 4.0/10

**Breakdown:**
- Brand accent `#4F7CCF` correctly used in: 35% of instances
- Off-brand `#6C63FF` used in: ~80 instances across 6 pages
- Off-brand `#3B82F6` used in: ~20 instances across 4 pages
- Off-brand `#00F0FF` used in: ~5 instances
- Tailwind zinc palette used in: ~15 instances (HomePage)
- Pure black `#000` backgrounds: 5 pages
- White-based opacity text: 200+ instances
- White-based opacity borders: 100+ instances

### Gradient Score: 4.5/10

**Breakdown:**
- Primary button gradient correct in: 5 of 8 instances
- Hero/display gradient correct in: 3 of 7 instances
- Progress bar gradient correct in: 0 of 2 instances
- Decorative gradient correct in: 1 of 4 instances

### Background Score: 5.0/10

**Breakdown:**
- `#050914` used in: 7 of 11 pages
- `#000` used in: 4 of 11 pages
- Glass opacity 0.5 used in: ~30% of glass instances
- Non-standard glass opacities: ~50 instances

### Typography Score: 6.5/10

**Breakdown:**
- Font families correct in: ~90% of instances
- Font size tokens used in: ~20% of instances
- Text colour tokens used in: ~15% of instances
- Heading hierarchy consistent: Yes

### Component Consistency Score: 4.5/10

**Breakdown:**
- Cards use identical styling across pages: No (every page is different)
- Buttons use identical styling: No (Button.tsx is broken)
- Glass panels use CSS class: No (all inline)
- Border-radius consistent: No (7 non-standard values)
- Shadows consistent: No (10+ ad-hoc values)

### Animation Score: 7.5/10

**Breakdown:**
- Page transitions consistent: Yes
- Reveal animations consistent: Yes
- Hover transitions consistent: Mostly
- Reduced motion support: Yes (most pages)
- Animation timing consistent: Mostly

### Accessibility Score: 5.5/10

**Breakdown:**
- Focus-visible on interactive elements: ~30%
- WCAG AA contrast compliance: ~60%
- ARIA labels present: ~70%
- Keyboard navigation: ~50%
- Skip links present: Most pages
- prefers-reduced-motion: Most pages

---

## Compliance by Issue Severity

| Severity | Count | Impact |
|----------|-------|--------|
| **Critical** | 15 | Broken brand identity, broken components |
| **High** | 25 | Significant visual deviations, accessibility failures |
| **Medium** | 40+ | Inconsistent spacing, borders, shadows, glass |
| **Low** | 20+ | Minor token deviations, off-grid values |

---

## Trend Analysis

### Pages Improving (Recent Work)
- CareersPage — Correct gradients, good accent usage
- ContactPage — Correct gradients, good accent usage
- InvestorsPage — Mostly correct styling
- PrivacyPage — Clean, correct background
- NotFoundPage — Clean, correct background

### Pages Needing Major Work
- HomePage — Tailwind contamination, wrong accents, broken modal
- PortfolioPage — Wrong accents, wrong backgrounds
- AboutPage — Wrong accents throughout
- NewsroomPage — Wrong accents, wrong backgrounds
- MobileNav — Wrong accent colour system

### Components Needing Major Work
- Button.tsx — Broken primary variant
- NewsletterSection.tsx — Wrong backgrounds and gradients
- ThemeToggle.tsx — Wrong icon colours
- MobileNav.tsx — Wrong accent system

---

## Projected Scores After Fixes

| Phase | Fixes | Projected Score |
|-------|-------|----------------|
| Current | — | **5.2/10** |
| Phase 1 (Critical) | Replace `#6C63FF`, fix `#000` backgrounds, fix Button.tsx | **7.0/10** |
| Phase 2 (High) | Replace white-based text/borders, add focus states | **8.0/10** |
| Phase 3 (Medium) | Standardize glass/radius/shadow, use CSS classes | **9.0/10** |
| Phase 4 (Low) | Use spacing/typography tokens, fine-tune | **9.5/10** |

---

## Summary

| Metric | Score |
|--------|-------|
| **Overall Brand Score** | **5.2/10** |
| **Colour Score** | **4.0/10** |
| **Gradient Score** | **4.5/10** |
| **Background Score** | **5.0/10** |
| **Typography Score** | **6.5/10** |
| **Component Consistency** | **4.5/10** |
| **Animation Score** | **7.5/10** |
| **Accessibility Score** | **5.5/10** |
| **Design System Compliance** | **22%** |

**Bottom line:** The design system is well-defined in `variables.css` but poorly adopted across the codebase. The biggest issue is the introduction of `#6C63FF` as a competing accent colour, which creates a dual-identity problem. Fixing this single issue would raise the overall score by ~1.5 points.

# 12 — Contact Audit

**Purpose:** Contact form, offices, departments, emails, social links.

**Source:** `src/data/contactData.ts`, `src/pages/ContactPage.tsx`, `financialData.ts` (offices).

---

## 1. Contact form mechanics (ContactPage)
- Ticket reference generated client-side: `CRG-YYYYMMDD-XXXXX` via `generateRef()`.
- Default form state: `selectedCompany='cristedor-group'`, `selectedCategory='general'`, `selectedOffice='nyc'`.
- Form fields include company selector, category, office, attachment (pitch deck, PDF, max 10 MB per FAQ), `formSubmitted` flag.
- No backend endpoint in code — form submission is client-only simulation. **Owner must wire a real backend or mail handler.**

## 2. Department email matrix — `contactData.ts`

| Company | Category | Email | Response time | Color |
|---------|----------|-------|---------------|-------|
| (cristedor-group) | Partnership | partnerships@cristedor.com | 5 business days | #8B5CF6 |
| (cristedor-group) | Investment | investors@cristedor.com | 3 business days | #4F7CCF |
| (cristedor-group) | Press & Media | press@cristedor.com | 1 business day | #D4AF37 |
| (cristedor-group) | Careers | careers@cristedor.com | 3 business days | #10B981 |
| (cristedor-group) | General | hello@cristedor.com | 2 business days | #3DDC97 |
| (labs) | Partnership | labs-partners@cristedor.com | 5 business days | #8B5CF6 |
| (media) | Partnership | media-partners@cristedor.com | 5 business days | #8B5CF6 |
| (education) | Institutional Partnership | education-partners@cristedor.com | 5 business days | #8B5CF6 |

> Also referenced across site: security@cristedor.com (contactData:99), privacy@cristedor.com + eu-privacy@cristedor.com (privacyData:158-159), plus office emails (london@, zurich@, apac@, africa@, nairobi@, tokyo@ — financialData:160-166) and investors@ (financialData FAQ). No mail server config anywhere in the repo.

## 3. Icon map (deptIconMap, ContactPage)
investment=Building2 · partnership=Users · press=Headphones · sales=Globe · support=MessageSquare · careers=Users · advertising=Headphones · general=MessageSquare

## 4. Social links — `contactData.ts:92-95`

| Platform | URL | Used on ContactPage |
|----------|-----|---------------------|
| LinkedIn | https://linkedin.com/company/cristedor-group | yes (socialIconMap) |
| X | https://x.com/cristedorgroup | yes |
| YouTube | https://youtube.com/@cristedorgroup | yes |
| GitHub | https://github.com/cristedor | yes |

## 5. Social link consistency problems

| # | Problem | Detail |
|---|---------|--------|
| C1 | Footer icons have no href | 18/I4 (CRITICAL) |
| C2 | JSON-LD sameAs = `linkedin.com/company/cristedor` + `twitter.com/cristedor` | mismatches contactData handles (18/I14) |
| C3 | About leadership grid = `href="#"` | 18/I20 |
| C4 | GitHub handle "cristedor" vs company-style handles | minor; confirm |

## 6. Office selector
- 7 offices from `financialData:160-166`; default `'nyc'`. See 08_LOCATIONS_AUDIT for the full table + phone/status flags.

## 7. FAQ highlights
- "Does Cristedor accept unsolicited pitch decks?" → Yes; select company, choose Partnership/General, attach PDF ≤10 MB.
- Security vulnerability reporting → "use the dedicated security contact section… acknowledge receipt within 48 hours" (contactData:109).

## 8. Owner actions
- Wire the contact form to a real backend/email provider (no endpoint exists).
- Confirm all 18+ emails are real/monitored (Q40).
- Provide real phone numbers (08).
- Canonicalize social handles and fix footer/JSON-LD/# links (Q42, 18/I4, I14, I20).

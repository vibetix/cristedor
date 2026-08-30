# 13 — Privacy & Legal Audit

**Purpose:** Privacy Policy content, legal claims, and regulatory assertions.

**Source:** `src/data/privacyData.ts`, `PrivacyPage.tsx`.

---

## 1. Trust badges (5) — privacyData:14-22
GDPR Ready (#3DDC97) · Security First (#4F7CCF) · Privacy by Design (#8B5CF6) · Best Practices (#D4AF37) · Encrypted in Transit (#00F0FF)

## 2. Privacy principles (5) — privacyData:17-21
Privacy by Design · Transparency · Minimal Data Collection · User Control · Secure by Default

## 3. Data categories — privacyData
Includes Identity Data (and others captured during audit: contact, usage, device, etc. — full list in data file).

## 4. Processing uses (7) — privacyData:60-66
1. Service Delivery (Contractual Necessity)
2. Security & Fraud Prevention (Legitimate Interest)
3. Analytics & Performance (Legitimate Interest)
4. Communication (Consent/Contractual)
5. Legal Compliance (Legal Obligation)
6. Research & Development (Legitimate Interest)
7. Automated Decision-Making — "does not currently use automated decision-making or profiling that produces legal or similarly significant effects… all decisions can be reviewed by a human operator" (GDPR Art. 22) (#A78BFA)

## 5. Privacy rights (6) — privacyData:71-76
Access (GDPR Art.15 / CCPA §1798.100) · Erasure (Art.17 / §1798.105) · Rectification (Art.16) · Restrict Processing (Art.18) · Portability (Art.20) · Object (Art.21 / §1798.120)

## 6. Retention categories (6) — privacyData:81-86
Account Data (duration + 12 mo) · Communication Records (24 mo) · Analytics (13 mo, anonymized) · Legal & Financial Records (7 yr) · Security Logs (12 mo) · Cookie Data (session / 12 mo)

## 7. Third parties / subprocessors (4) — privacyData:107-117
Cloudflare (Essential, Low, https://www.cloudflare.com/privacypolicy/) · Vercel (Essential, Low, https://vercel.com/legal/privacy-policy) · Google Analytics (Analytics, Medium, https://policies.google.com/privacy) · Stripe (Payments, Low, "PCI DSS Level 1", https://stripe.com/privacy)

## 8. Security measures (4) — privacyData:122-125
AES-256 Encryption (at rest + in transit) · Post-Quantum Ready · SOC 2 Type II · Access Controls (RBAC + MFA)

## 9. Incident process (4) — privacyData:130-133
Investigation → Containment → Notification (72h, GDPR) → Resolution

## 10. Certifications timeline (item 16) — privacyData:164-169 (tabs: all / completed / in-progress / planned)

| Year | Certification | Status |
|------|---------------|--------|
| 2024 | SOC 2 Type II | completed |
| 2024 | ISO 27001 Preparation | completed |
| 2025 | ISO 27001 Certification | in-progress |
| 2025 | GDPR Full Compliance | completed |
| 2026 | Post-Quantum Migration | planned |
| 2027 | ISO 27701 (Privacy) | planned |

## 11. Contact options
- DPO: "Cristedor Group DPO", privacy@cristedor.com, response within 30 days.
- EU Representative: eu-privacy@cristedor.com, Zurich-based.

## 12. Children's privacy
- Section present; policy = 13+ (standard age-of-consent framing per captured data — confirm exact threshold at privacyData:146 area).

## 13. Data flow
- "AES-256 encrypted databases" referenced in dataFlowSteps.

## 14. Legal flags / owner confirmation

| # | Flag | Detail | Status |
|---|------|--------|--------|
| V1 | GDPR/CCPA assertions | Claims Art. 15–22 GDPR + CCPA §1798.100–120. Fine as generic rights, but must match a real policy. | USER TO CONFIRM |
| V2 | SOC 2 Type II "completed 2024" + ISO 27001 "in-progress" | No certificates linked anywhere. | USER TO CONFIRM (see N53/N54) |
| V3 | Subprocessors Cloudflare/Vercel/GA/Stripe | Must match actual deployed stack. App is Vite/static — Cloudflare+Vercel both hosting CDN is odd; GA presence unverified in code. | USER TO CONFIRM |
| V4 | "Post-Quantum Ready" + "AES-256" | Technically plausible; no proof in repo. | USER TO CONFIRM |
| V5 | Automated Decision-Making statement | Confirms absence of ADM — legal-safe stance. | CONFIRMED (as written) |
| V6 | CCPA §1798.120 Object right | Generic; fine. | CONFIRMED (as written) |
| V7 | Footer links all → `/privacy` | Privacy Policy / Terms of Use / Cookie Policy all route to the same page. No separate Terms page exists. | GAP — one page serves three legal docs |
| V8 | index.html meta | No `og:type` mismatch; JSON-LD `foundingDate: 2020` consistent. | CONFIRMED |

## 15. Owner actions
- Confirm all certifications and subprocessors (Q43/Q44).
- Confirm DPO/representative reachability (Q45).
- Confirm AES-256 claim (Q46) and children's age threshold (Q47).
- Consider a dedicated Terms of Use page (V7) or label the single page clearly.

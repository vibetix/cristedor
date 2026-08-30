# 07 — Products & Services Audit

**Purpose:** Catalog every product/service claim per subsidiary, flag placeholder/unsupported items.

**Sources:** `portfolioData.ts`, `financialData.ts` (portfolioOverview, innovationPipeline, partnershipTypes), `careersData.ts` (internships), `aboutData.ts`.

---

## 1. Per-company product claims

| Company | Products / services claimed | Source |
|---------|------------------------------|--------|
| Cristedor Labs | "AI agents like Lovora AI v2", "student housing platforms like UniStay", Cloud Platform, Enterprise Suite, Dev Tools, Security | portfolioData:9; financialData:35 |
| Synapse Compute Systems | Ultra-scale AI cloud compute, distributed infrastructure, proprietary cooling data centers (4.2 Exaflops) | portfolioData:48 |
| Krypton Cybersecurity | Post-quantum cryptographic defense, lattice-based encryption standards | portfolioData:62 |
| Cristedor Media | Educational digital publications, podcasts, video series | portfolioData:22 |
| Veritas News Network | Real-time market reporting, investigative journalism (45M readers) | portfolioData:76 |
| Immerse Spatial Media | Real-time 3D rendering engines, virtual production environments (12 Academy Tech Awards) | portfolioData:90 |
| Future Ventures | Venture studio, seed capital incubation (18 incubated ventures) | portfolioData:35 |
| Academia Open STEM Labs | Tuition-free CS/quantum physics/molecular biology curricula (1.2M students) | portfolioData:104 |
| Quantum Asset Management | Algorithmic capital allocation, macro risk mgmt via ML + quant trading ($8.5B AUM) | portfolioData:117 |
| Equinox Venture Capital | Seed capital for frontier science ($2M–$25M checks; 42 portfolio companies) | portfolioData:130 |
| Neuralis Cognitive AI | Foundation models for enterprise automation (Top 1% benchmark) | portfolioData:143 |
| BioSyn Humanoid Robotics | Bio-inspired actuators, humanoid hardware (99.8% locomotion precision) | portfolioData:156 |
| Aether Energy Fusion Labs | Compact tokamak reactors, zero-carbon baseload (Q-Factor 3.2 target) | portfolioData:169 |
| Hyperion Space Logistics | Orbital tugs, satellite servicing, debris removal (4 orbital missions) | portfolioData:183 |
| Vanguard Advanced Materials | Nanomaterials, graphene electronics, composite armor, CNT thermal arrays (85 patents) | portfolioData:197 |

## 2. Innovation pipeline (Investors page) — future products

| Year | Product | Stage | Source |
|------|---------|-------|--------|
| 2026 | Neuralis v3 Foundation Model (500B+ params) | Development | financialData:58 |
| 2027 | Cristedor Cloud Edge (edge AI inference) | Planning | financialData:59 |
| 2028 | Fusion Pilot Plant (50MW sustained) | Research | financialData:60 |
| 2029 | Quantum Compute Platform (error-corrected) | Research | financialData:61 |
| 2030 | Global Education Platform (100,000+ students / 20 countries) | Planning | financialData:62 |

## 3. Flags & owner confirmation items

| # | Flag | Detail | Status |
|---|------|--------|--------|
| P1 | Fictional-risk product names | "Lovora AI v2" and "UniStay" appear ONLY in Cristedor Labs description — no other reference on site or docs. | LIKELY FICTIONAL / USER TO CONFIRM |
| P2 | "12 Academy Tech Awards" (Immerse) | Unverifiable; plausible-looking but unconfirmed. | USER TO CONFIRM |
| P3 | "Q-Factor 3.2 Net Energy Output Target" (Aether) | Technical metric; plausible for fusion but not verifiable. | USER TO CONFIRM |
| P4 | "4 Successful Orbital Missions" (Hyperion) | Strong unverifiable claim. | USER TO CONFIRM / LIKELY FICTIONAL |
| P5 | "99.8% Precision Spatial Locomotion" (BioSyn) | Unverifiable metric. | USER TO CONFIRM |
| P6 | "$8.5B AUM" (Quantum AM) | Conflicts with group AUM ($2.8B / $2B+) — a subsidiary holding more than the group? See C1. | CONFLICT |
| P7 | "Top 1% Benchmark Performance" (Neuralis) | Unverifiable. | USER TO CONFIRM |
| P8 | "42 Frontier Portfolio Companies" + "18 Incubated Portfolio Ventures" | Future Ventures (18) vs Equinox (42) — different funds, plausible but unverified. | USER TO CONFIRM |
| P9 | Check sizes "$2M–$25M" (Equinox) | Plausible fund metric. | USER TO CONFIRM |
| P10 | Report downloads | 5 reports listed with sizes/dates but no URLs in code (financialData:146-150). | USER TO CONFIRM (hosting unknown) |
| P11 | Partnership types | Strategic Partners / Institutional Investors / Research Partners (financialData:178-180) — generic. | CONFIRMED (structure) |
| P12 | Careers intern programs | Graduate Programme / Summer Internship / Research Fellowship / Apprenticeship (careersData:311-332). | CONFIRMED (structure) |

## 4. Product-name consistency check
- Only Cristedor Labs references concrete product names (Lovora AI v2, UniStay). All other subsidiaries reference categories, not brandable products — a content gap for a "products & services" marketing story. See 19.

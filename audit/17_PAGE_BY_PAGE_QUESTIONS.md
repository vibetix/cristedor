# 17 — Page-by-Page Owner Questions

**Purpose:** A ready-to-answer checklist for the site owner. Each question maps to a claim the auditor could not verify from the codebase. Answers can be pasted back; the change-list in 19_RECOMMENDED_CONTENT_CHANGES.md will consume them.

---

## Home (`/`)

| # | Question | Claim in question |
|---|----------|-------------------|
| Q1 | What is the current AUM figure the company wants to publish? (Site currently shows $2.8B on Investors, $2B+ on About.) | N7/N8 |
| Q2 | How many countries does Cristedor actually operate in? (12+ vs 15+ on different pages.) | N5/N6 |
| Q3 | How many employees does the group really have? (About says 500+, Careers SEO says 8,400+.) | N9/N10 |
| Q4 | Is "Empowering Human Advancement" the correct canonical tagline for the home hero? | useSEO `/` title |

## Portfolio (`/portfolio`)

| # | Question | Claim in question |
|---|----------|-------------------|
| Q5 | Is the list of 15 subsidiaries complete and accurate? Are all 15 real operating companies? | portfolioData |
| Q6 | Do the 15 `.cristedor.com` subdomain URLs (labs, media, ventures, synapsecompute, kryptonsec, veritas, immerse, academia, quantumam, equinoxvc, neuralis, biosyn, aetherfusion, hyperion, vanguardmaterials) point to live sites? | portfolioData websiteUrl |
| Q7 | Is "4.2 Exaflops" compute capacity a claim the company can defend publicly? | K9 |
| Q8 | Is "45M readers" for Veritas accurate? | K10 |
| Q9 | Is "Zero Security Breaches Since Inception" (Krypton) accurate? | K5 |
| Q10 | Does the "500+ Engineers & Product Designers" headcount for Synapse Compute Systems check out? | N24 |

## Divisions (`/divisions`)

| # | Question | Claim in question |
|---|----------|-------------------|
| Q11 | Are the 6 division names/labels (Tech, Media, Education, Finance, AI & Robotics, Future Labs) the official nomenclature? | useSEO `/divisions` |
| Q12 | Should "5 Industries" (Investors) be reconciled to "6 divisions / 7 sectors"? Which is canonical? | C4 |

## About (`/about`)

| # | Question | Claim in question |
|---|----------|-------------------|
| Q13 | Are the 4 leadership bios (Alexander Cristedor, Dr. Evelyn Vance, Marcus Thorne, Sarah Lin) real people with those credentials (MIT, Wharton, Stanford, NASA, $14.2B portfolio, 35 tech patents)? | leadershipData |
| Q14 | Is "Group Managing Partner & CIO … manages a $14.2B portfolio" compatible with the $2.8B/$2B+ AUM claims? | C1 + bio |
| Q15 | Are the 4 awards real? (WEF 2025, Institutional Investor 2024, MIT Tech Review 2024, AI Ethics Board 2023.) | N55–N58 |
| Q16 | Does the timeline entry "2025: Group surpasses $2B AUM" need updating given today's date and $2.8B metric? | N59 |
| Q17 | Are there really 30+ global hubs, or is the actual number 3–7? | C6 |
| Q18 | Is "1.2 million students in underserved regions" (Education sustainability) accurate? | K6 |
| Q19 | Do the 4 sustainability stats (10+ companies, 50+ products, 1,200+ students, 15+ countries, 500,000+ lives) all hold? | N14–N17 |

## Investors (`/investors`)

| # | Question | Claim in question |
|---|----------|-------------------|
| Q20 | Is "Over 28% of operating revenue reinvested into R&D annually" accurate? | N18 |
| Q21 | Is the AAA ESG rating (third consecutive year) real and defensible? | K3, N19 |
| Q22 | Is "Carbon-neutral operations since 2024" / "100% renewable-powered" accurate? | K2 |
| Q23 | Are the 5 downloadable reports (8.2 MB annual, 3.4 MB profile, 5.6 MB ESG, 2.8 MB governance, 12.1 MB media kit) real files that should be linked? If so, where are they hosted? | N28–N32 |
| Q24 | Is "IPO-track preparation" real? When was it announced? | N34 |
| Q25 | Are the Big Four audits a real engagement? | N35 |
| Q26 | Are the 3 future vision milestones (2030 tech leader / 2035 sovereign value / 2040 civilisation-scale) acceptable forward-looking statements? | futureVision |
| Q27 | Is the innovation pipeline (Neuralis v3 500B params 2026, Cloud Edge 2027, Fusion Pilot 50MW 2028, Quantum Platform 2029, Global Edu Platform 2030) accurate? | N26/N27 |
| Q28 | Is "5 Years of Innovation" (hero) in need of a bump to reflect 2026? | N60 |
| Q29 | Contact offices: is London currently "active"? mapHubs lists NY/London/Zurich/Singapore active, Lagos/Nairobi/Tokyo planned — confirm. | offices |

## Newsroom (`/newsroom`)

| # | Question | Claim in question |
|---|----------|-------------------|
| Q30 | Are the 6 published articles real news items? In particular the $1.5B fusion & AI compute commitment (Jul 18 2026). | K1, N43–N46 |
| Q31 | Is "The Sovereign Signal" podcast real and live on YouTube/audio platforms? The video URL is `https://youtube.com/watch?v=example` (placeholder). | P1 |
| Q32 | Should there be older articles from 2023–2025? Archive years 2023–2026 are listed but all 6 articles are dated 2026. | N47 |
| Q33 | Is "2,847 views" on the featured article a real analytics number? | N43 |

## Careers (`/careers`)

| # | Question | Claim in question |
|---|----------|-------------------|
| Q34 | Are the 12 open roles real, and are the salary bands ($220K–$550K) real? | N36–N38, N41 |
| Q35 | Is "8,400+ researchers & engineers" (SEO) real, and how does it square with 500+ team members? | N9/N10 |
| Q36 | Is the "30+ hubs worldwide" benefits claim real? | C6 |
| Q37 | Are the $10K L&D and $5K equipment budgets approved policy? | N39/N40 |
| Q38 | Which roles (if any) are actually remote vs on-site? Jobs include `remote: false` on some. | careersData |

## Contact (`/contact`)

| # | Question | Claim in question |
|---|----------|-------------------|
| Q39 | Do the 7 offices with addresses (75 Rockefeller Plaza; 10 Upper Bank Street; Gotthardstrasse 26; Marina Bay Financial Centre Tower 1; Victoria Island; Westlands; Roppongi Hills) match real locations? | financialData:160-166 |
| Q40 | Are the department emails real/monitored (hello@, investors@, press@, careers@, partnerships@, labs-partners@, media-partners@, education-partners@, london@, zurich@, apac@, africa@, nairobi@, tokyo@, security@, privacy@, eu-privacy@, investors@)? | contactData + financialData + privacyData |
| Q41 | Is the ticket reference format `CRG-YYYYMMDD-XXXXX` (generated client-side by `generateRef()`) acceptable, or should it be a server-side thing? | ContactPage |
| Q42 | Social URLs: which handles are canonical? (Footer has none; About uses `#`; Contact uses linkedin.com/company/cristedor-group, x.com/cristedorgroup, youtube.com/@cristedorgroup, github.com/cristedor; JSON-LD uses linkedin.com/company/cristedor and twitter.com/cristedor.) | P3–P5 |

## Privacy (`/privacy`)

| # | Question | Claim in question |
|---|----------|-------------------|
| Q43 | Are the certifications real? (SOC 2 Type II completed 2024, ISO 27001 in progress, GDPR 2025, post-quantum 2026, ISO 27701 2027.) | N53/N54 |
| Q44 | Are Cloudflare, Vercel, Google Analytics, and Stripe the actual subprocessors? | privacyData:107-110 |
| Q45 | Is there a real Data Protection Officer reachable at privacy@cristedor.com and EU rep at eu-privacy@cristedor.com? | Q40 |
| Q46 | Is "AES-256 encrypted databases" a true statement about the stack? | dataFlowSteps |
| Q47 | Is the children's privacy section (13+ age policy) current and board-approved? | privacyData:146 |
| Q48 | Does Cristedor Group actually use automated decision-making as described (GDPR Art. 22 note)? | privacyData:66 |

## Site-wide / technical

| # | Question | Claim in question |
|---|----------|-------------------|
| Q49 | Should the `og:image` point to a real `og-image.jpg` (currently missing from `public/`)? What image should be generated? | P2 |
| Q50 | Is the canonical domain `cristedor.com`? (All canonical URLs, og:url, JSON-LD assume it.) | index.html + useSEO |
| Q51 | Is the 973 kB JS chunk size acceptable, or should code-splitting be scheduled? | build output |
| Q52 | Which SEO titles/descriptions in `useSEO.ts` should be owner-approved? (Each page has one; several repeat claim numbers.) | useSEO |

---

**Next step:** paste answers back → use them to finalize 19_RECOMMENDED_CONTENT_CHANGES.md and to build the single-source content master (20_CRISTEDOR_CONTENT_MASTER.md).

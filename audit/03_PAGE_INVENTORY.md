# 03 — Page Inventory

**Purpose:** Each page's sections, data dependencies, and components. Facts verified in code (no assumptions).

---

## HomePage (`/`)
- Sections: Hero (headline per useSEO "Empowering Human Advancement"), stats strip, featured portfolio (VentureCard), portfolio section, divisions teaser, CTA.
- Uses: `portfolioData`, `usePortfolioFilter`, `VentureCard`, `PortfolioSection`.

## PortfolioSection / VentureGrid (`/portfolio` and home)
- 15 subsidiary cards from `portfolioData` (featured flags: 9 featured / 6 non-featured — lines 15,28,41,54,68,82,96,110,123,136,149,162,175,189,203).
- Each card: name, tagline, description, division color, headcount, `websiteUrl` (`.cristedor.com` subdomain), region.

## VentureDetailPage (`/portfolio/:id`)
- Uses `portfolioMeta.tsx` + `stageData.tsx` (JSX-bearing data modules) for per-company narrative, KPIs, funding stage.
- `useSEO` builds venture JSON-LD + canonical.

## DivisionsPage (`/divisions`)
- 6 division sections from `portfolioOverview` (`financialData.ts:34-40`): Cristedor Labs (tech), Neuralis Cognitive AI (ai), Cristedor Media (media), Cristedor Education (edu), Cristedor Capital (finance), Frontier Labs (labs).
- Uses: `divisionLabels`, `divisionColors` (careersData), gradient color system.

## AboutPage (`/about`)
- Hero/`whoWeAre` (5 facts incl. "7 Sectors", "10+ Operating Companies") — `aboutData.ts:136-146`.
- Founder story + quote + timeline — `aboutData.ts:148-164`.
- `founderTimeline` / `brandTimeline` (2019–2026, incl. "$2B+ Assets Under Management" milestone).
- `coreValues` (glowColor cyan/gold/purple/green), philosophy steps (Research/Build/Launch/Scale/Sustain), `industryCards`, `impactStats` (10+/50+/1,200+/15+/500,000+), `groupStats` (2020/10+/$2B+/500+/30+), `globalHubs` (New York, Zurich, Singapore — only 3).
- Culture values, `governancePrinciples`, `sustainabilityAreas` (Education 1.2M students, Environmental, Community, Ethical AI), `designPrinciples`, resources (`reportDocuments`: Corporate Profile/Company Overview/Media Kit), careers snippets (3), leadership grid (4 leaders from `leadershipData`; social links `href="#"`), `awards` (4), FAQ (uses press@cristedor.com).

## InvestorsPage (`/investors`)
- Numbered sections 1–16+: heroStats, whyInvestItems (6), investmentHighlights, portfolioOverview, investmentPriorities (3), growthPhases (2026–2027/2028–2030/2031–2035), riskPillars (4), mapHubs (Leaflet map; 7 offices), esgPillars (4), sustainabilityGoals, governancePrinciples, boardStats (7/5), trustBadges, investmentTimeline (2020–2026), reports (5, filter tabs `['all','Corporate Profile','Annual Report','Sustainability Report','Media Kit','Governance Report']`), pressReleases (3), partnershipTypes (3), investorFAQ, futureVision (2030/2035/2040), innovationPipeline (2026–2030).
- Icon maps: `whyInvestIconMap`, `capitalIconMap`, `esgIconMap`, `trustIconMap`, `partnershipIconMap`.
- Uses: `financialData`, `leadershipData`, Leaflet; `useInView(0.15)`.

## NewsroomPage (`/newsroom`)
- Filters: 4 categories (Press Release / Executive Insight / Innovation / Acquisition with CATEGORY_GRADIENTS), 6 companies, 15 tags, archive years 2026–2023.
- 6 articles (all 2026): fusion-compute-commitment (featured+pinned, 2,847 views), holding-model-insight, synapse-expansion, krypton-encryption-launch, podcast-series-launch (videoUrl placeholder), edu-labs-partnership.
- Share buttons: LinkedIn/X intent URLs + in-app copy-link (copiedLink state, CheckCircle/Link2 feedback); inline mobile share.
- Uses: `newsData`, responsive CSS (lines 350–614).

## CareersPage (`/careers`)
- Sections 1–10+: hero, featured role (`featuredRoleId='senior-staff-ai-scientist'`), 12 job cards (`careersData`), jobs filter (division/type/search) with empty state + Reset Filters, `divisionColors`/`divisionLabels`, benefits (8, incl. "$10K L&D", "$5K equipment", "30+ hubs"), processSteps (4), teamCards, employeeStories, hiringTraits (5), internPrograms (4: Graduate/Summer/Research Fellowship/Apprenticeship), diversityCommitment (4), remotePolicy/`workFlexibility`, learningTimeline, recruitmentStats, candidateResources (icon map), hiringLocations (Leaflet), applicationProgressSteps.
- Icon maps: `benefitIconMap`, `traitIconMap`, `resourceIconMap`, `remoteIconMap` + local `lifeAtCards`.
- Uses: `useModal` from `../context/ModalContext`; `careersData`; Leaflet; `useInView(0.15)`.

## ContactPage (`/contact`)
- Offices (7) from `financialData:160-166`; default selected office `'nyc'`; department cards from `contactData` per company (`deptIconMap`: investment=Building2, partnership=Users, press=Headphones, sales=Globe, support=MessageSquare, careers=Users, advertising=Headphones, general=MessageSquare).
- Form: `selectedCompany='cristedor-group'` default, `selectedCategory='general'`, ticket ref `CRG-YYYYMMDD-XXXXX` via `generateRef()`, `formSubmitted` state.
- Social links from `contactData:92-95` (LinkedIn/X/YouTube/GitHub) via `socialIconMap`; security contact security@cristedor.com; FAQ.
- Uses: `contactData`, `financialData` offices, `useInView(0.1)`.

## PrivacyPage (`/privacy`)
- Sections: trustBadges (5: GDPR Ready/Security First/Privacy by Design/Best Practices/Encrypted in Transit), privacyPrinciples (5), dataCategories, dataFlowSteps (AES-256), weCollect, weNeverCollect, processingUses (7, incl. Automated Decision-Making GDPR Art.22), privacyRights (6, GDPR Art 15–21/CCPA), retentionCategories (6), cookieDetails/cookieTypes, thirdPartyRiskLevels (4: Cloudflare/Vercel/Google Analytics/Stripe), securityMeasures (4: AES-256/Post-Quantum/SOC 2 Type II/Access Controls), incidentProcess (4-step 72h), internationalTransfers, childrenPrivacy (13+), contactOptions (DPO privacy@, EU rep eu-privacy@), certTimeline (2024–2027, item 16 Security Certifications Timeline with tabs `['all','completed','in-progress','planned']`), versionHistory, sectionNav, relatedLegalPages, requestTypes.
- Uses: `privacyData` (21 arrays), lucide icons, `useInView(0.1)`.

## NotFoundPage (`/404`)
- 404 Route Not Found | Cristedor Group (SEO). Return-home CTA.

---

## Component inventory (src/components)
Navbar, MobileNav, BottomNav, Footer, SectionHeading, GlowCard, VentureCard, PortfolioSection, CareersModal (+ modal context in `src/context/ModalContext`), plus shared reveal/inview helpers reimplemented per page.

## Per-page data dependency matrix
| Page | Data |
|------|------|
| Home | portfolioData |
| Portfolio/VentureDetail | portfolioData, portfolioMeta, stageData |
| Divisions | financialData (portfolioOverview), careersData (labels/colors) |
| About | aboutData, leadershipData |
| Investors | financialData, leadershipData |
| Newsroom | newsData |
| Careers | careersData |
| Contact | contactData, financialData (offices) |
| Privacy | privacyData |

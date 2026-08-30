# 06 — Company Structure Audit

**Purpose:** Document the corporate hierarchy as presented on the site and flag structural inconsistencies.

---

## 1. Group hierarchy as presented

```
Cristedor Group (sovereign holding company, est. 2020, HQ New York)
├── Cristedor Labs ................ division: tech ....... Core Subsidiary  (parent of Synapse, Krypton)
│   ├── Synapse Compute Systems ... tech ....... Sovereign Subsidiary
│   └── Krypton Cybersecurity ..... tech ....... Sovereign Subsidiary
├── Neuralis Cognitive AI ......... division: ai ........ Frontier R&D
├── BioSyn Humanoid Robotics ...... division: ai ........ Frontier R&D
├── Cristedor Media ............... division: media ..... Core Subsidiary  (parent of Veritas, Immerse)
│   ├── Veritas News Network ...... media ...... Sovereign Subsidiary
│   └── Immerse Spatial Media ..... media ...... Growth Enterprise
├── Academia Open STEM Labs ....... division: edu ....... Non-Profit Foundation
├── Cristedor Capital ............. division: finance ... Sovereign Subsidiary
│   ├── Quantum Asset Management .. finance ..... Sovereign Subsidiary
│   └── Equinox Venture Capital ... finance ..... Growth Enterprise
├── Future Ventures (Cristedor Labs arm) . division: labs .. Incubation Studio (parent of Aether, Hyperion, Vanguard)
│   ├── Aether Energy Fusion Labs .............. Frontier R&D
│   ├── Hyperion Space Logistics .............. Frontier R&D
│   └── Vanguard Advanced Materials ........... Growth Enterprise
└── Frontier Labs ................ division: labs ...... Frontier R&D  (division-level label)
```

## 2. Subsidiary table (all 15, from `portfolioData.ts`)

| # | id | name | division | stage | parentId |
|---|-----|------|----------|-------|----------|
| 1 | cristedor-labs | Cristedor Labs | tech | Core Subsidiary | — |
| 2 | cristedor-media | Cristedor Media | media | Core Subsidiary | — |
| 3 | future-ventures | Future Ventures | labs | Incubation Studio | — |
| 4 | synapse-compute | Synapse Compute Systems | tech | Sovereign Subsidiary | cristedor-labs |
| 5 | krypton-security | Krypton Cybersecurity | tech | Sovereign Subsidiary | cristedor-labs |
| 6 | veritas-news | Veritas News Network | media | Sovereign Subsidiary | cristedor-media |
| 7 | immerse-studios | Immerse Spatial Media | media | Growth Enterprise | cristedor-media |
| 8 | academia-open-labs | Academia Open STEM Labs | edu | Non-Profit Foundation | — |
| 9 | quantum-asset-mgmt | Quantum Asset Management | finance | Sovereign Subsidiary | — |
| 10 | equinox-vc | Equinox Venture Capital | finance | Growth Enterprise | — |
| 11 | neuralis-ai | Neuralis Cognitive AI | ai | Frontier R&D | — |
| 12 | biosyn-robotics | BioSyn Humanoid Robotics | ai | Frontier R&D | — |
| 13 | aether-fusion | Aether Energy Fusion Labs | labs | Frontier R&D | future-ventures |
| 14 | hyperion-space | Hyperion Space Logistics | labs | Frontier R&D | future-ventures |
| 15 | vanguard-materials | Vanguard Advanced Materials | labs | Growth Enterprise | future-ventures |

## 3. Naming inconsistencies (owner attention)

| # | Issue | Detail |
|---|-------|--------|
| S1 | "Cristedor Capital" vs "Quantum Asset Management" | `portfolioOverview` (financialData:39) calls division "Cristedor Capital"; two subsidiaries are Quantum AM and Equinox VC. No subsidiary named "Cristedor Capital" exists in portfolioData, yet a careers job (Managing Director, DeepTech Investments) is listed under "Cristedor Capital". |
| S2 | "Cristedor Labs" vs "Future Ventures" | `portfolioOverview` (financialData:35) lists division "Cristedor Labs" as Software & AI; "Future Ventures" is a subsidiary of division labs (`portfolioData:33`). Careers division label "Future Labs" (careersData `divisionLabels`) is a third name for the labs division. Three names: Future Ventures / Future Labs / Frontier Labs. |
| S3 | Division naming: "Frontier Labs" (portfolioOverview) vs "Future Labs" (careersData divisionLabels) vs "Labs" (financialData heroStat) | Careers page uses "Future Labs"; Investors/Divisions use "Frontier Labs"; teams/direction table uses "labs". |
| S4 | Company filter mismatch in Newsroom | `COMPANIES = ['Cristedor Group','Cristedor Labs','Cristedor Tech','Cristedor Media','Future Ventures']` (newsData:22) — but **no "Cristedor Tech" subsidiary exists** in portfolioData (Tech division is "Cristedor Labs" with Synapse/Krypton). "Cristedor Tech" only appears in leadership (Sarah Lin) and About timeline ("Cristedor Tech launched 2021"). |
| S5 | About timeline says first subsidiaries "Cristedor Tech and Cristedor Media" (2021); brand timeline says "Cristedor Tech" too — portfolio has Cristedor Labs + Cristedor Media | Historical name vs current data mismatch. |
| S6 | Stage taxonomy mixed | Stages in use: Core Subsidiary / Sovereign Subsidiary / Growth Enterprise / Frontier R&D / Incubation Studio / Non-Profit Foundation. About/Investors pages use simpler "Sovereign Subsidiary / Growth Enterprise / Frontier R&D" trio. |
| S7 | Academia "Non-Profit Foundation" vs sustainability claim | `aboutData:370` claims "free world-class STEM education to 1.2M students" matching academia-open-labs metric; consistent in substance. |
| S8 | "Cristedor Education" division (portfolioOverview) vs "Academia Open STEM Labs" subsidiary (portfolioData) | Division named "Cristedor Education"; subsidiary named Academia Open STEM Labs. Verify canonical brand. |

## 4. Verification notes
- 15 subsidiaries CONFIRMED as the actual data set; "10+ subsidiaries" claims are consistent-but-understating.
- parentId relationships only exist for 6 children (Synapse, Krypton, Veritas, Immerse, Aether, Hyperion, Vanguard = actually 7 children under 3 parents). Vanguard has parentId future-ventures.
- The "6 divisions" (tech/ai/media/edu/finance/labs) is the consistent high-level structure everywhere.
- Corporate governance claims (7 board, 5 independent) live only in financialData; no governance docs on site to cross-check.

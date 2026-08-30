# Cristedor Group - High-Fidelity UI Design Specifications
**Document ID:** `HIGH_FIDELITY_DESIGNS.md`  
**Version:** 1.0.0  
**Phase:** Phase 5 (High-Fidelity UI Design & Multi-Viewport Layouts)  

---

## 1. Design System Tokens & Surface Elevation Engine

### 1.1 Surface Elevation & Glass Matrix
- **Obsidian Canvas Base**: `#07080E` (Deep obsidian dark with subtle noise grain overlay).
- **Glass Panel Surface Level 1**: `background: rgba(15, 17, 26, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.06);`
- **Glass Panel Surface Level 2 (Cards)**: `background: rgba(20, 23, 36, 0.75); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);`
- **Glass Panel Hover State**: `background: rgba(26, 30, 46, 0.85); border-color: rgba(0, 240, 255, 0.4); box-shadow: 0 15px 40px -10px rgba(0, 240, 255, 0.15); transform: translateY(-4px);`
- **Accent Glow Gradient**: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(0, 240, 255, 0.06), transparent 40%)`

---

## 2. Multi-Viewport Layout Specifications

### 2.1 Homepage High-Fidelity Design (`/`)

#### A. Desktop Viewport (1280px - 1440px)
```
+---------------------------------------------------------------------------------------------------+
| [STICKY NAVBAR: GLASS BLUR 24px]                                                                  |
| [LOGO: CRISTEDOR GROUP ❖]    Overview   Portfolio   Divisions   Investors   News   Careers  [ ☾/☀ ] |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  [CANVAS NODE NETWORK BACKGROUND - 60FPS INTERACTIVE CONNECTED GRAPH]                             |
|                                                                                                   |
|  [BADGE: ❖ CORPORATE HOLDING ENTERPRISE]                                                          |
|                                                                                                   |
|  ARCHITECTING THE INFRASTRUCTURE                                                                  |
|  OF HUMAN ADVANCEMENT ACROSS DIMENSIONS.                                                           |
|                                                                                                   |
|  Cristedor Group allocates strategic capital, sovereign engineering, and multi-decade             |
|  stewardship to build market-defining enterprises.                                                |
|                                                                                                   |
|  [ CTA: EXPLORE PORTFOLIO MATRIX → ]      [ CTA: INVESTOR PORTAL ↗ ]                               |
|                                                                                                   |
|  -----------------------------------------------------------------------------------------------  |
|  [ LIVE FINANCIAL & METRIC TICKER BAR ]                                                           |
|  AUM: $14.2B+  |  GLOBAL STAFF: 8,400+  |  PATENTS: 1,280+  |  ANNUAL R&D: 28.4%                    |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  [DIVISION ECOSYSTEM TABS]                                                                        |
|  [ TAB: TECH ]   [ TAB: MEDIA ]   [ TAB: EDU ]   [ TAB: FINANCE ]   [ TAB: AI ]   [ LABS ]        |
|                                                                                                   |
|  +--------------------------------------------+  +--------------------------------------------+  |
|  | CRISTEDOR TECH                             |  | CRISTEDOR AI & ROBOTICS                    |  |
|  | Sovereign Cloud & Distributed Operating    |  | Cognitive Foundation Models & Bio-Compute  |  |
|  | 4 Subsidiaries | 1,200+ Engineers          |  | 3 Subsidiaries | 420+ Scientists           |  |
|  | [ Explore Division → ]                     |  | [ Explore Division → ]                     |  |
|  +--------------------------------------------+  +--------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
```

#### B. Mobile Viewport (375px)
```
+-----------------------------------+
| [❖ CRISTEDOR]             [ ☰ ]  |
+-----------------------------------+
| [CANVAS PARTICLE GRAPH - 50% DENSITY]
|
| [BADGE: ❖ HOLDING ENTERPRISE]
|
| ARCHITECTING THE
| INFRASTRUCTURE OF
| HUMAN ADVANCEMENT
| ACROSS DIMENSIONS.
|
| Cristedor Group allocates strategic
| capital and sovereign engineering.
|
| [ EXPLORE PORTFOLIO MATRIX → ]
| [ INVESTOR PORTAL ↗ ]
|
| ---------------------------------
| [ TICKER CARDS (VERTICAL STACK) ]
| • AUM: $14.2B+
| • STAFF: 8,400+
| • PATENTS: 1,280+
+-----------------------------------+
```

---

### 2.2 Companies / Portfolio Matrix High-Fidelity Design (`/portfolio`)

#### A. Desktop Viewport (1440px)
```
+---------------------------------------------------------------------------------------------------+
| [PAGE HEADER] PORTFOLIO MATRIX & SUBSIDIARY DIRECTORY                                             |
| "An interconnected portfolio of category-defining companies operating with operational autonomy."  |
|                                                                                                   |
| [SEARCH & FILTER BAR]                                                                             |
| [ 🔍 Search subsidiary... ]  [ Filter by Industry ▾ ]  [ Filter by Stage ▾ ]  [ Sort: Valuation ▾ ] |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
| [3-COLUMN MODULAR CARD GRID]                                                                       |
|                                                                                                   |
| +----------------------------------+ +----------------------------------+ +---------------------+ |
| | SYNAPSE COMPUTE SYSTEMS          | | KRYPTON CYBERSECURITY            | | VERITAS NEWS        | |
| | Division: Cristedor Tech         | | Division: Cristedor Tech         | | Division: Media     | |
| | Stage: Sovereign Subsidiary      | | Stage: Sovereign Subsidiary      | | Stage: Subsidiary   | |
| | Tech: Distributed Cloud 4.2 Exaf | | Tech: Post-Quantum Crypto Def.   | | Tech: 45M Readers   | |
| | [ Quick View Details → ]         | | [ Quick View Details → ]         | | [ Quick View → ]    | |
| +----------------------------------+ +----------------------------------+ +---------------------+ |
|                                                                                                   |
| +----------------------------------+ +----------------------------------+ +---------------------+ |
| | NEURALIS COGNITIVE AI            | | AETHER FUSION LABS               | | HYPERION SPACE LOG  | |
| | Division: AI & Robotics          | | Division: Future Labs            | | Division: Labs      | |
| | [ Quick View Details → ]         | | [ Quick View Details → ]         | | [ Quick View → ]    | |
| +----------------------------------+ +----------------------------------+ +---------------------+ |
+---------------------------------------------------------------------------------------------------+
```

#### B. Slide-Over Venture Detail Drawer (All Viewports)
```
+-------------------------------------------------------------------+
| SYNAPSE COMPUTE SYSTEMS                                    [ X ]  |
| Sub-brand under Cristedor Tech                                    |
| ----------------------------------------------------------------- |
| Overview: High-throughput cloud compute infrastructure powering   |
| global enterprise AI foundation models.                           |
|                                                                   |
| • Acquired / Incubated: 2022                                      |
| • Global Headcount: 420+ High-Performance Engineers               |
| • Innovation Hubs: San Francisco, Zurich, Singapore               |
| • Key Performance Metric: 4.2 Exaflops Managed Compute Capacity   |
|                                                                   |
| [ CTA: Visit Official Subsidiary Site ↗ ]                         |
| [ CTA: Inquire Acquisition / Synergy Partnership ]                |
+-------------------------------------------------------------------+
```

---

### 2.3 About & Governance High-Fidelity Design (`/about`)

- **Timeline Layout**: Vertical glowing timeline axis connecting 2020 (Founding), 2022 (Cristedor Tech Launch), 2024 (AUM Reaches $10B), and 2026 (Launch of Future Labs Fusion Initiative).
- **Leadership Grid**: 3-column glass cards featuring executive photos with cool ambient rim-lighting, title, and modal bio trigger.

---

### 2.4 Newsroom & Press High-Fidelity Design (`/newsroom`)

- **Featured Announcement**: Large 2-column hero card highlighting major press release with direct PDF download trigger.
- **Media Kit Download Bar**: Direct zip package download trigger containing logo vectors, brand guide PDF, and executive portraits.

---

### 2.5 Careers & Culture High-Fidelity Design (`/careers`)

- **Culture Grid**: 3-card layout highlighting `Sovereign Autonomy`, `Equity & Capital Shares`, and `Global Mobility`.
- **Filtered Open Positions Table**: Department filter pills + location dropdown + inline job application drawer trigger.

---

### 2.6 Contact & Global HQs High-Fidelity Design (`/contact`)

- **Interactive World Map**: Dark vector map canvas with glowing blue/cyan pulse pins over New York, London, Singapore, Tokyo, and Zurich.
- **Inquiry Form**: Glass card form with route selector (`Investor Relations`, `Venture Acquisition`, `Media Press`, `General Inquiry`).

---

### 2.7 Global Footer & 404 Route Design

- **Footer**: 4-column link directory + Live Status Pill (`● All Systems Operational`) + Copyright.
- **404 View**: Center-aligned obsidian screen with glowing red ambient light, `404 // ROUTE NOT FOUND` monospace text, and return button.

---

## 3. Design Decision Rationales

1. **Color Contrast & Accessibility**: Text color `#F8FAFC` on `#07080E` base delivers a 17.4:1 contrast ratio, far exceeding WCAG AAA standards.
2. **Dynamic Canvas Density**: Node density scales dynamically based on device hardware capabilities (100 particles on Desktop 4K, 40 particles on Mobile).
3. **Fluid Layout Grid**: Uses CSS grid `repeat(auto-fit, minmax(340px, 1fr))` to guarantee zero horizontal overflow across all screen sizes.

# Cristedor Group - Comprehensive UI Component Guide
**Document ID:** `COMPONENT_GUIDE.md`  
**Version:** 1.0.0  
**Phase:** Phase 3 (Component Specifications & Design Tokens)  

---

## 1. Primary Component Primitives

### 1.1 Buttons (`<Button />`)

#### Variants & Styling Tokens
- **Primary Cyan (`variant="primary"`)**:
  - Background: `linear-gradient(135deg, #00F0FF 0%, #0284C7 100%)`
  - Text Color: `#07080E` (Bold)
  - Hover: `box-shadow: 0 0 20px rgba(0, 240, 255, 0.4); transform: translateY(-1px);`
- **Secondary Glass (`variant="glass"`)**:
  - Background: `rgba(255, 255, 255, 0.05)`
  - Border: `1px solid rgba(255, 255, 255, 0.12)`
  - Hover: `background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.25);`
- **Outline Ghost (`variant="outline"`)**:
  - Border: `1px solid rgba(148, 163, 184, 0.3)`
  - Text Color: `#F8FAFC`
- **Icon Action (`variant="icon"`)**:
  - Circular or square 40x40px touch container for icons (Theme Toggle, Drawer Close).

#### States & Micro-Interactions
- **Active / Click**: `transform: scale(0.98); transition: transform 0.1s ease;`
- **Disabled**: `opacity: 0.4; cursor: not-allowed; pointer-events: none;`
- **Loading State**: Displays inline CSS spinner animation while preserving original width.

---

### 1.2 Glass Cards (`<GlassCard />`)

#### Anatomy & Variants
- **Venture Card (`variant="venture"`)**:
  - Header: Sub-brand logo + Sector Badge (`Tech`, `AI`, `Finance`).
  - Body: Subsidiary Name, Description, Key Tech Stack.
  - Footer: Metric stat (e.g. `420+ Engineers`) + "Quick View →" trigger link.
- **Metric Card (`variant="metric"`)**:
  - Top Label: Metric Title in monospace (`JetBrains Mono`).
  - Main Display: Animated Counter (`$14.2B+`).
  - Trend Indicator: Small green/cyan directional badge (`▲ +18.4% YOY`).

---

### 1.3 Inputs & Search Controls (`<Input />`, `<SearchInput />`)

#### Form Input Specification
- Default Background: `rgba(15, 17, 26, 0.8)`
- Default Border: `1px solid rgba(255, 255, 255, 0.1)`
- Focus Visible: `border-color: #00F0FF; box-shadow: 0 0 12px rgba(0, 240, 255, 0.2); outline: none;`
- Placeholder Color: `#64748B` (Slate 500)
- Error State: `border-color: #EF4444; box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);`

---

### 1.4 Tabs & Segmented Controllers (`<Tabs />`)

#### Division Filter Tabs Component
```
[ ALL SECTORS ]  [ TECH ]  [ MEDIA ]  [ EDU ]  [ FINANCE ]  [ AI ]  [ LABS ]
```
- Active Tab: Solid Electric Cyan pill background or glowing underline.
- Transition: Smooth slide-highlight indicator using CSS layout calculations.

---

### 1.5 Modals & Slide-Over Drawers (`<Modal />`, `<VentureDrawer />`)

#### Modal Specs
- **Backdrop Overlay**: `rgba(7, 8, 14, 0.75)` with `backdrop-filter: blur(8px)` animation.
- **Slide-Over Panel**: Enters from right edge (`transform: translateX(0)`), width `540px` on desktop, `100%` on mobile.
- **Accessibility**:
  - `role="dialog"`
  - `aria-modal="true"`
  - Automatic focus trap to close button (`[X]`).
  - Dismissible via `Escape` key or backdrop click.

---

### 1.6 Accordions & Collapsible Containers (`<Accordion />`)

- Used in **ESG Disclosures**, **Governance Policies**, and **FAQ/Inquiry Routing**.
- Header click smoothly expands max-height from `0` to `auto` with `300ms cubic-bezier` easing.
- Rotates chevron icon `180deg` on open state.

---

### 1.7 Badges & Status Indicators (`<Badge />`)

- **Live Status Chip**: Green dot pulse animation (`animation: pulse 2s infinite`).
- **Division Tag**: Glass pill with custom border tint (`Tech` = Cyan, `Finance` = Gold, `AI` = Purple).

---

## 2. Interactive Component States & System Feedback

```
┌─────────────────┬─────────────────────────────────────────────────────────┐
│ State           │ Visual & Technical Behavior                             │
├─────────────────┼─────────────────────────────────────────────────────────┤
│ Default         │ Pristine 1px border, 0.8 alpha text, glass panel.       │
│ Hover           │ Elevation +4px, border glow gradient, text 1.0 white.   │
│ Focused         │ 2px Cyan outline ring (--focus-ring-color: #00F0FF).    │
│ Active / Press  │ Downward scale(0.98), instant tactile response.         │
│ Loading         │ Pulse Skeleton animation (grey shimmer gradient).       │
│ Empty State     │ Clean icon illustration + "No ventures found" message.  │
│ Success Toast   │ Emerald green glass bar with checkmark icon.            │
│ Error Callout   │ Red tint glass container with retry action button.      │
└─────────────────┴─────────────────────────────────────────────────────────┘
```

---

## 3. Navigation & Footer Architecture

### 3.1 Header Navigation Component (`<Navbar />`)
- **Desktop**: Brand Emblem Logo (Left), Nav Links (Center), Theme Toggle + Contact CTA (Right).
- **Mobile**: Brand Emblem Logo (Left), Hamburger Menu Trigger (Right).

### 3.2 Global Footer Component (`<Footer />`)
- **Top Row**: Brand Tagline + Newsletter / Investor Alerts Subscribe Input.
- **Middle Grid**: 4 Link Columns (`Divisions`, `Company`, `Investors`, `Legal`).
- **Bottom Bar**: Copyright Notice, ESG Compliance Stamp, System Status (`● All Systems Operational`).

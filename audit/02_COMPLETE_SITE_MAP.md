# 02 — Complete Site Map

**Purpose:** Every route the site can render, with navigation entry points.

## Routes (from `src/hooks/useRoute.ts` + pages)

| Route | Page | Nav presence |
|-------|------|--------------|
| `/` | HomePage | Navbar Home; MobileNav Home; BottomNav Home |
| `/portfolio` | PortfolioSection/Home sections + VentureGrid | Navbar Companies; Footer "All Companies"; BottomNav Companies |
| `/portfolio/:id` | VentureDetailPage (dynamic) | linked from VentureCard cards |
| `/divisions` | DivisionsPage | internal (Footer/Links) |
| `/investors` | InvestorsPage | Navbar Investments (desktop only) |
| `/newsroom` | NewsroomPage | Navbar News; BottomNav News |
| `/about` | AboutPage | Navbar About; BottomNav About |
| `/careers` | CareersPage | Navbar Careers (desktop only) |
| `/contact` | ContactPage | Navbar Contact CTA; MobileNav Contact; BottomNav Contact |
| `/privacy` | PrivacyPage | Footer legal (Privacy Policy / Terms of Use / Cookie Policy → all `/privacy`) |
| `*` (not matched) | NotFoundPage | — |

## Navigation structure

### Navbar (desktop)
Home `/` · Companies `/portfolio` · Investments `/investors` · News `/newsroom` · About `/about` · Careers `/careers` · **Contact CTA** `/contact`

### MobileNav (mobile slide-out)
Home, Portfolio, Investments, News, About, Careers + Contact + "Explore Our Companies" CTA

### BottomNav (mobile persistent, 5 items)
Home `/` · Companies `/portfolio` · News `/newsroom` · About `/about` · Contact `/contact`
> **Note:** Investments and Careers are NOT reachable from mobile bottom nav (only via slide-out menu).

### Footer
- Companies list: Cristedor Labs, Cristedor Media, Future Ventures, All Companies → all `/portfolio`
- Legal: Privacy Policy, Terms of Use, Cookie Policy → all `/privacy`
- Social icons (LinkedIn/Twitter/YouTube/Instagram) → **no href (broken)** — see 18/I4

## JSON-LD / structured data
- Static in `index.html` (Organization) — sameAs handles conflict site socials.
- Per-page WebPage via `useSEO`.
- Per-venture Organization + BreadcrumbList via `useSEO` on `/portfolio/:id`.

## Coverage summary
- 11 unique routes (incl. 404), 1 dynamic param route.
- Every page reachable from navigation; only gaps: Investments/Careers absent from mobile bottom nav; footer socials dead.

import {
  GovernancePrinciple,
  PartnershipType, PressRelease, InvestorFAQ
} from '../types';

/* ═══ 1. INVESTOR HERO — CREDIBILITY INDICATORS ═══
   Structural facts only. No invented AUM, revenue, valuation,
   returns, assets, headcount, investor counts or portfolio value. */
export const heroIndicators = [
  { label: 'Private Holding Company', note: 'Privately held — not publicly traded' },
  { label: 'Multi-Sector Ambition', note: 'Building technology, AI and media ventures, with other areas evaluated over time' },
  { label: 'Long-Term Focus', note: 'Building durable businesses over time' },
  { label: 'Building for Scale', note: 'Early-stage companies and products in development' },
];

/* ═══ 2. GROUP AT A GLANCE ═══ */
export const atAGlanceItems: { icon: string; title: string; description: string; color: string }[] = [
  { icon: 'landmark', title: 'Private Holding Company', description: 'Cristedor Group is a privately held holding company — not a fund, not a venture capital firm, and not an asset manager.', color: '#4F7CCF' },
  { icon: 'layers', title: 'Ventures in Development', description: 'Building its earliest ventures in technology and media through Cristedor Labs and Cristedor Media.', color: '#4F7CCF' },
  { icon: 'cpu', title: 'Technology-Led', description: 'Technology and AI sit at the core of how the Group builds and develops its earliest ventures.', color: '#6B93D4' },
  { icon: 'compass', title: 'Long-Term Orientation', description: 'The Group focuses on building foundations that can grow over time, rather than short-term outcomes.', color: '#D4AF37' },
];

/* ═══ 3. INVESTMENT THESIS ═══ */
export const thesisBody = 'We believe enduring companies are built by combining technology, disciplined execution, strong teams, and a clear understanding of the markets they serve.';

export const thesisPrinciples: { step: string; title: string; description: string; color: string }[] = [
  { step: '01', title: 'Build', description: 'Develop products and businesses that have the potential to solve meaningful problems.', color: '#4F7CCF' },
  { step: '02', title: 'Acquire', description: 'Evaluate acquisition and strategic participation opportunities that align with the Group\'s long-term direction.', color: '#6B93D4' },
  { step: '03', title: 'Scale', description: 'Support promising businesses through technology, strategy, operations and other resources where appropriate.', color: '#4F7CCF' },
  { step: '04', title: 'Compound', description: 'Focus on durable value creation rather than short-term activity.', color: '#D4AF37' },
];

/* ═══ 5. PORTFOLIO STRATEGY ═══
   Describes strategy, not historical achievements. */
export const portfolioStrategyItems: { icon: string; title: string; description: string; color: string }[] = [
  { icon: 'layers', title: 'Build Strong Foundations', description: 'Establish solid operating foundations in the Group\'s companies and products before scaling.', color: '#4F7CCF' },
  { icon: 'target', title: 'Develop High-Potential Businesses', description: 'Concentrate effort on ventures with meaningful potential to solve real problems.', color: '#6B93D4' },
  { icon: 'trending-up', title: 'Expand Selectively', description: 'Grow carefully, adding businesses and initiatives only where they fit the Group\'s long-term direction.', color: '#4F7CCF' },
  { icon: 'building', title: 'Build the Group', description: 'Strengthen the holding structure and shared capabilities over time.', color: '#D4AF37' },
];

/* ═══ 6. CAPITAL & RESOURCE ALLOCATION ═══
   Describes allocation of the Group's own resources, not external investor capital. */
export const capitalCategories: { icon: string; title: string; description: string; color: string }[] = [
  { icon: 'cpu', title: 'Product & Technology', description: 'Resources directed toward building the Group\'s products and technology foundations.', color: '#4F7CCF' },
  { icon: 'users', title: 'People', description: 'Developing the founder-led team needed to build and operate new ventures.', color: '#6B93D4' },
  { icon: 'trending-up', title: 'Growth', description: 'Funding the next stages of development for companies and products that show promise.', color: '#4F7CCF' },
  { icon: 'compass', title: 'Strategic Opportunities', description: 'Reserving resources to evaluate select opportunities aligned with the Group\'s direction.', color: '#D4AF37' },
];

/* ═══ 7. GROWTH STRATEGY ═══
   Future/strategic wording only. No guaranteed milestones. */
export const growthSteps: { step: string; title: string; description: string; color: string }[] = [
  { step: '01', title: 'Build', description: 'Develop and refine products and business foundations.', color: '#4F7CCF' },
  { step: '02', title: 'Validate', description: 'Test concepts with real users and markets before investing further.', color: '#6B93D4' },
  { step: '03', title: 'Scale', description: 'Expand what works — extending reach, capability and operational depth.', color: '#4F7CCF' },
  { step: '04', title: 'Expand', description: 'Pursue new markets and opportunities as the portfolio matures.', color: '#D4AF37' },
];

/* ═══ 8. RISK ═══
   Transparent language. No "risk-free", "protected returns" or "guaranteed growth". */
export const riskAreas: { title: string; description: string; color: string }[] = [
  { title: 'Market Risk', description: 'Products and ventures may not find the demand or traction anticipated.', color: '#4F7CCF' },
  { title: 'Execution Risk', description: 'Building new businesses is difficult and outcomes depend on execution.', color: '#6B93D4' },
  { title: 'Technology Risk', description: 'Technology may not perform as expected or may be overtaken by alternatives.', color: '#4F7CCF' },
  { title: 'Regulatory Risk', description: 'Laws and regulations affecting the Group\'s sectors may change.', color: '#D4AF37' },
  { title: 'Capital Risk', description: 'Early-stage ventures may require more resources or time than expected.', color: '#6B93D4' },
];

/* ═══ 9. RESPONSIBLE GROWTH ═══
   Aspirational commitments. No ESG certifications or completed targets claimed. */
export const responsibleGrowthAreas: { icon: string; title: string; description: string; color: string }[] = [
  { icon: 'cpu', title: 'Responsible Technology', description: 'We aim to develop and use technology thoughtfully, considering its wider effects.', color: '#4F7CCF' },
  { icon: 'users', title: 'Talent Development', description: 'We commit to developing people as the Group grows.', color: '#6B93D4' },
  { icon: 'globe', title: 'Sustainable Operations', description: 'As we grow, we aim to build operations that are resource-conscious and sustainable.', color: '#4F7CCF' },
  { icon: 'heart', title: 'Community Impact', description: 'We aim to contribute positively to the communities we serve.', color: '#D4AF37' },
  { icon: 'shield', title: 'Ethical Business Practices', description: 'We commit to acting with integrity in how we build and operate.', color: '#6B93D4' },
];

/* ═══ 10. GOVERNANCE ═══
   Structures being developed. No invented board, committees or audits. */
export const governancePrinciples: GovernancePrinciple[] = [
  { title: 'Accountability', description: 'Clear responsibility for decisions across the Group.' },
  { title: 'Transparency', description: 'Open and honest communication about the Group\'s direction.' },
  { title: 'Responsible Decision-Making', description: 'Decisions made with care for the Group\'s long-term interests.' },
  { title: 'Risk Awareness', description: 'Active awareness of risks as the Group builds new ventures.' },
];

/* ═══ 12. STANDARDS & COMMITMENTS ═══ */
export const standardsIntent = 'As Cristedor Group\'s businesses mature, we intend to progressively adopt appropriate professional, technical, security, privacy and governance standards. Certifications and formal attestations will be disclosed here once they genuinely exist.';

export const standardsCommitments: { title: string; description: string }[] = [
  { title: 'Professional Standards', description: 'Intending to adopt recognised professional and operational standards as the businesses mature.' },
  { title: 'Technical & Security Standards', description: 'Intending to progressively adopt technical and information-security practices appropriate to each business.' },
  { title: 'Privacy Standards', description: 'Intending to handle data responsibly and in line with applicable privacy expectations.' },
  { title: 'Governance Standards', description: 'Intending to develop governance and reporting practices that support accountability and transparency.' },
];

/* ═══ 13. CORPORATE DOCUMENTS ═══
   No real documents exist yet — placeholders only, clearly marked Coming Soon. */
export const reportComingSoon: { id: string; category: string; title: string; summary: string }[] = [
  { id: 'company-profile', category: 'Corporate Profile', title: 'Company Profile', summary: 'An overview of the Group\'s positioning, companies and strategy — to be published once available.' },
  { id: 'annual-review', category: 'Annual Report', title: 'Annual Review', summary: 'A review of the Group\'s activities for each financial year — to be published once available.' },
  { id: 'governance', category: 'Governance', title: 'Governance Summary', summary: 'Information on how the Group is structured and governed — to be published once available.' },
  { id: 'sustainability', category: 'Sustainability', title: 'Responsible Growth Update', summary: 'Updates on the Group\'s responsible-growth commitments — to be published once available.' },
];

/* ═══ 14. PRESS & COMPANY UPDATES ═══
   Only genuine announcements belong here. None currently verified. */
export const pressReleases: PressRelease[] = [];

/* ═══ 15. PARTNERSHIP OPPORTUNITIES ═══ */
export const partnershipTypes: PartnershipType[] = [
  { icon: 'handshake', title: 'Strategic Partnerships', description: 'Explore opportunities to collaborate on products, markets, technology and business development.', color: '#4F7CCF' },
  { icon: 'flask', title: 'Research & Innovation', description: 'Collaborate on emerging technologies and research initiatives aligned with the Group\'s areas of focus.', color: '#6B93D4' },
  { icon: 'building', title: 'Capital & Investment', description: 'Engage with the Group regarding potential investment and strategic capital opportunities, subject to applicable requirements and the nature of each opportunity.', color: '#D4AF37' },
];

/* ═══ 16. FUTURE VISION ═══
   Horizons only — no arbitrary years presented as guaranteed achievements. */
export const futureVision: { horizon: string; title: string; description: string; color: string }[] = [
  { horizon: 'Near Term', title: 'Strong Foundations', description: 'Strengthen core businesses and establish scalable operating foundations.', color: '#4F7CCF' },
  { horizon: 'Medium Term', title: 'Selective Expansion', description: 'Expand the portfolio through carefully selected ventures, partnerships and strategic opportunities.', color: '#6B93D4' },
  { horizon: 'Long Term', title: 'A Durable Holding Group', description: 'Build a durable technology-driven holding group with businesses operating across multiple markets.', color: '#D4AF37' },
];

/* ═══ 18. FAQ ═══ */
export const investorFAQ: InvestorFAQ[] = [
  { question: 'Is Cristedor Group publicly traded?', answer: 'No. Cristedor Group is a privately held company.' },
  { question: 'What does Cristedor Group focus on?', answer: 'The Group is building its earliest ventures in technology and media through Cristedor Labs and Cristedor Media, and evaluates additional opportunities aligned with its long-term direction.' },
  { question: 'Does Cristedor Group accept outside investment?', answer: 'Opportunities for external investment or strategic capital are evaluated selectively based on the structure and requirements of the relevant business or initiative. This website does not constitute an offer to sell securities.' },
  { question: 'Can companies partner with Cristedor Group?', answer: 'Yes. We welcome appropriate strategic, technology, research and business-development conversations.' },
  { question: 'Does Cristedor Group acquire companies?', answer: 'The Group may evaluate acquisition and strategic participation opportunities where they align with its long-term strategy and available resources.' },
  { question: 'Where does Cristedor Group operate?', answer: 'The Group\'s activities and portfolio are developing. Specific operating locations should only be presented where Cristedor has an established presence.' },
  { question: 'Can I request financial information?', answer: 'Selected corporate information may be made available where appropriate. Private-company information is not necessarily publicly disclosed.' },
];

/* ═══ FINANCIAL METRICS (Legacy) ═══
   Previously contained invented figures ($2.8B AUM, AAA ESG rating, 28% R&D).
   Removed. Cristedor Group does not disclose AUM, revenue or returns. */

/* ═══ REPORTS (Legacy) ═══
   No genuine documents exist. Removed so no fabricated filings can render. */

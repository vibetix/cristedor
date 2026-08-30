export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface BrandTimelineEvent {
  year: string;
  title: string;
  description: string;
  phase: string;
}

export interface CoreValue {
  id: string;
  icon: string;
  title: string;
  plainLanguage: string;
  description: string;
  points: string[];
  glowColor: 'cyan' | 'gold' | 'purple' | 'green';
}

export interface GlobalHub {
  city: string;
  country: string;
  type: string;
  description: string;
  gradient: string;
  lat: number;
  lng: number;
}

export interface GroupStat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface CompanyCard {
  id: string;
  name: string;
  industry: string;
  description: string;
  logo: string;
  bg: string;
  iconGradient: string;
  exploreRoute: string;
}

export interface PhilosophyStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface IndustryCard {
  name: string;
  icon: string;
  img: string;
  color: string;
  description: string;
}

export interface ImpactStat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface CultureValue {
  icon: string;
  title: string;
  description: string;
}

export interface GovernancePrinciple {
  icon: string;
  title: string;
  description: string;
}

export interface SustainabilityArea {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface DesignPrinciple {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DocumentItem {
  title: string;
  description: string;
  format: string;
  icon: string;
}

export interface CareerPreview {
  title: string;
  division: string;
  location: string;
  type: string;
}

export interface Partner {
  name: string;
  type: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const companyVision = {
  headline: 'Building an African group of companies that improve how people live, work, learn, and connect.',
  summary: 'Cristedor Group is being established in Ghana as a private holding company. Through long-term thinking and disciplined execution, we aim to build durable companies across technology and media that create value over time.',
};

export const whoWeAre = {
  headline: 'Who We Are',
  description: 'Cristedor Group is a private, early-stage holding company being built in Ghana. We develop technology and media ventures designed to solve practical problems and grow over the long term.',
  facts: [
    { label: 'Origin', value: '2024' },
    { label: 'Based In', value: 'Ghana' },
    { label: 'Current Ventures', value: '2' },
    { label: 'Mode', value: 'Online-First' },
    { label: 'Stage', value: 'Early-Stage' },
  ],
};

export const founderStory = {
  headline: 'The Founder Story',
  quote: 'I wanted to build something meaningful — companies that solve real problems and can grow over the long term.',
  quoteAuthor: 'Dormenikpi Kwaku Precious',
  paragraphs: [
    'Cristedor Group was founded around a simple ambition: to build technology and media ventures that solve meaningful problems and can grow over the long term.',
    'The idea originated in 2024. In 2026, the Group is actively being built — with its website, ventures, and operating structure taking shape in Ghana.',
    'Cristedor Group is being established as a holding company with two current ventures: Cristedor Labs (technology) and Cristedor Media (media and content). Multiple products are being explored and developed across these initiatives.',
  ],
  timeline: [
    { year: '2024', text: 'The idea for Cristedor Group originates — a vision to build technology and media ventures from Ghana.' },
    { year: '2026', text: 'The Group is actively being built. Cristedor Labs and Cristedor Media are being established.' },
  ],
};

export const timeline: TimelineEvent[] = [
  {
    year: '2024',
    title: 'The Vision Begins',
    description: 'The idea for Cristedor Group takes shape — a long-term holding company for technology and media ventures.',
    icon: 'lightbulb',
  },
  {
    year: '2026',
    title: 'Building the Group',
    description: 'Cristedor Group\'s website, ventures, and operating structure are being developed as the company takes shape in Ghana.',
    icon: 'building',
  },
];

export const brandTimeline: BrandTimelineEvent[] = [
  { year: '2024', title: 'The Vision', description: 'The idea for Cristedor Group takes shape around building a long-term group of technology and media ventures.', phase: 'Origin' },
  { year: '2026', title: 'Being Built', description: 'Cristedor Group\'s website, ventures, and operating structure are being developed in Ghana.', phase: 'Building' },
];

export const coreValues: CoreValue[] = [
  {
    id: 'long-term',
    icon: 'clock',
    title: 'Long-Term Thinking',
    plainLanguage: 'We make decisions with the future in mind.',
    description: 'We are building for the long term, not optimizing for short-term outcomes. Our ownership structure supports patience and durability.',
    points: [
      'Decisions made with the future in mind',
      'Building for durability, not quick exits',
      'Patience as a core principle',
    ],
    glowColor: 'cyan',
  },
  {
    id: 'autonomy',
    icon: 'network',
    title: 'Venture Autonomy',
    plainLanguage: 'Each venture develops its own mission while staying aligned with the Group.',
    description: 'Cristedor Labs and Cristedor Media each develop their own approach. Knowledge and capabilities are shared across ventures as the Group develops.',
    points: [
      'Independent venture missions',
      'Shared knowledge across ventures',
      'Unified long-term direction',
    ],
    glowColor: 'gold',
  },
  {
    id: 'integrity',
    icon: 'shield',
    title: 'Integrity',
    plainLanguage: 'We aim to be accurate, transparent, and responsible in how we build.',
    description: 'We believe honest communication and responsible building are essential — especially for an early-stage company earning trust.',
    points: [
      'Accuracy in communication',
      'Transparency about our stage',
      'Responsible innovation',
    ],
    glowColor: 'purple',
  },
];

export const operatingPhilosophy: PhilosophyStep[] = [
  { step: 1, title: 'Research', description: 'Identify real problems worth solving.', icon: 'search' },
  { step: 2, title: 'Build', description: 'Develop practical solutions from first principles.', icon: 'hammer' },
  { step: 3, title: 'Launch', description: 'Bring validated products to users.', icon: 'rocket' },
  { step: 4, title: 'Learn', description: 'Use real feedback and outcomes to improve.', icon: 'lightbulb' },
  { step: 5, title: 'Scale', description: 'Expand when there is evidence that products should grow.', icon: 'trending-up' },
];

export const industries: IndustryCard[] = [
  { name: 'Technology & Software', icon: 'monitor', img: '/icons8-electronics-96.png', color: '#00F0FF', description: 'Software products, digital platforms, and online-first tools' },
  { name: 'Artificial Intelligence', icon: 'brain', img: '/icons8-artificial-intelligence-64.png', color: '#8B5CF6', description: 'Practical AI-powered tools and products' },
  { name: 'Digital Media', icon: 'play', img: '/icons8-media-64.png', color: '#6366F1', description: 'Digital content and media initiatives' },
];

export const impactStats: ImpactStat[] = [];

export const groupStats: GroupStat[] = [
  { value: '2024', label: 'Origin' },
  { value: '2', label: 'Ventures Being Built' },
  { value: '1', label: 'Country — Ghana' },
  { value: 'Online', label: 'First' },
];

export const globalHubs: GlobalHub[] = [
  {
    city: 'Accra',
    country: 'Ghana',
    type: 'Based In',
    description: 'Cristedor Group is being built in Ghana and operates online-first.',
    gradient: 'linear-gradient(135deg, #0a1220 0%, #1a3a6c 100%)',
    lat: 5.6037,
    lng: -0.187,
  },
];

export const companyCards: CompanyCard[] = [
  {
    id: 'cristedor-labs',
    name: 'Cristedor Labs',
    industry: 'Technology & Software',
    description: 'Builds and develops software products, digital platforms, and AI-powered tools.',
    logo: '🔬',
    bg: '/card_labs.jpg',
    iconGradient: 'linear-gradient(135deg, #4F7CCF 0%, #335EAA 100%)',
    exploreRoute: '/portfolio/cristedor-labs',
  },
  {
    id: 'cristedor-media',
    name: 'Cristedor Media',
    industry: 'Media & Content',
    description: 'Is being established as the Group\'s media venture, focused on developing digital content and media initiatives.',
    logo: '📡',
    bg: '/card_media.jpg',
    iconGradient: 'linear-gradient(135deg, #335EAA 0%, #13273D 100%)',
    exploreRoute: '/portfolio/cristedor-media',
  },
];

export const cultureValues: CultureValue[] = [
  { icon: 'lightbulb', title: 'Innovation', description: 'We build what hasn\'t been built before, starting small and improving constantly.' },
  { icon: 'book', title: 'Learning', description: 'We are perpetual students, always expanding our understanding of the world.' },
  { icon: 'users', title: 'Collaboration', description: 'The best ideas emerge when talented people work together across disciplines.' },
  { icon: 'award', title: 'Excellence', description: 'We hold ourselves to high standards in everything we build.' },
  { icon: 'sparkle', title: 'Curiosity', description: 'We ask hard questions and refuse to accept easy answers.' },
];

export const governancePrinciples: GovernancePrinciple[] = [
  { icon: 'shield', title: 'Integrity', description: 'We uphold the highest ethical standards in every decision and communication.' },
  { icon: 'eye', title: 'Transparency', description: 'Clear communication and accountability as the Group develops.' },
  { icon: 'clock', title: 'Long-Term Thinking', description: 'Every decision is evaluated against a long-term horizon, not a quarterly target.' },
  { icon: 'brain', title: 'Responsible Innovation', description: 'We pursue new technologies with careful consideration of their societal impact.' },
];

export const sustainabilityAreas: SustainabilityArea[] = [
  { icon: 'graduation', title: 'Education', description: 'We are interested in making learning and knowledge more accessible through technology.', color: '#10B981' },
  { icon: 'leaf', title: 'Responsible Innovation', description: 'We aim to consider the social and ethical consequences of the technologies we build.', color: '#22C55E' },
  { icon: 'heart', title: 'Community Development', description: 'We want to build from Ghana while creating useful products and opportunities.', color: '#3B82F6' },
  { icon: 'brain', title: 'Ethical AI', description: 'We aim to develop AI products with appropriate human oversight, transparency, and responsibility.', color: '#8B5CF6' },
];

export const designPrinciples: DesignPrinciple[] = [
  { icon: 'minus', title: 'Simplicity', description: 'Complex systems should feel effortless. We design for clarity, not complexity.' },
  { icon: 'check-circle', title: 'Reliability', description: 'Our products work when they\'re supposed to. Dependability is not optional.' },
  { icon: 'zap', title: 'Innovation', description: 'We push the boundaries of what\'s possible while staying grounded in what\'s useful.' },
  { icon: 'clock', title: 'Long-Term Thinking', description: 'Every design decision is made with the future in mind — scalable, adaptable, enduring.' },
];

export const faqItems: FAQItem[] = [
  { question: 'What is Cristedor Group?', answer: 'Cristedor Group is a private, early-stage holding company being built in Ghana. Through Cristedor Labs and Cristedor Media, we develop technology and media ventures that operate online-first.' },
  { question: 'What companies belong to the Group?', answer: 'Cristedor Group is the parent company. Its current ventures are Cristedor Labs (technology and software) and Cristedor Media (media and content).' },
  { question: 'What is Cristedor Labs?', answer: 'Cristedor Labs is the Group\'s technology venture. It builds and develops software products, digital platforms, and AI-powered tools.' },
  { question: 'What is Cristedor Media?', answer: 'Cristedor Media is the Group\'s media venture. It is being established to develop digital content and media initiatives.' },
  { question: 'What products is Cristedor building?', answer: 'Multiple products are currently being explored and developed across Cristedor\'s technology initiatives. Individual projects are announced as they progress.' },
  { question: 'Where is Cristedor based?', answer: 'Cristedor Group is being built in Ghana and operates online-first.' },
  { question: 'Are you hiring?', answer: 'We are not hiring at the moment. Genuine opportunities will be published on our careers page as the team grows.' },
  { question: 'How can I contact Cristedor?', answer: 'You can reach us through our contact page or email us at group.cristedor@gmail.com.' },
];

export const documents: DocumentItem[] = [];

export const careerPreviews: CareerPreview[] = [];

export const partners: Partner[] = [];

export const testimonials: Testimonial[] = [];

export const awards: { year: string; title: string; issuer: string }[] = [];

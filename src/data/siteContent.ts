// ─────────────────────────────────────────────────────────────
// Site content (static)
// ─────────────────────────────────────────────────────────────
// Central, verified homepage content. Kept as plain data so it can
// later be served by API endpoints without changing the UI:
//   GET /api/companies
//   GET /api/projects
//   GET /api/news
//   GET /api/site-settings
// No PHP/MySQL/API yet — static only.

export interface SiteCompany {
  id: string;
  name: string;
  category: string;
  status: string;
  statusColor: string;
  description: string;
  cta: string;
  bgImage: string;
  accentColor: string;
}

export const companies: SiteCompany[] = [
  {
    id: 'cristedor-labs',
    name: 'Cristedor Labs',
    category: 'Technology & AI',
    status: 'BEING ESTABLISHED',
    statusColor: '#F59E0B',
    description: 'Cristedor Labs is the technology company responsible for building software products and AI-powered solutions.',
    cta: 'EXPLORE CRISTEDOR LABS',
    bgImage: '/card_labs.jpg',
    accentColor: '#4F7CCF',
  },
  {
    id: 'cristedor-media',
    name: 'Cristedor Media',
    category: 'Media & Content',
    status: 'BEING ESTABLISHED',
    statusColor: '#F59E0B',
    description: 'Cristedor Media is the creative media company focused on digital storytelling, educational content, and original media across emerging platforms.',
    cta: 'EXPLORE CRISTEDOR MEDIA',
    bgImage: '/card_media.jpg',
    accentColor: '#335EAA',
  },
];

export interface SiteProject {
  id: string;
  name: string;
  category: string;
  status: string;
  statusColor: string;
  description: string;
  cta: string;
  accentColor: string;
  featureTitle?: string;
  featureDescription?: string;
}

export const projects: SiteProject[] = [
  {
    id: 'unistay',
    name: 'UniStay',
    category: 'University Housing Technology',
    status: 'IN DEVELOPMENT',
    statusColor: '#00F0FF',
    description: 'UniStay is a university housing platform that helps students discover and book accommodation, while its agent program enables students to earn through successful referrals of hostel owners.',
    cta: 'EXPLORE UNISTAY',
    accentColor: '#4F7CCF',
    featureTitle: 'Student Agent Program',
    featureDescription: 'Students can refer hostel owners and receive a reward when a referred hostel is successfully booked and the student has checked in.',
  },
  {
    id: 'synkturt-tts',
    name: 'Synkturt TTS',
    category: 'AI & Voice Technology',
    status: 'IN DEVELOPMENT',
    statusColor: '#00F0FF',
    description: 'Synkturt TTS is an AI-powered text-to-speech platform designed to transform written text into natural-sounding AI voices.',
    cta: 'EXPLORE SYNKTURT TTS',
    accentColor: '#00F0FF',
  },
  {
    id: 'vibetix',
    name: 'Vibetix',
    category: 'Event Technology',
    status: 'IN DEVELOPMENT',
    statusColor: '#00F0FF',
    description: 'Vibetix is an event ticketing platform that enables people to discover and purchase digital tickets online for events ranging from house parties and dinner parties to excursions and more.',
    cta: 'EXPLORE VIBETIX',
    accentColor: '#8B5CF6',
    featureTitle: 'QR-Coded Digital Tickets',
    featureDescription: 'Attendees receive a QR-coded ticket that organizers can scan at the event.',
  },
];

export interface AtAGlanceStat {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  kind: 'numeric' | 'text';
}

export const atAGlanceStats: AtAGlanceStat[] = [
  { id: 'companies', value: '02', label: 'Companies in Development', sublabel: 'Cristedor Labs + Cristedor Media', kind: 'numeric' },
  { id: 'products', value: '03', label: 'Public Products', sublabel: 'UniStay, Synkturt TTS, and Vibetix', kind: 'numeric' },
  { id: 'online-first', value: 'ONLINE-FIRST', label: 'Operating Model', sublabel: 'Cristedor currently operates online.', kind: 'text' },
];

export interface SiteSettings {
  hero: {
    eyebrow: string;
    subCopy: string;
    primaryCta: string;
    secondaryCta: string;
  };
  atAGlance: {
    label: string;
    headingPlain: string;
    headingGradient: string;
    visionLabel: string;
    visionText: string;
  };
  companiesSection: {
    label: string;
    headingPlain: string;
    headingGradient: string;
  };
  projectsSection: {
    label: string;
    headingPlain: string;
    headingGradient: string;
    description: string;
  };
  newsroom: {
    label: string;
    headingPlain: string;
    headingGradient: string;
    description: string;
    emptyTitle: string;
    emptyText: string;
  };
  closingCta: {
    eyebrow: string;
    headline: string;
    supporting: string;
    primaryCta: string;
    secondaryCta: string;
  };
  techStack: {
    label: string;
  };
}

export const siteSettings: SiteSettings = {
  hero: {
    eyebrow: 'PRIVATE • INNOVATIVE • FUTURE-FOCUSED',
    subCopy: 'Cristedor Group is an early-stage private holding company building businesses across technology, media, and emerging industries.',
    primaryCta: 'EXPLORE OUR COMPANIES',
    secondaryCta: 'ABOUT CRISTEDOR',
  },
  atAGlance: {
    label: 'CRISTEDOR AT A GLANCE',
    headingPlain: 'Cristedor',
    headingGradient: 'at a Glance.',
    visionLabel: 'BUILDING BEYOND TODAY',
    visionText: 'Cristedor Group is creating the foundation for businesses that can grow across technology, media, and emerging industries.',
  },
  companiesSection: {
    label: 'OUR COMPANIES',
    headingPlain: 'The companies',
    headingGradient: 'we are building.',
  },
  projectsSection: {
    label: "WHAT WE'RE BUILDING",
    headingPlain: "What we're",
    headingGradient: 'building.',
    description: 'A growing portfolio of technology products being developed through Cristedor Labs.',
  },
  newsroom: {
    label: 'CRISTEDOR NEWSROOM',
    headingPlain: 'Cristedor',
    headingGradient: 'Newsroom.',
    description: 'Official updates, announcements, insights, and stories from across the Cristedor ecosystem.',
    emptyTitle: 'No stories published yet.',
    emptyText: "We're building what's next. Check back for official updates from Cristedor Group and its companies.",
  },
  closingCta: {
    eyebrow: 'THE NEXT CHAPTER',
    headline: "Let's Build What's Next.",
    supporting: 'Cristedor Group is an early-stage holding company building a portfolio of technology and media ventures designed to turn ambitious ideas into meaningful businesses.',
    primaryCta: 'EXPLORE OUR COMPANIES',
    secondaryCta: 'CONTACT CRISTEDOR',
  },
  techStack: {
    label: 'Technology We Use',
  },
};

// No approved published articles yet. Reserved for GET /api/news.
export const news: never[] = [];

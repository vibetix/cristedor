// ─────────────────────────────────────────────────────────────
// UniStay — public product page content & asset architecture
// ─────────────────────────────────────────────────────────────
// UniStay is genuinely IN DEVELOPMENT. Nothing here claims it is
// launched, operational, or has traction. Where capabilities are
// described they are "intended", "designed to", "being developed",
// or "being explored" — never presented as already live.
//
// Reserved asset paths live under /projects/unistay/ so real
// logo / UI assets can be dropped in later with no code changes.
// No image files are created by this project yet.

export const UNISTAY_ACCENT = '#4F7CCF';

export const unistayMeta = {
  name: 'UniStay',
  category: 'University Housing Technology',
  status: 'IN DEVELOPMENT',
  parent: 'Cristedor Labs',
  division: 'Technology',
  eyebrow: 'WHAT WE\u2019RE BUILDING',
  tagline: 'University Housing Technology',
  description: 'UniStay is a university housing platform being built to make it easier for students to discover, compare, and book accommodation. Its Student Agent Program is designed to enable students to earn rewards by referring hostel owners whose properties are successfully booked.',
};

export const unistayProblem = {
  heading: 'The Problem',
  description: 'Finding university accommodation can be fragmented and difficult for students. Information about hostels may be spread across personal referrals, social media, agents, and individual hostel operators, making it harder for students to efficiently discover and evaluate available options.',
  resolution: 'UniStay is being built to bring this experience into one platform.',
};

export const unistayBuilding = {
  eyebrow: 'THE EXPERIENCE',
  heading: 'What We\u2019re Building',
  description: 'UniStay is being developed to create a more structured digital experience for university accommodation discovery and booking.',
  features: [
    { icon: 'Search', title: 'Discover', description: 'Explore university accommodation options through a centralized platform.' },
    { icon: 'Scale', title: 'Compare', description: 'Review available accommodation information to help students evaluate their options.' },
    { icon: 'CalendarCheck', title: 'Book', description: 'Move from accommodation discovery toward a structured booking experience.' },
    { icon: 'Users', title: 'Connect', description: 'Create a digital connection between students and hostel owners.' },
  ],
};

export const unistayProcess = {
  eyebrow: 'HOW IT WORKS',
  heading: 'How UniStay Works',
  note: 'The intended product journey',
  steps: [
    { number: '01', title: 'Discover', description: 'Students explore available university accommodation.' },
    { number: '02', title: 'Compare', description: 'Students review accommodation information and consider suitable options.' },
    { number: '03', title: 'Book', description: 'Students proceed through the accommodation booking experience.' },
    { number: '04', title: 'Check In', description: 'After a successful booking, the student completes their accommodation journey.' },
    { number: '05', title: 'Refer', description: 'Students can refer hostel owners through the Student Agent Program.' },
  ],
};

export const unistayAgentProgram = {
  eyebrow: 'STUDENT AGENT PROGRAM',
  heading: 'Student Agent Program',
  description: 'UniStay is designed to allow students to refer hostel owners to the platform. When a referred property receives a successful booking and the student completes check-in, the referring student becomes eligible for a reward.',
  steps: [
    { label: 'Student', description: 'A student joins the Student Agent Program.' },
    { label: 'Refers Hostel Owner', description: 'The student refers a hostel owner to UniStay.' },
    { label: 'Hostel Joins UniStay', description: 'The referred hostel is onboarded to the platform.' },
    { label: 'Successful Booking', description: 'The property receives a successful booking.' },
    { label: 'Student Checks In', description: 'The student completes their check-in.' },
    { label: 'Eligible for Reward', description: 'The referring student becomes eligible for a reward.' },
  ],
  cautions: [
    'Rewards are not guaranteed income.',
    'No reward amount has been confirmed.',
  ],
};

export const unistayDevelopment = {
  eyebrow: 'PRODUCT DEVELOPMENT',
  heading: 'UniStay in Development',
  description: 'Explore the product experience currently being designed and developed by Cristedor Labs.',
};

export const unistayResearch = {
  eyebrow: 'FUTURE RESEARCH',
  heading: 'Exploring the Future of University Housing',
  description: 'UniStay is currently in development, with ongoing exploration into how artificial intelligence could improve the way students discover, evaluate, and access university accommodation.',
  note: 'The following are potential research directions — areas of exploration, not existing features.',
  directions: [
    { icon: 'Sparkles', title: 'Intelligent Recommendations', description: 'Potential to recommend accommodation based on a student\u2019s preferences and circumstances.' },
    { icon: 'MessageSquare', title: 'Natural-Language Discovery', description: 'Potential to let students describe what they need in everyday language.' },
    { icon: 'Users', title: 'Student-to-Property Matching', description: 'Potential to connect students with accommodation that fits their situation.' },
    { icon: 'FileSearch', title: 'Information Quality Analysis', description: 'Potential to help keep accommodation information accurate and useful.' },
    { icon: 'LineChart', title: 'Demand & Availability Insights', description: 'Potential to surface high-level patterns in demand and availability.' },
  ],
};

export const unistayVision = {
  eyebrow: 'VISION',
  heading: 'Our Vision',
  quote: 'To build a trusted digital infrastructure for university accommodation, connecting students, hostel owners, and student communities through a simpler housing experience.',
};

export const unistayPitchDeck = {
  eyebrow: 'PITCH DECK',
  heading: 'Explore the UniStay Vision',
  description: 'The pitch deck covers the problem we\u2019re solving, UniStay\u2019s product vision as an intelligent student-housing decision-support platform, the current web foundation, the proposed AI intelligence layer, why Google AI, our Ghana-first expansion strategy, and the development roadmap.',
  viewLabel: 'View Pitch Deck',
  downloadLabel: 'Download Pitch Deck',
  assetPath: '/UniStay_Pitch_Deck.pdf',
  fileName: 'UniStay_Pitch_Deck.pdf',
};

export const unistayAI = {
  eyebrow: 'AI-POWERED HOUSING INTELLIGENCE',
  symbol: '\u2726',
  heading: 'Smarter Housing Discovery, Powered by AI',
  description: 'UniStay is being developed with an AI layer designed to understand student housing preferences, intelligently match requirements with available listings, and provide personalized accommodation recommendations. The goal is to make university housing discovery faster, simpler, and more relevant to each student.',
  note: 'AI Roadmap · In Development',
  capabilities: [
    { icon: 'Sparkles', title: 'Personalized Housing Recommendations', description: 'Suggest listings based on a student\u2019s stated preferences and requirements.' },
    { icon: 'MessageSquare', title: 'Preference Understanding', description: 'Interpret natural-language requests such as \u201CI need an affordable place close to campus with Wi-Fi.\u201D' },
    { icon: 'Scale', title: 'Smart Matching', description: 'Compare student requirements with available accommodation attributes to identify suitable options.' },
    { icon: 'Bot', title: 'Conversational Housing Assistance', description: 'Help students explore and refine their accommodation requirements through an AI-powered interface.' },
    { icon: 'SlidersHorizontal', title: 'Context-Aware Suggestions', description: 'Improve recommendations as students provide additional preferences during their search.' },
  ],
};

// ─────────────────────────────────────────────────────────────
// Reserved asset architecture — /public/projects/unistay/
// Future real assets should be placed here. No files exist yet;
// the UI falls back to intentional placeholders until they do.
// ─────────────────────────────────────────────────────────────
export const unistayAssets = {
  base: '/projects/unistay',
  logo: '/projects/unistay/unistay-logo.png',
  studentUi: '/projects/unistay/unistay-student-ui.png',
  searchUi: '/projects/unistay/unistay-search-ui.png',
  propertyUi: '/projects/unistay/unistay-property-ui.png',
  bookingUi: '/projects/unistay/unistay-booking-ui.png',
  agentUi: '/projects/unistay/unistay-agent-ui.png',
  ownerUi: '/projects/unistay/unistay-owner-ui.png',
} as const;

export const unistayGallerySlots: { key: keyof typeof unistayAssets; title: string; description: string }[] = [
  { key: 'logo', title: 'UniStay Logo', description: 'The UniStay brand mark.' },
  { key: 'studentUi', title: 'Student Interface', description: 'The student-facing experience.' },
  { key: 'searchUi', title: 'Accommodation Discovery Screen', description: 'Searching and browsing accommodation.' },
  { key: 'propertyUi', title: 'Property Details Screen', description: 'Details of a specific accommodation.' },
  { key: 'bookingUi', title: 'Booking Interface', description: 'The booking flow.' },
  { key: 'agentUi', title: 'Student Agent Interface', description: 'The Student Agent Program experience.' },
  { key: 'ownerUi', title: 'Hostel-Owner Interface', description: 'The hostel-owner view.' },
];

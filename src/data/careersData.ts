export interface CareerJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  posted: string;
  description: string;
  requirements: string[];
  salary?: string;
  color: string;
}

export interface CareerInternProgram {
  title: string;
  description: string;
  duration: string;
  locations: string;
  color: string;
}

export interface CareerStat {
  value: number;
  suffix?: string;
  label: string;
  color: string;
}

export interface CareerProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface CareerApplicationProgressStep {
  title: string;
  description: string;
  status: 'complete' | 'current' | 'upcoming';
}

export interface CareerLearningStep {
  step: string;
  title: string;
  description: string;
  color: string;
}

export interface CareerCandidateResource {
  title: string;
  description: string;
  icon: string;
  fileSize: string;
  color: string;
}

export interface CareerLocation {
  city: string;
  country: string;
  roles: number;
  description: string;
  coords: [number, number];
  highlight: boolean;
}

export interface CareerEmployeeStory {
  name: string;
  role: string;
  image: string;
  quote: string;
  years: string;
  color: string;
}

export interface CareerBenefit {
  icon: string;
  title: string;
  description: string;
  category: string;
  color: string;
}

export interface CareerCultureValue {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface CareerWorkModel {
  icon: string;
  title: string;
  description: string;
  stat?: string;
}

export interface CareerTrait {
  icon: string;
  title: string;
  description: string;
}

export interface CareerFAQ {
  question: string;
  answer: string;
}

export interface CareerLifeAtCard {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  border: string;
}

export interface CareerDEICard {
  icon: string;
  title: string;
  description: string;
  stat: string;
  color: string;
}

export interface CareerRemotePerk {
  icon: string;
  label: string;
}

export interface CareerTeam {
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const heroStats: CareerStat[] = [
  { value: 2024, label: 'Origin Year', color: '#4F7CCF' },
  { value: 0, label: 'Open Roles', color: '#3DDC97' },
  { value: 2, label: 'Ventures Being Built', color: '#8B5CF6' },
  { value: 1, label: 'Country', color: '#D4AF37' },
];

export const cultureValues: CareerCultureValue[] = [
  { icon: 'Target', title: 'Truth Over Hype', description: 'We say what we are and what we are not. Precision about the present, ambition about the future.', color: '#4F7CCF' },
  { icon: 'Users', title: 'Small Team, Serious Work', description: 'Every person matters. We are early-stage and building deliberately, not scaling for the sake of it.', color: '#8B5CF6' },
  { icon: 'Globe', title: 'Long-Term Thinking', description: 'We plan in decades, not quarters. Patience is structural, not aspirational.', color: '#D4AF37' },
  { icon: 'Shield', title: 'Build in Public (Responsibly)', description: 'We share what is real. We do not fabricate traction, metrics, or milestones.', color: '#3DDC97' },
];

export const workModel: CareerWorkModel[] = [
  { icon: 'Wifi', title: 'Online-First', description: 'Cristedor Group operates online. We are being established in Ghana.', stat: 'Online-first' },
  { icon: 'Clock', title: 'Async by Default', description: 'Deep work over meetings. We respect focus time and communicate with intention.', stat: 'Async-first' },
  { icon: 'Shield', title: 'Trust & Ownership', description: 'No micromanagement. You own your work and are accountable for outcomes.', stat: 'Self-directed' },
  { icon: 'Globe', title: 'Ghana-Based', description: 'Our base is in Ghana. Timezone: GMT. We coordinate around West African business hours.', stat: 'GMT' },
];

export const teams: CareerTeam[] = [
  { name: 'Cristedor Labs', description: 'Software products, AI tools, and technology experiments. Being established.', icon: 'Cpu', color: '#4F7CCF' },
  { name: 'Cristedor Media', description: 'Content, editorial, and media ventures. Being established.', icon: 'Newspaper', color: '#8B5CF6' },
];

export const companyTraits: CareerTrait[] = [
  { icon: 'Zap', title: 'Early-Stage', description: 'We are at the beginning. This is honest about where we are.' },
  { icon: 'Shield', title: 'Private & Independent', description: 'No external investors. No fabricated metrics. Building on our own terms.' },
  { icon: 'Target', title: 'Ghana-Rooted', description: 'Being established in Ghana. Building from West Africa for global reach.' },
  { icon: 'Compass', title: 'Deliberate Growth', description: 'We do not scale before the foundation is solid. Quality over speed.' },
  { icon: 'BookOpen', title: 'Intellectually Honest', description: 'We do not claim achievements we have not earned. Truth is non-negotiable.' },
  { icon: 'Globe', title: 'Online-First Operations', description: 'Digital by default. We work across locations with intentional communication.' },
];

export const jobListings: CareerJob[] = [];

export const internPrograms: CareerInternProgram[] = [];

export const recruitmentStats: CareerStat[] = [
  { value: 0, label: 'Open Positions', color: '#4F7CCF' },
  { value: 2, label: 'Ventures Being Built', color: '#8B5CF6' },
  { value: 1, label: 'Base Country', color: '#D4AF37' },
  { value: 2024, label: 'Origin Year', color: '#3DDC97' },
];

export const processSteps: CareerProcessStep[] = [
  { number: 1, title: 'Roles Will Be Published', description: 'When positions genuinely exist, they will appear on this page with honest descriptions.' },
  { number: 2, title: 'Apply Directly', description: 'Submit your application through the listed channel. We will respond from our official address.' },
  { number: 3, title: 'Conversations, Not Performances', description: 'Real discussions about the work. No trick questions or artificial pressure.' },
  { number: 4, title: 'Honest Outcome', description: 'A clear yes or no. No ghosting. If we say we will follow up, we will.' },
];

export const applicationProgressSteps: CareerApplicationProgressStep[] = [];

export const learningTimeline: CareerLearningStep[] = [];

export const candidateResources: CareerCandidateResource[] = [];

export const hiringLocations: CareerLocation[] = [
  { city: 'Ghana', country: 'Online-First', roles: 0, description: 'Cristedor Group is being established in Ghana and operates online. This is where we are today.', coords: [7.9465, -1.0232], highlight: true },
];

export const employeeStories: CareerEmployeeStory[] = [];

export const benefits: CareerBenefit[] = [
  { icon: 'Heart', title: 'Meaningful Work', description: 'Work on ventures that are being built to last. No make-work.', category: 'Purpose', color: '#3DDC97' },
  { icon: 'Clock', title: 'Flexible Schedule', description: 'Async-first. Work when you are most effective, not when a clock says so.', category: 'Flexibility', color: '#4F7CCF' },
  { icon: 'Globe', title: 'Remote Work', description: 'Work from anywhere. We are online-first by design.', category: 'Flexibility', color: '#8B5CF6' },
  { icon: 'BookOpen', title: 'Learning Culture', description: 'Resources and time for growth. We invest in people who invest in themselves.', category: 'Growth', color: '#D4AF37' },
  { icon: 'Shield', title: 'Transparency', description: 'Open communication about where the company is and where it is going.', category: 'Culture', color: '#00F0FF' },
  { icon: 'Target', title: 'Ownership Mindset', description: 'Early team members shape the culture and direction of what is being built.', category: 'Growth', color: '#FF6B6B' },
  { icon: 'Zap', title: 'No Bureaucracy', description: 'Small team. Direct communication. No corporate hierarchy theatre.', category: 'Culture', color: '#A78BFA' },
  { icon: 'Compass', title: 'Long-Term Vision', description: 'We plan in decades. Your work here is not about the next quarter.', category: 'Purpose', color: '#F59E0B' },
];

export const deiCards: CareerDEICard[] = [];

export const remotePerks: CareerRemotePerk[] = [
  { icon: 'Wifi', label: 'Online-First' },
  { icon: 'Clock', label: 'Flexible Hours' },
  { icon: 'Globe', label: 'Work From Anywhere' },
  { icon: 'Shield', label: 'Async Communication' },
  { icon: 'Target', label: 'Outcome-Focused' },
];

export const careersFAQ: CareerFAQ[] = [
  { question: 'Are there any open positions right now?', answer: 'No. Cristedor Group is early-stage and being established in Ghana. There are currently zero open roles. When positions genuinely exist, they will be listed on this page.' },
  { question: 'When will you start hiring?', answer: 'We do not have a timeline for hiring. We will publish roles on this page as soon as they genuinely exist. We will not post fabricated openings or collect applications for positions that are not real.' },
  { question: 'Can I send a speculative application?', answer: 'You can reach out via group.cristedor@gmail.com, but we will only respond when there is a genuine role that matches your profile. We do not maintain speculative talent pools.' },
  { question: 'What is it like to work at Cristedor?', answer: 'We are early-stage, online-first, and based in Ghana. We value truth over hype, ownership over hierarchy, and long-term thinking over short-term metrics. We are small and building deliberately.' },
  { question: 'Do you offer remote work?', answer: 'Yes. Cristedor Group operates online. We are based in Ghana and coordinate across locations with async-first communication.' },
  { question: 'What benefits do you offer?', answer: 'The benefits listed on this page reflect what we intend to offer as we grow. Currently, as an early-stage company, the primary benefit is meaningful work on ventures that are being built to last.' },
  { question: 'How do I know a job listing is legitimate?', answer: 'All legitimate Cristedor Group communications come from our official address, group.cristedor@gmail.com. We will never request payment, banking details, or cryptocurrency during recruitment. If something seems suspicious, report it to group.cristedor@gmail.com.' },
  { question: 'Is Cristedor Group a real company?', answer: 'Yes. Cristedor Group is a private holding company being established in Ghana. We have two ventures being built: Cristedor Labs (technology) and Cristedor Media (content). We are early-stage and honest about it.' },
];

export const lifeAtCards: CareerLifeAtCard[] = [
  { icon: 'Target', title: 'Building From Zero', description: 'Every system, process, and decision is being shaped from scratch. You are not inheriting someone else\'s playbook.', gradient: 'linear-gradient(135deg, rgba(79,124,207,0.12) 0%, rgba(17,28,46,0.4) 100%)', border: 'rgba(79,124,207,0.18)' },
  { icon: 'Compass', title: 'Honest Ambition', description: 'We are transparent about where we are today and ambitious about where we are going. No pretence.', gradient: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(17,28,46,0.4) 100%)', border: 'rgba(139,92,246,0.18)' },
  { icon: 'Zap', title: 'Direct Impact', description: 'With a small team, your work shapes the trajectory of what is being built. No layers of abstraction.', gradient: 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(17,28,46,0.4) 100%)', border: 'rgba(212,175,55,0.18)' },
];

export const resourceIconMap: Record<string, string> = {
  FileText: 'FileText',
  Download: 'Download',
  BookOpen: 'BookOpen',
  File: 'File',
};

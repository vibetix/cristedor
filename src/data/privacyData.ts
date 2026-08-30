import {
  PrivacyRight, ProcessingUse, SecurityMeasure
} from '../types';

/* ─── Privacy Principles ─── */
export const trustBadges = [
  { icon: 'Shield', label: 'Minimal Data', color: '#3DDC97' },
  { icon: 'Eye', label: 'Transparent', color: '#4F7CCF' },
  { icon: 'Lock', label: 'Online-First', color: '#8B5CF6' },
  { icon: 'CheckCircle', label: 'No Data Selling', color: '#D4AF37' },
];

/* ─── Privacy Principles ─── */
export const privacyPrinciples = [
  { icon: 'Minimize2', title: 'Minimal Data', description: 'We hold almost no data. Our website is static and informational, and we collect only what you choose to send us.', color: '#4F7CCF' },
  { icon: 'Eye', title: 'Transparency', description: 'We describe the small amount of information our site stores and how we use it in plain language.', color: '#3DDC97' },
  { icon: 'Lock', title: 'No Accounts', description: 'Cristedor Group and its divisions are early-stage. None of our products track users, create accounts, or set payment or analytics cookies.', color: '#8B5CF6' },
  { icon: 'CheckCircle', title: 'No Data Selling', description: 'We do not sell personal data. We are not an advertising business and rely on no revenue from data monetisation.', color: '#D4AF37' },
];

/* ─── Collection Lists ─── */
export const weCollect = [
  'Name and email address you provide in a message',
  'The content of any message you send us',
  'Basic technical data your browser transmits to load a page',
];

export const weNeverCollect = [
  'Payment or card information (we accept no payments)',
  'Account credentials (we offer no accounts)',
  'Behavioural or advertising tracking data',
  'Browsing logs, analytics, or usage tracking',
];

/* ─── Local Storage (what the site actually stores) ─── */
export const localStores = [
  { name: 'cristedor-theme', storage: 'localStorage', purpose: 'Remembers your light/dark theme choice across visits to our site.', color: '#4F7CCF' },
  { name: 'Visited pages', storage: 'localStorage', purpose: 'Records which pages and companies you have already visited, used to show you links on our 404 page.', color: '#3DDC97' },
  { name: 'Portfolio filter', storage: 'sessionStorage', purpose: 'Remembers which venture filter you selected while browsing the portfolio in a single visit.', color: '#8B5CF6' },
];

/* ─── Processing Uses ─── */
export const processingUses: ProcessingUse[] = [
  { icon: 'Mail', title: 'Responding to you', summary: 'Replying to messages you send us', detail: 'If you send us a message using the contact page (or an email), we use the name and email address you provided solely to respond to your inquiry. Because our site has no backend, messages are not stored automatically; please do not include sensitive information.', legalBasis: 'Consent / Legitimate Interest', color: '#4F7CCF' },
  { icon: 'Server', title: 'Serving this website', summary: 'Delivering static pages to your browser', detail: 'Our website is a set of static pages. To load them, your browser sends standard technical information (such as an IP address and user-agent) to the hosting provider. We do not combine this with personal data or use it to identify you.', legalBasis: 'Legitimate Interest', color: '#3DDC97' },
  { icon: 'Smartphone', title: 'Local preferences', summary: 'Storing your theme choice on your device', detail: 'We store a small amount of preference data (such as your chosen theme) in your browser\'s local storage. This stays on your device, is not sent to us, and can be cleared by clearing your browser storage.', legalBasis: 'Legitimate Interest', color: '#8B5CF6' },
];

/* ─── Privacy Rights ─── */
export const privacyRights: PrivacyRight[] = [
  { icon: 'Eye', title: 'Right to Access', description: 'Ask us whether we hold any personal data about you and request a copy.', legalBasis: 'Available on request' },
  { icon: 'Trash2', title: 'Right to Erasure', description: 'Ask us to delete any personal data we hold about you.', legalBasis: 'Available on request' },
  { icon: 'Pencil', title: 'Right to Rectification', description: 'Ask us to correct any personal data about you that is inaccurate.', legalBasis: 'Available on request' },
  { icon: 'PauseCircle', title: 'Right to Restrict', description: 'Ask us to limit how we process your data in certain circumstances.', legalBasis: 'Available on request' },
  { icon: 'Download', title: 'Right to Portability', description: 'Ask us to provide your data in a common, machine-readable format.', legalBasis: 'Available on request' },
  { icon: 'Ban', title: 'Right to Object', description: 'Object to any processing based on legitimate interests.', legalBasis: 'Available on request' },
];

/* ─── Security Measures ─── */
export const securityMeasures: SecurityMeasure[] = [
  { icon: 'Globe', title: 'HTTPS in Transit', description: 'Traffic between your browser and our site is encrypted in transit.', color: '#8B5CF6' },
  { icon: 'Shield', title: 'Access Controls', description: 'Only authorised members of Cristedor Group can access internal systems, which are password and multi-factor protected.', color: '#3DDC97' },
  { icon: 'Key', title: 'Limited Data', description: 'Because we hold very little data and offer no accounts or payments, our exposure to breaches is minimal by design.', color: '#D4AF37' },
];

/* ─── Security Incident Process ─── */
export const incidentProcess = [
  { step: 1, title: 'Investigation', description: 'Investigate any reported or detected issue to determine its scope and impact.', icon: 'Search', color: '#4F7CCF' },
  { step: 2, title: 'Containment', description: 'Isolate affected systems to prevent further exposure while preserving evidence.', icon: 'Shield', color: '#F59E0B' },
  { step: 3, title: 'Notification', description: 'Notify affected individuals and any relevant authorities as required by law.', icon: 'Bell', color: '#FF5C72' },
  { step: 4, title: 'Resolution', description: 'Remediate the cause and strengthen our measures to prevent recurrence.', icon: 'CheckCircle', color: '#3DDC97' },
];

/* ─── Children's Privacy ─── */
export const childrenPrivacy = {
  title: 'Children\u2019s Privacy',
  statement: 'Cristedor Group\u2019s websites are informational and intended for a general audience. We do not knowingly collect personal data from children, and we do not offer any service that would require it.',
  details: [
    'If you are under 16, please do not send us personal information in a message.',
    'If we become aware that a child has provided us with personal data, we will delete it where possible.',
    'Parents or guardians with concerns can reach us at group.cristedor@gmail.com.',
  ],
};

/* ─── Contact Options ─── */
export const contactOptions = [
  { role: 'General Contact', name: 'Cristedor Group', email: 'group.cristedor@gmail.com', responseTime: 'We reply as soon as we are able', description: 'For any privacy question or data request, please use our contact page or email us directly.', color: '#4F7CCF' },
];

/* ─── Version History ─── */
export const versionHistory = [
  { version: '1.0', date: '2026', summary: 'Initial privacy policy for Cristedor Group.' },
];

/* ─── Navigation ─── */
export const sectionNav = [
  { id: 'principles', label: 'Our Principles', number: '01' },
  { id: 'data', label: 'Data We Handle', number: '02' },
  { id: 'local-storage', label: 'Local Storage', number: '03' },
  { id: 'processing', label: 'How We Use Data', number: '04' },
  { id: 'rights', label: 'Your Rights', number: '05' },
  { id: 'security', label: 'Security', number: '06' },
  { id: 'children', label: 'Children\u2019s Privacy', number: '07' },
  { id: 'contact', label: 'Contact', number: '08' },
];

/* ─── Related Legal Pages ─── */
export const relatedLegalPages = [
  { label: 'Contact', path: '/contact' as const },
  { label: 'Terms of Service', path: '/privacy' as const },
];

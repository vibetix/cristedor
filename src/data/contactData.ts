export interface ContactCompany {
  id: string;
  name: string;
  color: string;
}

export interface InquiryCategory {
  id: string;
  label: string;
  description: string;
  color: string;
}

export interface ContactFAQ {
  question: string;
  answer: string;
}

export const contactCompanies: ContactCompany[] = [
  { id: 'cristedor-group', name: 'Cristedor Group', color: '#4F7CCF' },
  { id: 'cristedor-labs', name: 'Cristedor Labs', color: '#00F0FF' },
  { id: 'cristedor-media', name: 'Cristedor Media', color: '#D4AF37' },
];

export const companyCategories: Record<string, InquiryCategory[]> = {
  'cristedor-group': [
    { id: 'partnership', label: 'Partnership', description: 'Strategic collaborations and joint ventures', color: '#8B5CF6' },
    { id: 'investor', label: 'Investor Enquiry', description: 'Information and contact purposes for investors', color: '#4F7CCF' },
    { id: 'press', label: 'Press & Media', description: 'Press inquiries and media collaborations', color: '#D4AF37' },
    { id: 'careers', label: 'Careers', description: 'Employment opportunities (when roles exist)', color: '#10B981' },
    { id: 'general', label: 'General Inquiry', description: 'Corporate information and other questions', color: '#3DDC97' },
  ],
  'cristedor-labs': [
    { id: 'partnership', label: 'Partnership', description: 'Technology integrations and collaborations', color: '#8B5CF6' },
    { id: 'general', label: 'General', description: 'All other inquiries', color: '#3DDC97' },
  ],
  'cristedor-media': [
    { id: 'partnership', label: 'Partnership', description: 'Content collaborations and syndication', color: '#8B5CF6' },
    { id: 'press', label: 'Press & Media', description: 'Press inquiries and interview requests', color: '#D4AF37' },
    { id: 'general', label: 'General', description: 'All other inquiries', color: '#3DDC97' },
  ],
};

export const contactFAQ: ContactFAQ[] = [
  { question: 'What is the typical response time?', answer: 'Response times vary depending on the enquiry. We aim to respond to genuine enquiries as soon as reasonably possible.' },
  { question: 'Can I send a proposal or concept?', answer: 'Yes. You can use the contact form to describe your proposal. Please do not send confidential information unless specifically requested.' },
  { question: 'Where is Cristedor Group based?', answer: 'Cristedor Group is being built in Ghana and currently operates online-first.' },
  { question: 'How do I report a security vulnerability?', answer: 'Use the official Contact page and clearly identify the message as a security report.' },
  { question: 'Is there a phone number I can call?', answer: 'Yes. You can reach us at +233 24 143 0611 or +233 20 176 9552 (Ghana).' },
];

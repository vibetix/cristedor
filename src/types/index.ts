export type DivisionSector = 'tech' | 'media' | 'edu' | 'finance' | 'ai' | 'labs';

export type PortfolioSort = 'featured' | 'name-asc' | 'name-desc' | 'status';

export type PortfolioDivision = 'technology' | 'media';

export type PortfolioType = 'company' | 'product';

export type PortfolioStatus = 'LAUNCHING' | 'IN DEVELOPMENT' | 'CONCEPT';

export interface PortfolioEntity {
  id: string;
  name: string;
  type: PortfolioType;
  division: PortfolioDivision;
  status: PortfolioStatus;
  tagline: string;
  description: string;
  detailRoute: '/portfolio' | '/projects';
  featured?: boolean;
  parentId?: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  division?: string;
  bio: string;
  credentials: string[];
  imageUrl: string;
}

export interface FinancialReport {
  id: string;
  period: string;
  title: string;
  summary: string;
  category: 'Corporate Profile' | 'Annual Report' | 'Sustainability Report' | 'Media Kit' | 'Governance Report';
  fileSize: string;
  date: string;
}

export type ArticleStatus = 'draft' | 'published' | 'scheduled' | 'archived';

export interface NewsArticle {
  id: string;
  title: string;
  slug?: string;
  summary: string;
  category: 'Company Update' | 'Product Update' | 'Insight';
  date: string;
  readTime: string;
  author: string;
  authorRole?: string;
  content: string;
  status: ArticleStatus;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  imageGradient?: string;
  company?: string;
  tags?: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  division: DivisionSector;
  location: string;
  type: 'Full-Time' | 'Executive' | 'Research Fellowship';
  description: string;
  requirements: string[];
  salary?: string;
  department?: string;
  postedDate?: string;
  remote?: boolean;
  team?: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface CareersFAQ {
  question: string;
  answer: string;
}

export interface CandidateResource {
  icon: string;
  title: string;
  description: string;
  fileSize: string;
  color: string;
}

export interface RecruitmentStat {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

export interface HiringLocation {
  city: string;
  country: string;
  region: string;
  roles: number;
  description: string;
  lat: number;
  lng: number;
}

export interface DivisionPerformance {
  division: string;
  sector: DivisionSector;
  revenue: string;
  growth: string;
  growthPositive: boolean;
  metric: string;
  metricLabel: string;
  color: string;
}

export interface CapitalAllocation {
  label: string;
  percentage: number;
  color: string;
}

export interface GovernancePrinciple {
  title: string;
  description: string;
}

export interface ESGPillar {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  color: string;
}

export interface InvestorFAQ {
  question: string;
  answer: string;
}

export interface PressRelease {
  id: string;
  date: string;
  title: string;
  summary: string;
  category: string;
  color: string;
}

export interface WhyInvestItem {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface InvestmentHighlight {
  icon: string;
  label: string;
  color: string;
}

export interface DivisionOverview {
  name: string;
  sector: DivisionSector;
  focus: string;
  stage: string;
  keyProducts: string[];
  growthDirection: string;
  color: string;
}

export interface InvestmentPriority {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface GrowthPhase {
  label: string;
  title: string;
  description: string;
  items: string[];
  color: string;
}

export interface InnovationPipelineItem {
  year: string;
  title: string;
  description: string;
  stage: string;
  color: string;
}

export interface RiskPillar {
  title: string;
  description: string;
  measures: string[];
  color: string;
}

export interface PartnershipType {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface TrustBadge {
  icon: string;
  label: string;
  color: string;
}

export interface FutureVisionMilestone {
  year: string;
  title: string;
  description: string;
  color: string;
}

export interface ContactOffice {
  id: string;
  city: string;
  country: string;
  role: string;
  address: string;
  phone: string;
  email: string;
  timezone: string;
  hours: string;
  status: 'active' | 'planned';
  lat: number;
  lng: number;
}

export type RoutePath = '/' | '/portfolio' | '/projects' | '/divisions' | '/about' | '/investors' | '/newsroom' | '/careers' | '/contact' | '/privacy' | '/404';

export interface PrivacyRight {
  icon: string;
  title: string;
  description: string;
  legalBasis: string;
}

export interface RetentionCategory {
  icon: string;
  category: string;
  period: string;
  reason: string;
}

export interface CookieType {
  name: string;
  description: string;
  duration: string;
  required: boolean;
  color: string;
}

export interface ThirdPartyService {
  name: string;
  purpose: string;
  url: string;
  color: string;
}

export interface ContactOption {
  role: string;
  name: string;
  email: string;
  responseTime: string;
  description: string;
  color: string;
}

export interface ProcessingUse {
  icon: string;
  title: string;
  summary: string;
  detail: string;
  legalBasis: string;
  color: string;
}

export interface SecurityMeasure {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface IncidentStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface InternationalTransfer {
  region: string;
  location: string;
  safeguard: string;
  description: string;
  color: string;
}

export interface CertTimelineItem {
  year: string;
  title: string;
  status: 'completed' | 'in-progress' | 'planned';
  description: string;
  color: string;
}

export interface VersionHistoryItem {
  version: string;
  date: string;
  summary: string;
}

export interface PrivacyPrinciple {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface DataCategory {
  icon: string;
  name: string;
  description: string;
  color: string;
}

export interface DataFlowStep {
  label: string;
  description: string;
  icon: string;
}

export interface CookieDetail {
  name: string;
  purpose: string;
  duration: string;
  provider: string;
  type: string;
  required: boolean;
  color: string;
}

export interface ThirdPartyRisk {
  name: string;
  category: string;
  risk: 'Low' | 'Medium' | 'High';
  description: string;
  color: string;
}

export interface PrivacyRequestType {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface ChildrenPrivacy {
  title: string;
  statement: string;
  details: string[];
}

export interface RelatedLegalPage {
  label: string;
  path: RoutePath;
}

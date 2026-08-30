import { PortfolioEntity, PortfolioStatus } from '../types';
import { projects } from './siteContent';

export const portfolioCompanies: PortfolioEntity[] = [
  {
    id: 'cristedor-labs',
    name: 'Cristedor Labs',
    type: 'company',
    division: 'technology',
    status: 'IN DEVELOPMENT',
    tagline: 'Technology & AI',
    description: 'Cristedor Labs is the technology company responsible for building software products and AI-powered solutions.',
    detailRoute: '/portfolio',
    featured: true
  },
  {
    id: 'cristedor-media',
    name: 'Cristedor Media',
    type: 'company',
    division: 'media',
    status: 'IN DEVELOPMENT',
    tagline: 'Media & Content',
    description: 'Cristedor Media is the media and content company of Cristedor Group, building digital publications, original content, and media experiences for the next generation of audiences.',
    detailRoute: '/portfolio',
    featured: true
  },
];

export const portfolioProducts: PortfolioEntity[] = projects.map(p => ({
  id: p.id,
  name: p.name,
  type: 'product',
  division: 'technology',
  status: p.status as PortfolioStatus,
  tagline: p.category,
  description: p.description,
  detailRoute: '/projects',
  parentId: 'cristedor-labs'
}));

export const portfolioData: PortfolioEntity[] = [...portfolioCompanies, ...portfolioProducts];

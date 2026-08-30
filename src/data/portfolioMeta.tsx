import React from 'react';
import { PortfolioDivision, PortfolioSort } from '../types';
import { Cpu, Film } from 'lucide-react';

export const DIVISION_COLORS: Record<PortfolioDivision, string> = {
  technology: '#4F7CCF',
  media: '#4F7CCF'
};

export const DIVISION_LABELS: Record<PortfolioDivision, string> = {
  technology: 'Technology & AI',
  media: 'Media & Content'
};

export const DIVISION_ICONS: Record<PortfolioDivision, React.ReactNode> = {
  technology: <Cpu size={18} />,
  media: <Film size={18} />
};

export const TYPE_LABELS: Record<string, string> = {
  company: 'Company',
  product: 'Product'
};

export type PortfolioDivisionFilter = 'all' | PortfolioDivision;

export const DIVISION_TABS: { id: PortfolioDivisionFilter; label: string; shortLabel?: string }[] = [
  { id: 'all', label: 'All', shortLabel: 'All' },
  { id: 'technology', label: 'Technology', shortLabel: 'Tech' },
  { id: 'media', label: 'Media', shortLabel: 'Media' }
];

export const SORT_OPTIONS: { id: PortfolioSort; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'name-asc', label: 'Name (A–Z)' },
  { id: 'name-desc', label: 'Name (Z–A)' },
  { id: 'status', label: 'Status' }
];

export const STATUS_FILTER_OPTIONS: { id: string; label: string }[] = [
  { id: 'all', label: 'All Statuses' },
  { id: 'LAUNCHING', label: 'Launching' },
  { id: 'IN DEVELOPMENT', label: 'In Development' },
  { id: 'CONCEPT', label: 'Concept' }
];

export const CORE_COMPANY_IDS = ['cristedor-labs', 'cristedor-media'] as const;

export const ENTITY_BG: Record<string, string> = {
  'cristedor-labs': '/card_labs.jpg',
  'cristedor-media': '/card_media.jpg'
};

export const PORTFOLIO_UPDATED = 'August 2026';

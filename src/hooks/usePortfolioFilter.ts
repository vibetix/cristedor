import { useEffect, useMemo, useRef, useState } from 'react';
import { PortfolioEntity, PortfolioSort } from '../types';
import { STATUS_ORDER } from '../data/stageData';
import { PortfolioDivisionFilter, STATUS_FILTER_OPTIONS } from '../data/portfolioMeta';

const VALID_DIVISIONS: PortfolioDivisionFilter[] = ['technology', 'media'];
const VALID_SORTS: PortfolioSort[] = ['featured', 'name-asc', 'name-desc', 'status'];
const VALID_STATUSES = STATUS_FILTER_OPTIONS.map(o => o.id).filter(id => id !== 'all');

export const PORTFOLIO_FILTER_KEY = 'cristedor-portfolio-filter';

const LEGACY_SECTOR_MAP: Record<string, PortfolioDivisionFilter> = {
  tech: 'technology',
  ai: 'technology',
  media: 'media',
  labs: 'technology'
};

const readInitial = (): { search: string; division: PortfolioDivisionFilter; status: string; sort: PortfolioSort } => {
  const params = new URLSearchParams(window.location.search);
  const sectorParam = params.get('sector');
  const divisionParam = params.get('division');
  const divisionRaw = divisionParam || sectorParam;
  const statusParam = params.get('status') || params.get('stage');
  const sortParam = params.get('sort');

  return {
    search: params.get('search') ?? '',
    division: divisionRaw
      ? (LEGACY_SECTOR_MAP[divisionRaw] || (VALID_DIVISIONS.includes(divisionRaw as PortfolioDivisionFilter) ? divisionRaw as PortfolioDivisionFilter : 'all'))
      : 'all',
    status: VALID_STATUSES.includes(statusParam as string) ? statusParam as string : 'all',
    sort: VALID_SORTS.includes(sortParam as PortfolioSort) ? sortParam as PortfolioSort : 'featured'
  };
};

export interface PortfolioFilterResult {
  search: string;
  setSearch: (value: string) => void;
  division: PortfolioDivisionFilter;
  setDivision: (value: PortfolioDivisionFilter) => void;
  status: string;
  setStatus: (value: string) => void;
  sort: PortfolioSort;
  setSort: (value: PortfolioSort) => void;
  filtered: PortfolioEntity[];
  totalCount: number;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  saveState: () => void;
}

export const usePortfolioFilter = (items: PortfolioEntity[]): PortfolioFilterResult => {
  const initial = useRef(readInitial());

  const [search, setSearch] = useState(initial.current.search);
  const [division, setDivision] = useState<PortfolioDivisionFilter>(initial.current.division);
  const [status, setStatus] = useState(initial.current.status);
  const [sort, setSort] = useState<PortfolioSort>(initial.current.sort);

  const persist = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (division !== 'all') params.set('division', division);
    if (status !== 'all') params.set('status', status);
    if (sort !== 'featured') params.set('sort', sort);

    const qs = params.toString();
    const target = window.location.pathname + (qs ? `?${qs}` : '');
    window.history.replaceState({}, '', target);
    sessionStorage.setItem(PORTFOLIO_FILTER_KEY, JSON.stringify(Object.fromEntries(params)));
  };

  useEffect(() => {
    persist();
  }, [search, division, status, sort]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    let result = items.filter(item => {
      const matchesSearch = !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query);
      const matchesDivision = division === 'all' ? true : item.division === division;
      const matchesStatus = status === 'all' ? true : item.status === status;
      return matchesSearch && matchesDivision && matchesStatus;
    });

    switch (sort) {
      case 'featured':
        result = [...result].sort(
          (a, b) => (Number(!!b.featured) - Number(!!a.featured)) || a.name.localeCompare(b.name)
        );
        break;
      case 'name-asc':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'status':
        result = [...result].sort(
          (a, b) => (STATUS_ORDER[b.status] ?? 0) - (STATUS_ORDER[a.status] ?? 0)
        );
        break;
    }

    return result;
  }, [items, search, division, status, sort]);

  const clearFilters = () => {
    setSearch('');
    setDivision('all');
    setStatus('all');
  };

  const hasActiveFilters = search !== '' || division !== 'all' || status !== 'all';

  const saveState = persist;

  return {
    search, setSearch,
    division, setDivision,
    status, setStatus,
    sort, setSort,
    filtered,
    totalCount: items.length,
    hasActiveFilters,
    clearFilters,
    saveState
  };
};

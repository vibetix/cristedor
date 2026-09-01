import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { RoutePath } from '../types';
import {
  ArrowLeft, ArrowRight, Newspaper,
  Search, RefreshCw, ChevronRight, Compass, ExternalLink,
  MapPin, Calendar, Zap, Home, Bug, WifiOff, X, Eye
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Constants & Data
// ─────────────────────────────────────────────────────────────
const STORAGE_KEYS = {
  VISITED_PAGES: 'cristedor-visited-pages',
  VIEWED_COMPANIES: 'cristedor-viewed-companies',
  VISIT_COUNT: 'cristedor-404-visit-count',
};

const KNOWN_ROUTES: Record<string, { label: string; path: RoutePath; description: string }> = {
  '/': { label: 'Home', path: '/', description: 'Global overview of Cristedor Group' },
  '/portfolio': { label: 'Portfolio', path: '/portfolio', description: 'Our companies and ventures' },
  '/investors': { label: 'Investors', path: '/investors', description: 'Financial reports and governance' },
  '/newsroom': { label: 'Newsroom', path: '/newsroom', description: 'Press releases and insights' },
  '/careers': { label: 'Careers', path: '/careers', description: 'Open positions worldwide' },
  '/contact': { label: 'Contact', path: '/contact', description: 'Get in touch with us' },
  '/about': { label: 'About', path: '/about', description: 'Our vision, mission, and story' },
  '/privacy': { label: 'Privacy', path: '/privacy', description: 'Privacy policy and data protection' },
};

const COMPANY_KEYWORDS: Record<string, { id: string; name: string; description: string; color: string }> = {
  'labs': { id: 'cristedor-labs', name: 'Cristedor Labs', description: 'AI-powered software and digital products', color: '#00F0FF' },
  'lab': { id: 'cristedor-labs', name: 'Cristedor Labs', description: 'AI-powered software and digital products', color: '#00F0FF' },
  'media': { id: 'cristedor-media', name: 'Cristedor Media', description: 'Educational content and digital publications', color: '#D4AF37' },
  'unistay': { id: 'unistay', name: 'UniStay', description: 'Student housing platform', color: '#10B981' },
};

const DYNAMIC_FACTS = [
  { category: 'Group', fact: 'Cristedor Group is a private, early-stage holding company being built in Ghana.' },
  { category: 'Group', fact: 'The idea for Cristedor Group originated in 2024 and the company is being actively built in 2026.' },
  { category: 'Ventures', fact: 'The Group has two current ventures: Cristedor Labs and Cristedor Media.' },
  { category: 'Labs', fact: 'Cristedor Labs is being established to build technology products and AI-powered tools.' },
  { category: 'Labs', fact: 'Multiple products are being explored and developed across Cristedor\'s technology initiatives.' },
  { category: 'Media', fact: 'Cristedor Media is being established as the Group\'s media venture.' },
];

const SEARCHABLE_ITEMS = [
  { label: 'Home', path: '/' as RoutePath, keywords: 'home main overview' },
  { label: 'Portfolio', path: '/portfolio' as RoutePath, keywords: 'portfolio companies ventures subsidiaries' },
  { label: 'Investors', path: '/investors' as RoutePath, keywords: 'investors financial reports governance' },
  { label: 'Newsroom', path: '/newsroom' as RoutePath, keywords: 'news press releases media articles' },
  { label: 'Careers', path: '/careers' as RoutePath, keywords: 'careers jobs hiring positions work' },
  { label: 'Contact', path: '/contact' as RoutePath, keywords: 'contact support get in touch' },
  { label: 'About', path: '/about' as RoutePath, keywords: 'about vision mission story leadership' },
  { label: 'Privacy', path: '/privacy' as RoutePath, keywords: 'privacy policy data protection gdpr' },
  { label: 'Cristedor Labs', path: '/portfolio' as RoutePath, keywords: 'labs technology software ai products' },
  { label: 'Cristedor Media', path: '/portfolio' as RoutePath, keywords: 'media content digital publications' },
  { label: 'UniStay', path: '/portfolio' as RoutePath, keywords: 'unistay student housing accommodation' },
];

const ECOSYSTEM_CARDS = [
  { id: 'cristedor-labs', name: 'Cristedor Labs', tagline: 'AI-Powered Software & Digital Products', icon: Zap, color: '#00F0FF', description: 'Building intelligent software, cloud platforms, and next-generation AI products.', path: '/portfolio' as RoutePath },
  { id: 'cristedor-media', name: 'Cristedor Media', tagline: 'Media & Content', icon: Newspaper, color: '#D4AF37', description: 'Being established as the Group\'s media venture, focused on developing digital content.', path: '/portfolio' as RoutePath },
  { id: 'about', name: 'About Cristedor Group', tagline: 'The Vision Behind Our Ventures', icon: Compass, color: '#4F7CCF', description: 'Learn about our mission, leadership, and the ventures we are building.', path: '/about' as RoutePath },
];

const MINI_SITEMAP = [
  { label: 'Company', items: [
    { label: 'About', path: '/about' as RoutePath },
    { label: 'Portfolio', path: '/portfolio' as RoutePath },
    { label: 'Leadership', path: '/about' as RoutePath },
  ]},
  { label: 'Engage', items: [
    { label: 'Newsroom', path: '/newsroom' as RoutePath },
    { label: 'Careers', path: '/careers' as RoutePath },
    { label: 'Contact', path: '/contact' as RoutePath },
  ]},
  { label: 'Legal', items: [
    { label: 'Privacy', path: '/privacy' as RoutePath },
    { label: 'Investors', path: '/investors' as RoutePath },
  ]},
];

const COMPANY_NAME_MAP: Record<string, { name: string; color: string }> = {
  'cristedor-labs': { name: 'Cristedor Labs', color: '#00F0FF' },
  'cristedor-media': { name: 'Cristedor Media', color: '#D4AF37' },
  'unistay': { name: 'UniStay', color: '#10B981' },
};

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface NotFoundPageProps {
  onNavigate: (path: RoutePath) => void;
}

// ─────────────────────────────────────────────────────────────
// localStorage Helpers
// ─────────────────────────────────────────────────────────────
function getVisitedPages(): string[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITED_PAGES) || '[]'); } catch { return []; }
}

function addVisitedPage(path: string) {
  try {
    const pages = getVisitedPages().filter(p => p !== path);
    pages.unshift(path);
    localStorage.setItem(STORAGE_KEYS.VISITED_PAGES, JSON.stringify(pages.slice(0, 10)));
  } catch { /* */ }
}

function getViewedCompanies(): string[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.VIEWED_COMPANIES) || '[]'); } catch { return []; }
}

// ─────────────────────────────────────────────────────────────
// Inline Hooks
// ─────────────────────────────────────────────────────────────
const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({ children, delay = 0, style }) => {
  const { ref, visible } = useInView(0.1);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <div ref={ref} style={{
      opacity: reduced || visible ? 1 : 0,
      transform: reduced || visible ? 'translateY(0)' : 'translateY(20px)',
      transition: reduced ? 'none' : `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [factIndex, setFactIndex] = useState(() => Math.floor(Math.random() * DYNAMIC_FACTS.length));
  const [isFactFading, setIsFactFading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<typeof SEARCHABLE_ITEMS>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [recentPages, setRecentPages] = useState<string[]>([]);
  const [recentCompanies, setRecentCompanies] = useState<string[]>([]);
  const [autoSuggestions, setAutoSuggestions] = useState<Array<{ label: string; description: string; color: string; path: RoutePath }>>([]);

  // SEO
  useEffect(() => {
    const prev = document.title;
    document.title = '404 — Page Not Found | Cristedor Group';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow, noarchive, nosnippet';
    document.head.appendChild(meta);
    return () => { document.title = prev; document.head.removeChild(meta); };
  }, []);

  // localStorage
  useEffect(() => {
    addVisitedPage(window.location.pathname);
    setRecentPages(getVisitedPages().filter(p => p !== window.location.pathname && p !== '/').slice(0, 4));
    setRecentCompanies(getViewedCompanies().slice(0, 3));
  }, []);

  // Auto suggestions from URL
  useEffect(() => {
    const path = window.location.pathname.toLowerCase().replace(/^\//, '').replace(/\/$/, '');
    if (!path) return;
    const segments = path.split('/');
    const suggestions: typeof autoSuggestions = [];
    for (const [routePath, route] of Object.entries(KNOWN_ROUTES)) {
      const seg = routePath.replace(/^\//, '');
      if (seg && route.path !== '/' && (path.includes(seg) || seg.includes(path) || segments.some(s => seg.includes(s) || s.includes(seg)))) {
        suggestions.push({ label: `Did you mean "${route.label}"?`, description: route.description, color: 'var(--accent-primary)', path: route.path });
      }
    }
    for (const [kw, co] of Object.entries(COMPANY_KEYWORDS)) {
      if (segments.some(s => s.includes(kw) || kw.includes(s))) {
        if (!suggestions.some(s => s.label.includes(co.name))) {
          suggestions.push({ label: `Did you mean "${co.name}"?`, description: co.description, color: co.color, path: '/portfolio' });
        }
      }
    }
    setAutoSuggestions(suggestions.slice(0, 3));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'h' || e.key === 'H') { e.preventDefault(); onNavigate('/'); }
      if (e.key === '/') { e.preventDefault(); searchInputRef.current?.focus(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onNavigate]);

  // Offline
  useEffect(() => {
    const off = () => setIsOnline(false);
    const on = () => setIsOnline(true);
    window.addEventListener('offline', off);
    window.addEventListener('online', on);
    return () => { window.removeEventListener('offline', off); window.removeEventListener('online', on); };
  }, []);

  // Search
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchSuggestions([]); return; }
    const q = searchQuery.toLowerCase();
    setSearchSuggestions(SEARCHABLE_ITEMS.filter(i => i.label.toLowerCase().includes(q) || i.keywords.includes(q)).slice(0, 5));
  }, [searchQuery]);

  const nextFact = useCallback(() => {
    setIsFactFading(true);
    setTimeout(() => { setFactIndex(p => (p + 1) % DYNAMIC_FACTS.length); setIsFactFading(false); }, 250);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchSuggestions.length > 0) onNavigate(searchSuggestions[0].path);
    else if (searchQuery.trim()) onNavigate('/newsroom');
  };

  const resolvedCompanies = useMemo(() =>
    recentCompanies.map(id => COMPANY_NAME_MAP[id]).filter(Boolean),
  [recentCompanies]);

  const quickLinks = useMemo(() => [
    { label: 'Portfolio', path: '/portfolio' as RoutePath },
    { label: 'Investors', path: '/investors' as RoutePath },
    { label: 'Newsroom', path: '/newsroom' as RoutePath },
    { label: 'Careers', path: '/careers' as RoutePath },
    { label: 'Contact', path: '/contact' as RoutePath },
  ], []);

  return (
    <div style={{ backgroundColor: '#050914', minHeight: '100vh', color: '#fff', position: 'relative', overflow: 'hidden' }}>

      {/* ══ GLOBAL STYLES ════════════════════════════════════════ */}
      <style>{`
        @keyframes meshFloat1 { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(40px, -30px); } 66% { transform: translate(-20px, 20px); } }
        @keyframes meshFloat2 { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(-30px, 40px); } 66% { transform: translate(25px, -15px); } }
        @keyframes meshFloat3 { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(20px, 25px); } 66% { transform: translate(-35px, -20px); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes gentlePulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }

        .nf-card:hover { border-color: rgba(79,124,207,0.25) !important; transform: translateY(-2px); }
        .nf-eco:hover { border-color: rgba(79,124,207,0.3) !important; transform: translateY(-3px); box-shadow: 0 20px 40px rgba(0,0,0,0.25) !important; }
        .nf-eco:hover .eco-arrow { transform: translateX(3px); opacity: 1; }
        .nf-pill:hover { background: rgba(79,124,207,0.1) !important; border-color: rgba(79,124,207,0.25) !important; color: rgba(255,255,255,0.9) !important; }
        .nf-link:hover { color: rgba(255,255,255,0.9) !important; }
        .nf-cta-p:hover { background: linear-gradient(135deg, #5C88DA, #3C69B7) !important; box-shadow: 0 8px 24px rgba(79,124,207,0.35) !important; }
        .nf-cta-o:hover { background: rgba(255,255,255,0.06) !important; border-color: var(--text-disabled) !important; }
        .nf-refresh:hover { transform: rotate(90deg); }
        .nf-search:focus { border-color: rgba(79,124,207,0.4) !important; box-shadow: 0 0 0 3px rgba(79,124,207,0.08) !important; }
        .nf-sug:hover { background: rgba(79,124,207,0.18) !important; }

        @media (max-width: 900px) {
          .nf-recovery { grid-template-columns: 1fr !important; }
          .nf-eco-grid { grid-template-columns: 1fr !important; }
          .nf-split { grid-template-columns: 1fr !important; }
          .nf-sitemap { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .nf-hero-section { padding: 5rem 1.25rem 3rem !important; }
          .nf-hero-ctas { flex-direction: column; width: 100%; }
          .nf-hero-ctas button { width: 100%; justify-content: center; }
          .nf-quick { flex-wrap: wrap; justify-content: center; }
          .nf-hero-desc { font-size: 0.9rem !important; max-width: 22rem !important; }
        }
        @media (max-width: 560px) {
          .nf-hero-section { padding: 4rem 1rem 2.5rem !important; min-height: auto !important; }
          .nf-hero-title { font-size: 1.5rem !important; }
          .nf-hero-subtitle { font-size: 0.6rem !important; letter-spacing: 0.1em !important; margin-bottom: 1rem !important; }
          .nf-hero-desc { font-size: 0.82rem !important; margin-bottom: 2rem !important; }
          .nf-hero-ctas { width: 80vw !important; margin: 0 auto !important; }
          .nf-hero-ctas button { width: 100% !important; padding: 0.7rem 1.2rem !important; font-size: 0.75rem !important; }
          .nf-hero-quick-inner { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 0.3rem !important; justify-items: center !important; }
          .nf-hero-quick-inner .nf-pill { justify-content: center !important; }
          .nf-hero-breadcrumb { margin-bottom: 1.5rem !important; }
          .nf-hero-pill { margin-bottom: 1.5rem !important; padding: 0.3rem 0.75rem !important; font-size: 0.5rem !important; }
        }
        @media print {
          .nf-mesh { display: none !important; }
          * { color: #000 !important; background: transparent !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nf-mesh-orb { animation: none !important; }
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* ══ GRADIENT MESH BACKGROUND ══════════════════════════════ */}
      <div className="nf-mesh" aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="nf-mesh-orb" style={{ position: 'absolute', top: '10%', left: '8%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(79,124,207,0.18)', filter: 'blur(200px)', animation: 'meshFloat1 20s ease-in-out infinite' }} />
        <div className="nf-mesh-orb" style={{ position: 'absolute', bottom: '5%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(0,240,255,0.08)', filter: 'blur(160px)', animation: 'meshFloat2 20s ease-in-out infinite' }} />
        <div className="nf-mesh-orb" style={{ position: 'absolute', top: '40%', left: '45%', width: 350, height: 350, borderRadius: '50%', background: 'rgba(139,92,246,0.06)', filter: 'blur(140px)', animation: 'meshFloat3 20s ease-in-out infinite' }} />
        {/* Noise grain */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, mixBlendMode: 'overlay' }}>
          <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, #050914, transparent)' }} />
      </div>

      {/* ══ OFFLINE BANNER ═══════════════════════════════════════ */}
      {!isOnline && (
        <div role="alert" style={{ position: 'relative', zIndex: 20, background: 'rgba(245,185,66,0.1)', borderBottom: '1px solid rgba(245,185,66,0.15)', padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <WifiOff size={15} style={{ color: '#F5B942' }} />
          <span style={{ fontSize: '0.85rem', color: '#F5B942', fontWeight: 600 }}>You're offline. Reconnect to continue browsing.</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
           SECTION 1: THE VOID HERO
         ══════════════════════════════════════════════════════════ */}
      <section role="main" aria-labelledby="nf-title" className="nf-hero-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '6rem 2rem 4rem', zIndex: 1 }}>
        <img src="/404-hero.jpeg" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, filter: 'brightness(0.65) saturate(0.75)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,9,20,0.7) 0%, rgba(5,9,20,0.42) 50%, #050914 100%)', pointerEvents: 'none' }} />

        {/* Ghost 404 watermark */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(10rem, 30vw, 22rem)',
          lineHeight: 1, letterSpacing: '-0.05em',
          color: 'rgba(255,255,255,0.04)',
          userSelect: 'none', pointerEvents: 'none',
          zIndex: 0,
        }}>404</div>

        <div style={{ textAlign: 'center', maxWidth: '42rem', position: 'relative', zIndex: 10 }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="nf-hero-breadcrumb" style={{ animation: 'fadeInUp 0.5s ease-out both', marginBottom: '2rem' }}>
            <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
              <li>
                <button onClick={() => onNavigate('/')} className="nf-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'color 0.2s' }}>
                  <Home size={11} /> Home
                </button>
              </li>
              <li><ChevronRight size={10} style={{ color: 'var(--text-disabled)' }} /></li>
              <li>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: '#4F7CCF', letterSpacing: '0.05em', textTransform: 'uppercase' }}>404</span>
              </li>
            </ol>
          </nav>

          {/* Error pill */}
          <div className="nf-hero-pill" style={{ animation: 'fadeInUp 0.5s ease-out 0.05s both', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1rem', borderRadius: '999px',
              background: 'rgba(255,92,114,0.06)', border: '1px solid rgba(255,92,114,0.12)',
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 600,
              color: 'rgba(255,92,114,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF5C72', animation: 'gentlePulse 2s ease-in-out infinite' }} />
              HTTP 404 · Resource Not Found
            </span>
          </div>

          {/* Heading */}
          <h1 id="nf-title" className="nf-hero-title" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 700, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em',
            marginBottom: '0.75rem', animation: 'fadeInUp 0.5s ease-out 0.1s both',
          }}>
            Page Not Found
          </h1>

          {/* Subtitle */}
          <p className="nf-hero-subtitle" style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600,
            color: '#4F7CCF', letterSpacing: '0.15em', textTransform: 'uppercase',
            marginBottom: '1.25rem', animation: 'fadeInUp 0.5s ease-out 0.15s both',
          }}>
            Lost in the Cristedor Ecosystem
          </p>

          {/* Description */}
          <p className="nf-hero-desc" style={{
            fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6,
            maxWidth: '28rem', margin: '0 auto 2.5rem',
            animation: 'fadeInUp 0.5s ease-out 0.2s both',
          }}>
            The page you're looking for may have been moved, renamed, or no longer exists.
          </p>

          {/* CTAs */}
          <div className="nf-hero-ctas" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', animation: 'fadeInUp 0.5s ease-out 0.25s both', marginBottom: '3rem' }}>
            <button onClick={() => onNavigate('/')} className="nf-cta-p" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.8rem 1.6rem', borderRadius: '0.7rem',
              fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.04em',
              textTransform: 'uppercase', color: '#fff',
              background: 'linear-gradient(135deg, #4F7CCF, #335EAA)',
              boxShadow: '0 8px 24px rgba(79,124,207,0.25)',
              border: 'none', cursor: 'pointer', transition: 'all 0.3s',
            }}>
              <ArrowLeft size={15} strokeWidth={2.5} /> Return Home
            </button>
            <button onClick={() => onNavigate('/portfolio')} className="nf-cta-o" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.8rem 1.6rem', borderRadius: '0.7rem',
              fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.04em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', transition: 'all 0.3s',
            }}>
              Explore Portfolio <ArrowRight size={15} strokeWidth={2.5} />
            </button>
          </div>

          {/* Quick Links */}
          <div className="nf-hero-quick" style={{ animation: 'fadeInUp 0.5s ease-out 0.3s both' }}>
            <div style={{ maxWidth: '30rem', margin: '0 auto', borderTop: '1px solid rgba(79,124,207,0.08)', paddingTop: '1.25rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-disabled)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Quick Navigation</p>
              <div className="nf-hero-quick-inner" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                {quickLinks.map(link => (
                  <button key={link.label} onClick={() => onNavigate(link.path)} className="nf-pill" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                    padding: '0.3rem 0.75rem', borderRadius: '999px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                    color: 'var(--text-muted)', fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.25s',
                  }}>
                    {link.label} <ChevronRight size={9} style={{ opacity: 0.4 }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
           SECTION 2: SMART RECOVERY STRIP
         ══════════════════════════════════════════════════════════ */}
      {(autoSuggestions.length > 0 || recentPages.length > 0 || recentCompanies.length > 0 || true) && (
        <section style={{ position: 'relative', zIndex: 1, padding: '0 2rem 4rem' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
            <Reveal>
              <div className="nf-card" style={{
                background: 'rgba(17,28,46,0.35)', border: '1px solid rgba(79,124,207,0.18)',
                borderRadius: '20px', backdropFilter: 'blur(16px)', padding: '2rem',
                transition: 'border-color 0.3s',
              }}>
                <div className="nf-recovery" style={{ display: 'grid', gridTemplateColumns: autoSuggestions.length > 0 ? '1fr 1fr 1fr' : '1fr 1fr', gap: '2rem' }}>

                  {/* Col 1: Auto Suggestions */}
                  <div>
                    {autoSuggestions.length > 0 ? (
                      <>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: '#4F7CCF', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Did you mean?</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {autoSuggestions.map((s, i) => (
                            <button key={i} onClick={() => onNavigate(s.path)} className="nf-sug" style={{
                              display: 'flex', alignItems: 'center', gap: '0.6rem',
                              padding: '0.6rem 0.8rem', borderRadius: '10px',
                              background: 'rgba(79,124,207,0.04)', border: '1px solid rgba(79,124,207,0.18)',
                              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', width: '100%',
                            }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                              <div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: '0.1rem' }}>{s.label}</div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--text-disabled)', lineHeight: 1.3 }}>{s.description}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-disabled)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Quick Links</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {quickLinks.map(link => (
                            <button key={link.label} onClick={() => onNavigate(link.path)} className="nf-pill" style={{
                              padding: '0.35rem 0.7rem', borderRadius: '999px',
                              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                              color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem', fontWeight: 500,
                              cursor: 'pointer', transition: 'all 0.2s',
                            }}>{link.label}</button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Col 2: Recent Activity */}
                  <div>
                    {(recentPages.length > 0 || recentCompanies.length > 0) ? (
                      <>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-disabled)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Continue Where You Left Off</p>
                        {recentPages.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: recentCompanies.length > 0 ? '0.75rem' : 0 }}>
                            {recentPages.map(page => {
                              const route = KNOWN_ROUTES[page];
                              return (
                                <button key={page} onClick={() => onNavigate(route?.path || '/')} className="nf-pill" style={{
                                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                  padding: '0.3rem 0.6rem', borderRadius: '999px',
                                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                                  color: 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 500,
                                  cursor: 'pointer', transition: 'all 0.2s',
                                }}>
                                  <ExternalLink size={9} style={{ opacity: 0.5 }} />
                                  {route?.label || page}
                                </button>
                              );
                            })}
                          </div>
                        )}
                        {resolvedCompanies.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                            {resolvedCompanies.map((co, i) => (
                              <button key={i} onClick={() => onNavigate('/portfolio')} className="nf-pill" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                padding: '0.3rem 0.6rem', borderRadius: '999px',
                                background: `${co.color}08`, border: `1px solid ${co.color}18`,
                                color: co.color, fontSize: '0.65rem', fontWeight: 600,
                                cursor: 'pointer', transition: 'all 0.2s',
                              }}>
                                <Eye size={9} style={{ opacity: 0.6 }} /> {co.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-disabled)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Our Story</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.75rem' }}>Cristedor Group began with a mission to build companies that shape tomorrow.</p>
                        <button onClick={() => onNavigate('/about')} className="nf-pill" style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                          padding: '0.3rem 0.7rem', borderRadius: '999px',
                          background: 'rgba(79,124,207,0.08)', border: '1px solid rgba(79,124,207,0.15)',
                          color: '#4F7CCF', fontSize: '0.65rem', fontWeight: 600,
                          cursor: 'pointer', transition: 'all 0.2s',
                        }}>Learn More <ArrowRight size={10} /></button>
                      </>
                    )}
                  </div>

                  {/* Col 3: Search */}
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-disabled)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Search</p>
                    <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
                      <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: searchFocused ? '#4F7CCF' : 'var(--text-disabled)', transition: 'color 0.2s', pointerEvents: 'none' }} />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                        placeholder="Search Cristedor Group..."
                        aria-label="Search the site"
                        className="nf-search"
                        style={{
                          width: '100%', padding: '0.65rem 2.5rem 0.65rem 2.4rem',
                          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(79,124,207,0.1)',
                          borderRadius: '10px', color: 'rgba(255,255,255,0.85)',
                          fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                          outline: 'none', transition: 'all 0.2s',
                        }}
                      />
                      {searchQuery && (
                        <button type="button" onClick={() => { setSearchQuery(''); searchInputRef.current?.focus(); }} style={{
                          position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)',
                          background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-disabled)', padding: '0.2rem',
                        }}>
                          <X size={13} />
                        </button>
                      )}
                    </form>
                    {/* Suggestions dropdown */}
                    {searchFocused && searchSuggestions.length > 0 && (
                      <div role="listbox" aria-label="Search suggestions" style={{
                        marginTop: '0.4rem', borderRadius: '10px', overflow: 'hidden',
                        background: 'rgba(11,20,35,0.95)', border: '1px solid rgba(79,124,207,0.1)',
                        backdropFilter: 'blur(16px)',
                      }}>
                        {searchSuggestions.map((item, i) => (
                          <button key={i} role="option" onClick={() => { onNavigate(item.path); setSearchQuery(''); setSearchFocused(false); }} className="nf-sug" style={{
                            width: '100%', padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                            background: 'transparent', border: 'none', borderBottom: i < searchSuggestions.length - 1 ? '1px solid rgba(79,124,207,0.05)' : 'none',
                            cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s',
                          }}>
                            <Search size={11} style={{ color: 'var(--text-disabled)', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(34,50,75,0.5)', marginTop: '0.5rem' }}>
                      Press <kbd style={{ padding: '0.1rem 0.3rem', borderRadius: '3px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.5rem' }}>/</kbd> to search
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
           SECTION 3: EXPLORE THE ECOSYSTEM
         ══════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 2rem 4rem' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>✦ Explore the Ecosystem</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>Discover Our Companies</h2>
            </div>
          </Reveal>
          <div className="nf-eco-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {ECOSYSTEM_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.id} delay={i * 0.08}>
                  <button onClick={() => onNavigate(card.path)} className="nf-eco" style={{
                    padding: '1.5rem', background: 'rgba(17,28,46,0.3)',
                    border: '1px solid rgba(79,124,207,0.18)', borderRadius: '16px',
                    backdropFilter: 'blur(12px)', cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.3s', width: '100%', height: '100%',
                    display: 'flex', flexDirection: 'column',
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '10px',
                      background: `${card.color}10`, border: `1px solid ${card.color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '1rem',
                    }}>
                      <Icon size={18} style={{ color: card.color }} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', marginBottom: '0.2rem' }}>{card.name}</h3>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 600, color: card.color, letterSpacing: '0.04em', marginBottom: '0.6rem' }}>{card.tagline}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-disabled)', lineHeight: 1.5, flex: 1 }}>{card.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', color: 'var(--text-disabled)', fontSize: '0.7rem', fontWeight: 600 }}>
                      Explore <ArrowRight size={12} className="eco-arrow" style={{ transition: 'all 0.3s', opacity: 0.4 }} />
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
           SECTION 4: FUN FACT + TIMELINE PREVIEW
         ══════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 2rem 4rem' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div className="nf-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {/* Fun Fact */}
            <Reveal>
              <div className="nf-card" style={{
                background: 'rgba(17,28,46,0.3)', border: '1px solid rgba(79,124,207,0.18)',
                borderRadius: '16px', padding: '1.5rem', position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s',
              }}>
                <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: 250, height: 250, background: 'rgba(212,175,55,0.04)', borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.5rem', borderRadius: '999px', background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.1)', marginBottom: '0.75rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Did You Know?</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(212,175,55,0.5)' }}>{DYNAMIC_FACTS[factIndex].category}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: '1rem', minHeight: '3rem', opacity: isFactFading ? 0 : 1, transition: 'opacity 0.25s' }}>
                    {DYNAMIC_FACTS[factIndex].fact}
                  </p>
                  <button onClick={nextFact} className="nf-refresh" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    padding: '0.3rem 0.7rem', borderRadius: '999px',
                    background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.08)',
                    color: '#D4AF37', fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                    fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s',
                  }}>
                    <RefreshCw size={10} style={{ transition: 'transform 0.3s' }} /> Next Fact
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Timeline Preview */}
            <Reveal delay={0.08}>
              <div className="nf-card" style={{
                background: 'rgba(17,28,46,0.3)', border: '1px solid rgba(79,124,207,0.18)',
                borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column',
                transition: 'border-color 0.3s',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '10px',
                  background: 'rgba(79,124,207,0.08)', border: '1px solid rgba(79,124,207,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <Calendar size={16} style={{ color: '#4F7CCF' }} />
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-disabled)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Our Story</p>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, flex: 1, marginBottom: '1rem' }}>
                  Cristedor Group began with a mission to build companies that shape tomorrow. Explore our journey, leadership, and the vision powering our ecosystem.
                </p>
                <button onClick={() => onNavigate('/about')} className="nf-pill" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  padding: '0.35rem 0.8rem', borderRadius: '999px',
                  background: 'rgba(79,124,207,0.08)', border: '1px solid rgba(79,124,207,0.12)',
                  color: '#4F7CCF', fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', alignSelf: 'flex-start',
                }}>
                  Learn More <ArrowRight size={11} />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
           SECTION 5: MINI SITEMAP + CONTACT + FOOTER
         ══════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 2rem 2rem' }}>
        <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
          {/* Mini Sitemap */}
          <Reveal>
            <div style={{ borderTop: '1px solid rgba(79,124,207,0.18)', paddingTop: '2.5rem', marginBottom: '2rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-disabled)', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '1.25rem' }}>Sitemap</p>
              <div className="nf-sitemap" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {MINI_SITEMAP.map(group => (
                  <div key={group.label}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700, color: 'var(--text-disabled)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{group.label}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {group.items.map(item => (
                        <button key={item.label} onClick={() => onNavigate(item.path)} className="nf-link" style={{
                          display: 'flex', alignItems: 'center', gap: '0.3rem',
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: 'var(--text-disabled)', fontSize: '0.78rem',
                          fontWeight: 500, padding: '0.15rem 0', transition: 'color 0.2s', textAlign: 'left',
                        }}>
                          <ChevronRight size={10} style={{ opacity: 0.4, flexShrink: 0 }} /> {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Contact + Report */}
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('/contact')} className="nf-pill" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                padding: '0.4rem 0.9rem', borderRadius: '999px',
                background: 'rgba(79,124,207,0.18)', border: '1px solid rgba(79,124,207,0.1)',
                color: '#4F7CCF', fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
              }}>
                <MapPin size={11} /> Contact Support
              </button>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-disabled)', fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem', transition: 'color 0.2s',
              }}>
                <Bug size={10} /> Report Broken Link
              </button>
            </div>
          </Reveal>

          {/* Footer */}
          <div style={{ borderTop: '1px solid rgba(79,124,207,0.18)', paddingTop: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Compass size={14} style={{ color: '#4F7CCF', opacity: 0.5 }} />
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-disabled)' }}>Cristedor Group — Building Companies That Shape Tomorrow.</p>
            </div>
            <div className="nf-quick" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center' }}>
              {[
                { label: 'Home', path: '/' as RoutePath },
                { label: 'Portfolio', path: '/portfolio' as RoutePath },
                { label: 'Divisions', path: '/portfolio' as RoutePath },
                { label: 'Investors', path: '/investors' as RoutePath },
                { label: 'Newsroom', path: '/newsroom' as RoutePath },
              ].map(link => (
                <button key={link.label} onClick={() => onNavigate(link.path)} className="nf-pill" style={{
                  padding: '0.3rem 0.7rem', borderRadius: '999px',
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                  color: 'var(--text-disabled)', fontSize: '0.65rem', fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>{link.label}</button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

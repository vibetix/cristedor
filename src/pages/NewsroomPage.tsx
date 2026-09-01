import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { RoutePath, NewsArticle } from '../types';
import {
  publishedArticles, featuredArticle, COMPANIES, ALL_TAGS,
  CATEGORIES, ARCHIVE_YEARS, getCategoryCounts, getRelatedArticles
} from '../data/newsData';
import {
  ArrowLeft, Clock, User, Calendar, ArrowUpRight, Newspaper,
  Search, Mail, ChevronRight, ChevronDown, Filter,
  Linkedin, Twitter, Facebook, Link2,
  ArrowUp, Bookmark, Hash, Building2
} from 'lucide-react';

interface NewsroomPageProps {
  onNavigate: (path: RoutePath) => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; color: string; border: string; accent: string; dot: string }> = {
  'Company Update': { bg: 'rgba(79, 124, 207, 0.08)', color: '#4F7CCF', border: 'rgba(79, 124, 207, 0.2)', accent: '#4F7CCF', dot: '#4F7CCF' },
  'Product Update': { bg: 'rgba(16, 185, 129, 0.08)', color: '#10B981', border: 'rgba(16, 185, 129, 0.2)', accent: '#10B981', dot: '#10B981' },
  'Insight': { bg: 'rgba(212, 175, 55, 0.08)', color: '#D4AF37', border: 'rgba(212, 175, 55, 0.2)', accent: '#D4AF37', dot: '#D4AF37' },
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  'Company Update': 'linear-gradient(135deg, #0a1220 0%, #0d2847 40%, #1a3a6c 100%)',
  'Product Update': 'linear-gradient(135deg, #001a14 0%, #003d2e 40%, #005c45 100%)',
  'Insight': 'linear-gradient(135deg, #1a1500 0%, #2d2400 40%, #4a3a00 100%)',
};

const COMPANY_COLORS: Record<string, string> = {
  'Cristedor Group': '#4F7CCF',
  'Cristedor Labs': '#10B981',
  'Cristedor Media': '#D4AF37',
};

function getArticleGradient(article: NewsArticle): string {
  return article.imageGradient || CATEGORY_GRADIENTS[article.category] || CATEGORY_GRADIENTS['Company Update'];
}

function Breadcrumbs({ items }: { items: { label: string; onClick?: () => void }[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{
      display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap',
      marginBottom: '1.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
    }}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <ChevronRight size={11} color="rgba(255,255,255,0.25)" />}
          {item.onClick ? (
            <button
              onClick={item.onClick}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                color: 'rgba(255,255,255,0.4)', fontFamily: 'inherit', fontSize: 'inherit',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#4F7CCF'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >
              {item.label}
            </button>
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 1000,
      background: 'rgba(17, 28, 46, 0.5)',
    }}>
      <div style={{
        height: '100%', width: `${progress}%`,
        background: 'linear-gradient(90deg, #4F7CCF, #4F7CCF)',
        transition: 'width 0.1s linear',
        boxShadow: '0 0 10px rgba(79, 124, 207, 0.5)',
      }} />
    </div>
  );
}

export const NewsroomPage: React.FC<NewsroomPageProps> = ({ onNavigate }) => {
  const hasPublished = publishedArticles.length > 0;

  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeCompany, setActiveCompany] = useState<string>('All Companies');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const closeDropdowns = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    if (companyDropdownRef.current && !companyDropdownRef.current.contains(e.target as Node)) setCompanyDropdownOpen(false);
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearchSuggestions(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdowns);
    return () => document.removeEventListener('mousedown', closeDropdowns);
  }, [closeDropdowns]);

  // ── Filter published articles ────────────────────────────────
  const filteredArticles = useMemo(() => {
    if (!hasPublished) return [];
    return publishedArticles.filter(article => {
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      const matchesCompany = activeCompany === 'All Companies' || article.company === activeCompany;
      const matchesTag = !activeTag || article.tags?.includes(activeTag);
      const matchesSearch = !searchQuery.trim() ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesCompany && matchesTag && matchesSearch;
    });
  }, [activeCategory, activeCompany, activeTag, searchQuery, hasPublished]);

  const showFeaturedCard = hasPublished && featuredArticle && activeCategory === 'All' && activeCompany === 'All Companies' && !activeTag && !searchQuery;
  const regularArticles = filteredArticles.filter(a => !showFeaturedCard || a.id !== featuredArticle?.id);
  const latestHeadlines = publishedArticles.slice(0, 4);

  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    const titles = publishedArticles.filter(a => a.title.toLowerCase().includes(q)).map(a => a.title).slice(0, 3);
    const companies = [...new Set(publishedArticles.filter(a => (a.company || '').toLowerCase().includes(q)).map(a => a.company))].slice(0, 2);
    const tags = ALL_TAGS.filter(t => t.toLowerCase().includes(q)).slice(0, 3);
    return [...titles.map(t => ({ type: 'article' as const, label: t })), ...companies.map(c => ({ type: 'company' as const, label: c! })), ...tags.map(t => ({ type: 'tag' as const, label: t }))];
  }, [searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setActiveCategory('All');
    setActiveCompany('All Companies');
    setActiveTag(null);
    setShowSearchSuggestions(false);
  }, []);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = selectedArticle ? selectedArticle.title : 'Cristedor Group Newsroom';

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // ── SEO SCHEMA ─────────────────────────────────────────────
  const seoSchema = selectedArticle ? {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: selectedArticle.title,
    description: selectedArticle.summary,
    datePublished: selectedArticle.date,
    author: { '@type': 'Person', name: selectedArticle.author },
    publisher: { '@type': 'Organization', name: 'Cristedor Group' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': shareUrl },
  } : null;

  // ── ARTICLE VIEW ────────────────────────────────────────────
  if (selectedArticle) {
    const cat = CATEGORY_COLORS[selectedArticle.category] || CATEGORY_COLORS['Company Update'];
    const related = getRelatedArticles(selectedArticle);
    const shareButtons = (
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.75rem', borderRadius: '8px', background: 'rgba(10, 102, 194, 0.15)', border: '1px solid rgba(10, 102, 194, 0.3)', color: '#0A66C2', fontSize: '0.72rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(10, 102, 194, 0.25)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10, 102, 194, 0.15)'; }}
        ><Linkedin size={13} /> LinkedIn</a>
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.75rem', borderRadius: '8px', background: 'rgba(29, 161, 242, 0.1)', border: '1px solid rgba(29, 161, 242, 0.25)', color: '#1DA1F2', fontSize: '0.72rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(29, 161, 242, 0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(29, 161, 242, 0.1)'; }}
        ><Twitter size={13} /> X</a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.75rem', borderRadius: '8px', background: 'rgba(24, 119, 242, 0.1)', border: '1px solid rgba(24, 119, 242, 0.25)', color: '#1877F2', fontSize: '0.72rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(24, 119, 242, 0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(24, 119, 242, 0.1)'; }}
        ><Facebook size={13} /> Facebook</a>
        <button onClick={handleCopyLink} aria-label="Copy link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.75rem', borderRadius: '8px', background: copiedLink ? 'rgba(16, 185, 129, 0.15)' : 'rgba(79, 124, 207, 0.1)', border: `1px solid ${copiedLink ? 'rgba(16, 185, 129, 0.3)' : 'rgba(79, 124, 207, 0.2)'}`, color: copiedLink ? '#10B981' : '#4F7CCF', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}
        ><Link2 size={13} /> {copiedLink ? 'Copied!' : 'Copy Link'}</button>
      </div>
    );

    return (
      <div style={{ backgroundColor: '#050914', minHeight: '100vh' }}>
        {seoSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seoSchema) }} />}
        <ReadingProgressBar />
        <div className="container" style={{ padding: '0 1.5rem' }}>
          <div style={{ paddingTop: 'clamp(5.5rem, 10vw, 7rem)', paddingBottom: '4rem', maxWidth: '900px', margin: '0 auto' }}>
            <Breadcrumbs items={[
              { label: 'Home', onClick: () => onNavigate('/') },
              { label: 'Newsroom', onClick: () => { setSelectedArticle(null); } },
              { label: selectedArticle.category, onClick: () => { setSelectedArticle(null); setActiveCategory(selectedArticle.category); } },
              { label: selectedArticle.title.length > 40 ? selectedArticle.title.slice(0, 40) + '...' : selectedArticle.title },
            ]} />

            {/* Hero Image */}
            <div className="article-hero-image" style={{
              position: 'relative', overflow: 'hidden', borderRadius: '16px',
              height: 'clamp(240px, 35vw, 400px)', marginBottom: '2rem',
              background: getArticleGradient(selectedArticle),
              border: '1px solid rgba(79, 124, 207, 0.12)',
            }}>
              {selectedArticle.image ? (
                <img src={selectedArticle.image} alt={selectedArticle.imageAlt || selectedArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <>
                  <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(79,124,207,0.03) 20px, rgba(79,124,207,0.03) 21px)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(79,124,207,0.15), transparent 60%)' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.12 }}><Newspaper size={64} color="#4F7CCF" /></div>
                </>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', right: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ padding: '0.25rem 0.7rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`, fontFamily: 'var(--font-mono)' }}>{selectedArticle.category}</span>
                {selectedArticle.company && (
                  <span style={{ padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 600, fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', color: COMPANY_COLORS[selectedArticle.company] || '#4F7CCF' }}>{selectedArticle.company}</span>
                )}
                <span style={{ padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 600, fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>{selectedArticle.readTime}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}><Calendar size={12} /> {selectedArticle.date}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}><Clock size={12} /> {selectedArticle.readTime}</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '1.5rem' }}>{selectedArticle.title}</h1>

            {/* Author Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(79, 124, 207, 0.12)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `linear-gradient(135deg, ${cat.accent}22, ${cat.accent}08)`, border: `1px solid ${cat.accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={18} color={cat.accent} />
              </div>
              <div>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-body)' }}>{selectedArticle.author}</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>{selectedArticle.authorRole || selectedArticle.date} · {selectedArticle.readTime}</p>
              </div>
            </div>

            {/* Tags */}
            {selectedArticle.tags && selectedArticle.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {selectedArticle.tags.map(tag => (
                  <span key={tag} style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 600, fontFamily: 'var(--font-mono)', background: 'rgba(79, 124, 207, 0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(79, 124, 207, 0.15)' }}>#{tag}</span>
                ))}
              </div>
            )}

            {/* Desktop sticky share bar */}
            <div className="article-share-bar-desktop" style={{ display: 'none', position: 'fixed', left: 'calc(50% - 460px)', top: '50%', transform: 'translateY(-50%)', zIndex: 50, flexDirection: 'column', gap: '0.4rem' }}>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(17, 28, 46, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(79, 124, 207, 0.15)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} aria-label="Scroll to top"
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(79,124,207,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.15)'; }}
              ><ArrowUp size={16} /></button>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"
                style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(17, 28, 46, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(10, 102, 194, 0.2)', color: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(10, 102, 194, 0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10, 102, 194, 0.2)'; }}
              ><Linkedin size={15} /></a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X"
                style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(17, 28, 46, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(29, 161, 242, 0.2)', color: '#1DA1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(29, 161, 242, 0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(29, 161, 242, 0.2)'; }}
              ><Twitter size={15} /></a>
              <button onClick={handleCopyLink} aria-label="Copy link"
                style={{ width: '36px', height: '36px', borderRadius: '10px', background: copiedLink ? 'rgba(16, 185, 129, 0.15)' : 'rgba(17, 28, 46, 0.8)', backdropFilter: 'blur(12px)', border: `1px solid ${copiedLink ? 'rgba(16, 185, 129, 0.4)' : 'rgba(79, 124, 207, 0.2)'}`, color: copiedLink ? '#10B981' : '#4F7CCF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              ><Link2 size={15} /></button>
            </div>

            {/* Share buttons (inline, mobile) */}
            <div className="article-share-inline" style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Share this article</p>
              {shareButtons}
            </div>

            {/* Article Content */}
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.85 }}>
              {selectedArticle.content.split('\n\n').map((block, i) => {
                if (block.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 700, color: '#fff', marginTop: '2.5rem', marginBottom: '0.75rem' }}>{block.replace('## ', '')}</h2>;
                if (block.startsWith('- **')) return (
                  <ul key={i} style={{ margin: '0.75rem 0', paddingLeft: '1.25rem', listStyle: 'none' }}>
                    {block.split('\n').map((li, j) => {
                      const match = li.replace(/^- /, '').match(/^\*\*(.+?)\*\*\s*(.*)/);
                      return match ? <li key={j} style={{ marginBottom: '0.4rem', position: 'relative', paddingLeft: '1rem' }}><span style={{ position: 'absolute', left: 0, color: cat.accent }}>·</span><strong style={{ color: '#fff', fontWeight: 600 }}>{match[1]}</strong> {match[2]}</li> : <li key={j} style={{ marginBottom: '0.4rem', position: 'relative', paddingLeft: '1rem' }}><span style={{ position: 'absolute', left: 0, color: cat.accent }}>·</span>{li.replace(/^- /, '')}</li>;
                    })}
                  </ul>
                );
                if (block.startsWith('- ')) return (
                  <ul key={i} style={{ margin: '0.75rem 0', paddingLeft: '1.25rem', listStyle: 'none' }}>
                    {block.split('\n').map((li, j) => <li key={j} style={{ marginBottom: '0.4rem', position: 'relative', paddingLeft: '1rem' }}><span style={{ position: 'absolute', left: 0, color: cat.accent }}>·</span>{li.replace(/^- /, '')}</li>)}
                  </ul>
                );
                if (block.startsWith('Phase')) return <p key={i} style={{ marginBottom: '0.75rem', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(79, 124, 207, 0.05)', borderLeft: `3px solid ${cat.accent}33` }}>{block}</p>;
                return <p key={i} style={{ marginBottom: '1rem' }}>{block}</p>;
              })}
            </div>

            {/* Bottom share */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(79, 124, 207, 0.12)' }}>
              {shareButtons}
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bookmark size={16} color="#4F7CCF" /> You May Also Like
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {related.map(ra => {
                    const raCat = CATEGORY_COLORS[ra.category] || CATEGORY_COLORS['Company Update'];
                    return (
                      <div key={ra.id} onClick={() => { setSelectedArticle(ra); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="newsroom-related-card"
                        style={{
                          position: 'relative', overflow: 'hidden', cursor: 'pointer', padding: '1.15rem', borderRadius: '14px',
                          background: 'rgba(17, 28, 46, 0.4)', border: '1px solid rgba(79, 124, 207, 0.1)',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = raCat.accent; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.1)'; }}
                      >
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${raCat.accent}, transparent)`, opacity: 0.5 }} />
                        <span style={{ padding: '0.15rem 0.45rem', borderRadius: '5px', fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', background: raCat.bg, color: raCat.color, border: `1px solid ${raCat.border}`, fontFamily: 'var(--font-mono)' }}>{ra.category}</span>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, color: '#fff', lineHeight: 1.3, margin: '0.6rem 0 0.4rem' }}>{ra.title}</h4>
                        <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>{ra.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Back button */}
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(79, 124, 207, 0.12)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={() => { setSelectedArticle(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', borderRadius: '10px', background: 'rgba(79, 124, 207, 0.12)', border: '1px solid rgba(79, 124, 207, 0.25)', color: '#4F7CCF', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79, 124, 207, 0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(79, 124, 207, 0.12)'; }}
              ><ArrowLeft size={14} /> All Newsroom Updates</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── LIST VIEW ──────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: '#050914', minHeight: '100vh' }}>
      <a href="#newsroom-main" className="sr-only" style={{ position: 'absolute', left: '-9999px' }}>Skip to content</a>

      {/* HERO */}
      <section className="newsroom-hero" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(5rem, 10vw, 7rem) 2rem clamp(2.5rem, 5vw, 3.5rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <img src="/news_team.jpg" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25, filter: 'brightness(0.7) saturate(0.8)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,9,20,0.68) 0%, rgba(5,9,20,0.38) 50%, #050914 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-30%', left: '15%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,124,207,0.1), transparent 70%)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '10%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,124,207,0.08), transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: '720px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '1rem' }}>{'\u2756'} CRISTEDOR NEWSROOM & UPDATES</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Official <span style={{ color: 'transparent', backgroundImage: 'linear-gradient(90deg, #4F7CCF 0%, #335EAA 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Newsroom</span> & Insights
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: '560px', margin: '0 auto 1.5rem' }}>
            Read factual updates about the companies and products Cristedor Group is building.
          </p>

          {/* Search Bar with suggestions */}
          <div ref={searchRef} style={{ position: 'relative', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
            <input
              type="text" placeholder={hasPublished ? "Search articles, topics, companies..." : "Search when articles are published..."}
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setShowSearchSuggestions(e.target.value.length >= 2); }}
              onFocus={e => { if (searchQuery.length >= 2) setShowSearchSuggestions(true); e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.5)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(79, 124, 207, 0.1)'; }}
              aria-label="Search articles"
              className="newsroom-search-input"
              style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.75rem', borderRadius: '12px', background: 'rgba(17, 28, 46, 0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(79, 124, 207, 0.2)', color: '#fff', fontSize: '0.85rem', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            {showSearchSuggestions && searchSuggestions.length > 0 && (
              <div style={{ position: 'absolute', top: 'calc(100% + 0.4rem)', left: 0, right: 0, borderRadius: '12px', overflow: 'hidden', background: 'rgba(12, 20, 38, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(79, 124, 207, 0.2)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', zIndex: 60 }}>
                {searchSuggestions.map((s, i) => (
                  <button key={i} onClick={() => { handleSearch(s.type === 'article' ? s.label : s.label); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', width: '100%', padding: '0.65rem 1rem', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(79, 124, 207, 0.06)', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontFamily: 'var(--font-body)', textAlign: 'left', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79, 124, 207, 0.06)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    {s.type === 'article' ? <Newspaper size={13} color="rgba(255,255,255,0.3)" /> : s.type === 'company' ? <Building2 size={13} color="#4F7CCF" /> : <Hash size={13} color="rgba(255,255,255,0.3)" />}
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.label}</span>
                    <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)', textTransform: 'capitalize' }}>{s.type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top, #050914, transparent)', pointerEvents: 'none' }} />
      </section>

      <div className="container" style={{ padding: '0 1.5rem' }} id="newsroom-main">
        <Breadcrumbs items={[{ label: 'Home', onClick: () => onNavigate('/') }, { label: 'Newsroom' }]} />

        {/* Empty state: no published articles */}
        {!hasPublished && (
          <div style={{ textAlign: 'center', padding: 'clamp(3rem, 8vw, 6rem) 2rem', maxWidth: '640px', margin: '0 auto' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '20px', margin: '0 auto 2rem',
              background: 'linear-gradient(135deg, rgba(79,124,207,0.12) 0%, rgba(51,94,170,0.08) 100%)',
              border: '1px solid rgba(79,124,207,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Newspaper size={32} color="#4F7CCF" />
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>
              Nothing published yet
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              We're currently building. Verified company updates, product announcements, and insights will appear here as they are published.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('/about')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.7rem 1.5rem', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #4F7CCF, #335EAA)',
                  boxShadow: '0 8px 20px rgba(79,124,207,0.2)',
                  border: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.25s'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(79,124,207,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(79,124,207,0.2)'; }}
              >Learn About Cristedor <ArrowUpRight size={14} /></button>

              <button
                onClick={() => onNavigate('/contact')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.7rem 1.5rem', borderRadius: '10px',
                  background: 'rgba(17, 28, 46, 0.5)',
                  border: '1px solid rgba(79, 124, 207, 0.2)',
                  color: '#4F7CCF', fontSize: '0.85rem', fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.25s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,124,207,0.4)'; e.currentTarget.style.background = 'rgba(17,28,46,0.8)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.2)'; e.currentTarget.style.background = 'rgba(17,28,46,0.5)'; }}
              >Get in Touch <ChevronRight size={14} /></button>
            </div>

            {/* Sidebar contact widget (always visible) */}
            <div style={{ marginTop: 'clamp(3rem, 6vw, 5rem)', textAlign: 'left', maxWidth: '360px', margin: 'clamp(3rem, 6vw, 5rem) auto 0' }}>
              <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.45)', backdropFilter: 'blur(16px)', border: '1px solid rgba(79, 124, 207, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={14} color="#4F7CCF" /> Contact</h3>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.85rem', fontFamily: 'var(--font-body)' }}>For media, partnership, or general enquiries.</p>
                  <button onClick={() => onNavigate('/contact')} style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: 'rgba(79, 124, 207, 0.12)', border: '1px solid rgba(79, 124, 207, 0.25)', color: '#4F7CCF', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'all 0.2s' }}>Go to Contact Page</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter + article grid (only when articles exist) */}
        {hasPublished && (
          <>
            {/* CATEGORY FILTER (Desktop pills / Mobile dropdown) */}
            <section style={{ paddingBottom: '0.75rem' }}>
              <div className="newsroom-filter-bar-desktop" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', padding: '0.85rem 1.15rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(79, 124, 207, 0.15)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
                <Filter size={14} color="rgba(255,255,255,0.3)" />
                {CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat;
                  return (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className="newsroom-filter-pill" aria-pressed={isActive}
                      style={{ padding: '0.38rem 0.8rem', borderRadius: '9999px', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.03em', whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)', background: isActive ? 'rgba(79, 124, 207, 0.15)' : 'rgba(17, 28, 46, 0.4)', color: isActive ? '#4F7CCF' : 'rgba(255,255,255,0.45)', border: `1px solid ${isActive ? 'rgba(79, 124, 207, 0.4)' : 'rgba(255,255,255,0.08)'}` }}
                    >{cat}</button>
                  );
                })}
                {searchQuery && <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>{filteredArticles.length} result{filteredArticles.length !== 1 ? 's' : ''}</span>}
              </div>
              <div className="newsroom-filter-bar-mobile" style={{ display: 'none' }} ref={dropdownRef}>
                <div onClick={() => setDropdownOpen(!dropdownOpen)} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(79, 124, 207, 0.15)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', cursor: 'pointer' }}>
                  <Filter size={14} color="rgba(255,255,255,0.3)" />
                  <span style={{ flex: 1, fontSize: '0.8rem', fontFamily: 'var(--font-body)', fontWeight: 500, color: '#fff' }}>{activeCategory}</span>
                  <ChevronDown size={15} color="rgba(255,255,255,0.4)" style={{ transition: 'transform 0.25s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                </div>
                {dropdownOpen && (
                  <div style={{ position: 'absolute', left: '1.5rem', right: '1.5rem', zIndex: 50, marginTop: '0.4rem', borderRadius: '12px', overflow: 'hidden', background: 'rgba(12, 20, 38, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(79, 124, 207, 0.2)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
                    {CATEGORIES.map(cat => {
                      const isActive = activeCategory === cat;
                      const catColor = cat === 'All' ? '#4F7CCF' : CATEGORY_COLORS[cat]?.accent || '#4F7CCF';
                      return (
                        <button key={cat} onClick={e => { e.stopPropagation(); setActiveCategory(cat); setDropdownOpen(false); }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', width: '100%', padding: '0.7rem 1rem', cursor: 'pointer', background: isActive ? 'rgba(79, 124, 207, 0.12)' : 'transparent', border: 'none', borderBottom: '1px solid rgba(79, 124, 207, 0.08)', color: isActive ? '#fff' : 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: isActive ? 600 : 400, textAlign: 'left' }}
                        ><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: catColor, flexShrink: 0 }} />{cat}{isActive && <span style={{ marginLeft: 'auto', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#4F7CCF', fontWeight: 700 }}>✓</span>}</button>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            {/* COMPANY FILTER */}
            {COMPANIES.length > 1 && (
              <section style={{ paddingBottom: '0.75rem' }}>
                <div className="newsroom-filter-bar-desktop" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', padding: '0.75rem 1.15rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.35)', backdropFilter: 'blur(16px)', border: '1px solid rgba(79, 124, 207, 0.1)' }}>
                  <Building2 size={13} color="rgba(255,255,255,0.25)" />
                  {COMPANIES.map(co => {
                    const isActive = activeCompany === co;
                    return (
                      <button key={co} onClick={() => setActiveCompany(co)} className="newsroom-filter-pill" aria-pressed={isActive}
                        style={{ padding: '0.32rem 0.7rem', borderRadius: '9999px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.25s', background: isActive ? (COMPANY_COLORS[co] ? `${COMPANY_COLORS[co]}18` : 'rgba(79, 124, 207, 0.15)') : 'rgba(17, 28, 46, 0.3)', color: isActive ? (COMPANY_COLORS[co] || '#4F7CCF') : 'rgba(255,255,255,0.35)', border: `1px solid ${isActive ? (COMPANY_COLORS[co] ? `${COMPANY_COLORS[co]}44` : 'rgba(79,124,207,0.3)') : 'rgba(255,255,255,0.06)'}` }}
                      >{co}</button>
                    );
                  })}
                </div>
                <div className="newsroom-filter-bar-mobile" style={{ display: 'none' }} ref={companyDropdownRef}>
                  <div onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.7rem 1rem', borderRadius: '12px', background: 'rgba(17, 28, 46, 0.35)', backdropFilter: 'blur(16px)', border: '1px solid rgba(79, 124, 207, 0.1)', cursor: 'pointer' }}>
                    <Building2 size={13} color="rgba(255,255,255,0.25)" />
                    <span style={{ flex: 1, fontSize: '0.78rem', fontFamily: 'var(--font-body)', fontWeight: 500, color: '#fff' }}>{activeCompany}</span>
                    <ChevronDown size={14} color="rgba(255,255,255,0.4)" style={{ transition: 'transform 0.25s', transform: companyDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                  </div>
                  {companyDropdownOpen && (
                    <div style={{ position: 'absolute', left: '1.5rem', right: '1.5rem', zIndex: 50, marginTop: '0.4rem', borderRadius: '12px', overflow: 'hidden', background: 'rgba(12, 20, 38, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(79, 124, 207, 0.2)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
                      {COMPANIES.map(co => {
                        const isActive = activeCompany === co;
                        return (
                          <button key={co} onClick={e => { e.stopPropagation(); setActiveCompany(co); setCompanyDropdownOpen(false); }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', width: '100%', padding: '0.65rem 1rem', cursor: 'pointer', background: isActive ? 'rgba(79, 124, 207, 0.12)' : 'transparent', border: 'none', borderBottom: '1px solid rgba(79, 124, 207, 0.06)', color: isActive ? '#fff' : 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: isActive ? 600 : 400, textAlign: 'left' }}
                          ><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: COMPANY_COLORS[co] || '#4F7CCF', flexShrink: 0 }} />{co}{isActive && <span style={{ marginLeft: 'auto', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#4F7CCF', fontWeight: 700 }}>✓</span>}</button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* FEATURED TAGS */}
            {ALL_TAGS.length > 0 && (
              <section style={{ paddingBottom: '1.5rem' }}>
                <div className="newsroom-filter-bar-desktop" style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Hash size={12} color="rgba(255,255,255,0.2)" />
                  {ALL_TAGS.slice(0, 10).map(tag => {
                    const isActive = activeTag === tag;
                    return (
                      <button key={tag} onClick={() => setActiveTag(isActive ? null : tag)}
                        style={{ padding: '0.22rem 0.55rem', borderRadius: '6px', fontSize: '0.6rem', fontFamily: 'var(--font-mono)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', background: isActive ? 'rgba(79, 124, 207, 0.15)' : 'rgba(17, 28, 46, 0.3)', color: isActive ? '#4F7CCF' : 'rgba(255,255,255,0.35)', border: `1px solid ${isActive ? 'rgba(79, 124, 207, 0.35)' : 'rgba(255,255,255,0.05)'}` }}
                      >{tag}</button>
                    );
                  })}
                </div>
              </section>
            )}

            <div className="newsroom-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}>
              <div className="newsroom-left-col">
                {/* Featured */}
                {showFeaturedCard && featuredArticle && (
                  <div style={{ marginBottom: '2rem' }}>
                    <div onClick={() => { if (featuredArticle) setSelectedArticle(featuredArticle); }} className="featured-news-card" style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(79, 124, 207, 0.18)', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#4F7CCF'; e.currentTarget.style.boxShadow = '0 0 40px rgba(79, 124, 207, 0.2), 0 20px 60px rgba(0,0,0,0.35)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.18)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)'; }}
                    >
                      <div className="featured-image-container" style={{ position: 'relative', overflow: 'hidden', height: '280px', borderBottom: '1px solid rgba(79, 124, 207, 0.12)' }}>
                        {featuredArticle.image ? (
                          <img src={featuredArticle.image} alt={featuredArticle.imageAlt || featuredArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: getArticleGradient(featuredArticle) }}>
                            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(79,124,207,0.04) 20px, rgba(79,124,207,0.04) 21px)' }} />
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.15 }}><Newspaper size={56} color="#4F7CCF" /></div>
                          </div>
                        )}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,28,46,0.9) 0%, rgba(17,28,46,0.3) 40%, transparent 60%)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', top: '1rem', left: '1.25rem', display: 'flex', gap: '0.4rem' }}>
                          <span style={{ padding: '0.2rem 0.55rem', borderRadius: '5px', fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', background: 'rgba(79, 124, 207, 0.2)', color: '#4F7CCF', border: '1px solid rgba(79, 124, 207, 0.35)', fontFamily: 'var(--font-mono)', backdropFilter: 'blur(8px)' }}>FEATURED</span>
                          {featuredArticle.company && <span style={{ padding: '0.2rem 0.55rem', borderRadius: '5px', fontSize: '0.55rem', fontWeight: 700, fontFamily: 'var(--font-mono)', backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: COMPANY_COLORS[featuredArticle.company] || '#4F7CCF' }}>{featuredArticle.company}</span>}
                        </div>
                      </div>
                      <div style={{ padding: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
                        <span style={{ padding: '0.2rem 0.55rem', borderRadius: '5px', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', background: CATEGORY_COLORS[featuredArticle.category]?.bg || 'rgba(0,240,255,0.08)', color: CATEGORY_COLORS[featuredArticle.category]?.color || '#4F7CCF', border: `1px solid ${CATEGORY_COLORS[featuredArticle.category]?.border || 'rgba(0,240,255,0.2)'}`, fontFamily: 'var(--font-mono)', marginBottom: '0.75rem', display: 'inline-block' }}>{featuredArticle.category}</span>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2.3vw, 1.75rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '0.6rem', marginTop: '0.75rem' }}>{featuredArticle.title}</h2>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{featuredArticle.summary}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{featuredArticle.author}</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 600, color: '#4F7CCF' }}>Read Article <ArrowUpRight size={13} /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Grid header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <Newspaper size={17} color="#4F7CCF" />
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{activeCategory === 'All' ? 'Latest Updates' : activeCategory}</h2>
                  <span style={{ marginLeft: '0.4rem', padding: '0.12rem 0.5rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 600, fontFamily: 'var(--font-mono)', background: 'rgba(79, 124, 207, 0.12)', color: '#4F7CCF', border: '1px solid rgba(79, 124, 207, 0.2)' }}>{regularArticles.length}</span>
                </div>

                {regularArticles.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3.5rem 2rem', background: 'rgba(17, 28, 46, 0.3)', borderRadius: '14px', border: '1px solid rgba(79, 124, 207, 0.1)' }}>
                    <Newspaper size={28} color="rgba(255,255,255,0.12)" style={{ marginBottom: '0.75rem' }} />
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>No articles found</p>
                    <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem', marginBottom: '1rem' }}>Try another keyword or adjust your filters.</p>
                    <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveCompany('All Companies'); setActiveTag(null); }}
                      style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(79, 124, 207, 0.15)', border: '1px solid rgba(79, 124, 207, 0.3)', color: '#4F7CCF', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Reset Filters</button>
                  </div>
                ) : (
                  <div className="newsroom-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {regularArticles.map((article, idx) => {
                      const cat = CATEGORY_COLORS[article.category] || CATEGORY_COLORS['Company Update'];
                      return (
                        <div key={article.id} onClick={() => { setSelectedArticle(article); window.scrollTo({ top: 0 }); }} className="newsroom-card"
                          style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', display: 'flex', gap: '1.15rem', alignItems: 'stretch', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(79, 124, 207, 0.1)', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', animation: `nrFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.08}s forwards`, opacity: 0 }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = cat.accent; e.currentTarget.style.boxShadow = `0 0 24px ${cat.accent}12, 0 12px 40px rgba(0,0,0,0.3)`; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                          <div className="newsroom-card-thumb" style={{ position: 'relative', overflow: 'hidden', flexShrink: 0, width: '120px', minHeight: '120px', borderRadius: '13px 0 0 13px' }}>
                            {article.image ? (
                              <img src={article.image} alt={article.imageAlt || article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', minHeight: '120px', background: getArticleGradient(article) }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(79,124,207,0.04) 12px, rgba(79,124,207,0.04) 13px)' }} />
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}><Newspaper size={28} color={cat.accent} /></div>
                              </div>
                            )}
                          </div>
                          <div style={{ flex: 1, padding: '1.15rem 1.15rem 1.15rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${cat.accent}, transparent)`, opacity: 0.4 }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                              <span style={{ padding: '0.15rem 0.45rem', borderRadius: '5px', fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', background: cat.bg, color: cat.color, border: `1px solid ${cat.border}`, fontFamily: 'var(--font-mono)' }}>{article.category}</span>
                              {article.company && <span style={{ padding: '0.12rem 0.4rem', borderRadius: '4px', fontSize: '0.52rem', fontWeight: 600, fontFamily: 'var(--font-mono)', background: `${COMPANY_COLORS[article.company] || '#4F7CCF'}12`, color: COMPANY_COLORS[article.company] || '#4F7CCF', border: `1px solid ${COMPANY_COLORS[article.company] || '#4F7CCF'}22` }}>{article.company}</span>}
                              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>{article.date}</span>
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: '0.4rem' }}>{article.title}</h3>
                            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.summary}</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: cat.accent, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>Read Article <ArrowUpRight size={12} /></span>
                              <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={10} /> {article.readTime}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* SIDEBAR */}
              <div className="newsroom-sidebar">
                {/* Contact */}
                <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.45)', backdropFilter: 'blur(16px)', border: '1px solid rgba(79, 124, 207, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', marginBottom: '1.25rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-20%', right: '-15%', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,124,207,0.08), transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={14} color="#4F7CCF" /> Contact</h3>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.85rem', fontFamily: 'var(--font-body)' }}>For media, partnership, or general enquiries.</p>
                    <button onClick={() => onNavigate('/contact')} style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: 'rgba(79, 124, 207, 0.12)', border: '1px solid rgba(79, 124, 207, 0.25)', color: '#4F7CCF', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'all 0.2s' }}>Go to Contact Page</button>
                  </div>
                </div>

                {/* Categories Widget */}
                <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.45)', backdropFilter: 'blur(16px)', border: '1px solid rgba(79, 124, 207, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Filter size={14} color="#4F7CCF" /> Categories</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {(['All', 'Company Update', 'Product Update', 'Insight'] as const).map(cat => {
                      const isActive = activeCategory === cat;
                      const count = categoryCounts[cat] || 0;
                      const catColor = cat === 'All' ? '#4F7CCF' : CATEGORY_COLORS[cat]?.accent || '#4F7CCF';
                      return (
                        <button key={cat} onClick={() => setActiveCategory(cat)}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.65rem', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', background: isActive ? 'rgba(79, 124, 207, 0.1)' : 'transparent', border: isActive ? '1px solid rgba(79, 124, 207, 0.2)' : '1px solid transparent', color: isActive ? '#fff' : 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: isActive ? 600 : 400, width: '100%', textAlign: 'left' }}
                        ><span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ width: '7px', height: '7px', borderRadius: '50%', background: catColor, flexShrink: 0 }} />{cat}</span><span style={{ padding: '0.1rem 0.4rem', borderRadius: '9999px', fontSize: '0.6rem', fontFamily: 'var(--font-mono)', fontWeight: 600, background: isActive ? 'rgba(79, 124, 207, 0.15)' : 'rgba(255,255,255,0.06)', color: isActive ? '#4F7CCF' : 'rgba(255,255,255,0.3)' }}>{count}</span></button>
                      );
                    })}
                  </div>
                </div>

                {/* Archive */}
                {ARCHIVE_YEARS.length > 0 && (
                  <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.45)', backdropFilter: 'blur(16px)', border: '1px solid rgba(79, 124, 207, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>Archive</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      {ARCHIVE_YEARS.map(year => (
                        <button key={year} onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.45rem 0.65rem', borderRadius: '8px', cursor: 'pointer', background: selectedYear === year ? 'rgba(79, 124, 207, 0.1)' : 'transparent', border: 'none', color: selectedYear === year ? '#fff' : 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: selectedYear === year ? 600 : 400, width: '100%', textAlign: 'left', transition: 'all 0.2s' }}
                        >{year}<ChevronRight size={12} style={{ transition: 'transform 0.2s', transform: selectedYear === year ? 'rotate(90deg)' : 'rotate(0)' }} /></button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Latest Headlines */}
                {latestHeadlines.length > 0 && (
                  <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.45)', backdropFilter: 'blur(16px)', border: '1px solid rgba(79, 124, 207, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} color="#D4AF37" /> Latest Updates</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                      {latestHeadlines.map((article, idx) => (
                        <React.Fragment key={article.id}>
                          <button onClick={() => { setSelectedArticle(article); window.scrollTo({ top: 0 }); }} className="hl-row"
                            style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', padding: '0.55rem 0', cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left', width: '100%', color: 'inherit', fontFamily: 'inherit' }}
                            onMouseEnter={e => { const t = e.currentTarget.querySelector('.hl-title') as HTMLElement; if (t) t.style.color = '#fff'; }}
                            onMouseLeave={e => { const t = e.currentTarget.querySelector('.hl-title') as HTMLElement; if (t) t.style.color = 'rgba(255,255,255,0.7)'; }}
                          >
                            <div className="hl-thumb" style={{ width: '44px', height: '44px', borderRadius: '8px', flexShrink: 0, overflow: 'hidden', background: getArticleGradient(article), transition: 'filter 0.3s' }}>
                              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}><Newspaper size={14} color={CATEGORY_COLORS[article.category]?.accent || '#4F7CCF'} /></div>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p className="hl-title" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', lineHeight: 1.3, transition: 'color 0.2s', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.title}</p>
                              <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>{article.date}</span>
                            </div>
                          </button>
                          {idx < latestHeadlines.length - 1 && <div style={{ height: '1px', background: 'rgba(79, 124, 207, 0.06)' }} />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* RESPONSIVE */}
      <style>{`
        @keyframes nrFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
        *:focus-visible { outline: 2px solid #4F7CCF; outline-offset: 2px; border-radius: 4px; }

        @media (max-width: 900px) {
          .newsroom-two-col { grid-template-columns: 1fr !important; }
          .newsroom-sidebar { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
          .article-share-bar-desktop { display: none !important; }
        }
        @media (max-width: 768px) {
          .newsroom-hero { padding: 4.5rem 1.25rem 2rem !important; }
          .hero-content { margin-top: 1.5rem; }
          .newsroom-filter-bar-desktop { display: none !important; }
          .newsroom-filter-bar-mobile { display: block !important; position: relative; }
          .newsroom-sidebar { grid-template-columns: 1fr !important; }
          .newsroom-grid { flex-direction: column !important; }
          .newsroom-card { flex-direction: column !important; }
          .newsroom-card-thumb { width: 100% !important; min-height: 160px !important; border-radius: 13px 13px 0 0 !important; }
          .newsroom-card > div:last-child { padding: 1rem !important; }
          .hl-thumb { width: 38px !important; height: 38px !important; }
          .featured-image-container { height: 220px !important; }
          .article-hero-image { height: clamp(200px, 40vw, 320px) !important; border-radius: 12px !important; }
          .article-share-bar-desktop { display: none !important; }
          .newsroom-related-card { padding: 1rem !important; }
        }
        @media (max-width: 560px) {
          .newsroom-hero { padding: 4rem 1rem 1.75rem !important; }
          .newsroom-grid { gap: 0.9rem !important; }
          .newsroom-filter-pill { padding: 0.32rem 0.6rem !important; font-size: 0.63rem !important; }
          .featured-image-container { height: 180px !important; }
          .newsroom-card-thumb { min-height: 140px !important; }
          .hl-thumb { width: 34px !important; height: 34px !important; }
          .article-hero-image { height: clamp(180px, 45vw, 280px) !important; }
        }
        @media (max-width: 480px) {
          .newsroom-hero { padding: 3.5rem 0.75rem 1.5rem !important; }
          .hero-content { margin-top: 2rem; }
          .featured-news-card h2 { font-size: 1.15rem !important; }
          .featured-image-container { height: 160px !important; }
          .newsroom-card-thumb { min-height: 120px !important; }
          .article-hero-image { height: clamp(160px, 50vw, 240px) !important; border-radius: 10px !important; }
        }
      `}</style>
    </div>
  );
};

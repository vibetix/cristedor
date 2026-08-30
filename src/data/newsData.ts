import { NewsArticle } from '../types';

// ─────────────────────────────────────────────────────────────
// Newsroom article data adapter
// ─────────────────────────────────────────────────────────────
// Single source of truth for Newsroom articles.
//
// Cristedor Group currently has 0 published newsroom articles.
// The array below is intentionally empty — no fabricated
// publication history exists.
//
// When an Admin CMS is connected, this file should become a
// thin adapter that imports or fetches real published articles.
//
// Workflow:
//   Admin creates article → status: 'draft'
//   Admin publishes      → status: 'published'
//   Public Newsroom      → displays only status === 'published'

// ── Raw article store (empty) ────────────────────────────────
export const newsData: NewsArticle[] = [];

// ── Published-only view ──────────────────────────────────────
export const publishedArticles: NewsArticle[] =
  newsData.filter(a => a.status === 'published');

// ── Featured article (most recent published, if any) ─────────
export const featuredArticle: NewsArticle | undefined =
  publishedArticles.find(a => a.featured) || publishedArticles[0];

// ── Derived filter options (from published articles only) ─────
export const COMPANIES = ['All Companies', ...Array.from(new Set(
  publishedArticles.map(a => a.company).filter(Boolean)
))] as string[];

export const ALL_TAGS = Array.from(new Set(
  publishedArticles.flatMap(a => a.tags || [])
));

export const CATEGORIES = ['All', 'Company Update', 'Product Update', 'Insight'] as const;

// ── Archive years (from published article dates) ─────────────
export const ARCHIVE_YEARS: number[] = Array.from(new Set(
  publishedArticles.map(a => {
    const match = a.date.match(/\d{4}/);
    return match ? parseInt(match[0]) : NaN;
  })
)).filter(y => !isNaN(y)).sort((a, b) => b - a);

// ── Category counts (from published articles) ────────────────
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { All: publishedArticles.length };
  publishedArticles.forEach(a => {
    counts[a.category] = (counts[a.category] || 0) + 1;
  });
  return counts;
}

// ── Search published articles ────────────────────────────────
export function searchPublishedArticles(query: string): NewsArticle[] {
  const q = query.toLowerCase().trim();
  if (!q) return publishedArticles;
  return publishedArticles.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.summary.toLowerCase().includes(q) ||
    a.author.toLowerCase().includes(q) ||
    (a.company || '').toLowerCase().includes(q) ||
    (a.tags || []).some(t => t.toLowerCase().includes(q))
  );
}

// ── Related articles (published, same category or company) ────
export function getRelatedArticles(article: NewsArticle, limit = 3): NewsArticle[] {
  return publishedArticles
    .filter(a => a.id !== article.id && (a.category === article.category || a.company === article.company))
    .slice(0, limit);
}

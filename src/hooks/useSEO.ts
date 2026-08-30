import { useEffect } from 'react';
import { RoutePath } from '../types';
import { portfolioData } from '../data/portfolioData';
import { projects } from '../data/siteContent';

const SEO_MAP: Record<RoutePath, { title: string; description: string }> = {
  '/': {
    title: 'Cristedor Group | Building Technology & Media Ventures',
    description: 'Official website of Cristedor Group, an early-stage private holding company being established in Ghana. Building technology and media ventures online, including Cristedor Labs, Cristedor Media, and the products in development.'
  },
  '/portfolio': {
    title: 'Companies & Ventures | Cristedor Group',
    description: 'Meet the ventures Cristedor Group is building — Cristedor Labs and Cristedor Media — and the products in development.'
  },
  '/projects': {
    title: 'Public Projects | Cristedor Group',
    description: 'UniStay, Synkturt TTS, and Vibetix — the public products Cristedor Group is building across university housing, AI voice, and event technology.'
  },
  '/divisions': {
    title: 'Divisions & Ventures | Cristedor Group',
    description: 'Cristedor Group is building two ventures: Cristedor Labs for technology and software products, and Cristedor Media for media and content.'
  },
  '/about': {
    title: 'About & Governance | Cristedor Group',
    description: 'The story, vision, and governance of Cristedor Group, an early-stage private holding company being established in Ghana.'
  },
  '/investors': {
    title: 'Investors & Partners | Cristedor Group',
    description: 'Corporate information, portfolio overview, strategy, governance, and partnership enquiries for Cristedor Group, a privately held holding company.'
  },
  '/newsroom': {
    title: 'Newsroom & Updates | Cristedor Group',
    description: 'Factual company and product updates from Cristedor Group, Cristedor Labs, and Cristedor Media.'
  },
  '/careers': {
    title: 'Careers at Cristedor Group',
    description: 'Careers at Cristedor Group, an early-stage private holding company being established in Ghana. Open positions will be shared as they become available.'
  },
  '/contact': {
    title: 'Contact Cristedor Group',
    description: 'Contact Cristedor Group. Currently being established in Ghana and operating online — send us a message.'
  },
  '/privacy': {
    title: 'Privacy Policy & Terms | Cristedor Group',
    description: 'Data privacy principles, terms of service, and technical telemetry policies for Cristedor Group.'
  },
  '/404': {
    title: '404 Route Not Found | Cristedor Group',
    description: 'The requested page or asset does not exist in the Cristedor Group ecosystem directory.'
  }
};

const setMeta = (name: string, content: string, property = false) => {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const upsertScript = (id: string, json: object) => {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(json);
};

interface SEOOptions {
  id?: string;
}

export const useSEO = (path: RoutePath, options?: SEOOptions) => {
  useEffect(() => {
    const entity = options?.id ? portfolioData.find(v => v.id === options.id) : undefined;
    const project = options?.id ? projects.find(p => p.id === options.id) : undefined;
    const origin = window.location.origin;
    const canonicalPath = window.location.pathname;

    if (entity && entity.type !== 'product') {
      const title = `${entity.name} | Cristedor Group`;
      const description = `${entity.tagline} ${entity.description}`.slice(0, 160);

      document.title = title;
      setMeta('description', description);
      setMeta('og:title', title, true);
      setMeta('og:description', description, true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', origin + canonicalPath, true);
      upsertLink('canonical', origin + canonicalPath);

      upsertScript('cristedor-seo-jsonld', {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${origin}/portfolio/${entity.id}#organization`,
            name: entity.name,
            url: origin + canonicalPath,
            description: entity.tagline,
            parentOrganization: {
              '@type': 'Organization',
              name: 'Cristedor Group',
              url: `${origin}/`
            }
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${origin}${canonicalPath}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
              { '@type': 'ListItem', position: 2, name: 'Companies & Ventures', item: `${origin}/portfolio` },
              { '@type': 'ListItem', position: 3, name: entity.name }
            ]
          }
        ]
      });
      return;
    }

    if (project) {
      const title = `${project.name} | Cristedor Group`;
      const description = project.description.slice(0, 160);

      document.title = title;
      setMeta('description', description);
      setMeta('og:title', title, true);
      setMeta('og:description', description, true);
      setMeta('og:type', 'website', true);
      setMeta('og:url', origin + canonicalPath, true);
      upsertLink('canonical', origin + canonicalPath);

      upsertScript('cristedor-seo-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description: description,
        url: origin + canonicalPath
      });
      return;
    }

    const seoData = SEO_MAP[path] || SEO_MAP['/404'];
    document.title = seoData.title;
    setMeta('description', seoData.description);
    setMeta('og:title', seoData.title, true);
    setMeta('og:description', seoData.description, true);
    setMeta('og:url', origin + canonicalPath, true);
    upsertLink('canonical', origin + canonicalPath);

    upsertScript('cristedor-seo-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seoData.title,
      description: seoData.description,
      url: origin + canonicalPath
    });
  }, [path, options?.id]);
};

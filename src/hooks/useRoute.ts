import { useState, useEffect } from 'react';
import { RoutePath } from '../types';

interface RouteParams {
  id?: string;
}

const parseRoute = (pathname: string): { path: RoutePath; params: RouteParams } => {
  if (pathname.startsWith('/portfolio/')) {
    const id = pathname.slice('/portfolio/'.length);
    return { path: '/portfolio', params: id ? { id } : {} };
  }
  if (pathname.startsWith('/projects/')) {
    const id = pathname.slice('/projects/'.length);
    return { path: '/projects', params: id ? { id } : {} };
  }
  return { path: (pathname as RoutePath) || '/', params: {} };
};

export const useRoute = () => {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    return parseRoute(window.location.pathname).path;
  });
  const [routeParams, setRouteParams] = useState<RouteParams>(() => {
    return parseRoute(window.location.pathname).params;
  });

  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRoute(window.location.pathname);
      setCurrentPath(parsed.path);
      setRouteParams(parsed.params);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: RoutePath, query?: Record<string, string>) => {
    if ((path === '/portfolio' || path === '/projects') && query?.id) {
      const target = `/${path.slice(1)}/${query.id}`;
      if (window.location.pathname !== target) {
        window.history.pushState({}, '', target);
        setCurrentPath(path);
        setRouteParams({ id: query.id });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (window.location.pathname !== path) {
      const qs = query ? '?' + new URLSearchParams(query).toString() : '';
      window.history.pushState({}, '', path + qs);
      const parsed = parseRoute(path + qs);
      setCurrentPath(parsed.path);
      setRouteParams(parsed.params);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return { currentPath, navigate, routeParams };
};

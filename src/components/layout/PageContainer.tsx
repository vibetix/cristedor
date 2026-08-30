import React from 'react';
import { RoutePath } from '../../types';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';
import { NewsletterSection } from '../common/NewsletterSection';
import { CustomCursor } from '../common/CustomCursor';

interface PageContainerProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  currentPath,
  onNavigate,
  children
}) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative'
      }}
    >
      <CustomCursor />
      <Navbar currentPath={currentPath} onNavigate={onNavigate} />
      
      <main 
        key={currentPath}
        className="page-transition-enter page-main"
        style={{ 
          flex: 1, 
          position: 'relative', 
          zIndex: 'var(--z-base)',
          paddingTop: 0
        }}
      >
        {children}
        {currentPath === '/' && <NewsletterSection />}
      </main>

      <Footer onNavigate={onNavigate} />
      <BottomNav currentPath={currentPath} onNavigate={onNavigate} />

      <style>{`
        @media (max-width: 900px) {
          .page-main {
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

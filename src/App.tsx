import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import { useRoute } from './hooks/useRoute';
import { useSEO } from './hooks/useSEO';
import { PageContainer } from './components/layout/PageContainer';
import { JobApplicationModal } from './components/features/JobApplicationModal';
import { VentureDetailModal } from './components/features/VentureDetailModal';

// Pages
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { VentureDetailPage } from './pages/VentureDetailPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { DivisionsPage } from './pages/DivisionsPage';
import { AboutPage } from './pages/AboutPage';
import { InvestorsPage } from './pages/InvestorsPage';
import { NewsroomPage } from './pages/NewsroomPage';
import CareersPage from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

const MainApp: React.FC = () => {
  const { currentPath, navigate, routeParams } = useRoute();
  useSEO(currentPath, { id: routeParams.id });

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/portfolio':
        return routeParams.id
          ? <VentureDetailPage id={routeParams.id} onNavigate={navigate} />
          : <PortfolioPage onNavigate={navigate} />;
      case '/projects':
        return routeParams.id
          ? <ProjectDetailPage id={routeParams.id} onNavigate={navigate} />
          : <HomePage onNavigate={navigate} />;
      case '/divisions':
        return <DivisionsPage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/investors':
        return <InvestorsPage onNavigate={navigate} />;
      case '/newsroom':
        return <NewsroomPage onNavigate={navigate} />;
      case '/careers':
        return <CareersPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage onNavigate={navigate} />;
      case '/privacy':
        return <PrivacyPage onNavigate={navigate} />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <PageContainer currentPath={currentPath} onNavigate={navigate}>
      {renderPage()}
      {/* Global Modals & Slide-Over Drawers */}
      <JobApplicationModal />
      <VentureDetailModal />
    </PageContainer>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <MainApp />
      </ModalProvider>
    </ThemeProvider>
  );
};

export default App;

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import CookieConsent from './components/CookieConsent';
import PageTransition from './components/PageTransition';
import { LanguageProvider } from './context/LanguageContext';

// Code-split all page components
const Home = React.lazy(() => import('./pages/Home'));
const Agency = React.lazy(() => import('./pages/Agency'));
const Showcase = React.lazy(() => import('./pages/Showcase'));
const Philosophy = React.lazy(() => import('./pages/Philosophy'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Admin = React.lazy(() => import('./pages/Admin'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      <span className="text-xs font-mono text-white/30 uppercase tracking-widest loading-pulse">Loading</span>
    </div>
  </div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={
            <Suspense fallback={<PageLoader />}>
              <Admin />
            </Suspense>
          } />
          <Route path="/" element={<Layout />}>
            <Route index element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition><Home /></PageTransition>
              </Suspense>
            } />
            <Route path="agency" element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition><Agency /></PageTransition>
              </Suspense>
            } />
            <Route path="showcase" element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition><Showcase /></PageTransition>
              </Suspense>
            } />
            <Route path="philosophy" element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition><Philosophy /></PageTransition>
              </Suspense>
            } />
            <Route path="contact" element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition><Contact /></PageTransition>
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<PageLoader />}>
                <PageTransition><NotFound /></PageTransition>
              </Suspense>
            } />
          </Route>
        </Routes>
        <CookieConsent />
      </Router>
    </LanguageProvider>
  );
};

export default App;
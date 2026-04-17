import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { initSentry } from './utils/sentry';
import { initAnalytics } from './utils/analytics';
import { reportWebVitals } from './utils/web-vitals';
import './index.css';

// Initialize error tracking
initSentry();

// Initialize analytics after cookie consent or if already accepted
const checkConsentAndInit = () => {
  const consent = localStorage.getItem('cookie-consent');
  if (consent === 'accepted') {
    initAnalytics();
  }
};

window.addEventListener('cookie-consent-accepted', () => {
  initAnalytics();
});

checkConsentAndInit();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Report Web Vitals
reportWebVitals();
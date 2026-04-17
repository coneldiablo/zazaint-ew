import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';

export function TestProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}

export function MemoryProvider({ children, initialEntry = '/' }: { children: React.ReactNode; initialEntry?: string }) {
  return (
    <LanguageProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        {children}
      </MemoryRouter>
    </LanguageProvider>
  );
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </LanguageProvider>
  );
}

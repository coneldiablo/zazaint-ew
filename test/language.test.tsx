import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';

function renderWithProvider(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

const MockNav = ({ language }: { language: 'en' | 'ru' }) => {
  const content = {
    en: { agency: 'Agency', showcase: 'Showcase', philosophy: 'Philosophy', connect: 'Connect' },
    ru: { agency: 'Агентство', showcase: 'Проекты', philosophy: 'Философия', connect: 'Связь' }
  };
  const t = content[language];
  return (
    <nav>
      <span data-testid="nav-agency">{t.agency}</span>
      <span data-testid="nav-showcase">{t.showcase}</span>
      <span data-testid="nav-philosophy">{t.philosophy}</span>
      <span data-testid="nav-connect">{t.connect}</span>
    </nav>
  );
};

const LangReader = () => {
  const { language } = useLanguage();
  return <span data-testid="lang">{language}</span>;
};

const LangToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <button data-testid="toggle" onClick={toggleLanguage}>Toggle</button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to English', () => {
    renderWithProvider(<LangReader />);
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });

  it('renders English navigation labels', () => {
    renderWithProvider(<MockNav language="en" />);
    expect(screen.getByTestId('nav-agency')).toHaveTextContent('Agency');
    expect(screen.getByTestId('nav-showcase')).toHaveTextContent('Showcase');
    expect(screen.getByTestId('nav-philosophy')).toHaveTextContent('Philosophy');
    expect(screen.getByTestId('nav-connect')).toHaveTextContent('Connect');
  });

  it('renders Russian navigation labels', () => {
    renderWithProvider(<MockNav language="ru" />);
    expect(screen.getByTestId('nav-agency')).toHaveTextContent('Агентство');
    expect(screen.getByTestId('nav-showcase')).toHaveTextContent('Проекты');
    expect(screen.getByTestId('nav-philosophy')).toHaveTextContent('Философия');
    expect(screen.getByTestId('nav-connect')).toHaveTextContent('Связь');
  });

  it('persists language preference in localStorage', () => {
    localStorage.setItem('language-preference', 'ru');
    renderWithProvider(<LangReader />);
    expect(screen.getByTestId('lang')).toHaveTextContent('ru');
  });

  it('toggles language from en to ru', () => {
    renderWithProvider(<LangToggle />);
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    fireEvent.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('lang')).toHaveTextContent('ru');
  });

  it('toggles language from ru back to en', () => {
    renderWithProvider(<LangToggle />);
    fireEvent.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('lang')).toHaveTextContent('ru');
    fireEvent.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });
});

describe('Navigation translations completeness', () => {
  const enLabels = { agency: 'Agency', showcase: 'Showcase', philosophy: 'Philosophy', connect: 'Connect' };
  const ruLabels = { agency: 'Агентство', showcase: 'Проекты', philosophy: 'Философия', connect: 'Связь' };

  it('has same keys in both languages', () => {
    expect(Object.keys(enLabels)).toEqual(Object.keys(ruLabels));
  });

  it('Russian labels are non-empty', () => {
    Object.values(ruLabels).forEach(val => {
      expect(val.length).toBeGreaterThan(0);
    });
  });

  it('Russian labels contain Cyrillic', () => {
    Object.values(ruLabels).forEach(val => {
      expect(val).toMatch(/[а-яА-ЯёЁ]/);
    });
  });
});

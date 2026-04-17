import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const isActive = (path: string) => location.pathname === path;

  const content = {
    en: {
      agency: 'Agency',
      showcase: 'Showcase',
      philosophy: 'Philosophy',
      connect: 'Connect'
    },
    ru: {
      agency: 'Агентство',
      showcase: 'Проекты',
      philosophy: 'Философия',
      connect: 'Связь'
    }
  };

  const t = content[language];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/20">
        <Link 
          to="/" 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:scale-105 transition-transform duration-300 mr-2"
        >
          <span className="font-display font-bold text-lg tracking-tighter">Z</span>
        </Link>
        
        <div className="hidden sm:flex items-center bg-white/5 rounded-full px-1 border border-white/5">
          <Link 
            to="/agency" 
            className={`px-5 py-2 text-[10px] md:text-xs uppercase tracking-widest font-medium rounded-full transition-all duration-300 ${isActive('/agency') ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            {t.agency}
          </Link>
          <Link 
            to="/showcase" 
            className={`px-5 py-2 text-[10px] md:text-xs uppercase tracking-widest font-medium rounded-full transition-all duration-300 ${isActive('/showcase') ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            {t.showcase}
          </Link>
          <Link 
            to="/philosophy" 
            className={`px-5 py-2 text-[10px] md:text-xs uppercase tracking-widest font-medium rounded-full transition-all duration-300 ${isActive('/philosophy') ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            {t.philosophy}
          </Link>
        </div>

        <button
          onClick={toggleLanguage}
          className="ml-2 px-3 py-2.5 text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all border border-transparent hover:border-white/10"
        >
          {language === 'en' ? 'RU' : 'EN'}
        </button>

        <Link 
          to="/contact"
          className="ml-1 px-6 py-2.5 bg-white text-black text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          {t.connect}
        </Link>
      </nav>
    </header>
  );
};

export default Navigation;
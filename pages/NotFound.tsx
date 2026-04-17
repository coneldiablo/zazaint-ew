import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';

const NotFound: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      seoTitle: '404 — Page Not Found',
      seoDesc: 'The page you are looking for does not exist or has been moved.',
      badge: 'Void Detected',
      description: 'The coordinates you entered have drifted into the null sector.',
      description2: 'The artifact is missing or has been dereferenced.',
      link: 'Initiate Return',
      footer: 'Error Code: ID-NULL / Sector 00',
    },
    ru: {
      seoTitle: '404 — Страница не найдена',
      seoDesc: 'Страница, которую вы ищете, не существует или была перемещена.',
      badge: 'Обнаружена Пустота',
      description: 'Координаты, которые вы ввели, сместились в нулевой сектор.',
      description2: 'Артефакт отсутствует или был деструктурирован.',
      link: 'Вернуться Назад',
      footer: 'Код ошибки: ID-NULL / Сектор 00',
    },
  };

  const t = content[language];

  return (
    <>
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        path="/404"
      />
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] w-full overflow-hidden text-white pt-20">
        {/* Abstract Geometry Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full opacity-20 animate-[spin_60s_linear_infinite] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full opacity-20 animate-[spin_40s_linear_infinite_reverse] pointer-events-none"></div>

        <div className="z-10 flex flex-col items-center text-center space-y-8 px-6">
          <div className="relative">
            {/* Massive 404 Text */}
            <h1 className="font-display text-[8rem] sm:text-[12rem] md:text-[16rem] leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/20 to-transparent select-none blur-[1px] hover:blur-0 transition-all duration-1000">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none">
              <span className="text-[10px] md:text-sm font-mono uppercase tracking-[0.8em] text-white/50 bg-black/80 backdrop-blur-md px-6 py-2 border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,0,0,1)]">
                {t.badge}
              </span>
            </div>
          </div>

          <div className="max-w-lg space-y-8 flex flex-col items-center">
            <p className="text-lg text-white/60 font-light leading-relaxed">
              {t.description} <br className="hidden md:block" />
              {t.description2}
            </p>

            <Link
              to="/"
              className="group relative inline-flex items-center gap-4 px-8 py-3 overflow-hidden rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="relative z-10 w-6 h-px bg-white/30 group-hover:bg-white transition-colors"></span>
              <span className="relative z-10 text-xs font-mono uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{t.link}</span>
              <span className="relative z-10 w-6 h-px bg-white/30 group-hover:bg-white transition-colors"></span>
            </Link>
          </div>
        </div>

        {/* Decorative footer element */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/10 uppercase tracking-widest text-center">
          {t.footer}
        </div>
      </div>
    </>
  );
};

export default NotFound;
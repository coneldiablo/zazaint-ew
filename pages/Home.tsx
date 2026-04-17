import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import AvatarFallback from '../components/AvatarFallback';
import { getTeamMembers, getSiteConfig } from '../utils/adminStorage';

const Home: React.FC = () => {
  const { language } = useLanguage();
  const members = getTeamMembers();
  const siteConfig = getSiteConfig();

  const seo = {
    en: {
      title: 'Digital Agency',
      description: 'A collective of sovereign developers from Dagestan forging digital artifacts with liquid precision. Web development, digital product design, and brand identity.',
    },
    ru: {
      title: 'Цифровое Агентство',
      description: 'Коллектив суверенных разработчиков из Дагестана, создающих цифровые артефакты с жидкой точностью. Веб-разработка, дизайн цифровых продуктов и айдентика бренда.',
    },
  };

  const content = {
    en: {
      tagline_sub: 'INT.',
      desc_1: 'Forging digital artifacts with liquid precision.',
      desc_2: siteConfig.descDagestan,
      showreel: 'Showreel',
      core: 'Core Personnel',
      architects: 'The Architects',
      active_units: 'ACTIVE UNITS',
      footer: {
        est: 'Est. 2024 — Worldwide',
        manifesto: 'Manifesto',
        legal: 'Legal',
        contact: 'Contact'
      }
    },
    ru: {
      tagline_sub: 'ИНТ.',
      desc_1: 'Создаем цифровые артефакты с жидкой точностью.',
      desc_2: siteConfig.descDagestanRu,
      showreel: 'Шоурил',
      core: 'Ключевой Персонал',
      architects: 'Архитекторы',
      active_units: 'АКТИВНЫЕ ЕДИНИЦЫ',
      footer: {
        est: 'Осн. 2024 — По всему миру',
        manifesto: 'Манифест',
        legal: 'Право',
        contact: 'Контакты'
      }
    }
  };

  const t = content[language];

  return (
    <>
      <SEOHead
        title={seo[language].title}
        description={seo[language].description}
        path="/"
      />
      <div className="flex flex-col items-center pt-40 pb-20 px-6 max-w-[1400px] mx-auto w-full">
        <section className="flex flex-col items-center text-center w-full mb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-white/5 rounded-[100%] blur-[120px] pointer-events-none"></div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight text-white mb-8 relative z-10 leading-[0.9]">
            ZAZA <span className="italic font-light text-white/50">{t.tagline_sub}</span>
          </h1>
          <div className="h-px w-24 bg-white/50 mb-8"></div>
          <p className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed font-light mb-12">
            {t.desc_1} <br /> {t.desc_2}
          </p>
          <div className="flex gap-6">
            <button className="group relative px-8 py-3 bg-transparent border border-white/20 hover:border-white text-white rounded-full overflow-hidden transition-colors duration-300">
              <span className="relative z-10 text-sm uppercase tracking-widest font-bold">{t.showreel}</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </section>

        <div className="w-full flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6 mb-12 gap-4">
          <div>
            <span className="inline-block px-2 py-1 border border-white/20 rounded-md text-[10px] uppercase tracking-[0.2em] text-white/70 mb-3 bg-white/5 backdrop-blur-sm">{t.core}</span>
            <h2 className="font-display text-4xl md:text-5xl font-normal text-white">{t.architects}</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/40 font-mono">
            <span>[0{members.length}] {t.active_units}</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
          </div>
        </div>

        <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((dev, i) => (
            <article key={i} className="group relative h-[600px] w-full rounded-[2rem] overflow-hidden bg-glass-bg border border-glass-border glass-card-hover backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"></div>
              <div className="absolute inset-0 z-0">
                {dev.avatarUrl ? (
                  <>
                    <div className="w-full h-full bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0" style={{ backgroundImage: `url('${dev.avatarUrl}')` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-all duration-500"></div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-white/[0.02] to-white/[0.06] flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white/5 border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                      <span className="font-display text-4xl text-white/60 font-medium">{dev.name.charAt(0)}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <div className="absolute top-8 left-8 right-8 flex justify-between items-start opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className="font-mono text-xs text-white/60 tracking-widest border border-white/20 px-2 py-1 rounded">{dev.id}</div>
                  <span className="material-symbols-outlined text-white/80">arrow_outward</span>
                </div>
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="font-display text-3xl font-medium text-white mb-1">{dev.name}</h3>
                  <p className="text-white/50 text-sm uppercase tracking-widest mb-6 font-mono">{language === 'ru' ? dev.roleRu : dev.role}</p>
                  <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 border-t border-white/10 pt-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {dev.stack.map(tech => (
                          <span key={tech} className="px-2 py-0.5 bg-white/10 text-[10px] text-white/90 rounded border border-white/5">{tech}</span>
                        ))}
                      </div>
                      <div className="space-y-1">
                        {dev.projects.map(proj => (
                          <a key={proj.title} href="#" className="block w-full p-2 rounded bg-white/5 hover:bg-white/20 transition-colors flex justify-between items-center group/link">
                            <span className="text-xs text-white/80">{proj.title}</span>
                            <span className="material-symbols-outlined text-[14px] text-white/40 group-hover/link:text-white">chevron_right</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <footer className="w-full mt-32 border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-end gap-6 text-sm text-white/30 font-mono uppercase tracking-wider">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-white">Zaza International</span>
            <span>{t.footer.est}</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">{t.footer.manifesto}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.legal}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.contact}</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;

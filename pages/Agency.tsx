import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { getTeamMembers, getSiteConfig } from '../utils/adminStorage';

const Agency: React.FC = () => {
  const { language } = useLanguage();
  const members = getTeamMembers();
  const siteConfig = getSiteConfig();

  const seo = {
    en: {
      title: 'Agency',
      description: 'Avant-garde digital agency from Dagestan sculpting digital voids into tangible experiences. Minimalist architecture for the web.',
    },
    ru: {
      title: 'Агентство',
      description: 'Авангардное цифровое агентство из Дагестана, превращающее цифровую пустоту в осязаемый опыт. Минималистичная архитектура для веба.',
    },
  };

  const content = {
    en: {
      label: 'Avant-Garde Digital',
      headline: 'DREAMS',
      headline_prefix: 'SILICA',
      description: `We sculpt digital voids into tangible experiences. Minimalist architecture for the web, forged in obsidian and light. ${siteConfig.descDagestan}`,
      btn_start: 'Start Project',
      btn_explore: 'Explore',
      collective: 'The Collective',
      slide: 'Slide to explore talents',
      selected_works: 'Selected Works',
      footer: {
        slogan: 'Engineered in the void.',
        privacy: 'Privacy',
        terms: 'Terms'
      }
    },
    ru: {
      label: 'Авангардный Диджитал',
      headline: 'СНЫ',
      headline_prefix: 'КРЕМНИЕВЫЕ',
      description: `Мы превращаем цифровую пустоту в осязаемый опыт. Минималистичная архитектура для веба, выкованная из обсидиана и света. ${siteConfig.descDagestanRu}`,
      btn_start: 'Начать проект',
      btn_explore: 'Обзор',
      collective: 'Коллектив',
      slide: 'Листайте для просмотра',
      selected_works: 'Избранные работы',
      footer: {
        slogan: 'Спроектировано в пустоте.',
        privacy: 'Конфиденциальность',
        terms: 'Условия'
      }
    }
  };

  const t = content[language];

  return (
    <>
      <SEOHead
        title={seo[language].title}
        description={seo[language].description}
        path="/agency"
      />
      <div className="flex flex-col pt-24 min-h-screen">
        <section className="relative flex min-h-[90vh] w-full items-center justify-center px-6 py-20 overflow-hidden">
          <div className="mx-auto flex max-w-6xl flex-col items-center text-center gap-10 z-10">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-gray-300 uppercase">{t.label}</span>
            </div>
            <h1 className="font-display max-w-5xl text-6xl font-light leading-tight tracking-tighter text-white md:text-8xl lg:text-9xl mix-blend-overlay opacity-90">
              {t.headline_prefix} <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-white via-silver to-gray-500">{t.headline}</span>
            </h1>
            <p className="max-w-xl text-base font-light leading-relaxed text-gray-400 md:text-lg tracking-wide">
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
              <button className="group relative flex h-14 min-w-[200px] items-center justify-center rounded-sm bg-white px-8 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-gray-200">
                {t.btn_start}
              </button>
              <button className="group flex h-14 min-w-[200px] items-center justify-center gap-2 rounded-sm border border-white/20 px-8 text-sm font-medium uppercase tracking-widest text-white transition-all hover:border-white/50 hover:bg-white/5">
                <span>{t.btn_explore}</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
        </section>

        <section className="py-20 overflow-hidden" id="collective">
          <div className="px-6 mb-12 flex items-end justify-between max-w-7xl mx-auto">
            <div>
              <h2 className="text-3xl font-light tracking-tight text-white md:text-5xl font-display">{t.collective}</h2>
              <p className="mt-4 text-sm tracking-wide text-gray-500 uppercase">{t.slide}</p>
            </div>
            <div className="hidden md:flex gap-4">
              <button className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                <span className="material-symbols-outlined text-lg">arrow_back</span>
              </button>
              <button className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-8 px-6 pb-20 w-full">
            <div className="w-2 shrink-0 md:w-[calc((100vw-1280px)/2)]"></div>
            {members.map((member, i) => (
              <div key={i} className="snap-center shrink-0 w-[85vw] sm:w-[400px]">
                <div className="bg-gradient-to-br from-[#14141999] to-[#0a0a0f66] backdrop-blur-3xl border border-white/5 hover:border-white/20 h-full rounded-sm p-8 flex flex-col gap-8 group transition-all duration-500 hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div className="relative h-20 w-20 overflow-hidden rounded-sm grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500">
                      {member.avatarUrl ? (
                        <img src={member.avatarUrl} alt={member.name} className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        <div className="h-full w-full bg-white/5 flex items-center justify-center">
                          <span className="font-display text-2xl text-white/60 font-medium">{member.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors">arrow_outward</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-medium text-white">{member.name}</h3>
                    <p className="text-xs font-light tracking-widest text-gray-400 uppercase mt-1">{language === 'ru' ? member.roleRu : member.role}</p>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
                  <div className="flex flex-col gap-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t.selected_works}</p>
                    {member.projects.map((work, j) => (
                      <div key={j} className="flex items-center justify-between group/item cursor-pointer">
                        <span className="text-sm text-gray-300 font-light group-hover/item:text-white transition-colors">{work.title}</span>
                        <span className="text-[10px] border border-white/10 px-2 py-0.5 rounded text-gray-500">{work.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="w-2 shrink-0 md:w-[calc((100vw-1280px)/2)]"></div>
          </div>
        </section>

        <footer className="relative z-10 w-full border-t border-white/5 bg-black py-12 mt-auto">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-display font-bold uppercase tracking-widest text-white">Zaza Intl.</h3>
              <p className="text-xs text-gray-600 font-light">{t.footer.slogan}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:justify-end">
              <a className="text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-white transition-colors" href="#">{t.footer.privacy}</a>
              <a className="text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-white transition-colors" href="#">{t.footer.terms}</a>
              <a className="text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-white transition-colors" href="#">X / Twitter</a>
              <a className="text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-white transition-colors" href="#">LinkedIn</a>
            </div>
          </div>
          <div className="mt-8 text-center border-t border-white/5 pt-8 mx-auto max-w-7xl px-6">
            <p className="text-[10px] text-gray-700 uppercase tracking-widest">© 2024 Zaza International.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Agency;

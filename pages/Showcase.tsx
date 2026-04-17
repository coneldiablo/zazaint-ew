import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';

const Showcase: React.FC = () => {
  const { language } = useLanguage();

  const seo = {
    en: {
      title: 'Showcase',
      description: 'A gallery of digital artifacts. Precision-engineered projects for the modern web — FinTech, 3D portfolios, neural interfaces.',
    },
    ru: {
      title: 'Проекты',
      description: 'Галерея цифровых артефактов. Точно спроектированные проекты для современного веба — FinTech, 3D портфолио, нейроинтерфейсы.',
    },
  };

  const content = {
    en: {
      headline: 'SELECTED',
      headline_suffix: 'WORKS',
      description_1: 'A gallery of digital artifacts.',
      description_2: 'Precision engineered for the modern web.',
      portfolio: 'Portfolio',
      case_studies: 'Case Studies',
      deployed: 'DEPLOYED SYSTEMS',
      projects: {
        apex: {
          desc: 'Institutional Trading Platform'
        },
        lumina: {
          title: 'Lumina Architecture',
          desc: 'Immersive 3D portfolio for an award-winning architectural firm featuring real-time rendering.'
        },
        neural: {
          title: 'Neural Interface',
          tag: 'Experimental',
          desc: 'A speculative design project exploring brain-computer interfaces through web-based visualizations.'
        }
      },
      footer: {
        est: 'Est. 2024 — Worldwide',
        manifesto: 'Manifesto',
        legal: 'Legal',
        contact: 'Contact'
      }
    },
    ru: {
      headline: 'ИЗБРАННЫЕ',
      headline_suffix: 'РАБОТЫ',
      description_1: 'Галерея цифровых артефактов.',
      description_2: 'Точно спроектировано для современного веба.',
      portfolio: 'Портфолио',
      case_studies: 'Кейсы',
      deployed: 'РАЗВЕРНУТЫЕ СИСТЕМЫ',
      projects: {
        apex: {
          desc: 'Платформа институционального трейдинга'
        },
        lumina: {
          title: 'Архитектура Lumina',
          desc: 'Иммерсивное 3D портфолио для архитектурного бюро с рендерингом в реальном времени.'
        },
        neural: {
          title: 'Нейроинтерфейс',
          tag: 'Экспериментально',
          desc: 'Спекулятивный дизайн-проект, исследующий интерфейсы мозг-компьютер через веб-визуализацию.'
        }
      },
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
        path="/showcase"
      />
      <div className="flex flex-col items-center pt-32 pb-20 px-6 max-w-[1600px] mx-auto w-full">
        <section className="flex flex-col items-center text-center w-full mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-white/5 rounded-[100%] blur-[120px] pointer-events-none"></div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight text-white mb-6 mix-blend-screen relative z-10 text-glow leading-[0.9]">
            {t.headline} <span className="italic font-light text-white/50">{t.headline_suffix}</span>
          </h1>
          <div className="h-px w-24 bg-white/50 mb-8"></div>
          <p className="text-lg md:text-xl text-white/60 max-w-lg leading-relaxed font-light mb-8 backdrop-blur-sm">
            {t.description_1} <br /> {t.description_2}
          </p>
        </section>

        <div className="w-full flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6 mb-12 gap-4">
          <div>
            <span className="inline-block px-2 py-1 border border-white/20 rounded-md text-[10px] uppercase tracking-[0.2em] text-white/70 mb-3 bg-white/5 backdrop-blur-sm">{t.portfolio}</span>
            <h2 className="font-display text-4xl md:text-5xl font-normal text-white">{t.case_studies}</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/40 font-mono">
            <span>[03] {t.deployed}</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
          </div>
        </div>

        <section className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(500px,auto)]">

          {/* Case 1: Apex Finance */}
          <article className="md:col-span-8 group relative min-h-[500px] w-full rounded-[2rem] overflow-hidden bg-glass-bg border border-glass-border glass-card-hover backdrop-blur-md cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 mix-blend-overlay"></div>
            <div className="absolute inset-0 z-0">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:grayscale-0 grayscale-[0.8]" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBiw1pPpPbvfEturqTTaMBObzntrjTNSDXWfGdHrymsxN371f1Gtc7PUiM7za1_2lVoTSa-KFAKT9Sr-vXJVGZya-dTdJrHJfm0tETPh4nK9kOkW7TCbmPy1VWJ7RCx0yTBGGLViUCzyAjRZ6RptCq7GaM3Hw7a1SpDN0RhHbqUUvlwMugezeJTz6aTEmJEf_ADiKLTJvH-y8wJYXWZfBklehStEfEl7fV-20Sa586XcSGMvO12m_w6FdPugtZrpVE0DCmoU5a3xVDB')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
            </div>
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-30">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-white/80 tracking-widest border border-white/20 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">2023</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                  <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                </div>
              </div>
              <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
                <h3 className="font-display text-4xl md:text-5xl font-medium text-white mb-2 tracking-tight">Apex Finance</h3>
                <p className="text-white/60 text-sm uppercase tracking-widest mb-6 font-mono">{t.projects.apex.desc}</p>
                <div className="max-h-0 group-hover:max-h-24 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] delay-[50ms]">
                  <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 text-[11px] text-white rounded-full border border-white/10 backdrop-blur-sm">React</span>
                    <span className="px-3 py-1 bg-white/10 text-[11px] text-white rounded-full border border-white/10 backdrop-blur-sm">WebSockets</span>
                    <span className="px-3 py-1 bg-white/10 text-[11px] text-white rounded-full border border-white/10 backdrop-blur-sm">D3.js</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Case 2: Lumina */}
          <article className="md:col-span-4 group relative min-h-[500px] w-full rounded-[2rem] overflow-hidden bg-glass-bg border border-glass-border glass-card-hover backdrop-blur-md cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-60 z-10"></div>
            <div className="absolute inset-0 z-0">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:grayscale-0 grayscale-[0.8]" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD61yvZZrgQM8bOcvDs4QJFS01bXRXjdvWgK9W89O4ghjG-hwIBZ_kRsfzlZipwRtoatW6gl3P7IzZt1hyRz9m5Kiw38nZEIFHo8wYp9VfoxHUlfkDkHzIiG__k4XkFyL8ucSuA0LpwQHpHtAlnblaR-rsInZae77Z7_xti3XRZ-9oQbXr4n8mJ9TUGYgst8gOVoRBVvmD53bU1E8bkAUfiajA64V3lsfetGnv6soxeek8w-C0YpE63DkIiNQnq9Ig4IfDjFF5XM1V7')" }}></div>
            </div>
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-30">
              <div className="flex justify-end">
                <span className="font-mono text-xs text-white/80 tracking-widest border border-white/20 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] delay-100">2024</span>
              </div>
              <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
                <h3 className="font-display text-3xl md:text-4xl font-medium text-white mb-2 leading-tight" dangerouslySetInnerHTML={{ __html: t.projects.lumina.title.replace(' ', ' <br />') }}></h3>
                <div className="max-h-0 group-hover:max-h-40 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] delay-[50ms]">
                  <div className="pt-4 border-t border-white/10 flex flex-col gap-3 mt-4">
                    <p className="text-white/70 text-sm leading-relaxed">{t.projects.lumina.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/10 text-[11px] text-white rounded-full border border-white/10">WebGL</span>
                      <span className="px-3 py-1 bg-white/10 text-[11px] text-white rounded-full border border-white/10">Three.js</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Case 3: Neural Interface */}
          <article className="md:col-span-12 group relative h-[500px] w-full rounded-[2rem] overflow-hidden bg-glass-bg border border-glass-border glass-card-hover backdrop-blur-md cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10"></div>
            <div className="absolute inset-0 z-0">
              <div className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:grayscale-0 grayscale-[0.8]" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7kIOHyrIppCjGk6vLEIelgNgsrp0HBiqmHTgigCGdGe15T8OVMQwXOQGQSn7yppOFZ1qmhvJSiqO5G-EEDV09ThQ1Y4Y_1EHVNnnb27FVR1KR4fIVoxreJYDFOWCf-pHLdFI85ZOgaXZcRd8MVzUOA4sgR9mfkJrWxr7eb2x7HsLcV0-85dP_xALX81gduqvmuu8ZLDs4q4vKaQI-1TQ3NmP-iWI9BU_M1zh3qCnEc2geQO9DQhdHHXoyTSSnzduK9DDZkjFChkv3')", backgroundPosition: "50% 30%" }}></div>
            </div>
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col md:flex-row items-end md:items-center justify-between z-30">
              <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex items-center gap-4 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] transform -translate-x-4 group-hover:translate-x-0">
                  <span className="h-px w-8 bg-white/60"></span>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">{t.projects.neural.tag}</span>
                </div>
                <h3 className="font-display text-5xl md:text-7xl font-medium text-white tracking-tighter group-hover:text-glow transition-all duration-300" dangerouslySetInnerHTML={{ __html: t.projects.neural.title.replace(' ', ' <br />') }}></h3>
                <p className="text-white/50 text-lg font-light max-w-md hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] delay-100">
                  {t.projects.neural.desc}
                </p>
              </div>
              <div className="flex flex-col items-end gap-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
                <div className="flex flex-wrap justify-end gap-2 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                  <span className="px-4 py-2 bg-white/5 text-xs text-white rounded border border-white/10">TensorFlow.js</span>
                  <span className="px-4 py-2 bg-white/5 text-xs text-white rounded border border-white/10">Canvas API</span>
                  <span className="px-4 py-2 bg-white/5 text-xs text-white rounded border border-white/10">Rust</span>
                </div>
                <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-xl group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:border-white">
                  <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </article>
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

export default Showcase;
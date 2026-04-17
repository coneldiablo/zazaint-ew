import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { getTeamMembers } from '../utils/adminStorage';

const Philosophy: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const { language } = useLanguage();
  const members = getTeamMembers();

  const sectionIds = members.map(m => `member-${m.id}`).concat(['zaza-collective']);

  const seo = {
    en: {
      title: 'Philosophy',
      description: 'Our philosophy on digital craftsmanship — architecture, simplicity, performance, and the manifesto of Zaza International.',
    },
    ru: {
      title: 'Философия',
      description: 'Наша философия цифрового мастерства — архитектура, простота, производительность и манифест Zaza International.',
    },
  };

  const content = {
    en: {
      stream: 'Stream of Consciousness',
      voices: 'Voices',
      nav: {
        arch: 'Architecture',
        simp: 'Simplicity',
        perf: 'Performance',
        mani: 'Manifesto'
      },
      quotes: {
        q1: {
          text: "We don't just write code. We forge ",
          highlight: "digital artifacts",
          text_end: " that breathe in the silence between server requests.",
          role: members[0]?.role || "Full Stack Architect"
        },
        q2: {
          text: "Simplicity is the ultimate ",
          highlight: "sophistication",
          text_end: ". The interface should dissolve, leaving only intent and reaction.",
          role: members[1]?.role || "Creative Developer"
        },
        q3: {
          text: "Performance is respect. Every millisecond of latency is a stolen moment from the user's life. We refuse to steal.",
          role: members[2]?.role || "Systems Engineer"
        },
        q4: {
          text: "The future isn't created; it is ",
          highlight: "compiled",
          text_end: ". Our syntax defines the boundaries of tomorrow's reality.",
          role: "Manifesto v1.0"
        }
      },
      footer: {
        slogan: 'Forging the intangible',
        manifesto: 'Manifesto',
        legal: 'Legal',
        contact: 'Contact'
      }
    },
    ru: {
      stream: 'Поток Сознания',
      voices: 'Голоса',
      nav: {
        arch: 'Архитектура',
        simp: 'Простота',
        perf: 'Производительность',
        mani: 'Манифест'
      },
      quotes: {
        q1: {
          text: "Мы не просто пишем код. Мы создаем ",
          highlight: "цифровые артефакты",
          text_end: ", дышащие в тишине между запросами сервера.",
          role: members[0]?.roleRu || "Фулстек Архитектор"
        },
        q2: {
          text: "Простота — это высшая ",
          highlight: "изысканность",
          text_end: ". Интерфейс должен раствориться, оставив только намерение и реакцию.",
          role: members[1]?.roleRu || "Креативный Разработчик"
        },
        q3: {
          text: "Производительность — это уважение. Каждая миллисекунда задержки — это украденное мгновение жизни пользователя. Мы отказываемся красть.",
          role: members[2]?.roleRu || "Системный Инженер"
        },
        q4: {
          text: "Будущее не создается, оно ",
          highlight: "компилируется",
          text_end: ". Наш синтаксис определяет границы завтрашней реальности.",
          role: "Манифест v1.0"
        }
      },
      footer: {
        slogan: 'Ковка нематериального',
        manifesto: 'Манифест',
        legal: 'Право',
        contact: 'Контакты'
      }
    }
  };

  const t = content[language];

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sectionIds) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds.join(',')]);

  const navItems = members.map((m, i) => ({
    id: `member-${m.id}`,
    label: [t.nav.arch, t.nav.simp, t.nav.perf][i] || m.name
  })).concat([{ id: 'zaza-collective', label: t.nav.mani }]);

  const quoteNames = members.map(m => m.name);

  return (
    <>
      <SEOHead
        title={seo[language].title}
        description={seo[language].description}
        path="/philosophy"
      />
      <div className="flex flex-col items-center pt-32 pb-40 px-6 max-w-[1400px] mx-auto w-full">
        <section className="flex flex-col items-center text-center w-full mb-16 relative animate-[float_1s_ease-out_forwards]">
          <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">{t.stream}</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20 italic font-light tracking-tight leading-[0.9]">
            The <span className="font-display not-italic font-medium text-white">{t.voices}</span>
          </h1>
        </section>

        <nav className="sticky top-28 z-40 mb-20">
          <div className="flex items-center gap-6 md:gap-10 px-6 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/20">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className={`text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] transition-all duration-300 ${activeSection === item.id
                  ? 'text-white font-bold scale-105 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                  : 'text-white/40 hover:text-white'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="w-full max-w-4xl flex flex-col gap-24 md:gap-40">

          <article id={`member-${members[0]?.id || 'DEV_01'}`} className="group relative w-full opacity-90 hover:opacity-100 transition-opacity duration-700 scroll-mt-32">
            <div className="absolute -inset-4 bg-white/5 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="bg-[#ffffff04] backdrop-blur-2xl border-t border-white/10 border-b border-white/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] rounded-[32px] md:rounded-[48px] p-8 md:p-16 relative overflow-hidden transition-transform duration-700 group-hover:scale-[1.01]">
              <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 opacity-50 pointer-events-none"></div>
              <div className="relative z-10">
                <span className="text-6xl md:text-8xl text-white/10 font-serif absolute -top-8 -left-4 md:-top-12 md:-left-8 select-none">"</span>
                <blockquote className="mb-10 pt-4">
                  <p className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-white/95 font-light">
                    {t.quotes.q1.text} <span className="italic text-white/60">{t.quotes.q1.highlight}</span>{t.quotes.q1.text_end}
                  </p>
                </blockquote>
                <div className="flex items-center gap-5 border-t border-white/10 pt-8 mt-4">
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/20 bg-white/5 flex items-center justify-center">
                    {members[0]?.avatarUrl ? (
                      <img alt={quoteNames[0]} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" loading="lazy" src={members[0].avatarUrl} />
                    ) : (
                      <span className="font-display text-lg text-white/60 font-medium">{quoteNames[0]?.charAt(0) || 'M'}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <cite className="not-italic font-display text-lg font-medium text-white tracking-wide">{quoteNames[0] || 'Мага'}</cite>
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{t.quotes.q1.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article id={`member-${members[1]?.id || 'DEV_02'}`} className="group relative w-full translate-x-0 md:translate-x-12 opacity-90 hover:opacity-100 transition-opacity duration-700 scroll-mt-32">
            <div className="absolute -inset-4 bg-white/5 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="bg-[#ffffff04] backdrop-blur-2xl border-t border-white/10 border-b border-white/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] rounded-[32px] md:rounded-[48px] p-8 md:p-16 relative overflow-hidden transition-transform duration-700 group-hover:scale-[1.01]">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/5 to-transparent opacity-30 pointer-events-none"></div>
              <div className="relative z-10">
                <span className="text-6xl md:text-8xl text-white/10 font-serif absolute -top-8 -left-4 md:-top-12 md:-left-8 select-none">"</span>
                <blockquote className="mb-10 pt-4">
                  <p className="font-display text-2xl md:text-4xl lg:text-5xl leading-snug text-white/95 font-light tracking-tight">
                    {t.quotes.q2.text} <span className="font-serif italic text-white/70 text-4xl md:text-6xl">{t.quotes.q2.highlight}</span>{t.quotes.q2.text_end}
                  </p>
                </blockquote>
                <div className="flex items-center gap-5 border-t border-white/10 pt-8 mt-4">
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/20 bg-white/5 flex items-center justify-center">
                    {members[1]?.avatarUrl ? (
                      <img alt={quoteNames[1]} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" loading="lazy" src={members[1].avatarUrl} />
                    ) : (
                      <span className="font-display text-lg text-white/60 font-medium">{quoteNames[1]?.charAt(0) || 'M'}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <cite className="not-italic font-display text-lg font-medium text-white tracking-wide">{quoteNames[1] || 'Мирза'}</cite>
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{t.quotes.q2.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article id={`member-${members[2]?.id || 'DEV_03'}`} className="group relative w-full opacity-90 hover:opacity-100 transition-opacity duration-700 scroll-mt-32">
            <div className="absolute -inset-4 bg-white/5 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="bg-[#ffffff04] backdrop-blur-2xl border-t border-white/10 border-b border-white/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] rounded-[32px] md:rounded-[48px] p-8 md:p-16 relative overflow-hidden transition-transform duration-700 group-hover:scale-[1.01]">
              <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/5 to-transparent opacity-40 pointer-events-none"></div>
              <div className="relative z-10">
                <span className="text-6xl md:text-8xl text-white/10 font-serif absolute -top-8 -left-4 md:-top-12 md:-left-8 select-none">"</span>
                <blockquote className="mb-10 pt-4">
                  <p className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-white/95 font-light italic">
                    {t.quotes.q3.text}
                  </p>
                </blockquote>
                <div className="flex items-center gap-5 border-t border-white/10 pt-8 mt-4">
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/20 bg-white/5 flex items-center justify-center">
                    {members[2]?.avatarUrl ? (
                      <img alt={quoteNames[2]} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" loading="lazy" src={members[2].avatarUrl} />
                    ) : (
                      <span className="font-display text-lg text-white/60 font-medium">{quoteNames[2]?.charAt(0) || 'М'}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <cite className="not-italic font-display text-lg font-medium text-white tracking-wide">{quoteNames[2] || 'Магомедъ'}</cite>
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{t.quotes.q3.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article id="zaza-collective" className="group relative w-full translate-x-0 md:translate-x-12 opacity-90 hover:opacity-100 transition-opacity duration-700 scroll-mt-32">
            <div className="absolute -inset-4 bg-white/5 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="bg-[#ffffff04] backdrop-blur-2xl border-t border-white/10 border-b border-white/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] rounded-[32px] md:rounded-[48px] p-8 md:p-16 relative overflow-hidden transition-transform duration-700 group-hover:scale-[1.01]">
              <div className="relative z-10">
                <span className="text-6xl md:text-8xl text-white/10 font-serif absolute -top-8 -left-4 md:-top-12 md:-left-8 select-none">"</span>
                <blockquote className="mb-10 pt-4">
                  <p className="font-display text-2xl md:text-4xl lg:text-5xl leading-relaxed text-white/95 font-light">
                    {t.quotes.q4.text} <span className="bg-white/10 px-2 py-0.5 rounded italic font-serif">{t.quotes.q4.highlight}</span>{t.quotes.q4.text_end}
                  </p>
                </blockquote>
                <div className="flex items-center gap-5 border-t border-white/10 pt-8 mt-4">
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/20">
                    <span className="font-display text-xs font-bold text-white">ZAZA</span>
                  </div>
                  <div className="flex flex-col">
                    <cite className="not-italic font-display text-lg font-medium text-white tracking-wide">Zaza Collective</cite>
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{t.quotes.q4.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <footer className="w-full mt-40 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-end gap-8 text-xs text-white/30 font-mono uppercase tracking-wider">
          <div className="flex flex-col gap-2">
            <a href="#" className="flex items-center gap-2 group cursor-pointer">
              <span className="font-bold text-white/50 group-hover:text-white transition-colors">Zaza International</span>
              <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
            </a>
            <span>{t.footer.slogan}</span>
          </div>
          <div className="flex items-center gap-10">
            <a href="#" className="hover:text-white transition-colors">{t.footer.manifesto}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.legal}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.contact}</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Philosophy;

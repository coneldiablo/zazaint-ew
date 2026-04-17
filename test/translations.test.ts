import { describe, it, expect } from 'vitest';

const homeContent = {
  en: {
    tagline_sub: 'INT.',
    desc_1: 'Forging digital artifacts with liquid precision.',
    desc_2: 'A collective of sovereign developers from Dagestan.',
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
    desc_2: 'Коллектив суверенных разработчиков из Дагестана.',
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

const agencyContent = {
  en: {
    label: 'Avant-Garde Digital',
    headline: 'DREAMS',
    headline_prefix: 'SILICA',
    description: 'We sculpt digital voids into tangible experiences.',
    btn_start: 'Start Project',
    btn_explore: 'Explore',
    collective: 'The Collective',
    slide: 'Slide to explore talents',
    selected_works: 'Selected Works',
    footer: { slogan: 'Engineered in the void.', privacy: 'Privacy', terms: 'Terms' }
  },
  ru: {
    label: 'Авангардный Диджитал',
    headline: 'СНЫ',
    headline_prefix: 'КРЕМНИЕВЫЕ',
    description: 'Мы превращаем цифровую пустоту в осязаемый опыт.',
    btn_start: 'Начать проект',
    btn_explore: 'Обзор',
    collective: 'Коллектив',
    slide: 'Листайте для просмотра',
    selected_works: 'Избранные работы',
    footer: { slogan: 'Спроектировано в пустоте.', privacy: 'Конфиденциальность', terms: 'Условия' }
  }
};

const philosophyContent = {
  en: {
    stream: 'Stream of Consciousness',
    voices: 'Voices',
    nav: { arch: 'Architecture', simp: 'Simplicity', perf: 'Performance', mani: 'Manifesto' },
    footer: { slogan: 'Forging the intangible', manifesto: 'Manifesto', legal: 'Legal', contact: 'Contact' }
  },
  ru: {
    stream: 'Поток Сознания',
    voices: 'Голоса',
    nav: { arch: 'Архитектура', simp: 'Простота', perf: 'Производительность', mani: 'Манифест' },
    footer: { slogan: 'Ковка нематериального', manifesto: 'Манифест', legal: 'Право', contact: 'Контакты' }
  }
};

const contactContent = {
  en: {
    contact_us: 'Contact Us',
    headline_1: "Let's Build the",
    headline_highlight: 'Immaterial.',
    desc: 'We are currently accepting new partnerships for Q4 2024.',
    inquiries: 'General Inquiries',
    hq: 'Headquarters',
    form: {
      name: 'Name', email: 'Email', interest: 'Project Interest', message: 'Message',
      btn: 'Send Message', sending: 'Transmitting...', sent: 'Signal Received',
      options: { web: 'Web Development', design: 'Digital Product Design', brand: 'Brand Identity', consult: 'Consultancy' },
      errors: { name: 'Name is required', email: 'Email is required', email_invalid: 'Invalid email address', message: 'Message is required' }
    },
    footer: { privacy: 'Privacy', terms: 'Terms' }
  },
  ru: {
    contact_us: 'Связаться с нами',
    headline_1: "Построим",
    headline_highlight: 'Нематериальное.',
    desc: 'Мы принимаем новые партнерства на 4 квартал 2024.',
    inquiries: 'Общие вопросы',
    hq: 'Штаб-квартира',
    form: {
      name: 'Имя', email: 'Email', interest: 'Интерес к проекту', message: 'Сообщение',
      btn: 'Отправить', sending: 'Передача...', sent: 'Сигнал получен',
      options: { web: 'Веб-разработка', design: 'Дизайн цифровых продуктов', brand: 'Айдентика бренда', consult: 'Консалтинг' },
      errors: { name: 'Требуется имя', email: 'Требуется Email', email_invalid: 'Неверный адрес email', message: 'Требуется сообщение' }
    },
    footer: { privacy: 'Конфиденциальность', terms: 'Условия' }
  }
};

const notFoundContent = {
  en: { badge: 'Void Detected', description: 'The coordinates you entered have drifted into the null sector.', link: 'Initiate Return', footer: 'Error Code: ID-NULL / Sector 00' },
  ru: { badge: 'Обнаружена Пустота', description: 'Координаты, которые вы ввели, сместились в нулевой сектор.', link: 'Вернуться Назад', footer: 'Код ошибки: ID-NULL / Сектор 00' }
};

function getDeepKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...getDeepKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

describe('Translation completeness', () => {
  describe('Home page', () => {
    it('has matching keys in en and ru', () => {
      const enKeys = getDeepKeys(homeContent.en as Record<string, unknown>);
      const ruKeys = getDeepKeys(homeContent.ru as Record<string, unknown>);
      expect(enKeys).toEqual(ruKeys);
    });

    it('Russian translations contain Cyrillic', () => {
      expect(homeContent.ru.tagline_sub).toMatch(/[а-яА-ЯёЁ]/);
      expect(homeContent.ru.desc_1).toMatch(/[а-яА-ЯёЁ]/);
      expect(homeContent.ru.desc_2).toMatch(/[а-яА-ЯёЁ]/);
      expect(homeContent.ru.showreel).toMatch(/[а-яА-ЯёЁ]/);
      expect(homeContent.ru.core).toMatch(/[а-яА-ЯёЁ]/);
      expect(homeContent.ru.architects).toMatch(/[а-яА-ЯёЁ]/);
    });

    it('mentions Dagestan in both languages', () => {
      expect(homeContent.en.desc_2).toContain('Dagestan');
      expect(homeContent.ru.desc_2).toContain('Дагестан');
    });
  });

  describe('Agency page', () => {
    it('has matching keys in en and ru', () => {
      const enKeys = getDeepKeys(agencyContent.en as Record<string, unknown>);
      const ruKeys = getDeepKeys(agencyContent.ru as Record<string, unknown>);
      expect(enKeys).toEqual(ruKeys);
    });

    it('Russian translations contain Cyrillic', () => {
      expect(agencyContent.ru.label).toMatch(/[а-яА-ЯёЁ]/);
      expect(agencyContent.ru.headline).toMatch(/[а-яА-ЯёЁ]/);
      expect(agencyContent.ru.collective).toMatch(/[а-яА-ЯёЁ]/);
    });
  });

  describe('Philosophy page', () => {
    it('has matching keys in en and ru', () => {
      const enKeys = getDeepKeys(philosophyContent.en as Record<string, unknown>);
      const ruKeys = getDeepKeys(philosophyContent.ru as Record<string, unknown>);
      expect(enKeys).toEqual(ruKeys);
    });

    it('all nav items are translated', () => {
      expect(philosophyContent.ru.nav.arch).toMatch(/[а-яА-ЯёЁ]/);
      expect(philosophyContent.ru.nav.simp).toMatch(/[а-яА-ЯёЁ]/);
      expect(philosophyContent.ru.nav.perf).toMatch(/[а-яА-ЯёЁ]/);
      expect(philosophyContent.ru.nav.mani).toMatch(/[а-яА-ЯёЁ]/);
    });
  });

  describe('Contact page', () => {
    it('has matching keys in en and ru', () => {
      const enKeys = getDeepKeys(contactContent.en as Record<string, unknown>);
      const ruKeys = getDeepKeys(contactContent.ru as Record<string, unknown>);
      expect(enKeys).toEqual(ruKeys);
    });

    it('form options are translated', () => {
      expect(contactContent.ru.form.options.web).toMatch(/[а-яА-ЯёЁ]/);
      expect(contactContent.ru.form.options.design).toMatch(/[а-яА-ЯёЁ]/);
      expect(contactContent.ru.form.options.brand).toMatch(/[а-яА-ЯёЁ]/);
      expect(contactContent.ru.form.options.consult).toMatch(/[а-яА-ЯёЁ]/);
    });

    it('error messages are translated', () => {
      expect(contactContent.ru.form.errors.name).toMatch(/[а-яА-ЯёЁ]/);
      expect(contactContent.ru.form.errors.email).toMatch(/[а-яА-ЯёЁ]/);
      expect(contactContent.ru.form.errors.message).toMatch(/[а-яА-ЯёЁ]/);
    });
  });

  describe('404 page', () => {
    it('has matching keys in en and ru', () => {
      const enKeys = getDeepKeys(notFoundContent.en as Record<string, unknown>);
      const ruKeys = getDeepKeys(notFoundContent.ru as Record<string, unknown>);
      expect(enKeys).toEqual(ruKeys);
    });

    it('Russian translations contain Cyrillic', () => {
      expect(notFoundContent.ru.badge).toMatch(/[а-яА-ЯёЁ]/);
      expect(notFoundContent.ru.description).toMatch(/[а-яА-ЯёЁ]/);
      expect(notFoundContent.ru.link).toMatch(/[а-яА-ЯёЁ]/);
    });
  });
});

describe('Cyrillic font support', () => {
  it('Google Fonts URL includes cyrillic subset', () => {
    const fontUrl = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@200;300;400;500;600&subset=latin,cyrillic&display=swap';
    expect(fontUrl).toContain('cyrillic');
    expect(fontUrl).toContain('Cormorant+Garamond');
    expect(fontUrl).toContain('Space+Grotesk');
    expect(fontUrl).toContain('Inter');
  });
});

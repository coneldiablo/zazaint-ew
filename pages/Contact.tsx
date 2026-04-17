import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import { getSiteConfig } from '../utils/adminStorage';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const siteConfig = getSiteConfig();

  const seo = {
    en: {
      title: 'Contact',
      description: 'Get in touch with Zaza International. We are accepting new partnerships — web development, digital product design, brand identity, and consultancy.',
    },
    ru: {
      title: 'Контакты',
      description: 'Свяжитесь с Zaza International. Мы принимаем новые партнёрства — веб-разработка, дизайн цифровых продуктов, айдентика бренда и консалтинг.',
    },
  };

  const content = {
    en: {
      contact_us: 'Contact Us',
      headline_1: "Let's Build the",
      headline_highlight: 'Immaterial.',
      desc: 'We are currently accepting new partnerships for Q4 2024. Reach out to discuss your digital architecture.',
      inquiries: 'General Inquiries',
      hq: 'Headquarters',
      form: {
        name: 'Name',
        email: 'Email',
        interest: 'Project Interest',
        message: 'Message',
        placeholder_name: 'John Doe',
        placeholder_email: 'john@company.com',
        placeholder_msg: 'Tell us about your vision...',
        options: {
          web: 'Web Development',
          design: 'Digital Product Design',
          brand: 'Brand Identity',
          consult: 'Consultancy'
        },
        protected: 'Protected by reCAPTCHA & Obsidian Security.',
        btn: 'Send Message',
        sending: 'Transmitting...',
        sent: 'Signal Received',
        errors: {
          name: 'Name is required',
          email: 'Email is required',
          email_invalid: 'Invalid email address',
          message: 'Message is required'
        }
      },
      footer: {
        privacy: 'Privacy',
        terms: 'Terms'
      }
    },
    ru: {
      contact_us: 'Связаться с нами',
      headline_1: "Построим",
      headline_highlight: 'Нематериальное.',
      desc: 'Мы принимаем новые партнерства на 4 квартал 2024. Свяжитесь с нами для обсуждения вашей цифровой архитектуры.',
      inquiries: 'Общие вопросы',
      hq: 'Штаб-квартира',
      form: {
        name: 'Имя',
        email: 'Email',
        interest: 'Интерес к проекту',
        message: 'Сообщение',
        placeholder_name: 'Иван Петров',
        placeholder_email: 'ivan@company.com',
        placeholder_msg: 'Расскажите нам о вашем видении...',
        options: {
          web: 'Веб-разработка',
          design: 'Дизайн цифровых продуктов',
          brand: 'Айдентика бренда',
          consult: 'Консалтинг'
        },
        protected: 'Защищено reCAPTCHA & Obsidian Security.',
        btn: 'Отправить',
        sending: 'Передача...',
        sent: 'Сигнал получен',
        errors: {
          name: 'Требуется имя',
          email: 'Требуется Email',
          email_invalid: 'Неверный адрес email',
          message: 'Требуется сообщение'
        }
      },
      footer: {
        privacy: 'Конфиденциальность',
        terms: 'Условия'
      }
    }
  };

  const t = content[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'Web Development',
    message: ''
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const validate = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = t.form.errors.name;
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.form.errors.email;
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.form.errors.email_invalid;
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.form.errors.message;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    // Clear error for specific field when user types
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        interest: 'Web Development',
        message: ''
      });

      // Reset success status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <>
      <SEOHead
        title={seo[language].title}
        description={seo[language].description}
        path="/contact"
      />
      <div className="flex-grow flex flex-col pt-24 relative z-10 justify-center min-h-screen">
        <section className="w-full flex items-center justify-center px-6 py-12 md:py-20">
          <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 flex flex-col justify-center space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 w-fit backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                  </span>
                  <span className="text-[10px] font-medium tracking-[0.2em] text-gray-300 uppercase">{t.contact_us}</span>
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-light leading-tight tracking-tight text-white silver-text-glow">
                  {t.headline_1} <br />
                  <span className="italic font-normal bg-clip-text text-transparent bg-gradient-to-r from-white via-silver to-gray-500">{t.headline_highlight}</span>
                </h1>
                <p className="text-base font-light leading-relaxed text-gray-400 max-w-md tracking-wide">
                  {t.desc}
                </p>
              </div>
              <div className="space-y-8 border-l border-white/10 pl-8 ml-2">
                <div className="group cursor-pointer">
                  <h4 className="text-xs text-silver-dim uppercase tracking-widest mb-1">{t.inquiries}</h4>
                  <p className="text-xl font-display text-white group-hover:text-silver transition-colors">hello@zazaint.tech</p>
                </div>
                <div className="group cursor-pointer">
                  <h4 className="text-xs text-silver-dim uppercase tracking-widest mb-1">{t.hq}</h4>
                  <p className="text-xl font-display text-white group-hover:text-silver transition-colors">
                    {language === 'ru' ? siteConfig.hqRu : siteConfig.hq}
                  </p>
                </div>
                <div className="flex gap-6 pt-4">
                  {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                    <a key={social} href="#" className="text-silver-dim hover:text-white transition-colors uppercase text-xs tracking-widest border-b border-transparent hover:border-white pb-0.5">{social}</a>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 border border-white/5 rounded-full animate-spin-slow"></div>
              <div className="absolute -bottom-5 -left-5 w-24 h-24 border border-white/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
              <div className="bg-gradient-to-br from-[#1e1e2366] to-[#0a0a0a99] backdrop-blur-[40px] border border-white/10 border-t-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-sm p-8 md:p-12 relative z-10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-sm"></div>
                <form className="space-y-8 relative z-20" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className={`text-xs font-light uppercase tracking-widest ml-1 transition-colors ${errors.name ? 'text-red-400' : 'text-silver-dim'}`}>{t.form.name}</label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.form.placeholder_name}
                        className={`w-full px-4 py-3 bg-white/5 border text-white rounded-sm text-sm font-light placeholder-white/20 focus:bg-white/10 focus:ring-0 focus:outline-none transition-all shadow-sm ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/15 focus:border-white/50'}`}
                      />
                      {errors.name && <p className="text-[10px] text-red-400 uppercase tracking-wider pl-1 animate-pulse">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className={`text-xs font-light uppercase tracking-widest ml-1 transition-colors ${errors.email ? 'text-red-400' : 'text-silver-dim'}`}>{t.form.email}</label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.form.placeholder_email}
                        className={`w-full px-4 py-3 bg-white/5 border text-white rounded-sm text-sm font-light placeholder-white/20 focus:bg-white/10 focus:ring-0 focus:outline-none transition-all shadow-sm ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/15 focus:border-white/50'}`}
                      />
                      {errors.email && <p className="text-[10px] text-red-400 uppercase tracking-wider pl-1 animate-pulse">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="interest" className="text-xs font-light uppercase tracking-widest text-silver-dim ml-1">{t.form.interest}</label>
                    <select
                      id="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/15 text-gray-300 rounded-sm text-sm font-light focus:bg-white/10 focus:border-white/50 focus:ring-0 focus:outline-none transition-all shadow-sm appearance-none cursor-pointer"
                    >
                      <option className="bg-obsidian-dark text-gray-400" value="Web Development">{t.form.options.web}</option>
                      <option className="bg-obsidian-dark text-gray-400" value="Digital Product Design">{t.form.options.design}</option>
                      <option className="bg-obsidian-dark text-gray-400" value="Brand Identity">{t.form.options.brand}</option>
                      <option className="bg-obsidian-dark text-gray-400" value="Consultancy">{t.form.options.consult}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className={`text-xs font-light uppercase tracking-widest ml-1 transition-colors ${errors.message ? 'text-red-400' : 'text-silver-dim'}`}>{t.form.message}</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.form.placeholder_msg}
                      className={`w-full px-4 py-3 bg-white/5 border text-white rounded-sm text-sm font-light placeholder-white/20 focus:bg-white/10 focus:ring-0 focus:outline-none transition-all shadow-sm resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/15 focus:border-white/50'}`}
                    ></textarea>
                    {errors.message && <p className="text-[10px] text-red-400 uppercase tracking-wider pl-1 animate-pulse">{errors.message}</p>}
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <div className="text-[10px] text-silver-dim uppercase tracking-widest max-w-[150px] leading-tight hidden sm:block">
                      {t.form.protected}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || submitStatus === 'success'}
                      className={`group relative overflow-hidden rounded-full px-10 py-3 text-sm font-medium uppercase tracking-widest transition-all ${submitStatus === 'success' ? 'bg-green-500 text-white cursor-default' : 'bg-white text-black hover:scale-105 active:scale-95'} ml-auto sm:ml-0 disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? t.form.sending : submitStatus === 'success' ? t.form.sent : t.form.btn}
                        {!isSubmitting && submitStatus !== 'success' && <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>}
                        {submitStatus === 'success' && <span className="material-symbols-outlined text-sm">check</span>}
                      </span>
                      {submitStatus !== 'success' && <div className="absolute inset-0 z-0 h-full w-full scale-0 rounded-full bg-gray-200 transition-transform duration-300 group-hover:scale-150"></div>}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative z-10 w-full border-t border-white/5 bg-black py-8 mt-auto">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
            <div className="flex flex-col">
              <h3 className="text-sm font-display font-bold uppercase tracking-widest text-white">Zaza Intl.</h3>
              <p className="text-[10px] text-gray-600 font-light mt-1">© 2024 Zaza International.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-[10px] font-medium uppercase tracking-wider text-gray-600 hover:text-white transition-colors">{t.footer.privacy}</a>
              <a href="#" className="text-[10px] font-medium uppercase tracking-wider text-gray-600 hover:text-white transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Contact;
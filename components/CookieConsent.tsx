import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const CookieConsent: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const { language } = useLanguage();

    const content = {
        en: {
            text: 'We use cookies for analytics and to improve your experience. By accepting, you consent to the use of cookies.',
            accept: 'Accept',
            decline: 'Decline',
        },
        ru: {
            text: 'Мы используем cookies для аналитики и улучшения вашего опыта. Принимая, вы соглашаетесь на использование cookies.',
            accept: 'Принять',
            decline: 'Отклонить',
        },
    };

    const t = content[language];

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setVisible(false);
        // Initialize analytics after consent
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('cookie-consent-accepted'));
        }
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 pointer-events-none">
            <div className="cookie-banner-enter pointer-events-auto mx-auto max-w-2xl rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/10 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-white/70 font-light leading-relaxed mb-5">
                    {t.text}
                </p>
                <div className="flex items-center gap-3 justify-end">
                    <button
                        onClick={handleDecline}
                        className="px-5 py-2 text-xs font-medium uppercase tracking-widest text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-full transition-all"
                    >
                        {t.decline}
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-gray-200 rounded-full transition-all"
                    >
                        {t.accept}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;

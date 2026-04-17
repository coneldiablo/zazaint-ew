// Google Analytics 4
export function initGA4(measurementId: string) {
    if (!measurementId || typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', measurementId, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure',
    });
}

// Yandex Metrika
export function initYandexMetrika(counterId: string) {
    if (!counterId || typeof window === 'undefined') return;

    (function (m: any, e: any, t: any, r: any, i: any, k?: any, a?: any) {
        m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
        m[i].l = 1 * (new Date() as any);
        for (let j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) { return; }
        }
        k = e.createElement(t);
        a = e.getElementsByTagName(t)[0];
        k.async = 1;
        k.src = r;
        a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    const numericId = Number(counterId);
    if (!isNaN(numericId)) {
        (window as any).ym(numericId, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
        });
    } else {
        console.warn(`[Analytics] Invalid Yandex Metrika counter ID: ${counterId}`);
    }
}

// Initialize all analytics after cookie consent
export function initAnalytics() {
    const ga4Id = import.meta.env.VITE_GA4_MEASUREMENT_ID;
    const ymId = import.meta.env.VITE_YANDEX_METRIKA_ID;

    if (ga4Id) initGA4(ga4Id);
    if (ymId) initYandexMetrika(ymId);
}

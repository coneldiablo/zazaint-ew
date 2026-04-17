import { onCLS, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
    // Log in development
    if (import.meta.env.DEV) {
        console.log(`[Web Vitals] ${metric.name}:`, metric.value.toFixed(2), metric.rating);
    }

    // Send to Google Analytics if available
    if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', metric.name, {
            event_category: 'Web Vitals',
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_label: metric.id,
            non_interaction: true,
        });
    }
}

export function reportWebVitals() {
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
}

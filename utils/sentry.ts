import * as Sentry from '@sentry/react';

export function initSentry() {
    Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN || '',
        environment: import.meta.env.MODE,
        enabled: import.meta.env.PROD,
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration({
                maskAllText: false,
                blockAllMedia: false,
            }),
        ],
        tracesSampleRate: 0.3,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
    });
}

export { Sentry };

import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                magazine: resolve(__dirname, 'magazine.html'),
                careers: resolve(__dirname, 'careers.html'),
                privacy: resolve(__dirname, 'privacy.html'),
                terms: resolve(__dirname, 'terms.html'),
                'article-authenticity': resolve(__dirname, 'article-authenticity.html'),
                'article-connected-tv': resolve(__dirname, 'article-connected-tv.html'),
                'article-short-form-video': resolve(__dirname, 'article-short-form-video.html'),
                'article-social-commerce': resolve(__dirname, 'article-social-commerce.html'),
                'magazine-january-2026': resolve(__dirname, 'magazine-january-2026.html'),
                'article-feb-voice-ai': resolve(__dirname, 'article-feb-voice-ai.html'),
                'article-feb-local-seo': resolve(__dirname, 'article-feb-local-seo.html'),
                'article-feb-chatbot-vs-voice': resolve(__dirname, 'article-feb-chatbot-vs-voice.html'),
                'article-feb-google-business': resolve(__dirname, 'article-feb-google-business.html'),
                'article-feb-hospitality-automation': resolve(__dirname, 'article-feb-hospitality-automation.html'),
                'magazine-february-2026': resolve(__dirname, 'magazine-february-2026.html'),
                'article-mar-ai-search': resolve(__dirname, 'article-mar-ai-search.html'),
                'article-mar-social-strategies': resolve(__dirname, 'article-mar-social-strategies.html'),
                'article-mar-web-design': resolve(__dirname, 'article-mar-web-design.html'),
                'article-mar-ad-waste': resolve(__dirname, 'article-mar-ad-waste.html'),
                'article-mar-choosing-agency': resolve(__dirname, 'article-mar-choosing-agency.html'),
                // SEO blog articles
                'article-voice-ai-receptionist-restaurants': resolve(__dirname, 'article-voice-ai-receptionist-restaurants.html'),
                'article-ai-small-business-marketing': resolve(__dirname, 'article-ai-small-business-marketing.html'),
                'article-marketing-automation-local-business': resolve(__dirname, 'article-marketing-automation-local-business.html'),
                // SEO blog articles — Batch 2
                'article-best-marketing-agency-sydney': resolve(__dirname, 'article-best-marketing-agency-sydney.html'),
                'article-hospitality-marketing-sydney': resolve(__dirname, 'article-hospitality-marketing-sydney.html'),
                'article-ai-chatbot-business-australia': resolve(__dirname, 'article-ai-chatbot-business-australia.html'),
                // SEO blog articles — Batch 3 (April 2026)
                'article-email-marketing-automation-australia': resolve(__dirname, 'article-email-marketing-automation-australia.html'),
                'article-ai-marketing-restaurants-sydney': resolve(__dirname, 'article-ai-marketing-restaurants-sydney.html'),
                'article-digital-marketing-western-sydney': resolve(__dirname, 'article-digital-marketing-western-sydney.html'),
                // Services pages
                'services-ai': resolve(__dirname, 'services/index.html'),
                'services-social': resolve(__dirname, 'services/social.html'),
                'services-media-buying': resolve(__dirname, 'services/media-buying.html'),
                'services-creative': resolve(__dirname, 'services/creative.html'),
                'services-seo': resolve(__dirname, 'services/seo.html'),
                'services-app-dev': resolve(__dirname, 'services/app-dev.html'),
                'services-saas': resolve(__dirname, 'services/saas.html'),
                'services-packages': resolve(__dirname, 'services/packages.html'),
                // Location pages
                'locations-western-sydney': resolve(__dirname, 'locations/western-sydney.html'),
                'locations-north-sydney': resolve(__dirname, 'locations/north-sydney.html'),
                'locations-northern-beaches': resolve(__dirname, 'locations/northern-beaches.html'),
                'locations-eastern-suburbs': resolve(__dirname, 'locations/eastern-suburbs.html'),
                'locations-inner-west': resolve(__dirname, 'locations/inner-west.html'),
                'locations-sutherland-shire': resolve(__dirname, 'locations/sutherland-shire.html'),
            },
        },
    },
});

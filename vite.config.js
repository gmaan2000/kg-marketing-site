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
            },
        },
    },
});

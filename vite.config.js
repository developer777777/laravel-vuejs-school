import { defineConfig } from 'vite';
import vue from "@vitejs/plugin-vue";
import laravel from 'laravel-vite-plugin';

const path = require('path');

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            'ziggy': path.resolve(__dirname, 'vendor/tightenco/ziggy/dist/vue.es.js')
        }
    },
    build: {
        rollupOptions: {
            external: 'ziggy'
        }
    }
});

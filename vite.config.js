import { fileURLToPath, URL } from 'url';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    // component 자동 임포트
    plugins: [vue(), Components({ dirs: ['src/components/app'], dts: true })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    define: {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    },
});

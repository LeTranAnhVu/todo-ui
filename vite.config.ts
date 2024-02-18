import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'url'

// https://github.com/vite-pwa/vite-plugin-pwa/issues/33#issuecomment-790655647
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    plugins: [
        vue(),
        VitePWA({ // https://github.com/vite-pwa/vite-plugin-pwa/issues/33#issuecomment-791491220
            injectRegister: null,
            workbox: {
                cleanupOutdatedCaches: true
            },
            manifest: {
                icons: [
                    {
                        src: '/todo_logo.svg',
                        sizes: 'any',
                        type: 'image/svg+xml',
                        purpose: 'any maskable'
                    }
                ]
            }
        })

    ],
    server: {
        port: 3000
    }
})

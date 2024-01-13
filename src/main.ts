import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { router } from '@/router.ts'
import { Auth0VueClient, createAuth0 } from '@auth0/auth0-vue'
import Btn from '@/components/Btn.vue'
import createApiFetch from '@/lib/createApiFetch.ts'

library.add(faUserSecret, faAngleLeft, faCircleXmark)

const app = createApp(App)

app.component('Icon', FontAwesomeIcon)
app.component('Btn', Btn)
app.use(router)

// TODO: config refresh token https://auth0.com/docs/secure/tokens/refresh-tokens/configure-refresh-token-rotation
app.use(createAuth0({
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
    cacheLocation: 'localstorage',
    authorizationParams: {
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH_AUD
    }
}))

const auth0 = app.config.globalProperties['$auth0'] as Auth0VueClient
export const useApiFetch = createApiFetch(
    import.meta.env.VITE_API_BASE_URL,
    async () => {
        return await auth0.getAccessTokenSilently()
    },
    async () => {
        await auth0.logout()
    }
)

app.mount('#app')

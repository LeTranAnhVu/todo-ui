import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { router } from '@/router.ts'
import { createAuth0 } from '@auth0/auth0-vue'

library.add(faUserSecret, faAngleLeft, faCircleXmark)

const app = createApp(App)

app.component('Icon', FontAwesomeIcon)
app.use(router)

// TODO: config refresh token https://auth0.com/docs/secure/tokens/refresh-tokens/configure-refresh-token-rotation
app.use(createAuth0({
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
    cacheLocation: 'localstorage',
    authorizationParams: {
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH_AUD,
    }
}))
app.mount('#app')

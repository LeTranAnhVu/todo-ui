import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { router } from '@/router.ts'

library.add(faUserSecret, faAngleLeft, faCircleXmark)

const app = createApp(App)

app.component('Icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')

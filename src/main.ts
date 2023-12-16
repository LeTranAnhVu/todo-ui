import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faUserSecret, faAngleLeft, faCircleXmark)

createApp(App).component('Icon', FontAwesomeIcon).mount('#app')

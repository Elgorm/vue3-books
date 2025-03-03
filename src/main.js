import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import VueDOMPurifyHTML from 'vue-dompurify-html'

import 'primeicons/primeicons.css'
import './style.css'
const pinia = createPinia()

createApp(App)
.use(pinia)
.use(router)
.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'base, primevue',
            }
        }
    }
})
.use(VueDOMPurifyHTML)
.mount('#app')

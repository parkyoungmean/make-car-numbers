import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/main.css'
import { createPinia } from 'pinia'
import router from './router'
import './assets/main.css'
/* import { useMainStore } from '@/store' */

const app = createApp(App).use(router)
app.use(createPinia());

app.mount('#app')

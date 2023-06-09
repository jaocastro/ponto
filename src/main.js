import { createApp } from 'vue'
import { createPinia } from "pinia";
import router from './router.js'
import './style.css'
import App from './App.vue'
import axios from "@/plugins/axios.js";

const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$http = axios
app.use(router)
app.use(pinia)
app.mount('#app')
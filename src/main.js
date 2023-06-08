import { createApp } from 'vue'
import router from './router.js'
import './style.css'
import App from './App.vue'
import axios from "@/plugins/axios.js";

const app = createApp(App)
app.config.globalProperties.$http = axios
app.use(router)
app.mount('#app')
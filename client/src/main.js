import {createApp} from 'vue'
import {createPinia} from 'pinia'
import './assets/css/main.css'
import App from './App.vue'
import router from "./router"

const pinia = createPinia()

const app = createApp(App)
    .use(pinia)
    .use(router)
    .use(createPinia)

app.config.globalProperties.$store = {};
app.mount("#app");

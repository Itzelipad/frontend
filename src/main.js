import { createApp, reactive } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
const app = createApp(App).use(store).use(router)
app.config.globalProperties.$user = reactive({
    id: null,
    name: null,
    admin: null,
    reception: null,
});
app.config.globalProperties.$auxiliar = reactive({
    id: null,
    name: null,
    admin: null,
    reception: null,
    vinculacion: null,
    edificio: null
});
app.config.globalProperties.$apiRoute = "http://127.0.0.1:8000/api";
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import * as global from './global'
import './router/permission'
import router from './router'
import '@/assets/styles/index.scss'
import './utils/lib-flexible'
const app = createApp(App)
// use
app.use(router)
// install
global.install(app)
// mount
app.mount('#app')

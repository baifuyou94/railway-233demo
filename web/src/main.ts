import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"



// 状态管理
import { createPinia } from 'pinia'
// antd 按需引入
import { setupAntd } from './antd-ui';

import "./assets/css/tailwind.css";
import './reset.css';

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
setupAntd(app)
app.mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// cesium控件样式全局引入
import "cesium/Build/Cesium/Widgets/widgets.css";

const app = createApp(App)

app.use(store).use(router)
app.mount('#app')

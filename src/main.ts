import { createApp } from 'vue'
import App from './App.vue'
import { MotionOnePlugin } from '../lib'

const app = createApp(App)

app.use(MotionOnePlugin)

app.mount('#app')

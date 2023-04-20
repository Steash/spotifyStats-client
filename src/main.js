import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
// import "tailwindcss/base.css"
// import "tailwindcss/utilities.css"
// import 'dotenv/config'
// require('dotenv').config();


createApp(App).use(store).use(router).mount('#app')

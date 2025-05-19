import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'vue-fullpage.js/dist/style.css'
import VueFullPage from 'vue-fullpage.js'

import Tres from '@tresjs/core'

import * as ttiApi from './api'; 


const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)

app.config.globalProperties.$ttiApi = ttiApi;

app.use(createPinia())
app.use(router)
app.use(VueFullPage)
app.use(vuetify)
app.use(Tres)
app.mount('#app')
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

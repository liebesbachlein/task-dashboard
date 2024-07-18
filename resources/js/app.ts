import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
/*pinia.use(({ store }) => {
  store.router = markRaw(router)
})*/

app.use(pinia)
app.use(router)

app.mount('#app')

/*
import { createApp, h, type DefineComponent } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import { createInertiaApp } from '@inertiajs/vue3'

const pinia = createPinia()
const pages = import.meta.glob<DefineComponent>('../views/user/**/ /*.vue', { eager: true })
/*
createInertiaApp({
  id: 'app',
  resolve: (name) => {
    return pages[`../Pages/${name}.vue`]
  },
  setup({ el, App, props, plugin }) {
    const vueApp = createApp({ render: () => h(App, props) })
    vueApp.use(pinia)
    vueApp.use(router)
    vueApp.use(plugin).mount(el)
  }
})*/

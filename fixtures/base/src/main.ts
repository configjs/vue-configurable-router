import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { getRoutes } from 'virtual:vite-plugin-vue-configurable-router/runtime'
import App from './App.vue'

createApp(App).use(
  createRouter({
    history: createWebHistory(),
    routes: getRoutes(),
  }),
).mount('#app')

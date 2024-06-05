import { join } from 'node:path'
import { cwd } from 'node:process'
import { defineConfig } from 'vite'
import VueConfigurableRouter from 'vite-plugin-vue-configurable-router'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue(),
    VueConfigurableRouter({
      routes: [
        {
          path: '/',
          name: 'childOne',
          component: join(cwd(), 'src/ChildOne.vue'),
        },
        {
          path: '/two',
          name: 'childTwo',
          component: join(cwd(), 'src/ChildTwo.vue'),
        },
      ],
    }),
  ],
})

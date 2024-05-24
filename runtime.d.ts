declare module 'virtual:vite-plugin-vue-configurable-router/runtime' {
  import type { RouteRecordRaw } from 'vue-router'

  /** Get routes in runtime. */
  export function getRoutes(): RouteRecordRaw[]
}

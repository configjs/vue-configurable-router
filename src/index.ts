import type { PluginOption } from 'vite'
import type { RouteRecordRaw } from 'vue-router'

export type Route = Omit<RouteRecordRaw, 'component'> & {
  /**
   * Component to display when the URL matches this route.
   *
   * Different from the original `component` property, this property must be a string of the path to the vue component file.
   *
   * This is because the original `component` property is not serializable.
   *
   * In the runtime, the `component` property will be replaced with a function that dynamically imports the component.
   */
  component: string
}

export interface Options {
  /** The routes to be used in the vue router. */
  routes?: Route[]
}

export function generateRoutesString(routes: Route[]): string {
  function stringify(value: any): string | undefined {
    // 处理字符串
    if (typeof value === 'string')
      return `"${value.replace(/"/g, '\\"')}"`

    // 处理数字和布尔值
    if (typeof value === 'number' || typeof value === 'boolean')
      return String(value)

    // 处理 null
    if (value === null)
      return 'null'

    // 处理数组
    if (Array.isArray(value)) {
      const arrayElements = value.map(element => stringify(element) || 'null')
      return `[${arrayElements.join(',')}]`
    }

    // 处理对象
    if (typeof value === 'object') {
      const objectKeys = Object.keys(value)
      const objectElements = objectKeys.map((key) => {
        const keyValue = stringify(value[key])
        if (keyValue !== undefined)
          return `"${key}":${key !== 'component' ? keyValue : `() => import(${keyValue})`}`

        return undefined
      }).filter(element => element !== undefined)
      return `{${objectElements.join(',')}}`
    }

    // 处理 undefined 和函数
    return undefined
  }
  return stringify(routes)
}

export default function VueConfigurableRouter(options: Options = {}): PluginOption {
  const routesString = generateRoutesString(((options && options.routes) ? options.routes : []) || [])

  return {
    name: 'vite-plugin-vue-configurable-router',
    resolveId(id) {
      if (id === 'virtual:vite-plugin-vue-configurable-router/runtime')
        return id
    },
    load(id) {
      if (id === 'virtual:vite-plugin-vue-configurable-router/runtime') {
        return `export function getRoutes() {
          return ${routesString}
        }`
      }
    },
  }
}

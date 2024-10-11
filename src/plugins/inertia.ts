import { createApp, DefineComponent, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import CockpitPlugin, { PluginOptions } from './vue/index.js'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const appName = 'Cockpit'

export function resolvePage(name: string) {
  if (name.startsWith('cockpit::')) {
    const strippedName = name.replace('cockpit::', '')
    return resolvePageComponent(
      `../../resources/pages/${strippedName}.vue`,
      import.meta.glob<DefineComponent>('../../resources/pages/**/*.vue')
    )
  }
}

export default function createCockpitApp(
  config: { resolve: (name: string) => any },
  pluginOptions: PluginOptions
) {
  return createInertiaApp({
    title: (title: string) => `${title} - ${appName}`,
    resolve: (name: string) => {
      const admin = resolvePage(name)
      if (admin) return admin
      return config.resolve(name)
    },
    // TODO: Fix types
    setup({ el, App, props, plugin }: any) {
      createApp({ render: () => h(App, props) })
        .use(plugin)
        .use(CockpitPlugin, pluginOptions)
        .mount(el)
    },
  })
}

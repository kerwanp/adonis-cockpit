import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import CockpitPlugin, { PluginOptions } from './vue/index.js'

const appName = 'Cockpit'

const pages: Record<string, () => any> = {
  'home': () => import('adonis-cockpit/resources/pages/home.vue'),
  'resources/edit': () => import('adonis-cockpit/resources/pages/resources/edit.vue'),
  'resources/create': () => import('adonis-cockpit/resources/pages/resources/create.vue'),
  'resources/index': () => import('adonis-cockpit/resources/pages/resources/index.vue'),
  'resources/detail': () => import('adonis-cockpit/resources/pages/resources/detail.vue'),
}

export function resolvePage(name: string) {
  if (name.startsWith('cockpit::')) {
    const strippedName = name.replace('cockpit::', '')
    return pages[strippedName]()
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

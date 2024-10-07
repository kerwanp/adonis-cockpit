import './css/app.css'
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import CockpitPlugin from './plugin.js'

const appName = 'Cockpit'

const pages: Record<string, () => any> = {
  'home': () => import('@foadonis/cockpit/inertia/pages/home.vue'),
  'resources/edit': () => import('@foadonis/cockpit/inertia/pages/resources/edit.vue'),
  'resources/create': () => import('@foadonis/cockpit/inertia/pages/resources/create.vue'),
  'resources/index': () => import('@foadonis/cockpit/inertia/pages/resources/index.vue'),
  'resources/detail': () => import('@foadonis/cockpit/inertia/pages/resources/detail.vue'),
}

export function resolvePage(name: string) {
  if (name.startsWith('cockpit::')) {
    const strippedName = name.replace('cockpit::', '')
    return pages[strippedName]()
  }
}

export function createCockpitApp(config: { resolve: (name: string) => any }) {
  return createInertiaApp({
    title: (title: string) => `${title} - ${appName}`,
    resolve: (name: string) => {
      const admin = resolvePage(name)
      if (admin) return admin
      return config.resolve(name)
    },
    setup({ el, App, props, plugin }) {
      createApp({ render: () => h(App, props) })
        .use(plugin)
        .use(CockpitPlugin, {})
        .mount(el)
    },
  })
}

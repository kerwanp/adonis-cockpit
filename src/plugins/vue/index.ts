import { Plugin } from 'vue'
import PrimeVue, { PrimeVueConfiguration } from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import { Link } from '@inertiajs/vue3'
import ToastService from 'primevue/toastservice'
import { VueQueryPlugin } from '@tanstack/vue-query'

import defaultTheme from './default_theme.js'
import fields from '../../../resources/components/fields/index.js'

type FieldsOptions = Record<string, Record<string, any>>

export type PluginOptions = {
  primeVue?: PrimeVueConfiguration
  fields?: FieldsOptions
}

// TODO: Type issues
export default {
  install(app, options) {
    app.use(
      PrimeVue as unknown as Plugin<any>,
      options.primeVue ?? {
        theme: {
          preset: defaultTheme,
          options: {
            darkModeSelector: '.dark',
            cssLayer: {
              name: 'primevue',
              order: 'tailwind-base, primevue, tailwind-utilities',
            },
          },
        },
      }
    )

    app.use(ConfirmationService as unknown as Plugin<[]>)
    app.use(ToastService as unknown as Plugin<[]>)
    app.use(VueQueryPlugin)
    app.component('Link', Link)

    for (const [field, components] of [
      ...Object.entries(fields),
      ...Object.entries(options.fields ?? []),
    ]) {
      for (const [type, component] of Object.entries(components)) {
        app.component(`Cockpit${field}${type}`, component)
      }
    }
  },
} satisfies Plugin<PluginOptions>

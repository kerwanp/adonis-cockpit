import { Plugin } from 'vue'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import { Link } from '@inertiajs/vue3'
import ToastService from 'primevue/toastservice'
import { VueQueryPlugin } from '@tanstack/vue-query'

import defaultTheme from './default_theme.js'
import fields from '../../../resources/components/fields/index.js'

export default {
  install(app, options?: { primeVue: any }) {
    app.use(
      PrimeVue,
      options?.primeVue ?? {
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

    app.use(ConfirmationService)
    app.use(ToastService)
    app.use(VueQueryPlugin)
    app.component('Link', Link)

    for (const [field, components] of Object.entries(fields)) {
      for (const [type, component] of Object.entries(components))
        app.component(`Cockpit${field}${type}`, component)
    }
  },
} satisfies Plugin

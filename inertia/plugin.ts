import { definePreset } from '@primevue/themes'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { Plugin } from 'vue'
import ConfirmationService from 'primevue/confirmationservice'
import { Link } from '@inertiajs/vue3'
import ToastService from 'primevue/toastservice'
import { VueQueryPlugin } from '@tanstack/vue-query'
import fields from './components/fields/index.js'

const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{surface.50}',
      100: '{surface.100}',
      200: '{surface.200}',
      300: '{surface.300}',
      400: '{surface.400}',
      500: '{surface.500}',
      600: '{surface.600}',
      700: '{surface.700}',
      800: '{surface.800}',
      900: '{surface.900}',
      950: '{surface.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.950}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.800}',
          activeColor: '{primary.700}',
        },
        highlight: {
          background: '{primary.950}',
          focusBackground: '{primary.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '{primary.50}',
          contrastColor: '{primary.950}',
          hoverColor: '{primary.200}',
          activeColor: '{primary.300}',
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.300}',
          color: '{primary.950}',
          focusColor: '{primary.950}',
        },
      },
    },
  },
})

export default {
  install(app, options?: { primeVue: any }) {
    app.use(
      PrimeVue,
      options?.primeVue ?? {
        theme: {
          preset: Noir,
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
        app.component(`Admin$${field}$${type}`, component)
    }
  },
} satisfies Plugin

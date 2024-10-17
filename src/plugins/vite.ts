import adonisjs from '@adonisjs/vite/client'

// TODO: Find a way to either optimize everything from primevue or have an entrypoint that do it
export default function cockpit(options: Parameters<typeof adonisjs>[0]) {
  return [
    {
      name: 'cockpit',
      config: () => ({
        optimizeDeps: {
          include: [
            '@inertiajs/vue3',
            'vue',
            'qs',
            'deepmerge',
            'vee-validate',
            'primevue/toast',
            'primevue/drawer',
            'primevue/usetoast',
            'primevue/useconfirm',
            'primevue/button',
            'primevue/datatable',
            'primevue/inputtext',
            'primevue/breadcrumb',
            'primevue/paginator',
            'primevue/select',
            'primevue/multiselect',
            'primevue/menu',
            'primevue/toggleswitch',
            'primevue/togglebutton',
            'primevue/badge',
            'primevue/password',
            'primevue/confirmdialog',
            'primevue/confirmpopup',
            '@vueuse/core',
          ],
        },
      }),
    },
    adonisjs(options),
  ]
}

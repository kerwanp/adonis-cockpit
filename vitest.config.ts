import { defineConfig } from 'vitest/config'
import vuePlugin from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

export default defineConfig({
  plugins: [
    vuePlugin(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
  ],
  test: {
    globals: true,
    dir: 'tests',
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*', 'inertia/**/*'],
    },
  },
})

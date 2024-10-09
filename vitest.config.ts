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
  server: {
    watch: {
      ignored: ['**/tests/tmp/**'],
    },
  },
  test: {
    globals: true,
    dir: 'tests',
    environmentMatchGlobs: [
      ['tests/frontend/**', 'jsdom'],
      ['tests/**', 'node'],
    ],
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*', 'inertia/**/*'],
      reporter: ['json-summary'],
    },
  },
})

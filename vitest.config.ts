import { defineConfig } from 'vitest/config'
import vuePlugin from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vuePlugin()],
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
      include: ['src/**/*'],
      reporter: ['json-summary'],
    },
  },
})

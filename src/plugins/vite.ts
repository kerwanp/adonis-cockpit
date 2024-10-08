import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

export default function cockpit() {
  return [
    Components({
      resolvers: [PrimeVueResolver()],
    }),
  ]
}

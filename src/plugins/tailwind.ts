import plugin from 'tailwindcss/plugin.js'
import primeui from 'tailwindcss-primeui'
import { Config, PluginCreator } from 'tailwindcss/types/config.js'

type Plugin = {
  handler: PluginCreator
  config?: Partial<Config>
  contentPath: string
}

const cockpitPlugin: Plugin = {
  ...plugin(function () {}, {
    plugins: [primeui],
  }),
  // Unfortunately it seems we cannot extend `content`
  contentPath: new URL('../../resources/**/*.vue', import.meta.url).pathname,
}

export default cockpitPlugin

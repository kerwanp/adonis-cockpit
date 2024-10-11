import primeui from 'tailwindcss-primeui'
import { Config } from 'tailwindcss/types/config.js'

export default {
  darkMode: 'class',
  content: [
    new URL('../../resources/**/*.vue', import.meta.url).pathname,
    './resources/views/**/*.edge',
  ],
  plugins: [primeui],
} satisfies Config

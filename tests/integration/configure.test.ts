import { mkdir, rmdir, writeFile } from 'node:fs/promises'
import { BASE_URL, setupApp } from '../utils.js'
import Configure from '@adonisjs/core/commands/configure'

const PACKAGE_JSON_ALL_DEPS = {
  dependencies: {
    '@adonisjs/inertia': '^1.2.1',
    '@adonisjs/lucid': '^21.2.0',
    '@vinejs/vine': '^2.1.0',
    'edge.js': '^6.0.2',
  },
}

const PACKAGE_JSON_ONLY_EDGE = {
  dependencies: {
    '@adonisjs/inertia': '^1.2.1',
    '@adonisjs/lucid': '^21.2.0',
    '@vinejs/vine': '^2.1.0',
  },
}

describe(
  'Configure',
  () => {
    beforeEach(async () => {
      await mkdir(BASE_URL)
      await mkdir(new URL('./start', BASE_URL))
    })

    afterEach(async () => {
      await rmdir(BASE_URL, { recursive: true })
    })

    test('should detect no missing dependencies', async () => {
      const { app, ace, readFile } = await setupApp()

      await writeFile(app.makePath('.env'), '')
      await writeFile(app.makePath('tsconfig.json'), '{}')
      await writeFile(app.makePath('start/env.ts'), `export default Env.create(new URL('./'), {})`)
      await writeFile(app.makePath('adonisrc.ts'), 'export default defineConfig({})')
      await writeFile(app.makePath('package.json'), JSON.stringify(PACKAGE_JSON_ALL_DEPS))

      const command = await ace.create(Configure, ['../../index.js'])
      await command.exec()

      command.assertSucceeded()

      expect(readFile('adonisrc.ts')).resolves.toContain(
        'adonis-cockpit/providers/cockpit_provider'
      )
      expect(readFile('adonisrc.ts')).resolves.toContain('adonis-cockpit/commands')
      expect(readFile('config/cockpit.ts')).resolves.toContain('defineConfig({')
      expect(readFile('inertia/app/cockpit.ts')).resolves.toContain('createCockpitApp')
      expect(readFile('inertia/app/cockpit.ts')).resolves.toContain('`../pages/${name}.vue`') // Had to escape
    })

    test('should propose to install missing dependencies', async () => {
      const { app, ace } = await setupApp()

      await writeFile(app.makePath('.env'), '')
      await writeFile(app.makePath('tsconfig.json'), '{}')
      await writeFile(app.makePath('start/env.ts'), `export default Env.create(new URL('./'), {})`)
      await writeFile(app.makePath('adonisrc.ts'), 'export default defineConfig({})')
      await writeFile(app.makePath('package.json'), JSON.stringify(PACKAGE_JSON_ONLY_EDGE))

      const command = await ace.create(Configure, ['../../index.js'])

      command.prompt.trap('missing_dependencies').reject()

      await command.exec()

      command.assertSucceeded()
    })
  },
  { timeout: 60000 }
)

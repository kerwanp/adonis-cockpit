import { mkdir, rm, writeFile } from 'node:fs/promises'
import { BASE_URL, setupApp } from '../utils.js'
import Configure from '@adonisjs/core/commands/configure'
import PackageJson from '@npmcli/package-json'
import { ApplicationService } from '@adonisjs/core/types'

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

async function prepareApp(
  app: ApplicationService,
  packageJson: PackageJson.Content = PACKAGE_JSON_ALL_DEPS
) {
  await writeFile(app.makePath('.env'), '')
  await writeFile(app.makePath('tsconfig.json'), '{}')
  await writeFile(app.makePath('start/env.ts'), `export default Env.create(new URL('./'), {})`)
  await writeFile(app.makePath('adonisrc.ts'), 'export default defineConfig({})')
  await writeFile(app.makePath('vite.config.ts'), 'export default defineConfig({ plugins: [] })')
  await PackageJson.create(app.makePath())
    .then((p) => p.update(packageJson))
    .then((p) => p.save())
}

describe('Configure', () => {
  beforeEach(async () => {
    await mkdir(BASE_URL)
    await mkdir(new URL('./start', BASE_URL))
  })

  afterEach(async () => {
    await rm(BASE_URL, { recursive: true })
  })

  test.only('should detect no missing dependencies', async () => {
    const { app, ace, readFile } = await setupApp([
      () => import('@adonisjs/core/providers/edge_provider'),
      () => import('@adonisjs/core/providers/vinejs_provider'),
    ])

    await prepareApp(app, { ...PACKAGE_JSON_ALL_DEPS, imports: { '#models/*': './app/models/*' } })
    await writeFile(app.makePath('tailwind.config.ts'), '')

    const command = await ace.create(Configure, ['../../index.js'])
    await command.exec()

    command.assertSucceeded()

    expect(readFile('adonisrc.ts')).resolves.toContain('adonis-cockpit/providers/cockpit_provider')
    expect(readFile('adonisrc.ts')).resolves.toContain('adonis-cockpit/commands')
    expect(readFile('config/cockpit.ts')).resolves.toContain('defineConfig({')
    expect(readFile('inertia/app/cockpit.ts')).resolves.toContain('createCockpitApp')
    expect(readFile('inertia/app/cockpit.ts')).resolves.toContain('`../pages/${name}.vue`') // Had to escape
    expect(readFile('package.json')).resolves.toContain('"#cockpit/*": "./app/cockpit/*.js"\n') // \n ensures file is still formatted
    expect(readFile('package.json')).resolves.toContain('"#models/*"') // ensures we dont override existing imports
    expect(readFile('vite.config.ts')).resolves.toContain('cockpit')
  })

  test.only('should propose to install missing dependencies', async () => {
    const { app, ace } = await setupApp()

    await prepareApp(app, PACKAGE_JSON_ONLY_EDGE)
    await writeFile(app.makePath('tailwind.config.ts'), '')

    const command = await ace.create(Configure, ['../../index.js'])

    command.prompt.trap('configure_missing_dependencies').reject()

    await command.exec()

    command.assertSucceeded()
  })

  test.only('should propose to install tailwindcss', async () => {
    const { app, ace, readFile } = await setupApp([
      () => import('@adonisjs/core/providers/edge_provider'),
      () => import('@adonisjs/core/providers/vinejs_provider'),
    ])

    await prepareApp(app, PACKAGE_JSON_ALL_DEPS)

    const command = await ace.create(Configure, ['../../index.js'])
    await command.exec()

    command.assertSucceeded()

    expect(readFile('package.json')).resolves.toContain('tailwindcss')
    expect(readFile('tailwind.config.ts')).resolves.toContain('cockpit')
    expect(readFile('postcss.config.js')).resolves.toContain('tailwind')
  })
}, 60000)

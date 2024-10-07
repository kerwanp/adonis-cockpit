import { test } from '@japa/runner'
import { fileURLToPath } from 'node:url'
import { IgnitorFactory } from '@adonisjs/core/factories'
import Configure from '@adonisjs/core/commands/configure'

const BASE_URL = new URL('./tmp/', import.meta.url)

test.group('Configure', (group) => {
  group.each.setup(({ context }) => {
    context.fs.baseUrl = BASE_URL
    context.fs.basePath = fileURLToPath(BASE_URL)
  })

  group.each.disableTimeout()

  test('properly configure Cockpit', async ({ fs, assert }) => {
    const ignitor = new IgnitorFactory()
      .withCoreProviders()
      .withCoreConfig()
      .create(BASE_URL, {
        importer: (filePath) => {
          if (filePath.startsWith('./') || filePath.startsWith('../')) {
            return import(new URL(filePath, BASE_URL).href)
          }

          return import(filePath)
        },
      })

    const app = ignitor.createApp('web')
    await app.init()
    await app.boot()

    await fs.create('.env', '')
    await fs.createJson('tsconfig.json', {})
    await fs.create('start/env.ts', `export default Env.create(new URL('./'), {})`)
    await fs.create('adonisrc.ts', `export default defineConfig({})`)

    const ace = await app.container.make('ace')
    const command = await ace.create(Configure, ['../../index.js'])
    await command.exec()

    await assert.fileExists('adonisrc.ts')
    await assert.fileExists('config/cockpit.ts')
    await assert.fileExists('start/cockpit.ts')
    await assert.fileExists('inertia/app/cockpit.ts')

    await assert.fileContains('adonisrc.ts', 'adonis-cockpit/commands')
    await assert.fileContains('adonisrc.ts', 'adonis-cockpit/providers/cockpit_provider')
    await assert.fileContains('config/cockpit.ts', 'defineConfig({')
    await assert.fileContains('inertia/app/cockpit.ts', 'createCockpitApp')
    await assert.fileContains('inertia/app/cockpit.ts', '`../pages/${name}.vue`')
  })
})

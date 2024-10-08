export const BASE_URL = new URL('./tmp/', import.meta.url)

import { IgnitorFactory } from '@adonisjs/core/factories'
import { readFile } from 'node:fs/promises'

export async function setupApp() {
  const ignitor = new IgnitorFactory()
    .withCoreProviders()
    .withCoreConfig()
    .merge({
      rcFileContents: {
        commands: [() => import('@adonisjs/core/commands')],
      },
    })
    .create(BASE_URL, {
      importer: (filePath) => {
        if (filePath.startsWith('./') || filePath.startsWith('../')) {
          return import(new URL(filePath, BASE_URL).href)
        }

        return import(filePath)
      },
    })

  const app = ignitor.createApp('web')
  await app.init().then(() => app.boot())

  const ace = await app.container.make('ace')
  // ace.ui.switchMode('raw')

  return {
    ace,
    app,
    readFile: async (...path: string[]) => {
      return readFile(app.makePath(...path)).then((c) => c.toString())
    },
  }
}

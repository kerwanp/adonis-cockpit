import 'reflect-metadata'
import { Config } from '@japa/runner/types'
import { assert } from '@japa/assert'
import { apiClient } from '@japa/api-client'
import { pluginAdonisJS } from '@japa/plugin-adonisjs'
import app from '@adonisjs/core/services/app'
import testUtils from '@adonisjs/core/services/test_utils'

export const plugins: Config['plugins'] = [
  assert(),
  apiClient({ baseURL: 'http://localhost:3332' }),
  pluginAdonisJS(app, { baseURL: './tmp' }),
]

export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [],
  teardown: [],
}

export const configureSuite: Config['configureSuite'] = (suite) => {
  if (['functional'].includes(suite.name)) {
    return suite.setup(() => {
      return testUtils.httpServer().start()
    })
  }
}

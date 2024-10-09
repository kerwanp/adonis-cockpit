import { ApplicationService } from '@adonisjs/core/types'
import edge from 'edge.js'
import { viewsRoot } from '../resources/main.js'
import CockpitManager from '../src/cockpit.js'
import { CockpitConfig } from '../src/types.js'

export default class CockpitProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    const config = this.app.config.get<CockpitConfig>('cockpit')
    edge.mount('cockpit', viewsRoot)
    edge.global('cockpitConfig', config)

    this.app.container.singleton(CockpitManager, async (resolver) => {
      const logger = await resolver.make('logger')
      const cockpit = new CockpitManager(config, logger)
      return cockpit
    })
  }

  async boot() {
    await import('../src/extensions.js')
    const admin = await this.app.container.make(CockpitManager)
    await admin.boot(this.app)
  }
}

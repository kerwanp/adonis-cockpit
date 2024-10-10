import { ApplicationService } from '@adonisjs/core/types'
import CockpitManager from '../src/cockpit.js'
import { CockpitConfig } from '../src/types.js'

export default class CockpitProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    const config = this.app.config.get<CockpitConfig>('cockpit')

    this.app.container.singleton(CockpitManager, async (resolver) => {
      const logger = await resolver.make('logger')
      const cockpit = new CockpitManager(config, logger)
      return cockpit
    })
  }

  async boot() {
    await import('../src/extensions.js')

    const cockpit = await this.app.container.make(CockpitManager)
    await cockpit.boot(this.app)

    await this.registerEdgePlugin()
  }

  /**
   * Registers edge plugin
   */
  async registerEdgePlugin() {
    const cockpit = await this.app.container.make(CockpitManager)
    const edge = await import('edge.js')
    const { edgePluginCockpit } = await import('../src/plugins/edge.js')
    console.log(cockpit.config)
    edge.default.use(edgePluginCockpit(cockpit))
  }
}

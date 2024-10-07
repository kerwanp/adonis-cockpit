import { BaseResource } from './resources/base_resource.js'
import { CockpitConfig, Type } from './types.js'
import { MenuItem } from './menu/menu_item.js'
import { RoutesManager } from './routes/manager.js'
import { ResourcesManager } from './resources/manager.js'
import { ApplicationService } from '@adonisjs/core/types'
import { Logger } from '@adonisjs/core/logger'

export default class Cockpit {
  readonly config: CockpitConfig
  $routesManager: RoutesManager
  #resourcesManager: ResourcesManager
  #logger: Logger
  #menu: () => MenuItem[] = () => []

  constructor(config: CockpitConfig, logger: Logger) {
    this.config = config
    this.#logger = logger
    this.$routesManager = new RoutesManager(logger)
    this.#resourcesManager = new ResourcesManager(logger)
  }

  /**
   * Registers a resource.
   */
  resource(Resource: Type<BaseResource>): this {
    const resource = new Resource()
    this.#resourcesManager.register(resource)
    return this
  }

  findResource(name: string): BaseResource | undefined {
    return this.#resourcesManager.get(name)
  }

  findResourceBySlug(name: string): BaseResource | undefined {
    return this.#resourcesManager.get(name)
  }

  menu(menu: () => MenuItem[]) {
    this.#menu = menu
  }

  getMenu() {
    return this.#menu()
  }

  getResources(): Record<string, BaseResource> {
    return this.#resourcesManager.resources
  }

  policy(policy: any): this {
    this.$routesManager.policy(policy)
    return this
  }

  async boot(app: ApplicationService) {
    this.#logger.trace({ cockpit: this }, 'booting cockpit')
    const router = await app.container.make('router')

    this.$routesManager.registerRoutes(router)
  }
}

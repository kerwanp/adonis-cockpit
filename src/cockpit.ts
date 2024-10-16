import { BaseResource } from './resources/base_resource.js'
import { CockpitConfig, Type } from './types.js'
import { RoutesManager } from './routes/manager.js'
import { ResourcesManager } from './resources/manager.js'
import { ApplicationService } from '@adonisjs/core/types'
import { Logger } from '@adonisjs/core/logger'
import { relative } from 'node:path'
import { Menu } from './menu/menu.js'

export default class Cockpit {
  readonly config: CockpitConfig
  $routesManager: RoutesManager
  #app: ApplicationService
  #resourcesManager: ResourcesManager
  #logger: Logger
  #menu: (menu: Menu) => void = () => {}

  constructor(app: ApplicationService, config: CockpitConfig, logger: Logger) {
    this.#app = app
    this.#logger = logger
    this.#resourcesManager = new ResourcesManager(logger)
    this.$routesManager = new RoutesManager(logger)
    this.config = config
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

  menu(menu: (menu: Menu) => void) {
    this.#menu = menu
  }

  buildMenu() {
    const menu = new Menu()
    this.#menu(menu)
    return menu
  }

  getResources(): Record<string, BaseResource> {
    return this.#resourcesManager.resources
  }

  policy(policy: any): this {
    this.$routesManager.policy(policy)
    return this
  }

  /**
   * Generates a Vite asset pathname from a page name.
   */
  makeVitePagePath(component: string) {
    const strippedName = component.replace('cockpit::', '')
    const pagesUrl = new URL(`../resources/pages/${strippedName}.vue`, import.meta.url)
    return `@fs/${relative(this.#app.makePath(), pagesUrl.pathname)}`
  }

  /**
   * Boots Cockpit.
   */
  async boot(app: ApplicationService) {
    this.#logger.trace({ cockpit: this }, 'booting cockpit')
    const router = await app.container.make('router')

    this.$routesManager.registerRoutes(router)
  }
}

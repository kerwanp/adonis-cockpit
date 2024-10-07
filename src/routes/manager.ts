import { Router } from '@adonisjs/core/http'
import { resourceCreateHandler } from './handlers/create.js'
import { makeIndexHandler } from './handlers/index.js'
import { resourceEditHandler } from './handlers/edit.js'
import { resourceDetailHandler } from './handlers/detail.js'
import { handleApiIndex } from './handlers/api/index.js'
import { Logger } from '@adonisjs/core/logger'
import { handleApiCreate } from './handlers/api/create.js'
import { handleApiDelete } from './handlers/api/delete.js'
import { handleApiAction } from './handlers/api/action.js'
import { handleApiUpdate } from './handlers/api/update.js'
import { handleApiRetrieve } from './handlers/api/retrieve.js'
import { cockpitMiddleware } from '../cockpit_middleware.js'

export class RoutesManager {
  #logger: Logger
  $policy?: any

  constructor(logger: Logger) {
    this.#logger = logger
  }

  /**
   * Defines the global admin ability.
   */
  policy(policy: any): this {
    this.$policy = policy
    return this
  }

  /**
   * Registers Cockpit routes.
   */
  registerRoutes(router: Router) {
    router
      .group(() => {
        router
          .get('/', (ctx) => {
            return ctx.inertia.render('cockpit::home')
          })
          .as('home')
        this.#registerResourceRoutes(router)
        this.#registerApiRoutes(router)
      })
      .as('cockpit')
      .prefix('/admin')
      .middleware(cockpitMiddleware)
  }

  /**
   * Register routes for the provided resource.
   * '/admin/resources/:resource'
   * '/admin/resources/:resource/create'
   * '/admin/resources/:resource/:id'
   * '/admin/resources/:resource/:id/edit'
   */
  #registerResourceRoutes(router: Router) {
    this.#logger.trace('registering resources routes')
    router
      .group(() => {
        router.route('/', ['GET', 'DELETE'], makeIndexHandler).as('index')
        router.route('/create', ['GET', 'POST'], resourceCreateHandler).as('create')
        router.route('/:id', ['GET'], resourceDetailHandler).as('detail')
        router.route('/:id/edit', ['GET', 'POST', 'DELETE'], resourceEditHandler).as('edit')
      })
      .prefix(`/resources/:slug`)
      .as(`resources`)
  }

  /**
   * Register api routes used by the frontend.
   */
  #registerApiRoutes(router: Router) {
    this.#logger.trace('registering api routes')
    router
      .group(() => {
        router.get('/', (ctx) => handleApiIndex(ctx)).as('index')
        router.post('/', (ctx) => handleApiCreate(ctx)).as('create')
        router.post('/actions/:action', (ctx) => handleApiAction(ctx)).as('action')
        router.get('/:recordId', (ctx) => handleApiRetrieve(ctx)).as('retrieve')
        router.post('/:recordId', (ctx) => handleApiUpdate(ctx)).as('update')
        router.delete('/:recordId', (ctx) => handleApiDelete(ctx)).as('delete')
      })
      .prefix(`/api/:resourceSlug`)
      .as(`api`)
  }
}

import { Logger } from '@adonisjs/core/logger'
import { BaseResource } from './base_resource.js'

export class ResourcesManager {
  #logger: Logger
  #resources: Record<string, BaseResource> = {}

  constructor(logger: Logger) {
    this.#logger = logger
  }

  set(key: string, value: BaseResource<any>): this {
    this.#resources[key] = value
    return this
  }

  get(key: string): BaseResource<any> | undefined {
    return this.#resources[key]
  }

  /**
   * Registers a new resource.
   */
  register(resource: BaseResource): this {
    this.#logger.trace('registering new resource %s', [resource.name])
    this.set(resource.name(), resource)
    return this
  }

  get resources(): Record<string, BaseResource> {
    return this.#resources
  }
}

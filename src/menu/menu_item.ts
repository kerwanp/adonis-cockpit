import router from '@adonisjs/core/services/router'
import { Type } from '../types.js'
import { BaseResource } from '../resources/base_resource.js'

export class MenuItem {
  #label?: string
  #href?: string
  #target?: string
  #icon?: string

  label(label: string): this {
    this.#label = label
    return this
  }

  route(...params: Parameters<(typeof router)['makeUrl']>): this {
    this.#href = router.makeUrl(...params)
    return this
  }

  href(href: string): this {
    this.#href = href
    return this
  }

  target(target: string): this {
    this.#target = target
    return this
  }

  icon(icon: string): this {
    this.#icon = icon
    return this
  }

  public static make() {
    return new MenuItem()
  }

  public static resource(Resource: Type<BaseResource>): MenuItem {
    const resource = new Resource()
    const item = this.make().label(resource.labelPlural()).href(resource.route('index'))

    if (resource.icon) {
      item.icon(resource.icon())
    }

    return item
  }

  toJSON() {
    return {
      label: this.#label,
      href: this.#href,
      target: this.#target,
      icon: this.#icon,
    }
  }
}

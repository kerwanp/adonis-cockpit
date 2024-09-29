import router from '@adonisjs/core/services/router'
import { BaseResource } from '../base_resource.js'
import { Component, Type } from '../types.js'
import string from '@adonisjs/core/helpers/string'

export class MenuItem implements Component {
  #label?: string
  #href?: string
  #target?: string

  public label(label: string): MenuItem {
    this.#label = label
    return this
  }

  public route(...params: Parameters<(typeof router)['makeUrl']>): MenuItem {
    this.#href = router.makeUrl(...params)
    return this
  }

  public href(href: string): MenuItem {
    this.#href = href
    return this
  }

  public target(target: string): MenuItem {
    this.#target = target
    return this
  }

  public async render(): Promise<[string, any]> {
    return [
      'admin::components/menu/item',
      {
        label: this.#label,
        href: this.#href,
        target: this.#target,
      },
    ]
  }

  public static make() {
    return new MenuItem()
  }

  public static resource(Resource: Type<BaseResource>) {
    const resource = new Resource()
    return this.make()
      .label(string.create(resource.name()).capitalCase().plural().toString())
      .href(resource.route('index'))
  }
}

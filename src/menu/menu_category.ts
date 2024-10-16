import { MenuItem as PrimeMenuItem } from 'primevue/menuitem'
import { Serializable } from '../types.js'
import { MenuItem } from './menu_item.js'
import { BaseResource } from '../resources/base_resource.js'

export class MenuCategory implements Serializable {
  #label: string
  #items: MenuItem[] = []

  constructor(label: string) {
    this.#label = label
  }

  /**
   * Adds an item to the Category.
   */
  item(label: string): MenuItem {
    const item = new MenuItem(label)
    this.#items.push(item)
    return item
  }

  resource(resource: (new () => BaseResource) | BaseResource): MenuItem {
    const instance = resource instanceof BaseResource ? resource : new resource()
    const item = this.item(instance.labelPlural())

    if (instance.icon) {
      item.icon(instance.icon())
    }

    item.route(`cockpit.resources.index`, { slug: instance.name() })

    return item
  }

  toJSON(): PrimeMenuItem {
    return {
      label: this.#label,
      items: this.#items.map((item) => item.toJSON()),
    }
  }
}

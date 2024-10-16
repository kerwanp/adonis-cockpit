import { Serializable } from '../types.js'
import { MenuItem as PrimeMenuItem } from 'primevue/menuitem'
import { MenuItem } from './menu_item.js'
import { MenuCategory } from './menu_category.js'

export class Menu implements Serializable {
  #items: Serializable<PrimeMenuItem>[] = []

  category(label: string, builder: (category: MenuCategory) => void): this {
    const category = new MenuCategory(label)
    builder(category)
    this.#items.push(category)
    return this
  }

  /**
   * Adds a new item to the Menu.
   */
  item(label: string): MenuItem {
    const item = new MenuItem(label)
    this.#items.push(item)
    return item
  }

  toJSON(): PrimeMenuItem[] {
    return this.#items.map((item) => item.toJSON())
  }
}

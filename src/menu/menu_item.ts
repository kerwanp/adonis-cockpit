import router from '@adonisjs/core/services/router'
import { MenuItem as PrimeMenuItem } from 'primevue/menuitem'

export class MenuItem {
  #label: string
  #href?: string
  #target?: string
  #icon?: string
  #prefixMatch = false

  constructor(label: string) {
    this.#label = label
  }

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

  /**
   * Make the item active using prefix matching.
   */
  prefixMatch(): this {
    this.#prefixMatch = true
    return this
  }

  /**
   * Make the item active using exact matching.
   */
  exactMatch(): this {
    this.#prefixMatch = false
    return this
  }

  toJSON(): PrimeMenuItem {
    return {
      label: this.#label,
      url: this.#href,
      target: this.#target,
      icon: this.#icon,
      prefixMatch: this.#prefixMatch,
    }
  }
}

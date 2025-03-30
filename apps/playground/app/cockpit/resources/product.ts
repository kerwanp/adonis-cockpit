/* eslint-disable @typescript-eslint/no-shadow */
import Product from '#models/product'
import { LucidResource } from 'adonis-cockpit'
import { BaseLayout, LayoutBuilder } from 'adonis-cockpit/fields'

export default class ProductResource extends LucidResource(Product) {
  icon() {
    return 'fas fa-shirt'
  }

  titleKey(): string {
    return 'name'
  }

  fields(form: LayoutBuilder<Product>): BaseLayout[] {
    return [
      form.panel((form) => {
        form.id('id')
        form.text('name')
        form.text('sku')
        form.belongsTo('brand')
      }),
    ]
  }
}

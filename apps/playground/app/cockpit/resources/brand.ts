/* eslint-disable @typescript-eslint/no-shadow */
import Brand from '#models/brand'
import { LucidResource } from 'adonis-cockpit'
import { BaseLayout, LayoutBuilder } from 'adonis-cockpit/fields'

export default class BrandResource extends LucidResource(Brand) {
  icon() {
    return 'fas fa-star'
  }

  titleKey(): string {
    return 'name'
  }

  fields(form: LayoutBuilder<Brand>): BaseLayout[] {
    return [
      form.panel((form) => {
        form.id('id')
        form.text('name')
        form.url('websiteUrl')
        form.boolean('isPublished')
      }),
      form.hasMany('products'),
    ]
  }
}

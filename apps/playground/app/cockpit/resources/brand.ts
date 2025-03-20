import Brand from '#models/brand'
import { ModelResource } from 'adonis-cockpit'
import { Text, Url, Id } from 'adonis-cockpit/fields'

export default class BrandResource extends ModelResource {
  model = Brand

  icon() {
    return 'pi pi-file'
  }

  titleKey(): string {
    return 'name'
  }

  fields() {
    return [Id.make('id'), Text.make('name'), Url.make('websiteUrl'), Text.make('industry')]
  }
}

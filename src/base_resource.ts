import { SchemaTypes } from '@vinejs/vine/types'
import { Field } from './fields/field.js'
import { CrudAction } from './types.js'
import string from '@adonisjs/core/helpers/string'
import router from '@adonisjs/core/services/router'
import vine from '@vinejs/vine'
import { ModelInferencer } from './model_inferencer.js'

export abstract class BaseResource {
  // TODO: Avoid any
  public abstract model: any

  public fields(): Field[] {
    const inferencer = new ModelInferencer(this.model)
    return inferencer.fields()
  }

  public name() {
    return string.create(this.constructor.name).removeSuffix('resource').toString()
  }

  public slug() {
    return string.create(this.name()).slugify().noCase().plural().toString()
  }

  public route(action: 'show' | 'delete' | 'edit', id: string): string
  public route(action: 'index' | 'create'): string
  public route(action: CrudAction, id?: string): string {
    return router.makeUrl(`admin.resources.${this.slug()}.${action}`, { id })
  }

  public create(data: any) {
    console.log(data)
    return this.model.create(data)
  }

  public list() {
    return this.model.query()
  }

  public retrieve(id: any) {
    return this.model.findOrFail(id)
  }

  public validator() {
    const validator: Record<string, SchemaTypes> = {}

    for (const field of this.fields()) {
      if (field.validator) {
        validator[field.name()] = field.validator
      }
    }

    return vine.object(validator)
  }
}

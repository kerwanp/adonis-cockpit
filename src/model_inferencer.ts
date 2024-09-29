import { Field } from './fields/field.js'
import { LucidModel } from '@adonisjs/lucid/types/model'
import Id from './fields/id.js'
import Text from './fields/text.js'
import { reflectType } from './utils/reflect.js'
import { Relationship } from './fields/relationship.js'

export class ModelInferencer {
  #model: LucidModel

  constructor(model: any) {
    this.#model = model
  }

  public fields(): Field[] {
    const fields: Field[] = []

    for (const [key] of this.#model.$columnsDefinitions) {
      const field = this.#inferenceField(key)
      if (field) {
        fields.push(field)
      }
    }

    for (const [, relation] of this.#model.$relationsDefinitions) {
      fields.push(new Relationship(relation))
    }

    return fields
  }

  #inferenceField(key: string): Field | void {
    if (this.#model.primaryKey === key) {
      return Id.make(key)
    }

    const type = reflectType(this.#model.prototype, key)

    if (type === 'string') {
      return Text.make(key)
    }

    return Text.make(key)
  }
}

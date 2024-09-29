import { LucidModel } from '@adonisjs/lucid/types/model'
import { Field } from './field.js'
import { BelongsToRelationContract, ExtractModelRelations } from '@adonisjs/lucid/types/relations'

export class BelongsTo extends Field {
  $relationship: BelongsToRelationContract<LucidModel, LucidModel>

  constructor(relationship: BelongsToRelationContract<LucidModel, LucidModel>) {
    super(relationship.model.name)
    this.$relationship = relationship
  }

  fieldTemplate(): string {
    return 'admin::components/fields/belongs-to/field'
  }

  public static make<
    T extends Field,
    M extends LucidModel,
    Name extends ExtractModelRelations<InstanceType<M>>,
  >(this: new (model: M) => T, model: M, name: Name): T {
    const relation = model.$getRelation(name)

    const self = new this()
    return self
  }
}

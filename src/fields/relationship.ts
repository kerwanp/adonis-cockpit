import { LucidModel } from '@adonisjs/lucid/types/model'
import { Field } from './field.js'
import { ExtractModelRelations, RelationshipsContract } from '@adonisjs/lucid/types/relations'

export class Relationship extends Field {
  constructor(relationship: RelationshipsContract) {
    super(relationship.relationName)
  }

  public static make<
    T extends Field,
    M extends LucidModel,
    Name extends ExtractModelRelations<InstanceType<M>>,
  >(this: new (relationship: RelationshipsContract) => T, model: M, name: Name): T {
    const relation = model.$getRelation(name)
    const self = new this(relation)
    return self
  }
}

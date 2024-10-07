import { Field } from './field.js'
import { BaseResource } from '../resources/base_resource.js'
import { Type } from '../types.js'
import { ModelResource } from '../resources/model_resource.js'
import { BelongsToRelationContract } from '@adonisjs/lucid/types/relations'
import { LucidModel } from '@adonisjs/lucid/types/model'
import stringHelpers from '@adonisjs/core/helpers/string'

export default class BelongsTo extends Field {
  protected $resource: BaseResource
  protected $relationship: BelongsToRelationContract<LucidModel, LucidModel>

  constructor(
    resource: BaseResource,
    relationship: BelongsToRelationContract<LucidModel, LucidModel>
  ) {
    relationship.boot()
    super(relationship.foreignKey)

    this.$label = stringHelpers.capitalCase(relationship.relationName)
    this.$resource = resource
    this.$relationship = relationship
  }

  formComponent(): string {
    return 'Admin$BelongsTo$Form'
  }

  indexComponent(): string {
    return 'Admin$BelongsTo$Index'
  }

  static make(Resource: Type<ModelResource>, relationName: string) {
    const resource = new Resource()

    const source = BaseResource.storage.getStore() as ModelResource

    if (!(source instanceof ModelResource)) {
      throw new Error(`The BelongsTo field can only be used with ModelResource`)
    }

    const relationship = source.model.$getRelation(relationName)

    if (relationship.type !== 'belongsTo') {
      throw new Error(
        `The relationship ${relationName} is expected to be belongsTo (found ${relationship.type})`
      )
    }

    return new BelongsTo(resource, relationship)
  }

  toJSON() {
    return {
      ...super.toJSON(),
      resource: this.$resource.toJSON(true),
    }
  }
}

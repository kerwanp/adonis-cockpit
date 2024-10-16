import { Field } from './field.js'
import { BaseResource } from '../resources/base_resource.js'
import { Type } from '../types.js'
import { ModelResource } from '../resources/model_resource.js'
import { HasManyRelationContract } from '@adonisjs/lucid/types/relations'
import { LucidModel } from '@adonisjs/lucid/types/model'

export default class HasMany extends Field {
  $type: 'field' | 'panel' = 'panel'

  protected $resource: BaseResource
  protected $relationship: HasManyRelationContract<LucidModel, LucidModel>

  constructor(
    resource: ModelResource,
    relationship: HasManyRelationContract<LucidModel, LucidModel>
  ) {
    relationship.boot()
    super(relationship.relationName)

    this.$resource = resource
    this.$relationship = relationship
  }

  formComponent(): string {
    return 'CockpitHasManyForm'
  }

  indexComponent(): string {
    return 'CockpitHasManyIndex'
  }

  static make(Resource: Type<ModelResource>, relationName: string) {
    const resource = new Resource()

    const source = BaseResource.storage.getStore() as ModelResource

    if (!(source instanceof ModelResource)) {
      throw new Error(`The HasMany field can only be used with ModelResource`)
    }

    const relationship = source.model.$getRelation(relationName)

    if (relationship.type !== 'hasMany') {
      throw new Error(
        `The relationship ${relationName} is expected to be hasMany (found ${relationship.type})`
      )
    }

    source.$preload.push(relationName)

    return new HasMany(resource, relationship)
  }

  toJSON() {
    return {
      ...super.toJSON(),
      relationship: {
        foreignKey: this.$relationship.foreignKey,
        resourceName: this.$relationship.relatedModel().name,
        relationName: this.$relationship.relationName,
      },
      resource: this.$resource.toJSON(),
    }
  }
}

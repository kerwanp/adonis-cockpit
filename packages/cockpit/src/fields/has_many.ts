import { HasManyRelationContract } from "@adonisjs/lucid/types/relations";
import { BaseResource } from "../resources/base_resource.js";
import { BaseField } from "./base.js";
import { LucidModel } from "@adonisjs/lucid/types/model";
import stringHelpers from "@adonisjs/core/helpers/string";

export class HasManyField extends BaseField {
  protected $icon = "fas fa-anchor";
  protected $resource: BaseResource;
  protected $relationship: HasManyRelationContract<LucidModel, LucidModel>;

  $defaultValue = null;

  constructor(
    resource: BaseResource,
    relationship: HasManyRelationContract<LucidModel, LucidModel>,
  ) {
    relationship.boot();
    super(relationship.foreignKey, null);

    this.label(stringHelpers.capitalCase(relationship.relationName));

    this.$resource = resource;
    this.$relationship = relationship;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      relationship: {
        resource: this.$relationship.relatedModel().table,
      },
    };
  }
}

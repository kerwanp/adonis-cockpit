import { HasManyRelationContract } from "@adonisjs/lucid/types/relations";
import { LucidModel } from "@adonisjs/lucid/types/model";
import stringHelpers from "@adonisjs/core/helpers/string";
import { BaseResource } from "../../resources/base_resource.js";
import { PanelLayout } from "./panel.js";
import { HasManyField } from "../has_many.js";
import { LayoutDisplayOptions } from "./base.js";

export class HasManyLayout extends PanelLayout {
  protected $resource: BaseResource;
  protected $relationship: HasManyRelationContract<LucidModel, LucidModel>;
  protected display: LayoutDisplayOptions = {
    create: false,
    update: true,
  };

  constructor(
    resource: BaseResource,
    relationship: HasManyRelationContract<LucidModel, LucidModel>,
  ) {
    relationship.boot();
    super();

    this.columns(0);
    this.title(stringHelpers.capitalCase(relationship.relationName));

    this.$resource = resource;
    this.$relationship = relationship;

    this.field(new HasManyField(resource, relationship));
  }

  toJSON() {
    return {
      ...super.toJSON(),
      relationship: {
        resource: this.$relationship.relatedModel().table,
        foreignKey: this.$relationship.foreignKey,
      },
    };
  }
}

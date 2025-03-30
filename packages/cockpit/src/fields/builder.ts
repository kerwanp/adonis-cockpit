import Macroable from "@poppinss/macroable";
import { TextField } from "./text.js";
import { LucidRow, ModelAttributes } from "@adonisjs/lucid/types/model";
import { IdField } from "./id.js";
import { BooleanField } from "./boolean.js";
import { EmailField } from "./email.js";
import { BaseField } from "./base.js";
import { PanelLayout } from "./layouts/panel.js";
import { ExtractModelRelations } from "@adonisjs/lucid/types/relations";
import { BaseResource } from "../resources/base_resource.js";
import { BaseLucidResource } from "../resources/lucid.js";
import { BelongsToField } from "./belongs_to.js";
import { HasManyLayout } from "./layouts/has_many.js";

type Keys<T> = T extends LucidRow
  ? keyof ModelAttributes<T> & string
  : keyof T & string;

export class LayoutBuilder<T = any> extends Macroable {
  /**
   * Creates a panel.
   */
  panel(fn: (form: FieldsBuilder<T>) => void) {
    const layout = new PanelLayout();
    fn(new FieldsBuilder((field) => layout.field(field)));
    return layout;
  }

  /**
   * Creates a HasMany field.
   * Currently only works with Lucid models.
   *
   * TODO: Only extract belongsTo relations
   */
  hasMany(key: T extends LucidRow ? ExtractModelRelations<T> : never) {
    const source = BaseResource.storage.getStore() as BaseLucidResource<any>;

    if (!source) {
      throw new Error("storage not found"); // TODO: Error
    }

    // Hacky way to check if it is a LucidResource to avoid cyclic dependencies
    if (!("model" in source)) {
      throw new Error("storage not found"); // TODO: Error
    }

    const relationship = source.model.$getRelation(key);
    return new HasManyLayout(source, relationship);
  }
}

export class FieldsBuilder<T = any> extends Macroable {
  constructor(protected onPush: (field: BaseField) => void) {
    super();
  }

  /**
   * Creates a new field.
   */
  field<TField extends BaseField>(field: TField): TField {
    this.onPush(field);
    return field;
  }

  /**
   * Creates a boolean field.
   */
  boolean(property: Keys<T>) {
    return this.field(new BooleanField(property));
  }

  /**
   * Creates an email field.
   */
  email(property: Keys<T>) {
    return this.field(new EmailField(property));
  }

  /**
   * Creates an ID field.
   */
  id(property: Keys<T>) {
    return this.field(new IdField(property));
  }

  /**
   * Creates a text field.
   */
  text(property: Keys<T>) {
    return this.field(new TextField(property));
  }

  /**
   * Creates a url field.
   */
  url(property: Keys<T>) {
    return this.field(new TextField(property));
  }

  /**
   * Creates a belongs to field.
   * Currently only works with Lucid models.
   *
   * TODO: Only extract belongsTo relations
   */
  belongsTo(key: T extends LucidRow ? ExtractModelRelations<T> : never) {
    const source = BaseResource.storage.getStore() as BaseLucidResource<any>;

    if (!source) {
      throw new Error("storage not found"); // TODO: Error
    }

    // Hacky way to check if it is a LucidResource to avoid cyclic dependencies
    if (!("model" in source)) {
      throw new Error("storage not found"); // TODO: Error
    }

    const relationship = source.model.$getRelation(key);
    return this.field(new BelongsToField(source, relationship));
  }
}

import stringHelpers from "@adonisjs/core/helpers/string";
import { SearchFn, Serializable } from "../types.js";
import { ModelQueryBuilderContract } from "@adonisjs/lucid/types/model";

export type FieldDisplayOptions = {
  index: boolean;
  create: boolean;
  update: boolean;
  peek: boolean;
};

export class BaseField<T = unknown> implements Serializable {
  protected $kind = this.constructor.name;
  protected $label: string;
  protected $icon = "fas fa-t";
  protected $defaultValue: T;

  name: string;

  /**
   * @internal
   */
  protected $searchFn?: SearchFn;

  protected attributes: Record<string, any> = {};
  protected display: FieldDisplayOptions = {
    index: true,
    create: true,
    update: true,
    peek: true,
  };

  $options: Record<string, any> = {};

  constructor(name: string, defaultValue: T) {
    this.name = name;
    this.$label = stringHelpers.create(name).capitalCase().toString();
    this.$defaultValue = defaultValue;
  }

  $search(value: string, query: ModelQueryBuilderContract<any, any>) {
    return this.$searchFn?.(this, query, value);
  }

  /**
   * Marks this field as searchable.
   */
  searchable(searchable: boolean | SearchFn = true) {
    if (typeof searchable === "boolean") {
      this.$searchFn = searchable
        ? (field, query, value) => query.orWhereLike(field.name, `%${value}%`)
        : undefined;
    } else {
      this.$searchFn = searchable;
    }

    return this;
  }

  /**
   * Defines the field label.
   * Defaults to the capitalized name of the field.
   */
  label(label: string) {
    this.$label = label;
    return this;
  }

  /**
   * Hides this field on index page.
   */
  hideOnIndex(value = true) {
    this.display.index = !value;
    return this;
  }

  /**
   * Hides this field on create page.
   */
  hideOnCreate(value = true) {
    this.display.create = !value;
    return this;
  }

  /**
   * Hides this field on update page.
   */
  hideOnUpdate(value = true) {
    this.display.create = !value;
    return this;
  }

  /**
   * Hides this field on peek.
   */
  hideOnPeek(value = true) {
    this.display.create = !value;
    return this;
  }

  toJSON() {
    return {
      kind: this.$kind,
      name: this.name,
      label: this.$label,
      icon: this.$icon,
      attributes: this.attributes,
      options: this.$options,
      display: this.display,
      defaultValue: this.$defaultValue,
    };
  }
}

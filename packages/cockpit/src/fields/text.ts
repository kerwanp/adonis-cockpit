import { BaseField } from "./base.js";

export class TextField extends BaseField {
  constructor(name: string) {
    super(name, "");
  }

  /**
   * Marks this field as required.
   */
  required(value = true): this {
    this.attributes["required"] = value;
    return this;
  }

  /**
   * Defines a placeholder.
   */
  placeholder(value: string) {
    this.attributes["placeholder"] = value;
    return this;
  }

  /**
   * Defines the field as disabled.
   */
  disabled(value = true) {
    this.attributes["disabled"] = value;
    return this;
  }

  /**
   * Defines the field as disabled.
   */
  readonly(value = true) {
    this.attributes["readonly"] = value;
    return this;
  }

  /**
   * Defines the input type.
   * TODO: Create union of available types
   */
  type(value: string) {
    this.attributes["type"] = value;
    return this;
  }

  /**
   * Defines the field hint.
   */
  hint(value: string) {
    this.$options["hint"] = value;
    return this;
  }
}

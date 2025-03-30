import { BaseField } from "./base.js";

export class BooleanField extends BaseField {
  constructor(name: string) {
    super(name, false);
  }

  /**
   * Defines the field as disabled.
   */
  disabled(value = true) {
    this.attributes["disabled"] = value;
    return this;
  }

  /**
   * Marks this field as required.
   */
  required(value = true): this {
    this.attributes["required"] = value;
    return this;
  }
}

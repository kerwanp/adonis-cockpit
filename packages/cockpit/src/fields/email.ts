import { Field } from "./field.js";

export class Email extends Field<string> {
  $defaultValue = "";

  public static make<T extends Email>(
    this: new (name: string) => T,
    name: string,
  ): T {
    const self = new this(name);
    return self;
  }
}

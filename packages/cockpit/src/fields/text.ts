import { Field } from "./field.js";

export class Text extends Field<string> {
  $defaultValue = "";

  public static make<T extends Text>(
    this: new (name: string) => T,
    name: string,
  ): T {
    const self = new this(name);
    return self;
  }
}

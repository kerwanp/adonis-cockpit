import { Field } from "./field.js";

export class Url extends Field<string> {
  $defaultValue = "";

  public static make<T extends Url>(
    this: new (name: string) => T,
    name: string,
  ): T {
    const self = new this(name);
    return self;
  }
}

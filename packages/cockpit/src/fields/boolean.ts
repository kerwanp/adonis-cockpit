import { Field } from "./field.js";

export class Boolean extends Field<boolean> {
  $defaultValue = false;

  public static make<T extends Boolean>(
    this: new (name: string) => T,
    name: string,
  ): T {
    const self = new this(name);
    return self;
  }
}

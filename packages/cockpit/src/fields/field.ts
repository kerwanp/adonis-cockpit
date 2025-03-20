import stringHelpers from "@adonisjs/core/helpers/string";
import { Serializable } from "../types.js";
import { JsonValue } from "type-fest";

export abstract class Field<TValue extends JsonValue = JsonValue>
  implements Serializable
{
  $name: string;
  $label: string;
  abstract $defaultValue: TValue;

  constructor(name: string) {
    this.$name = name;
    this.$label = stringHelpers.create(name).capitalCase().toString();
  }

  kind() {
    return this.constructor.name;
  }

  toJSON() {
    return {
      kind: this.kind(),
      name: this.$name,
      label: this.$label,
      defaultValue: this.$defaultValue,
    };
  }
}

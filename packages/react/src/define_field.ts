import type { Field } from "adonis-cockpit/fields";
import { RegisteredField } from "./types.js";

export function defineField<T extends Field>(
  config: RegisteredField<T>,
): RegisteredField<T> {
  return config;
}

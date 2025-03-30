import type { BaseField } from "adonis-cockpit/fields";
import { RegisteredField } from "./types.js";

export function defineField<T extends BaseField>(
  config: RegisteredField<T>,
): RegisteredField<T> {
  return config;
}

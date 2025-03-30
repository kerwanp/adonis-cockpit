import type { BaseLayout } from "adonis-cockpit/fields";
import { RegisteredLayout } from "./types.js";

export function defineLayout<T extends BaseLayout>(
  config: RegisteredLayout<T>,
): RegisteredLayout<T> {
  return config;
}

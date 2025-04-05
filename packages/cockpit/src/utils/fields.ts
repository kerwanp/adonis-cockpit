import { BaseLayout } from "../fields/main.js";

export function flattenFields(fields: BaseLayout[]) {
  return fields.flatMap((l) => l.$fields());
}

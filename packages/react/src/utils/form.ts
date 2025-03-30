import { BaseResource } from "adonis-cockpit";
import { BaseField, BaseLayout } from "adonis-cockpit/fields";
import { InferSerializable } from "adonis-cockpit/types";

export function flattenFields(
  layouts: InferSerializable<BaseLayout>[],
): InferSerializable<BaseField>[] {
  return layouts.flatMap((layout) => layout.fields);
}

export function initFormValues(
  resource: InferSerializable<BaseResource>,
  record: Record<string, any>,
) {
  const fields = flattenFields(resource.fields);

  const output: Record<string, any> = { ...record };

  for (const field of fields) {
    if (output[field.name] !== null && output[field.name] !== undefined)
      continue;

    if (field.defaultValue === null) continue;

    output[field.name] = field.defaultValue;
  }

  return output;
}

import { useApp } from "../../providers/app.js";
import { useFormContext } from "../../hooks/use_resource_form.js";
import { InferSerializable } from "adonis-cockpit/types";
import { BaseField } from "adonis-cockpit/fields";

export const FormFieldRenderer = (props: {
  field: InferSerializable<BaseField>;
  type: "create" | "update";
}) => {
  const form = useFormContext() as any;
  const { fields } = useApp();

  const field = fields[props.field.kind];
  if (!field) {
    return null;
  }

  if (props.type === "create" && !props.field.display.create) {
    return null;
  }

  if (props.type === "update" && !props.field.display.update) {
    return null;
  }

  return (
    <form.AppField name={props.field.name}>
      {() => <field.form field={props.field} form={form as any} />}
    </form.AppField>
  );
};

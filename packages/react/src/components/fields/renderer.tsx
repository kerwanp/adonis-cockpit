import { ComponentProps } from "react";
import { useApp } from "../../providers/app.js";
import { RegisteredField } from "../../types.js";

export type FieldRendererProps = (
  | ({
      type: "index";
    } & ComponentProps<RegisteredField["index"]>)
  | ({
      type: "form";
    } & ComponentProps<RegisteredField["form"]>)
  | ({
      type: "detail";
    } & ComponentProps<NonNullable<RegisteredField["detail"]>>)
) & { name: string };

// TODO: Delete
export const FieldRenderer = (props: FieldRendererProps) => {
  const { fields } = useApp();
  const field = fields[props.name];

  if (!field) {
    console.warn(`The field ${props.name} is not registered`);
    return null;
  }

  if (props.type === "index") {
    return <field.index context={props.context} field={props.field} />;
  }

  if (props.type === "form") {
    return null;
  }

  if (props.type === "detail") {
    if (!field.detail) return null;
    return <field.detail {...props} />;
  }
};

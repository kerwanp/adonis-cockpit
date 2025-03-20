import { ComponentProps } from "react";
import { useApp } from "../../providers/app.jsx";
import { RegisteredField } from "../../types.js";

export type FieldRendererProps = ({
  type: "index";
} & ComponentProps<RegisteredField["index"]>) & { name: string };

export const FieldRenderer = (props: FieldRendererProps) => {
  const { fields } = useApp();

  const field = fields[props.name];

  if (!field) {
    console.warn(`The field ${props.name} is not registered`);
    return null;
  }

  switch (props.type) {
    case "index":
      return <field.index context={props.context} />;
  }
};

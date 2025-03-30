import { BaseLayout } from "adonis-cockpit/fields";
import { InferSerializable } from "adonis-cockpit/types";
import { useApp } from "../../providers/app.js";

export const LayoutRenderer = (props: {
  layout: InferSerializable<BaseLayout>;
  type: "create" | "update";
}) => {
  const { layouts } = useApp();

  const layout = layouts[props.layout.kind];
  if (!layout) {
    console.warn(`Layout ${props.layout.kind} not found`); // TODO: better error
    return null;
  }

  if (props.type === "create" && !props.layout.display.create) {
    return null;
  }

  if (props.type === "update" && !props.layout.display.update) {
    return null;
  }

  return <layout.render layout={props.layout} />;
};

import { CircleCheckBig, CircleX } from "lucide-react";
import { defineField } from "../../../define_field.js";
import { Boolean as Field } from "adonis-cockpit/fields";

export const CockpitBoolean = defineField<Field>({
  name: "Boolean",
  index: (t) => {
    const value = Boolean(t.context.getValue());
    return value ? (
      <CircleCheckBig className="text-success" />
    ) : (
      <CircleX className="text-destructive" />
    );
  },
});

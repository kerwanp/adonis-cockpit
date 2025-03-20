import { defineField } from "../../../define_field.js";

export const CockpitId = defineField({
  name: "Id",
  index: (t) => {
    const value = t.context.getValue();
    if (typeof value === "number") {
      return <span className="text-muted-foreground">#{value}</span>;
    }

    return <span className="text-muted-foreground">{value}</span>;
  },
});

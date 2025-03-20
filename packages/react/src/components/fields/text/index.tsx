import { defineField } from "../../../define_field.js";

export const CockpitText = defineField({
  name: "Text",
  index: (t) => {
    return t.context.getValue();
  },
});

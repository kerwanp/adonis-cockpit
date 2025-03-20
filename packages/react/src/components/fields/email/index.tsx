import { defineField } from "../../../define_field.js";

export const CockpitEmail = defineField({
  name: "Email",
  index: (t) => {
    return (
      <a
        className="font-medium text-primary underline underline-offset-4"
        href={`mailto:${t.context.getValue()}`}
        target="_blank"
        rel="noreferer"
      >
        {t.context.getValue()}
      </a>
    );
  },
});

import { EmailField } from "adonis-cockpit/fields";
import { defineField } from "../../../define_field.js";
import { CockpitText } from "../text/index.js";

export const CockpitEmail = defineField<EmailField>({
  name: "EmailField",
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
  form: (props) => CockpitText.form(props),
});

import { ExternalLink } from "lucide-react";
import { defineField } from "../../../define_field.js";
import { UrlField } from "adonis-cockpit/fields";
import { CockpitText } from "../text/index.js";

export const CockpitUrl = defineField<UrlField>({
  name: "UrlField",
  index: (t) => {
    return (
      <a
        className="flex items-center gap-2 font-medium text-primary underline underline-offset-4"
        href={t.context.getValue()}
        target="_blank"
        rel="noreferer"
      >
        {t.context.getValue()}

        <ExternalLink size={16} />
      </a>
    );
  },
  detail: ({ value }) => {
    return (
      <a
        className="flex items-center gap-2 font-medium text-primary underline underline-offset-4"
        href={value}
        target="_blank"
        rel="noreferer"
      >
        {value}

        <ExternalLink size={16} />
      </a>
    );
  },
  form: (props) => CockpitText.form(props),
});

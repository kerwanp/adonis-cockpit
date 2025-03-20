import { ExternalLink } from "lucide-react";
import { defineField } from "../../../define_field.js";

export const CockpitUrl = defineField({
  name: "Url",
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
});

import { IdField } from "adonis-cockpit/fields";
import { defineField } from "../../../define_field.js";
import { CockpitText } from "../text/index.js";
import { CopyToClipboard } from "../../ui/clipboard.js";

export const CockpitId = defineField<IdField>({
  name: "IdField",
  index: ({ context }) => {
    const value = context.getValue();
    const isInteger = Number.isInteger(value);
    return (
      <CopyToClipboard text={value}>
        <span className="text-muted-foreground cursor-pointer">
          {isInteger ? `#${value}` : value}
        </span>
      </CopyToClipboard>
    );
  },
  detail: ({ value }) => {
    const isInteger = Number.isInteger(value);
    return (
      <CopyToClipboard text={value}>
        <span className="text-muted-foreground cursor-pointer">
          {isInteger ? `#${value}` : value}
        </span>
      </CopyToClipboard>
    );
  },
  form: (props) => CockpitText.form(props),
});

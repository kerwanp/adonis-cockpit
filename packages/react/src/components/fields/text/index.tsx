import { TextField } from "adonis-cockpit/fields";
import { defineField } from "../../../define_field.js";
import { Input } from "../../ui/input.js";
import { useFieldContext } from "../../../hooks/use_resource_form.js";
import { FormDescription, FormField, FormLabel } from "../../ui/form.js";

export const CockpitText = defineField<TextField>({
  name: "TextField",
  index: (t) => {
    return t.context.getValue();
  },
  detail: ({ value }) => {
    return value;
  },
  form: ({ field }) => {
    const context = useFieldContext();

    return (
      <FormField>
        <FormLabel required={field.attributes.required}>
          {field.label}
        </FormLabel>
        <Input
          value={context.state.value as any}
          onBlur={context.handleBlur}
          onChange={(e) => context.handleChange(e.target.value)}
          {...field.attributes}
          name={context.name}
        />
        {field.options.hint && (
          <FormDescription>{field.options.hint}</FormDescription>
        )}
      </FormField>
    );
  },
});

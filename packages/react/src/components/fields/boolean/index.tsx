import { CircleCheckBig, CircleX } from "lucide-react";
import { defineField } from "../../../define_field.js";
import { Switch } from "../../ui/switch.js";
import { FormDescription, FormField, FormLabel } from "../../ui/form.js";
import { useFieldContext } from "../../../hooks/use_resource_form.js";
import { BooleanField } from "adonis-cockpit/fields";

export const CockpitBoolean = defineField<BooleanField>({
  name: "BooleanField",
  index: (t) => {
    const value = Boolean(t.context.getValue());
    return value ? (
      <CircleCheckBig className="text-success" />
    ) : (
      <CircleX className="text-destructive" />
    );
  },
  form: ({ field }) => {
    const context = useFieldContext();

    return (
      <FormField>
        <div className="flex items-center gap-3">
          <FormLabel>{field.label}</FormLabel>
          <Switch
            checked={context.state.value as boolean}
            onCheckedChange={(e) => context.setValue(e)}
            onBlur={context.handleBlur}
            {...field.attributes}
            name={context.name}
          />
        </div>
        {field.options.hint && (
          <FormDescription>{field.options.hint}</FormDescription>
        )}
      </FormField>
    );
  },
});

import { DateField } from "adonis-cockpit/fields";
import { defineField } from "../../define_field.js";
import { Input } from "../ui/input.js";
import { useFieldContext } from "../../hooks/use_resource_form.js";
import { FormDescription, FormField, FormLabel } from "../ui/form.js";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.js";
import { Button } from "../ui/button.js";
import { cn } from "../../utils/cn.js";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar.js";
import { useMemo } from "react";
import { format } from "date-fns";

export const CockpitDate = defineField<DateField>({
  name: "DateField",
  index: (t) => {
    return format(t.context.getValue(), "PPP");
  },
  detail: ({ value }) => {
    return format(value, "PPP");
  },
  form: ({ field }) => {
    const context = useFieldContext();

    const value = useMemo(
      () => new Date(context.state.value as string),
      [context.state.value],
    );

    function handleSelect(value: Date | undefined) {
      context.setValue(value?.toString());
    }

    return (
      <FormField>
        <FormLabel required={field.attributes.required}>
          {field.label}
        </FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              disabled={field.attributes.readonly}
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal !bg-transparent",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {field.options.hint && (
          <FormDescription>{field.options.hint}</FormDescription>
        )}
      </FormField>
    );
  },
});

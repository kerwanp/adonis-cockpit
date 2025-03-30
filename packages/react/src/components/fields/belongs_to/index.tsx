import { defineField } from "../../../define_field.js";
import {
  $resources,
  useResourceList,
  useResourceQuery,
} from "../../../hooks/resources.js";
import { Badge } from "../../ui/badge.js";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover.js";
import { ResourceProvider, useResource } from "../../../providers/resource.js";
import { ResourcePeekPopover } from "../../resources/peek.js";
import { RecordProvider } from "../../../providers/record.js";
import { Button } from "../../ui/button.js";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command.js";
import { FormField, FormLabel } from "../../ui/form.js";
import { InferSerializable, RecordId } from "adonis-cockpit/types";
import { BaseResource } from "adonis-cockpit";
import { useFieldContext } from "../../../hooks/use_resource_form.js";
import { cn } from "../../../utils/cn.js";
import { useQuery } from "@tanstack/react-query";
import { BelongsToField } from "adonis-cockpit/fields";

export const CockpitBelongsTo = defineField<BelongsToField>({
  name: "BelongsToField",
  index: ({ context, field }) => (
    <ResourceProvider resource={field.relationship.resource}>
      <IndexField value={context.getValue()} />
    </ResourceProvider>
  ),
  detail: ({ field, value }) => (
    <ResourceProvider resource={field.relationship.resource}>
      <IndexField value={value} />
    </ResourceProvider>
  ),
  form: ({ field }) => {
    const context = useFieldContext();
    const value = context.state.value as RecordId | undefined;
    const { resource } = useResource(field.relationship.resource);
    const { data } = useQuery({
      // @ts-ignore -- TODO: handle case where no relation
      ...$resources.retrieve(field.relationship.resource, value),
    });

    const [open, setOpen] = useState(false);

    return (
      <FormField className="flex flex-col">
        <FormLabel>{field.label}</FormLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between bg-transparent w-auto"
            >
              {data ? (
                data[resource.titleKey]
              ) : (
                <span className="text-muted-foreground">
                  Select {resource.label}...
                </span>
              )}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <BelongToCommand
              resource={resource}
              value={context.state.value as RecordId | undefined}
              onSelect={(value) => {
                context.setValue(value.id);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </FormField>
    );
  },
});

const IndexField = ({ value }: { value: string }) => {
  const { resource } = useResource();
  const { data } = useResourceQuery(resource.name, value);

  if (!data) return null;

  return (
    <RecordProvider record={data}>
      <ResourcePeekPopover>
        <Badge className="cursor-pointer" variant="secondary">
          {data[resource.titleKey]}
        </Badge>
      </ResourcePeekPopover>
    </RecordProvider>
  );
};

const BelongToCommand = ({
  resource,
  value,
  onSelect,
}: {
  resource: InferSerializable<BaseResource>;
  value?: RecordId;
  onSelect: (value: { id: RecordId; title: string }) => void;
}) => {
  const [query, setQuery] = useState<string>("");
  const { data } = useResourceList(resource.name, {
    page: 1,
    perPage: 15,
    query: query,
  });

  return (
    <Command shouldFilter={false}>
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder={`Search ${resource.labelPlural}`}
      />
      <CommandList>
        <CommandEmpty>No {resource.label} found</CommandEmpty>
        <CommandGroup>
          {data?.data.map((record) => (
            <CommandItem
              key={record[resource.idKey]}
              value={record[resource.idKey]}
              onSelect={() =>
                onSelect({
                  id: record[resource.idKey],
                  title: record[resource.titleKey],
                })
              }
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === record[resource.idKey]
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              {/* Little trick so items with same title are not considere as duplicate */}
              <span className="hidden">{record[resource.idKey]}</span>
              {record[resource.titleKey]}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

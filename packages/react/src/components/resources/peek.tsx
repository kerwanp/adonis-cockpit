import { useRecord } from "../../providers/record.js";
import { useResource } from "../../providers/resource.js";
import { flattenFields } from "../../utils/form.js";
import { FieldRenderer } from "../fields/renderer.js";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.js";
import { EditButton } from "./buttons/edit.js";
import { PropsWithChildren } from "react";

export const ResourcePeek = () => {
  const { resource } = useResource();
  const { record } = useRecord();

  const fields = flattenFields(resource.fields);

  return (
    <div className="flex flex-col">
      <div className="mb-3">
        {fields.map((field) => (
          <div
            className="flex border-b last:border-none gap-4"
            key={field.name}
          >
            <div className="w-24 flex items-center py-3 text-muted-foreground justify-end">
              {field.label}
            </div>
            <div className="flex items-center py-3">
              <FieldRenderer
                type="detail"
                name={field.kind}
                field={field}
                value={record[field.name]}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <EditButton size="sm" className="flex-1" />
      </div>
    </div>
  );
};

export const ResourcePeekPopover = ({ children }: PropsWithChildren) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <ResourcePeek />
      </PopoverContent>
    </Popover>
  );
};

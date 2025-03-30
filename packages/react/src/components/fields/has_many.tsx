import { HasMany } from "adonis-cockpit/fields";
import { defineField } from "../../define_field.js";
import { ResourceProvider, useResource } from "../../providers/resource.js";
import { RecordProvider, useRecord } from "../../providers/record.js";
import { useResourceList } from "../../hooks/resources.js";
import { Badge } from "../ui/badge.js";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.js";
import { ResourcePeekPopover } from "../resources/peek.js";
import { InferSerializable } from "adonis-cockpit/types";
import { BaseResource } from "adonis-cockpit";
import { ResourceTable } from "../resources/table.js";

export const CockpitHasMany = defineField<HasMany>({
  name: "HasManyField",
  index: ({ field }) => (
    <IndexField
      relationship={field.relationship.resource}
      property={field.name}
    />
  ),
  detail: ({ field }) => (
    <IndexField
      relationship={field.relationship.resource}
      property={field.name}
    />
  ),
  form: ({ field }) => {
    return (
      <ResourceProvider resource={field.relationship.resource}>
        <ResourceTable
          className="max-h-[700px]"
          options={{
            baseFilters: {
              property: "id",
              operator: "equals",
              value: 1,
            },
          }}
        />
      </ResourceProvider>
    );
  },
});

const IndexField = (props: { relationship: string; property: string }) => {
  const { resource } = useResource();
  const { resource: relation } = useResource(props.relationship);
  const { record } = useRecord();
  const { data } = useResourceList(relation.name, {
    page: 1,
    perPage: 1,
    filter: {
      property: props.property,
      value: record[resource.idKey],
      operator: "equals",
    },
  });

  if (!data) return null;

  if (data.data.length === 0) {
    return <Badge>No {relation.label}</Badge>;
  }

  return (
    <ResourceProvider resource={relation.name}>
      <div className="inline-flex gap-1">
        <RecordProvider record={data.data[0]}>
          <ResourcePeekPopover>
            <Badge variant="secondary" className="cursor-pointer">
              {data.data[0][relation.titleKey]}
            </Badge>
          </ResourcePeekPopover>
        </RecordProvider>
        {data.meta.total > 1 && (
          <Popover>
            <PopoverTrigger asChild>
              <Badge variant="secondary" className="cursor-pointer">
                and {data.meta.total - 1} others
              </Badge>
            </PopoverTrigger>
            <PopoverContent className="flex flex-wrap gap-1">
              <OthersBadges
                resource={relation}
                property={props.property}
                value={record[resource.idKey]}
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </ResourceProvider>
  );
};

const OthersBadges = ({
  resource,
  property,
  value,
}: {
  resource: InferSerializable<BaseResource>;
  property: string;
  value: string;
}) => {
  const { data } = useResourceList(resource.name, {
    page: 1,
    perPage: 100,
    filter: {
      property: property,
      value,
      operator: "equals",
    },
  });

  if (!data) return null;

  return data.data.map((record) => (
    <RecordProvider record={record}>
      <ResourcePeekPopover>
        <Badge
          key={record[resource.idKey]}
          variant="secondary"
          className="cursor-pointer"
        >
          {record[resource.titleKey]}
        </Badge>
      </ResourcePeekPopover>
    </RecordProvider>
  ));
};

import { defineLayout } from "../../define_layout.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.js";
import { ResourceProvider, useResource } from "../../providers/resource.js";
import { ResourceTable } from "../resources/table.js";
import { HasManyLayout } from "adonis-cockpit/fields";
import { useRecord } from "../../providers/record.js";

export const CockpitHasManyLayout = defineLayout<HasManyLayout>({
  name: "HasManyLayout",
  render({ layout }) {
    const { resource } = useResource();
    const { record } = useRecord();

    return (
      <Card className="mb-4">
        <CardHeader>
          {layout.title && <CardTitle>{layout.title}</CardTitle>}
          {layout.description && (
            <CardDescription>{layout.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <ResourceProvider resource={layout.relationship.resource}>
            <ResourceTable
              className="max-h-[700px]"
              options={{
                baseFilters: {
                  property: layout.relationship.foreignKey,
                  operator: "equals",
                  value: record[resource.idKey],
                },
              }}
            />
          </ResourceProvider>
        </CardContent>
      </Card>
    );
  },
});

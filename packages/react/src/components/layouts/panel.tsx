import { PanelLayout } from "adonis-cockpit/fields";
import { defineLayout } from "../../define_layout.js";
import { FormFieldRenderer } from "../renderers/form_field.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.js";

export const CockpitPanelLayout = defineLayout<PanelLayout>({
  name: "PanelLayout",
  render({ layout }) {
    return (
      <Card className="mb-4">
        <CardHeader>
          {layout.title && <CardTitle>{layout.title}</CardTitle>}
          {layout.description && (
            <CardDescription>{layout.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`,
          }}
        >
          {layout.fields.map((field, i) => (
            <FormFieldRenderer key={i} field={field} type="update" />
          ))}
        </CardContent>
      </Card>
    );
  },
});

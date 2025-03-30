import { Save, X } from "lucide-react";
import { useResourceForm } from "../../hooks/use_resource_form.js";
import { useResource } from "../../providers/resource.js";
import { LayoutRenderer } from "../renderers/layout.js";
import { Button } from "../ui/button.js";
import { Island, IslandActions, IslandContent } from "../ui/island.js";
import { AnimatePresence } from "motion/react";

export const ResourceForm = ({
  record,
  type,
}: {
  type: "create" | "update";
  record?: any;
}) => {
  const { resource } = useResource();
  const form = useResourceForm(record);

  return (
    <div className="flex-1 relative">
      <form.AppForm>
        {resource.fields.map((layout, i) => (
          <LayoutRenderer key={i} type={type} layout={layout} />
        ))}
        <form.Subscribe>
          {(state) => (
            <AnimatePresence>
              {state.isDirty && (
                <Island
                  preventNavigation={state.isDirty}
                  className="flex gap-3"
                >
                  <IslandContent className="flex items-center text-muted-foreground">
                    You have unsaved values
                  </IslandContent>
                  <IslandActions>
                    <Button
                      rounded
                      onClick={() => form.reset()}
                      variant="ghost"
                    >
                      Reset values
                      <X />
                    </Button>
                    <Button
                      rounded
                      size="lg"
                      onClick={async () => {
                        form.reset(form.state.values);
                        await form.handleSubmit();
                      }}
                    >
                      Save {resource.label} <Save />
                    </Button>
                  </IslandActions>
                </Island>
              )}
            </AnimatePresence>
          )}
        </form.Subscribe>
      </form.AppForm>
    </div>
  );

  // return (
  //   <form
  //     onSubmit={(e) => {
  //       e.preventDefault();
  //       e.stopPropagation();
  //       form.handleSubmit();
  //     }}
  //   >
  //     <div className="bg-card p-4 rounded-lg border mb-4">
  //       {resource.fields.map((field, i) => (
  //         <FieldRenderer
  //           key={i}
  //           type="form"
  //           name={field.kind}
  //           field={field}
  //           form={form}
  //         />
  //         // <form.Field key={i} name={field.name}>
  //         //   {(formField) => (
  //         //     <div className="border-b last:border-b-0 py-4 flex items-center gap-8">
  //         //       <div className="relative flex justify-end w-[200px]">
  //         //         {formField.state.meta.isDirty && (
  //         //           <Button
  //         //             size="icon"
  //         //             variant="ghost"
  //         //             className="absolute left-0 top-1/2 -translate-y-1/2 animate-in fade-in text-muted-foreground"
  //         //             onClick={() => form.resetField(field.name)}
  //         //           >
  //         //             <X size={20} />
  //         //           </Button>
  //         //         )}
  //         //         <label>{field.label}</label>
  //         //       </div>
  //         //       <div className="flex items-center">
  //         //         <FieldRenderer
  //         //           type="form"
  //         //           name={field.kind}
  //         //           formField={formField}
  //         //           field={field}
  //         //         />
  //         //       </div>
  //         //     </div>
  //         //   )}
  //         // </form.Field>
  //       ))}
  //     </form.Provi>
  //     <div className="flex justify-between gap-3">
  //       <div className="flex gap-3">
  //         <Button onClick={() => window.history.back()} variant="ghost">
  //           <MoveLeft />
  //           Go back
  //         </Button>
  //       </div>
  //       <div className="flex gap-3">
  //         <Button onClick={() => form.reset()} variant="ghost">
  //           Reset
  //         </Button>
  //         <Button>Save {resource.label}</Button>
  //       </div>
  //     </div>
  //   </form>
  // );
};

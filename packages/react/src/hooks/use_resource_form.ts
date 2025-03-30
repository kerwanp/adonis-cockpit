import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { initFormValues } from "../utils/form.js";
import { useResource } from "../providers/resource.js";
import { useResourceCreate, useResourceUpdate } from "./resources.js";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});

export function useResourceForm(record?: any) {
  const { resource } = useResource();

  const { create } = useResourceCreate();
  const { update } = useResourceUpdate();

  return useAppForm({
    defaultValues: initFormValues(resource, record),
    async onSubmit(data) {
      if (record) {
        await update({ id: data.value[resource.idKey], value: data.value });
      } else {
        await create({ value: data.value });
      }
    },
  });
}

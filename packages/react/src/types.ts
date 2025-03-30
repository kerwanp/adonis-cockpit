import { useForm } from "@tanstack/react-form";
import { CellContext } from "@tanstack/react-table";
import { BaseField, BaseLayout } from "adonis-cockpit/fields";
import { InferSerializable } from "adonis-cockpit/types";
import { FC, PropsWithChildren } from "react";

export type BreadcrumbItem = { label: string; url?: string };

export type RegisteredField<TField extends BaseField = BaseField> = {
  name: string;
  index: FC<{
    context: CellContext<any, any>;
    field: InferSerializable<TField>;
  }>;
  detail?: FC<{
    field: InferSerializable<TField>;
    value: any;
  }>;
  form: FC<{
    field: InferSerializable<TField>;
    form: ReturnType<typeof useForm>;
  }>;
};

export type RegisteredLayout<TLayout extends BaseLayout = BaseLayout> = {
  name: string;
  render: FC<PropsWithChildren<{ layout: InferSerializable<TLayout> }>>;
};

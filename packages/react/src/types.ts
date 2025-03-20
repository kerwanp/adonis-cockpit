import { CellContext } from "@tanstack/react-table";
import type { Field } from "adonis-cockpit/fields";
import { FC } from "react";

export type BreadcrumbItem = { label: string; url?: string };

export type RegisteredField<TField extends Field = Field> = {
  name: string;
  index: FC<{ context: CellContext<any, any> }>;
};

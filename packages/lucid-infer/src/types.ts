import { ColumnOptions } from "@adonisjs/lucid/types/model";

export type ColumnType =
  | "string"
  | "number"
  | "boolean"
  | "unknown"
  | "complex";

export type Column = {
  key: string;
  optional: boolean;
  options: ColumnOptions;
  type: ColumnType;
};

export type InferedModel = {
  columns: Column[];
};

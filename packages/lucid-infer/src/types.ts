import { ColumnOptions } from "@adonisjs/lucid/types/model";
import { RelationshipsContract } from "@adonisjs/lucid/types/relations";

export type ColumnType =
  | "string"
  | "number"
  | "boolean"
  | "unknown"
  | "complex"
  | string;

export type Relationship = {
  kind: "relationship";
  key: string;
  type: RelationshipsContract["type"];
  options: RelationshipsContract;
};

export type Column = {
  kind: "column";
  key: string;
  type: ColumnType;
  optional: boolean;
  isArray: boolean;
  options: ColumnOptions;
};

export type Definition = Relationship | Column;

export type InferedModel = {
  columns: Definition[];
};

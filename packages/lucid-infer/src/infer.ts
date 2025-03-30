import { LucidModel, ModelColumnOptions } from "@adonisjs/lucid/types/model";
import { Definition } from "./types.js";
import { loadFile } from "magicast";
import { fileURLToPath } from "node:url";
import {
  getColumnsFromAST,
  getColumnType,
  isClassPropertyNullable,
} from "./ast.js";
import { ClassProperty } from "@babel/types";

function loadModule(specifier: string) {
  const url = new URL(import.meta.resolve(specifier));
  return loadFile(fileURLToPath(url));
}

export async function inferModel(path: string) {
  const { default: Model } = (await import(path)) as { default: LucidModel };

  const columns: Definition[] = [];

  const mod = await loadModule(path);
  const propertiesAST = getColumnsFromAST(mod.$ast);

  for (const [key, definition] of Model.$columnsDefinitions) {
    const property = propertiesAST.find(
      (f) => f.key.type === "Identifier" && f.key.name === key,
    );

    if (!property) {
      console.warn(`Could not find property ${key}`); // TODO: ERror
      continue;
    }

    columns.push(inferColumn(key, property, definition));
  }

  for (const [key, definition] of Model.$relationsDefinitions) {
    columns.push({
      kind: "relationship",
      key,
      type: definition.type,
      options: definition,
    });
  }

  return columns;
}

function inferColumn(
  key: string,
  property: ClassProperty,
  options: ModelColumnOptions,
): Definition {
  const { type, isArray } = getColumnType(property);
  return {
    kind: "column",
    key,
    type,
    isArray,
    optional: isClassPropertyNullable(property),
    options,
  };
}

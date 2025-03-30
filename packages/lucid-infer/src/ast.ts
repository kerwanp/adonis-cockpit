import { ClassProperty, Node, TSType } from "@babel/types";
import { ColumnType } from "./types.js";

export function getColumnsFromAST(ast: Node) {
  const defaultExport = getDefaultExportFromAST(ast);

  if (!defaultExport) {
    console.warn("This module does not have a default export"); // TODO: Errors
    return [];
  }

  if (defaultExport.declaration.type !== "ClassDeclaration") {
    console.warn("This module does not default export a class"); // TODO: Errors
    return [];
  }

  // TODO: We might want to get computed aswell
  const nodes = defaultExport.declaration.body.body
    .filter((node) => node.type === "ClassProperty")
    .filter((node) => {
      const decorator = node.decorators?.find((d) => {
        if (d.expression.type !== "CallExpression") return false;
        return d.expression.callee.loc?.identifierName === "column";
      });

      return Boolean(decorator);
    });

  return nodes;
}

export function getDefaultExportFromAST(ast: Node) {
  if (!("body" in ast) || !ast.body) {
    return;
  }

  const body = ast.body;

  if (!Array.isArray(body)) return;

  return body.find((node) => node.type === "ExportDefaultDeclaration");
}

export function isClassPropertyNullable(property: ClassProperty) {
  if (property.optional) return true;
  if (property.typeAnnotation?.type !== "TSTypeAnnotation") return false;

  const annotation = property.typeAnnotation.typeAnnotation;
  if (annotation.type !== "TSUnionType") return false;

  return Boolean(
    annotation.types.find((t) =>
      ["TSUndefinedKeyword", "TSNullKeyword"].includes(t.type),
    ),
  );
}

export function getColumnType(property: ClassProperty): ColumnType {
  if (property.typeAnnotation?.type !== "TSTypeAnnotation") return "unknown";
  const annotation = property.typeAnnotation.typeAnnotation;

  return getColumnTypeFromTSType(annotation);
}

export function getColumnTypeFromTSType(type: TSType): ColumnType {
  if (type.type === "TSStringKeyword") return "string";
  if (type.type === "TSNumberKeyword") return "number";
  if (type.type === "TSBooleanKeyword") return "boolean";

  if (type.type === "TSUnionType") {
    const nonNull = type.types.filter((f) => f.type !== "TSNullKeyword");
    if (nonNull.length > 1) return "complex";
    return getColumnTypeFromTSType(nonNull[0]);
  }

  return "unknown";
}

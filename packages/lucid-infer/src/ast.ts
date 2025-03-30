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
        const callee = d.expression.callee;

        if (
          callee.type === "MemberExpression" &&
          callee.object.type === "Identifier"
        ) {
          return callee.object.name === "column";
        }

        if (callee.type === "Identifier") {
          return callee.name === "column";
        }

        return false;
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

export function getColumnType(property: ClassProperty): {
  isArray: boolean;
  type: ColumnType;
} {
  if (property.typeAnnotation?.type !== "TSTypeAnnotation")
    return { isArray: false, type: "unknown" };
  const annotation = property.typeAnnotation.typeAnnotation;

  return getColumnTypeFromTSType(annotation);
}

export function getColumnTypeFromTSType(type: TSType): {
  isArray: boolean;
  type: ColumnType;
} {
  if (type.type === "TSStringKeyword")
    return { isArray: false, type: "string" };
  if (type.type === "TSNumberKeyword")
    return { isArray: false, type: "number" };
  if (type.type === "TSBooleanKeyword")
    return { isArray: false, type: "boolean" };

  if (type.type === "TSUnionType") {
    const nonNull = type.types.filter((f) => f.type !== "TSNullKeyword");
    if (nonNull.length > 1) return { isArray: false, type: "complex" };
    return getColumnTypeFromTSType(nonNull[0]);
  }

  if (type.type === "TSArrayType") {
    const child = getColumnTypeFromTSType(type.elementType);
    if (child.isArray) return { isArray: true, type: "complex" };
    return { isArray: true, type: child.type };
  }

  if (type.type === "TSTypeReference" && type.typeName.type === "Identifier") {
    return { isArray: false, type: type.typeName.name };
  }

  return { isArray: false, type: "unknown" };
}

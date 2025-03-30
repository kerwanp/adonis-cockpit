import stringHelpers from "@adonisjs/core/helpers/string";

export function resourceName(name: string) {
  return stringHelpers
    .create(name)
    .removeExtension()
    .suffix("Resource")
    .singular()
    .pascalCase()
    .toString();
}

export function resourceFileName(name: string) {
  return stringHelpers
    .create(resourceName(name))
    .snakeCase()
    .ext("ts")
    .toString();
}

export function reflectType(target: any, key: string) {
  const type = Reflect.getMetadata('design:type', target, key)

  if (type.name === 'String') {
    return 'string'
  }

  if (type.name === 'Number') {
    return 'number'
  }

  if (type.name === 'Array') {
    return 'array'
  }

  if (type.name === 'Boolean') {
    return 'boolean'
  }
}

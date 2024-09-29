import { Field } from './field.js'

export class HasMany extends Field {
  public static make<T extends Field>(
    this: new (model: any, foreignKey?: string) => T,
    model: any,
    foreignKey?: string
  ): T {
    const self = new this(model, foreignKey)
    return self
  }
}

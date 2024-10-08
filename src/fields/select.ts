import { Field } from './field.js'

export default class Select extends Field {
  $options: Record<string, string> = {}

  options(options: Record<string, string>): this {
    this.$options = options
    return this
  }

  formComponent(): string {
    return 'CockpitSelectForm'
  }

  indexComponent(): string {
    return 'CockpitSelectIndex'
  }

  public static make<T extends Field>(this: new (name: string) => T, name: string): T {
    const self = new this(name)
    return self
  }

  toJSON() {
    return {
      ...super.toJSON(),
      options: this.$options,
    }
  }
}

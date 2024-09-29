import { Field } from './field.js'

export default class Select extends Field {
  #options: Record<string, string> = {}

  options(): Record<string, string>
  options(options: Record<string, string>): this
  options(options?: Record<string, string>): this | Record<string, string> {
    if (options) {
      this.#options = options
      return this
    }

    return this.#options
  }

  fieldTemplate(): string {
    return 'admin::components/fields/select/field'
  }

  public static make<T extends Field>(this: new (name: string) => T, name: string): T {
    const self = new this(name)
    return self
  }
}

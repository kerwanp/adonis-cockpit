import { Field } from './field.js'
import vine from '@vinejs/vine'

export default class Text extends Field {
  #attributes: Record<string, any> = {}
  validator = vine.string()

  placeholder(placeholder: string) {
    return this.attribute('placeholder', placeholder)
  }

  attribute(attribute: string, value: any) {
    this.#attributes[attribute] = value
    return this
  }

  attributes() {
    return this.#attributes
  }

  required(required?: boolean) {
    this.attribute('required', required === undefined ? true : required)
    return this
  }

  cellTemplate(): string {
    return 'admin::components/fields/text/cell'
  }

  fieldTemplate(): string {
    return 'admin::components/fields/text/field'
  }

  public static make<T extends Field>(this: new (name: string) => T, name: string): T {
    const self = new this(name)
    return self
  }
}

import { SchemaTypes } from '@vinejs/vine/types'
import { Field } from './field.js'
import vine, { VineString } from '@vinejs/vine'
import { OptionalModifier } from '@vinejs/vine/schema/base/literal'

export default class Text extends Field {
  validator: SchemaTypes = vine.string().optional()

  protected $required = false
  protected $regex?: RegExp
  protected $minLength?: number
  protected $maxLength?: number

  placeholder(placeholder: string) {
    return this.attribute('placeholder', placeholder)
  }

  minLength(length: number): this {
    this.$minLength = length
    return this
  }

  maxLength(length: number): this {
    this.$maxLength = length
    return this
  }

  required(required = true) {
    this.$required = required
    this.attribute('required', required)
    return this
  }

  regex(regex: RegExp): this {
    this.$regex = regex
    return this
  }

  indexComponent(): string {
    return 'CockpitTextIndex'
  }

  formComponent(): string {
    return 'CockpitTextForm'
  }

  $validate(value: any): Promise<any> {
    let schema: OptionalModifier<VineString> | VineString = vine.string()

    if (this.$minLength) {
      schema = schema.minLength(this.$minLength)
    }

    if (this.$maxLength) {
      schema = schema.maxLength(this.$maxLength)
    }

    if (this.$regex) {
      schema = schema.regex(this.$regex)
    }

    if (this.$required === false) {
      schema = schema.optional()
    }

    const validator = vine.compile(schema)
    return validator.validate(value)
  }

  public static make<T extends Field>(this: new (name: string) => T, name: string): T {
    const self = new this(name)
    return self
  }

  toJSON() {
    return {
      ...super.toJSON(),
    }
  }
}

import vine from '@vinejs/vine'
import { Field } from './field.js'
import { SchemaTypes } from '@vinejs/vine/types'

export default class Boolean extends Field {
  protected $trueValue: any = true
  protected $falseValue: any = false
  $initialValue = true

  constructor(name: string) {
    super(name)
  }

  indexComponent(): string {
    return 'CockpitBooleanIndex'
  }

  formComponent(): string {
    return 'CockpitBooleanForm'
  }

  /**
   * Defines the emitted values when the boolean is true or false.
   */
  values(trueValue: any, falseValue: any): this {
    this.$trueValue = trueValue
    this.$falseValue = falseValue
    this.$initialValue = falseValue
    return this
  }

  $validator(): SchemaTypes {
    return vine.enum([this.$trueValue, this.$falseValue])
  }

  static make(name: string): Boolean {
    return new Boolean(name)
  }

  toJSON() {
    return {
      ...super.toJSON(),
      trueValue: this.$trueValue,
      falseValue: this.$falseValue,
    }
  }
}

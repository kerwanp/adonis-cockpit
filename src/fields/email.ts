import { SchemaTypes } from '@vinejs/vine/types'
import vine from '@vinejs/vine'
import Text from './text.js'

export default class Email extends Text {
  validator: SchemaTypes = vine.string().email()

  constructor(name: string) {
    super(name)
    this.attribute('type', 'email')
  }

  indexComponent(): string {
    return 'CockpitEmailIndex'
  }

  $validator(): SchemaTypes {
    let schema: SchemaTypes

    if (this.$required) {
      schema = vine.string().email()
    } else {
      schema = vine.string().email().optional()
    }

    return schema
  }
}

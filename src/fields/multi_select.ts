import { SchemaTypes } from '@vinejs/vine/types'
import Select from './select.js'
import vine from '@vinejs/vine'

export default class MultiSelect extends Select {
  validator: SchemaTypes = vine.array(vine.string())

  formComponent(): string {
    return 'Admin$MultiSelect$Form'
  }

  indexComponent(): string {
    return 'Admin$MultiSelect$Index'
  }
}

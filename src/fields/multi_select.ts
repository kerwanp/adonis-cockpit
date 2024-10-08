import { SchemaTypes } from '@vinejs/vine/types'
import Select from './select.js'
import vine from '@vinejs/vine'

export default class MultiSelect extends Select {
  validator: SchemaTypes = vine.array(vine.string())

  formComponent(): string {
    return 'CockpitMultiSelectForm'
  }

  indexComponent(): string {
    return 'CockpitMultiSelectIndex'
  }
}

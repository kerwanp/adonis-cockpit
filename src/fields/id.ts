import { FieldVisibility } from './field.js'
import Text from './text.js'

export default class Id extends Text {
  $sortable: boolean = true

  protected $visibility: FieldVisibility = {
    detail: true,
    index: true,
    edit: true,
    create: false,
  }

  constructor(name: string) {
    super(name)
    this.attribute('disabled', true)
  }

  indexComponent(): string {
    return 'Admin$Id$Index'
  }

  formComponent(): string {
    return 'Admin$Text$Form'
  }
}

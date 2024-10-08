import { FieldVisibility } from './field.js'
import Text from './text.js'

export default class Password extends Text {
  protected $visibility: FieldVisibility = {
    create: true,
    edit: true,
    index: false,
    detail: false,
  }

  constructor(name: string) {
    super(name)
  }

  formComponent(): string {
    return 'CockpitPasswordForm'
  }
}

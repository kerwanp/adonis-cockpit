import Text from './text.js'

export default class Email extends Text {
  constructor(name: string) {
    super(name)
    // this.attribute('type', 'email')
    this.validator = this.validator.email()
  }

  cellTemplate(): string {
    return 'admin::components/fields/email/cell'
  }
}

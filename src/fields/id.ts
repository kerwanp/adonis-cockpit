import Text from './text.js'

export default class Id extends Text {
  constructor(name: string) {
    super(name)
    this.attribute('disabled', true)
    this.validator = this.validator.optional()
  }
}

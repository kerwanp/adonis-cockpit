import Text from './text.js'

export default class Password extends Text {
  constructor(name: string) {
    super(name)
    this.attribute('type', 'password')
  }

  cellTemplate(): string {
    return 'admin::components/fields/text/cell'
  }
}

import { Field } from './field.js'

export default class Panel extends Field {
  #fields: Field[]

  constructor(name: string, fields: Field[]) {
    super(name)
    this.#fields = fields
  }

  tableHeadTemplate(): string {
    return 'admin::components/fields/panel/table-head'
  }

  fieldTemplate(): string {
    return 'admin::components/fields/panel/field'
  }

  cellTemplate(): string {
    return 'admin::components/fields/panel/cell'
  }

  fields() {
    return this.#fields
  }

  public static make<T extends Field>(
    this: new (title: string, fields: Field[]) => T,
    name: string,
    fields: Field[]
  ): T {
    const self = new this(name, fields)
    return self
  }
}

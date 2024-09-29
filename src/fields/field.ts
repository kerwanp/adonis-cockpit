import string from '@adonisjs/core/helpers/string'
import { SchemaTypes } from '@vinejs/vine/types'

export type FieldVisibility = 'create' | 'show' | 'edit' | 'index'

export abstract class Field {
  #name: string
  #label: string

  constructor(name: string) {
    this.#name = name
    this.#label = string.create(name).capitalCase().toString()
  }

  validator?: SchemaTypes

  renderCell?(value?: string): Promise<[string, any]>
  renderField?(value?: string): Promise<[string, any]>

  tableHeadTemplate(): string {
    return 'admin::components/fields/field/table-head'
  }

  cellTemplate?(): string
  fieldTemplate?(): string

  name(): string
  name(name: string): this
  name(name?: string): this | string {
    if (name) {
      this.#name = name
      return this
    }

    return this.#name
  }

  label(): string
  label(label: string): this
  label(label?: string): this | string {
    if (label) {
      this.#label = label
      return this
    }

    return this.#label
  }
}

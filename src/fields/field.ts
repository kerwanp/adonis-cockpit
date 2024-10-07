import string from '@adonisjs/core/helpers/string'
import { SchemaTypes } from '@vinejs/vine/types'
import { Serializable } from '../types.js'
import vine from '@vinejs/vine'

export type FieldVisibility = {
  create: boolean
  index: boolean
  detail: boolean
  edit: boolean
}

type FieldType = 'field' | 'panel'

export abstract class Field implements Serializable {
  $type: FieldType = 'field'

  $name: string
  $label: string
  $sortable = false
  $filterable = false
  $attributes: Record<string, any> = {}

  protected $visibility: FieldVisibility = { create: true, index: true, detail: true, edit: true }

  constructor(name: string) {
    this.$name = name
    this.$label = string.create(name).capitalCase().toString()
  }

  validator: SchemaTypes = vine.any().optional()

  renderCell?(value?: string): Promise<[string, any]>
  renderField?(value?: string): Promise<[string, any]>

  tableHeadTemplate(): string {
    return 'admin::components/fields/field/table-head'
  }

  /**
   * Returns the component name for the index vue.
   */
  indexComponent?(): string

  /**
   * Returns the component name for the form vue.
   */
  formComponent?(): string

  /**
   * Returns the component name for the detail vue.
   */
  detailComponent?(): string

  /**
   * Defines the name of this field.
   */
  name(name: string): this {
    this.$name = name
    return this
  }

  /**
   * Defines the label of this field.
   */
  label(label: string): this {
    this.$label = label
    return this
  }

  /**
   * Makes this field sortable in the index view.
   */
  sortable(sortable = true): this {
    this.$sortable = sortable
    return this
  }

  /**
   * Makes this field filterable in the index view.
   */
  filterable(filterable = true): this {
    this.$filterable = filterable
    return this
  }

  /**
   * Defines an attribute to the field.
   *
   * @example Text.make('title').attribute('placeholder', 'Insert title')
   */
  attribute(name: string, value: any): this {
    this.$attributes[name] = value
    return this
  }

  /**
   * Display the field on specific views.
   *
   * @example Text.make('email').showOn('create', 'index')
   */
  showOn(...visibilities: (keyof FieldVisibility)[]): this {
    for (const visibility of visibilities) {
      this.$visibility[visibility] = true
    }
    return this
  }

  /**
   * Hide the field on specific views.
   *
   * @example Text.make('email').hideOn('create', 'index')
   */
  hideOn(...visibilities: (keyof FieldVisibility)[]): this {
    for (const visibility of visibilities) {
      this.$visibility[visibility] = true
    }
    return this
  }

  /**
   * Show this field on index view.
   *
   * @example Text.make('email').showOnIndex()
   */
  showOnIndex(): this {
    this.$visibility.index = true
    return this
  }

  /**
   * Show this field on detail view.
   *
   * @example Text.make('email').showOnIndex()
   */
  showOnDetail(): this {
    this.$visibility.detail = true
    return this
  }

  /**
   * Show this field on create view.
   *
   * @example Text.make('email').showOnCreate()
   */
  showOnCreate(): this {
    this.$visibility.create = true
    return this
  }

  /**
   * Show this field on edit view.
   *
   * @example Text.make('email').showOnEdit()
   */
  showOnEdit(): this {
    this.$visibility.edit = true
    return this
  }

  /**
   * Hide this field from index view.
   *
   * @example Text.make('email').hideFromIndex()
   */
  hideFromIndex(): this {
    this.$visibility.index = false
    return this
  }

  /**
   * Hide this field from create view.
   *
   * @example Text.make('email').hideFromCreate()
   */
  hideFromCreate(): this {
    this.$visibility.create = false
    return this
  }

  /**
   * Hide this field from edit view.
   *
   * @example Text.make('email').hideFromEdit()
   */
  hideFromEdit(): this {
    this.$visibility.edit = false
    return this
  }

  /**
   * Only show this field on index view.
   *
   * @example Text.make('email').onlyOnIndex()
   */
  onlyOnIndex(): this {
    this.$visibility = {
      create: false,
      edit: false,
      detail: false,
      index: true,
    }
    return this
  }

  /**
   * Only show this field on detail view.
   *
   * @example Text.make('email').onlyOnDetail()
   */
  onlyOnDetail(): this {
    this.$visibility = {
      create: false,
      edit: false,
      detail: true,
      index: false,
    }
    return this
  }

  /**
   * Only show this field on form views.
   *
   * @example Text.make('email').onlyOnForms()
   */
  onlyOnForms(): this {
    this.$visibility = {
      create: true,
      edit: true,
      detail: false,
      index: false,
    }
    return this
  }

  /**
   * Show this field on every view except forms.
   *
   * @example Text.make('email').exceptOnForms()
   */
  exceptOnForms(): this {
    this.$visibility = {
      create: true,
      edit: true,
      detail: false,
      index: false,
    }
    return this
  }

  /**
   * Validates a value against this field.
   */
  async $validate(value: any): Promise<any> {
    return value
  }

  toJSON() {
    return {
      type: this.$type,
      fieldComponent: this.formComponent?.(),
      indexComponent: this.indexComponent?.(),
      detailComponent: this.detailComponent?.(),
      attributes: this.$attributes,
      visibility: this.$visibility,
      sortable: this.$sortable,
      name: this.$name,
      label: this.$label,
    }
  }
}

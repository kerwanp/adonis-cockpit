import { AsyncLocalStorage } from 'node:async_hooks'
import string from '@adonisjs/core/helpers/string'
import router from '@adonisjs/core/services/router'
import { CrudAction, RecordId, Serializable } from '../types.js'
import { Field } from '../fields/field.js'
import { ApiIndexInputParams } from '../routes/handlers/api/index.js'
import { SimplePaginatorContract } from '@adonisjs/lucid/types/querybuilder'
import { Action } from '../actions/action.js'

export abstract class BaseResource<Record = any> implements Serializable {
  static storage = new AsyncLocalStorage<BaseResource>()

  /**
   * The fields configuration for this resource.
   */
  abstract fields(): Field[]

  /**
   * The name used to identify this resource.
   *
   * @example "user"
   */
  abstract name(): string

  /**
   * The label of the resource.
   *
   * @example "User"
   */
  label(): string {
    return string.capitalCase(this.name())
  }

  /**
   * The plural name of the resource.
   *
   * @example "Users"
   */
  labelPlural(): string {
    return string.plural(this.label())
  }

  /**
   * The id key of this model.
   *
   * @example "id"
   * @default this.model.primaryKey
   */
  abstract idKey(): string

  /**
   * The icon of the resource.
   *
   * @example "pi pi-user"
   */
  icon?(): string

  /**
   * Title key of this resource.
   * Defaults to the idKey.
   *
   * @example "email"
   */
  titleKey(): string {
    return this.idKey()
  }

  route(action: 'show' | 'delete' | 'edit', id: string): string
  route(action: 'index' | 'create'): string
  route(action: CrudAction, id?: string): string {
    return router.makeUrl(`cockpit.resources.${action}`, { id, slug: this.name() })
  }

  /**
   * Operation for creating a record.
   */
  abstract create(data: any): Promise<Record>

  /**
   * Operation for querying the resource records.
   */
  abstract list(params: ApiIndexInputParams): Promise<SimplePaginatorContract<Record>>

  /**
   * Operation for retrieving a single record of the model.
   */
  abstract retrieve(id: RecordId): Promise<Record>

  /**
   * Operation for updating a record.
   */
  abstract update(id: RecordId, data: any): Promise<Record>

  /**
   * Operation for deleting records by ids.
   */
  abstract delete(...ids: RecordId[]): Promise<void>

  /**
   * Validate the given data over this Resource.
   */
  abstract validate(data: any): Promise<Record>

  /**
   * The list of available actions.
   */
  abstract actions(): Action[]

  /**
   * Serialize this resource for the frontend.
   * Skip fields omit the fields to avoid infinite loop.
   */
  toJSON(skipFields?: boolean) {
    return BaseResource.storage.run(this, () => {
      return {
        name: this.name(),
        label: this.label(),
        labelPlural: this.labelPlural(),
        icon: this.icon?.(),
        slug: this.name(),
        idKey: this.idKey(),
        titleKey: this.titleKey(),
        actions: this.actions().map((action) => action.toJSON()),
        routes: {
          create: this.route('create'),
          index: this.route('index'),
        },
        fields: skipFields ? [] : this.fields().map((field) => field.toJSON()),
      }
    })
  }
}

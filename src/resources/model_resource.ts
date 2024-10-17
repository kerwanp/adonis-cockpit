import { LucidModel } from '@adonisjs/lucid/types/model'
import { BaseResource } from './base_resource.js'
import { ApiIndexParams } from '../routes/handlers/api/index.js'
import { SchemaTypes } from '@vinejs/vine/types'
import vine from '@vinejs/vine'
import { Action } from '../actions/action.js'
import { DeleteAction } from '../actions/delete.js'
import stringHelpers from '@adonisjs/core/helpers/string'
import { RecordId } from '../types.js'
import { SimplePaginatorContract } from '@adonisjs/lucid/types/querybuilder'

export abstract class ModelResource<Model extends LucidModel = LucidModel> extends BaseResource<
  InstanceType<Model>
> {
  abstract model: Model

  /**
   * The relations that must be preloaded.
   */
  $preload: string[] = []

  /**
   * The searchable fields of this resource.
   */
  searchable(): string[] {
    return [this.idKey(), this.titleKey()]
  }

  name(): string {
    return stringHelpers.create(this.model.table).noCase().slugify().toString()
  }

  idKey(): string {
    return this.model.primaryKey
  }

  label(): string {
    return stringHelpers.create(this.name()).noCase().capitalCase().singular().toString()
  }

  actions(): Action[] {
    return [DeleteAction.make()]
  }

  create(data: any): Promise<InstanceType<Model>> {
    return this.model.create(data)
  }

  baseQuery() {
    const query = this.model.query()

    for (const relation of this.$preload) {
      query.preload(relation as any) // TODO: Maybe this could be typed properly
    }

    return query
  }

  async list(params: ApiIndexParams): Promise<SimplePaginatorContract<InstanceType<Model>>> {
    const query = this.baseQuery()

    if (params.search) {
      query.andWhere((q) => {
        for (const key of this.searchable()) {
          q.orWhere(key, `%${params.search}%`)
        }
      })
    }

    if (params.sorts) {
      for (const { field, direction } of params.sorts) {
        query.orderBy(field, direction)
      }
    }

    if (params.filters) {
      for (const { field, value } of params.filters) {
        query.andWhere(field, value)
      }
    }

    const paginator = await query
      .rowTransformer((row) => row.serialize())
      .paginate(params.page ?? 1, params.perPage)

    // TODO: Fix types
    return paginator as SimplePaginatorContract<InstanceType<Model>>
  }

  retrieve(id: RecordId): Promise<InstanceType<Model>> {
    return this.baseQuery().where(this.idKey(), id).firstOrFail()
  }

  async update(id: RecordId, data: any): Promise<InstanceType<Model>> {
    const record = await this.retrieve(id)
    record.merge(data)
    return record.save()
  }

  async delete(...ids: RecordId[]): Promise<void> {
    await this.model.query().delete().whereIn('id', ids)
  }

  async validate(data: any): Promise<any> {
    const obj: Record<string, SchemaTypes> = {}
    const fields = BaseResource.storage.run(this, () => this.fields())

    for (const field of fields) {
      const validator = field.$validator()
      if (validator) {
        obj[field.$name] = validator
      }
    }

    const validator = vine.compile(vine.object(obj))

    return validator.validate(data)
  }
}

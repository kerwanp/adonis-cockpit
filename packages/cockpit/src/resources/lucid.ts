import type {
  RecordId,
  ResourceListParams,
  ResourceRetrieveParams,
} from "../types.js";
import stringHelpers from "@adonisjs/core/helpers/string";
import { LucidModel, LucidRow } from "@adonisjs/lucid/types/model";
import { BaseResource } from "./base_resource.js";
import { SimplePaginatorContract } from "@adonisjs/lucid/types/querybuilder";
import { extendQuery } from "@adonis-cockpit/lucid-filter";

export abstract class BaseLucidResource<
  TModel extends LucidModel = LucidModel,
  TRecord extends LucidRow = InstanceType<TModel>,
> extends BaseResource<TRecord> {
  abstract model: TModel;

  name(): string {
    return stringHelpers.create(this.model.table).noCase().slugify().toString();
  }

  idKey(): string {
    return this.model.primaryKey;
  }

  baseQuery() {
    const query = this.model.query();
    return query;
  }

  async list(params: ResourceListParams) {
    const query = extendQuery({
      query: this.baseQuery(),
      filter: params.filter,
      sort: params.sort,
      ...(params.query
        ? {
            search: {
              query: params.query,
              keys: this.searchKeys(),
            },
          }
        : {}),
    });

    const paginator = await query.paginate(params.page, params.perPage);

    return paginator as any as SimplePaginatorContract<TRecord>;
  }

  async retrieve(params: ResourceRetrieveParams) {
    return this.model
      .query()
      .where(this.idKey(), params.id)
      .firstOrFail() as Promise<TRecord>;
  }

  async update(id: RecordId, data: any): Promise<TRecord> {
    const record = await this.retrieve({ id });
    record.merge(data);
    return record.save();
  }

  async create(data: any): Promise<TRecord> {
    const record = await this.model.create(data);
    return record as TRecord;
  }

  async delete(...ids: RecordId[]): Promise<void> {
    await this.model.query().delete().whereIn("id", ids);
  }

  toJSON() {
    return super.toJSON();
  }
}

export function LucidResource<T extends LucidModel>(model: T) {
  abstract class LucidResourceImpl extends BaseLucidResource<T> {
    model = model;
  }

  return LucidResourceImpl;
}

import type {
  RecordId,
  ResourceListParams,
  ResourceRetrieveParams,
} from "../types.js";
import stringHelpers from "@adonisjs/core/helpers/string";
import { LucidModel, LucidRow } from "@adonisjs/lucid/types/model";
import { BaseResource } from "./base_resource.js";
import { SimplePaginatorContract } from "@adonisjs/lucid/types/querybuilder";

export abstract class ModelResource<
  Model extends LucidModel = LucidModel,
  Record extends LucidRow = InstanceType<Model>,
> extends BaseResource<Record> {
  abstract model: Model;

  constructor() {
    super();
  }

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
    const query = this.baseQuery();
    const paginator = await query.paginate(params.page, params.perPage);
    return paginator as SimplePaginatorContract<Record>;
  }

  async retrieve(params: ResourceRetrieveParams) {
    return this.model
      .query()
      .where(this.idKey(), params.id)
      .firstOrFail() as Promise<Record>;
  }

  async update(id: RecordId, data: any): Promise<Record> {
    const record = await this.retrieve({ id });
    record.merge(data);
    return record.save();
  }

  async delete(...ids: RecordId[]): Promise<void> {
    await this.model.query().delete().whereIn("id", ids);
  }

  toJSON() {
    return super.toJSON();
  }
}

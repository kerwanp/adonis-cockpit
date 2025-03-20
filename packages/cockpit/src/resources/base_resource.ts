import type { Field } from "../fields/field.js";
import type { SimplePaginatorContract } from "@adonisjs/lucid/types/querybuilder";
import string from "@adonisjs/core/helpers/string";
import {
  RecordId,
  ResourceListParams,
  ResourceRetrieveParams,
} from "../types.js";

export abstract class BaseResource<R = any> {
  /**
   * The name used to identify this resource.
   *
   * @example "user"
   */
  abstract name(): string;

  /**
   * The id key of this resource.
   *
   * @example "id"
   * @default this.model.primaryKey
   */
  abstract idKey(): string;

  /**
   * Title key of this resource.
   * Defaults to the idKey.
   *
   * @example "email"
   */
  titleKey(): string {
    return this.idKey();
  }

  /**
   * The label of the resource.
   *
   * @example "User"
   */
  label(): string {
    return string.capitalCase(this.name());
  }

  /**
   * The plural name of the resource.
   *
   * @example "Users"
   */
  labelPlural(): string {
    return string.plural(this.label());
  }

  /**
   * The fields configuration for this resource.
   */
  abstract fields(): Field[];

  /**
   * Operation for querying the resource records.
   */
  abstract list(
    params: ResourceListParams,
  ): Promise<SimplePaginatorContract<R>>;

  /**
   * Operation for updating a record.
   */
  abstract update(id: RecordId, data: any): Promise<R>;

  /**
   * Operation for querying a single resource record.
   */
  abstract retrieve(params: ResourceRetrieveParams): Promise<R>;

  /**
   * Operation for deleting records by ids.
   */
  abstract delete(...ids: RecordId[]): Promise<void>;

  toJSON() {
    return {
      name: this.name(),
      idKey: this.idKey(),
      titleKey: this.titleKey(),
      label: this.label(),
      labelPlural: this.labelPlural(),
      fields: this.fields().map((field) => field.toJSON()),
    };
  }
}

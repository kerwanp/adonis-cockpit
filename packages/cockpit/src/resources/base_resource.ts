import type { SimplePaginatorContract } from "@adonisjs/lucid/types/querybuilder";
import string from "@adonisjs/core/helpers/string";
import {
  RecordId,
  ResourceListParams,
  ResourceRetrieveParams,
} from "../types.js";
import { AsyncLocalStorage } from "node:async_hooks";
import { LayoutBuilder } from "../fields/builder.js";
import { BaseLayout } from "../fields/main.js";
import router from "@adonisjs/core/services/router";

export abstract class BaseResource<TRecord extends Record<string, any> = any> {
  static storage = new AsyncLocalStorage<BaseResource>();

  /**
   * The name used to identify this resource.
   *
   * @example "user"
   */
  abstract name(): string;

  /**
   * The resource icon.
   *
   * @example "user"
   */
  icon(): string | undefined {
    return;
  }

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
   * Keys to perform search query.
   * Defaults to the idKey and titleKey.
   *
   * @example ["id", "email", "firstName"]
   */
  searchKeys(): string[] {
    return [this.idKey(), this.titleKey()];
  }

  /**
   * The label of the resource.
   *
   * @example "User"
   */
  label(): string {
    return string.create(this.name()).capitalCase().singular().toString();
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
  abstract fields(form: LayoutBuilder<TRecord>): BaseLayout[];

  /**
   * Operation for querying the resource records.
   */
  abstract list(
    params: ResourceListParams,
  ): Promise<SimplePaginatorContract<TRecord>>;

  /**
   * Operation for updating a record.
   */
  abstract update(id: RecordId, data: any): Promise<TRecord>;

  /**
   * Operation for querying a single resource record.
   */
  abstract retrieve(params: ResourceRetrieveParams): Promise<TRecord>;

  /**
   * Operation for creating a single resource record.
   */
  abstract create(data: any): Promise<TRecord>;

  /**
   * Operation for deleting records by ids.
   */
  abstract delete(...ids: RecordId[]): Promise<void>;

  route() {
    return router.makeUrl("cockpit.resources.index", {
      resource: this.name(),
    });
  }

  toJSON() {
    return BaseResource.storage.run(this, () => {
      return {
        name: this.name(),
        icon: this.icon(),
        idKey: this.idKey(),
        titleKey: this.titleKey(),
        label: this.label(),
        labelPlural: this.labelPlural(),
        fields: this.fields(new LayoutBuilder()).map((field) => field.toJSON()),
        route: this.route(),
      };
    });
  }
}

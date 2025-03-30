import {
  LucidModel,
  ModelQueryBuilderContract,
} from "@adonisjs/lucid/types/model";
import { Filter } from "./types.js";

export function filterQuery<Model extends LucidModel = LucidModel>(
  query: ModelQueryBuilderContract<Model, InstanceType<Model>>,
  filter: Filter,
): ModelQueryBuilderContract<Model, InstanceType<Model>> {
  if ("or" in filter) {
    return query.orWhere((q) => filterQuery(q, filter.or));
  }

  if ("and" in filter) {
    return query.andWhere((q) => filterQuery(q, filter.and));
  }

  if (filter.operator === "equals") {
    return query.where(filter.property, "=", filter.value);
  }

  if (filter.operator === "contains") {
    return query.whereLike(filter.property, `%${filter.value}%`);
  }

  return query;
}

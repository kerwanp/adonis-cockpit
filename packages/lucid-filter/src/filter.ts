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
    return query.orWhere((q) => filter.or.map((f) => filterQuery(q, f)));
  }

  if ("and" in filter) {
    return query.andWhere((q) => filter.and.map((f) => filterQuery(q, f)));
  }

  if (filter.operator === "equals") {
    return query.where(filter.property, "=", filter.value);
  }

  if (filter.operator === "contains") {
    return query.whereLike(filter.property, `%${filter.value}%`);
  }

  return query;
}

import {
  LucidModel,
  ModelQueryBuilderContract,
} from "@adonisjs/lucid/types/model";
import { filterQuery } from "./filter.js";
import { sortQuery } from "./sort.js";
import { ExtendQueryOptions } from "./types.js";
import { searchQuery } from "./search.js";

export function extendQuery<Model extends LucidModel = LucidModel>({
  query,
  filter,
  sort,
  search,
}: ExtendQueryOptions<Model>): ModelQueryBuilderContract<
  Model,
  InstanceType<Model>
> {
  query.orWhere((q) => {
    if (filter) q = filterQuery(q, filter);
    if (search) q = searchQuery(q, search);
  });

  if (sort) {
    query = sortQuery(query, sort);
  }

  return query;
}

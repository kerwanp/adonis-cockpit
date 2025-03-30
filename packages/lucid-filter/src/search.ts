import {
  LucidModel,
  ModelQueryBuilderContract,
} from "@adonisjs/lucid/types/model";
import { Search } from "./types.js";

export function searchQuery<Model extends LucidModel = LucidModel>(
  query: ModelQueryBuilderContract<Model, InstanceType<Model>>,
  search: Search,
): ModelQueryBuilderContract<Model, InstanceType<Model>> {
  query.orWhere((q) => {
    for (const key of search.keys) {
      q.orWhereLike(key, `%${search.query}%`);
    }
  });

  return query;
}

import {
  LucidModel,
  ModelQueryBuilderContract,
} from "@adonisjs/lucid/types/model";
import { Sort } from "./types.js";

export function sortQuery<Model extends LucidModel = LucidModel>(
  query: ModelQueryBuilderContract<Model, InstanceType<Model>>,
  sort: Sort,
): ModelQueryBuilderContract<Model, InstanceType<Model>> {
  return query.orderBy(
    sort.map((s) => ({ column: s.property, order: s.direction })),
  );
}

import {
  LucidModel,
  ModelQueryBuilderContract,
} from "@adonisjs/lucid/types/model";

export type FilterOperator = "contains" | "equals";

export type Filter =
  | {
      property: string;
      operator: FilterOperator;
      value: any;
    }
  | { or: Filter[] }
  | { and: Filter[] };

export type Sort = {
  property: string;
  direction: "asc" | "desc";
}[];

export type Search = {
  query: string;
  keys: string[];
};

export type ExtendQueryOptions<Model extends LucidModel = LucidModel> = {
  query: ModelQueryBuilderContract<Model, InstanceType<Model>>;
  search?: Search;
  filter?: Filter;
  sort?: Sort;
};

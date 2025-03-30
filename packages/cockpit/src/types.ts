import type { JsonObject } from "type-fest";
import { Filter, Sort } from "@adonis-cockpit/lucid-filter/types";
import { HttpContext } from "@adonisjs/core/http";
import { Menu } from "./menu/menu.js";
import { BaseResource } from "./resources/base_resource.js";

export interface Serializable<T = any> {
  toJSON(): T;
}

export type LazyImport<T> = () => Promise<{ default: T }>;

// ----------
// Config
// ----------
export type CockpitConfig = {
  url: string;
  menu: LazyImport<Menu>;
  resources: LazyImport<typeof BaseResource<any>>[];
  auth: {
    loginUrl: string;
    logoutUrl: string;
    user?: (ctx: HttpContext) => User;
  };
};

export type ResolvedConfig = CockpitConfig;

export type ResourceListParams = {
  page: number;
  perPage: number;
  query?: string;
  filter?: Filter;
  sort?: Sort;
};

export type ResourceRetrieveParams = {
  id: RecordId;
};

export type RecordId = string | number;

export type ResourceRecord = JsonObject;

export type InferSerializable<T extends Serializable> = ReturnType<T["toJSON"]>;

export type User = {
  avatar?: string;
  username?: string;
  email?: string;
};

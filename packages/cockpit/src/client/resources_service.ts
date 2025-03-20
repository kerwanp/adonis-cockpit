import type { InferSerializable, RecordId } from "../types.js";
import type { SimplePaginator } from "@adonisjs/lucid/database";
import ky from "ky";

export type ListParams = {};
type ListReturn = InferSerializable<SimplePaginator>;

const client = ky.create();

export class ResourceService {
  static async list(name: string, params: ListParams) {
    return client.get<ListReturn>(`/admin/api/resources/${name}`, {
      searchParams: params,
    });
  }

  static async retrieve(slug: string, id: RecordId) {
    return client.get(`/admin/api/${slug}/${id}`);
  }

  static async create(name: string, data: any) {
    return client.post(`/admin/api/${name}`, { body: data });
  }

  static async update(slug: string, id: RecordId, data: any) {
    return client.put(`/admin/api/${slug}/${id}`, { body: data });
  }

  static async delete(name: string, id: RecordId) {
    return client.delete(`/admin/api/${name}/${id}`);
  }

  static async action(slug: string, action: string, ids: RecordId[]) {
    return client.post(`/admin/api/${slug}/actions/${action}`);
  }

  static makeUrl(name: string, type: "edit" | "detail", id: RecordId): string;
  static makeUrl(name: string, type: "index" | "create"): string;
  static makeUrl(
    name: string,
    type: "index" | "create" | "edit" | "detail",
    id?: RecordId,
  ): string {
    if (type === "index") {
      return `/admin/resources/${name}`;
    }

    if (type === "create") {
      return `/admin/resources/${name}/create`;
    }

    if (type === "detail") {
      return `/admin/resources/${name}/${id}`;
    }

    return `/admin/resources/${name}/${id}/${type}`;
  }
}

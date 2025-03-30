import type {
  InferSerializable,
  RecordId,
  ResourceListParams,
} from "../types.js";
import type { SimplePaginator } from "@adonisjs/lucid/database";
import ky from "ky";
import qs from "qs";

type ListReturn = InferSerializable<SimplePaginator>;

const client = ky.create();

export class ResourceService {
  static async list(resource: string, params: ResourceListParams) {
    return client.get<ListReturn>(`/admin/api/resources/${resource}`, {
      searchParams: qs.stringify(params),
    });
  }

  static async retrieve(resource: string, id: RecordId) {
    return client.get<Record<string, any>>(
      `/admin/api/resources/${resource}/${id}`,
    );
  }

  static async create(resource: string, data: any) {
    return client.post(`/admin/api/resources/${resource}`, { json: { data } });
  }

  static async update(resource: string, id: RecordId, data: any) {
    return client.put(`/admin/api/resources/${resource}/${id}`, {
      json: { data },
    });
  }

  static async delete(name: string, id: RecordId) {
    return client.delete(`/admin/api/resources/${name}/${id}`);
  }

  static async action(slug: string, action: string, _ids: RecordId[]) {
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

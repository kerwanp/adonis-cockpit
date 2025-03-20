import type { JsonObject, JsonValue } from "type-fest";

export interface Serializable<T extends JsonValue = JsonValue> {
  toJSON(): T;
}

export type ResourceListParams = {
  page: number;
  perPage: number;
};

export type ResourceRetrieveParams = {
  id: RecordId;
};

export type RecordId = string | number;

export type ResourceRecord = JsonObject;

export type InferSerializable<T extends Serializable> = ReturnType<T["toJSON"]>;

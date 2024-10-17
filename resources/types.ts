import type { BaseResource } from '../src/resources/base_resource.js'
import type { InferSerializable, User } from '../src/types.js'

export type Resource = InferSerializable<BaseResource>
export type ResourceRecord = Record<string, any>

export type { RecordId, InferSerializable } from '../src/types.js'

export type ViaRelationship = {
  resource: string
  foreignKey: string
  value: string
}

export type AuthOptions = {
  logoutUrl: string
  user: User
}

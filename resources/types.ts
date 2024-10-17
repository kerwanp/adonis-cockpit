import type { BaseResource } from '../src/resources/base_resource.js'
import type { InferSerializable } from '../src/types.js'

export type Resource = InferSerializable<BaseResource>
export type ResourceRecord = Record<string, any>

export type { RecordId, InferSerializable } from '../src/types.js'

import { inject, provide } from 'vue'
import { BaseResource } from '../../src/resources/base_resource.js'
import { InferSerializable } from '../../src/types.js'

export function provideResources(resources: Record<string, InferSerializable<BaseResource>>) {
  return provide('resources', resources)
}

export function injectResources() {
  const resources = inject<Record<string, InferSerializable<BaseResource>>>('resources')
  if (!resources) throw new Error('Resources are not provided')
  return resources
}

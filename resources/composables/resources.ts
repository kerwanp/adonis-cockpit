import type { Resource } from '../types.js'
import { inject, provide } from 'vue'

export function provideResources(resources: Record<string, Resource>) {
  return provide('resources', resources)
}

export function injectResources() {
  const resources = inject<Record<string, Resource>>('resources')
  if (!resources) throw new Error('Resources are not provided')
  return resources
}

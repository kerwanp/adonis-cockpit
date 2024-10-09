<script setup lang="ts">
import type BelongsTo from '../../../../src/fields/belongs_to'
import type { InferSerializable } from '../../../../src/types'
import ResourcePeek from '../../resource-peek.vue'
import { ref } from 'vue'
import { injectResource, useResourceQuery } from '../../../composables/resource'
import { injectResources } from '../../../composables/resources'

const props = defineProps<{
  field: InferSerializable<BelongsTo>
  value: any
}>()

const opened = ref(false)
const popover = ref()

const resources = injectResources()
const resource = injectResource()
const { data } = useResourceQuery(resource, props.value, opened)

console.log(resources, props.field.resource.name, resources[props.field.resource.name])

function toggle(event: Event) {
  opened.value = true
  popover.value.toggle(event)
}
</script>

<template>
  <Button @click="toggle" size="small" text :label="`#${value}`" severity="info" />
  <Popover ref="popover" class="px-2">
    <ResourcePeek v-if="data" :resource="resources[field.resource.name]" :data="data" />
  </Popover>
</template>

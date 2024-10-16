<script setup lang="ts">
import type BelongsTo from '../../../../src/fields/belongs_to'
import type { InferSerializable } from '../../../../src/types'
import ResourcePeek from '../../resource-peek.vue'
import { ref } from 'vue'
import { useResourceQuery } from '../../../composables/resource'
import { injectResources } from '../../../composables/resources'
import Popover from 'primevue/popover'
import Button from 'primevue/button'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  field: InferSerializable<BelongsTo>
  value: any
  record: any
}>()

const opened = ref(false)
const popover = ref()

const resources = injectResources()
const { data } = useResourceQuery(props.field.resource.name, props.value, opened)

function toggle(event: Event) {
  opened.value = true
  popover.value.toggle(event)
}

const relation = props.record[props.field.relationship.relationName]
const label = relation[props.field.resource.titleKey] ?? props.value
</script>

<template>
  <Button @click="toggle" size="small" text :label="label" severity="info" />
  <Popover ref="popover" class="px-2">
    <ResourcePeek v-if="data" :resource="resources[field.resource.name]" :data="data" />
  </Popover>
</template>

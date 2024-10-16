<script setup lang="ts">
import { ref } from 'vue'
import HasMany from '../../../../src/fields/has_many'
import type { InferSerializable } from '../../../../src/types'
import { useResourceQuery } from '../../../composables/resource'
import { injectResources } from '../../../composables/resources'
import Popover from 'primevue/popover'
import Button from 'primevue/button'
import ResourcePeek from '../../resource-peek.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  field: InferSerializable<HasMany>
  value: any
  record: any
}>()

const opened = ref(false)
const recordId = ref<string>('')
const peekPopover = ref()
const morePopover = ref()

const resources = injectResources()
const { data } = useResourceQuery(props.field.resource.name, recordId, opened)

const relations = props.record[props.field.relationship.relationName]

function togglePeek(event: Event, id: string) {
  recordId.value = id
  opened.value = true
  peekPopover.value.toggle(event)
}

function toggleMore(event: Event) {
  morePopover.value.toggle(event)
}
</script>

<template>
  <div>
    <Button
      v-for="relation of relations.slice(0, 3)"
      @click="togglePeek($event, relation[field.resource.idKey])"
      size="small"
      text
      :label="relation[field.resource.titleKey].toString()"
      severity="info"
    />
    <template v-if="relations.length > 3">
      <Button @click="toggleMore" size="small" text severity="info"
        >and {{ relations.length - 3 }} more</Button
      >
    </template>
  </div>
  <Popover ref="morePopover" class="max-w-64">
    <div>
      <Button
        v-for="relation of relations"
        @click="togglePeek($event, relation[field.resource.idKey])"
        size="small"
        text
        :label="relation[field.resource.titleKey].toString()"
        severity="info"
      />
    </div>
  </Popover>
  <Popover ref="peekPopover" class="px-2">
    <ResourcePeek v-if="data" :resource="resources[field.resource.name]" :data="data" />
  </Popover>
</template>

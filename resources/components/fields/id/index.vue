<script setup lang="ts">
import type { Field } from '../../../../src/fields/field'
import type { InferSerializable, RecordId } from '../../../../src/types'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  field: InferSerializable<Field>
  value: RecordId
  record: any
}>()
</script>

<template>
  <span class="text-muted-color" v-if="Number.isInteger(value)">#{{ value }}</span>
  <span class="text-muted-color" v-else>{{ value }}</span>
</template>

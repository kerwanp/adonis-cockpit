<script setup lang="ts">
import type { Field } from '../../../../src/fields/field'
import type { InferSerializable } from '../../../../src/types'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  field: InferSerializable<Field>
  value?: string
  record: any
}>()
</script>

<template>
  <a v-if="value" class="text-muted-color-emphasis" :href="`mailto:${value}`">{{ value }}</a>
</template>

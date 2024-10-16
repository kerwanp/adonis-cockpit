<script setup lang="ts">
import type Boolean from '../../../../src/fields/boolean'
import type { InferSerializable } from '../../../../src/types'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  field: InferSerializable<Boolean>
  value?: any
  record: any
}>()
</script>

<template>
  <template v-if="value === field.trueValue">
    <span aria-label="true" class="pi pi-check-circle text-green-400"></span>
  </template>
  <template v-else-if="value === field.falseValue">
    <span aria-label="false" class="pi pi-times-circle text-red-400"></span>
  </template>
  <template v-else>
    <span aria-label="unknown" class="pi pi-minus-circle text-muted-contrast"></span>
  </template>
</template>

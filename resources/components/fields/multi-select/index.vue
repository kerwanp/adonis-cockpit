<script setup lang="ts">
import Select from '../../../../src/fields/select'
import { InferSerializable } from '../../../../src/types'

defineProps<{
  field: InferSerializable<Select>
  value?: string[]
}>()
</script>

<template>
  <div v-if="value" class="flex gap-1">
    <Tag v-for="v of value" :value="field.options[v]" class="text-xs" />
  </div>
</template>

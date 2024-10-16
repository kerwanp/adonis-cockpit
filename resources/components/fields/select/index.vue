<script setup lang="ts">
import type Select from '../../../../src/fields/select'
import type { InferSerializable } from '../../../../src/types'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  field: InferSerializable<Select>
  value: any
  record: any
}>()
</script>

<template>{{ value }}</template>

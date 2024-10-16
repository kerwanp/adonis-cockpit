<script setup lang="ts">
import type { Field } from '../../../../src/fields/field'
import type { InferSerializable } from '../../../../src/types'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  field: InferSerializable<Field>
  value: any
  record: any
}>()
</script>

<template>{{ value }}</template>

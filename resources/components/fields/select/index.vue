<script setup lang="ts">
import type Select from '../../../../src/fields/select'
import type { InferSerializable } from '../../../../src/types'

defineProps<{
  field: InferSerializable<Select>
  value: any
}>()
</script>

<template>{{ value }}</template>

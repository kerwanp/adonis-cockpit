<script setup lang="ts">
import Select from '../../../../src/fields/select'
import { InferSerializable } from '../../../../src/types'

defineProps<{
  field: InferSerializable<Select>
  row: any
  value: any
}>()
</script>

<template>{{ value }}</template>

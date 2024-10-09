<script setup lang="ts">
import type { Field } from '../../../../src/fields/field'
import type { InferSerializable } from '../../../../src/types'

defineProps<{
  field: InferSerializable<Field>
  value: any
}>()
</script>

<template>{{ value }}</template>

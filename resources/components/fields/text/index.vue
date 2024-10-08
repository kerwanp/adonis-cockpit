<script setup lang="ts">
import { Field } from '../../../../src/fields/field'
import { InferSerializable } from '../../../../src/types'

defineProps<{
  field: InferSerializable<Field>
  value: any
}>()
</script>

<template>{{ value }}</template>

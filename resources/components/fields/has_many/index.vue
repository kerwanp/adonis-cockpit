<script setup lang="ts">
import type { Field } from '../../../../src/fields/field'
import type { InferSerializable } from '../../../../src/types'

defineProps<{
  field: InferSerializable<Field>
  row: any
  value: any
}>()
</script>

<template>TESTEST</template>

<script setup lang="ts">
import { Field } from '../../../../src/fields/field'
import { InferSerializable } from '../../../../src/types'

defineProps<{
  field: InferSerializable<Field>
  row: any
  value: any
}>()
</script>

<template>TESTEST</template>

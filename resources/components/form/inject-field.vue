<script setup lang="ts">
import type { Field } from '../../../src/fields/field'
import type { InferSerializable } from '../../../src/types'
import { provideField } from '../../composables/field'

const props = defineProps<{
  field: InferSerializable<Field>
}>()

provideField(props.field)
</script>

<template>
  <slot />
</template>

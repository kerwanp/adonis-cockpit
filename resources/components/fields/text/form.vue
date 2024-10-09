<script setup lang="ts">
import InputText from 'primevue/inputtext'
import type Text from '../../../../src/fields/text'
import type { InferSerializable } from '../../../../src/types'

defineProps<{
  error?: string[]
  field: InferSerializable<Text>
}>()

const model = defineModel<any>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <InputText
      :id="field.name"
      :name="field.name"
      :invalid="!!error?.length"
      v-model="model"
      v-bind="field.attributes"
    />
    <small class="text-red-400" v-if="error">{{ error.join('\n') }}</small>
  </div>
</template>

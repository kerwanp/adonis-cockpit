<script setup lang="ts">
import Password from 'primevue/password'
import type Text from '../../../../src/fields/text'
import type { InferSerializable } from '../../../../src/types'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  error?: string[]
  field: InferSerializable<Text>
  record: any
}>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <Password
      :id="field.name"
      :name="field.name"
      :invalid="!!error?.length"
      v-model="record[field.name]"
      v-bind="field.attributes"
    />
    <small class="text-red-400" v-if="error">{{ error.join('\n') }}</small>
  </div>
</template>

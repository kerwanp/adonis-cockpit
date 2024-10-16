<script setup lang="ts">
import Select from 'primevue/select'
import type SelectField from '../../../../src/fields/select'
import type { InferSerializable } from '../../../../src/types'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  error?: string[]
  field: InferSerializable<SelectField>
  record: any
}>()

const options = Object.entries(props.field.options).map(([value, label]) => ({
  label,
  value,
}))
</script>

<template>
  <div class="flex flex-col gap-2">
    <Select
      v-model="record[field.name]"
      :name="field.name"
      :input-id="field.name"
      option-label="label"
      option-value="value"
      :options="options"
    />
    <small class="text-red-400" v-if="error">{{ error.join('\n') }}</small>
  </div>
</template>

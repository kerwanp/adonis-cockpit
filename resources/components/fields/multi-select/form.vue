<script setup lang="ts">
import type MultiSelectField from '../../../../src/fields/multi_select'
import type { InferSerializable } from '../../../../src/types'
import MultiSelect from 'primevue/multiselect'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  error?: string[]
  field: InferSerializable<MultiSelectField>
  record: any
}>()

const options = Object.entries(props.field.options).map(([value, label]) => ({
  label,
  value,
}))
</script>

<template>
  <div class="flex flex-col gap-2">
    <MultiSelect
      v-model="record[field.name]"
      :name="field.name"
      :input-id="field.name"
      display="chip"
      option-label="label"
      option-value="value"
      :options="options"
    />
    <small class="text-red-400" v-if="error">{{ error.join('\n') }}</small>
  </div>
</template>

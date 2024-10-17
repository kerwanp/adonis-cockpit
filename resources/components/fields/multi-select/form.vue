<script setup lang="ts">
import type MultiSelectField from '../../../../src/fields/multi_select'
import MultiSelect from 'primevue/multiselect'
import FormMessage from '../../form/form-message.vue'
import { useField } from '../../../composables/field'

defineOptions({
  inheritAttrs: false,
})

const { field, name, value, errorMessage, handleBlur } = useField<MultiSelectField>()

const options = Object.entries(field.options).map(([value, label]) => ({
  label,
  value,
}))

console.log(value)
</script>

<template>
  <div class="flex flex-col gap-2">
    <MultiSelect
      v-model="value"
      :name="name"
      :input-id="name"
      display="chip"
      option-label="label"
      option-value="value"
      :options="options"
      :invalid="Boolean(errorMessage)"
      @blur="handleBlur"
    />
    <FormMessage />
  </div>
</template>

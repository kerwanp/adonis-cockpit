<script setup lang="ts">
import type SelectField from '../../../../src/fields/select'
import Select from 'primevue/select'
import FormMessage from '../../form/form-message.vue'
import { useField } from '../../../composables/field'

defineOptions({
  inheritAttrs: false,
})

const { field, value, name, errorMessage, handleBlur } = useField<SelectField>()

const options = Object.entries(field.options).map(([value, label]) => ({
  label,
  value,
}))
</script>

<template>
  <div class="flex flex-col gap-2">
    <Select
      :id="name"
      :name="name"
      :input-id="field.name"
      :options="options"
      :invalid="errorMessage"
      option-label="label"
      option-value="value"
      v-model="value"
      @blur="handleBlur"
    />
    <FormMessage />
  </div>
</template>

<script setup lang="ts">
import type Text from '../../../../src/fields/text'
import InputText from 'primevue/inputtext'
import FormMessage from '../../form/form-message.vue'
import { useField } from '../../../composables/field'

defineOptions({
  inheritAttrs: false,
})

const { field, name, value, errorMessage, handleBlur } = useField<Text>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <InputText
      :id="name"
      :name="name"
      :invalid="Boolean(errorMessage)"
      v-model="value"
      v-bind="field.attributes"
      @blur="handleBlur"
    />
    <FormMessage />
  </div>
</template>

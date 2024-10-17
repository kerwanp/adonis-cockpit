<script setup lang="ts">
import type PasswordField from '../../../../src/fields/password'
import Password from 'primevue/password'
import FormMessage from '../../form/form-message.vue'
import { useField } from '../../../composables/field'

defineOptions({
  inheritAttrs: false,
})

const { field, value, name, handleBlur, errorMessage } = useField<PasswordField>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <Password
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

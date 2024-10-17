<script setup lang="ts">
import type Boolean from '../../../../src/fields/boolean'
import ToggleSwitch from 'primevue/toggleswitch'
import FormMessage from '../../form/form-message.vue'
import { useField } from '../../../composables/field'

defineOptions({
  inheritAttrs: false,
})

const { field, name, value, errorMessage, handleBlur } = useField<Boolean>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <ToggleSwitch
      :id="name"
      :input-id="field.name"
      :true-value="field.trueValue"
      :false-value="field.falseValue"
      :invalid="!!errorMessage"
      v-model="value"
      @blur="handleBlur"
    />
    <FormMessage />
  </div>
</template>

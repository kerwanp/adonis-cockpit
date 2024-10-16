<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch'
import type Boolean from '../../../../src/fields/boolean'
import type { InferSerializable } from '../../../../src/types'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  error?: string[]
  field: InferSerializable<Boolean>
  record: any
}>()

const model = defineModel<string | boolean | undefined>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <ToggleSwitch
      v-model="model"
      :true-value="field.trueValue"
      :false-value="field.falseValue"
      :input-id="field.name"
      :invalid="!!error?.length"
    />
    <small class="text-red-400" v-if="error">{{ error.join('\n') }}</small>
  </div>
</template>

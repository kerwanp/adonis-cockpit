<script setup lang="ts">
import Boolean from '../../../../src/fields/boolean'
import { InferSerializable } from '../../../../src/types'

defineProps<{
  error?: string[]
  field: InferSerializable<Boolean>
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

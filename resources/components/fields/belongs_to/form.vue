<script setup lang="ts">
import type BelongsTo from '../../../../src/fields/belongs_to'
import { computed, ref, toValue } from 'vue'
import { useResourceApi } from '../../../composables/resource'
import Select from 'primevue/select'
import { useField } from '../../../composables/field'
import InputText from 'primevue/inputtext'
import { useFormValues } from 'vee-validate'
import { useSearchParams } from '../../../composables/route'
import { ViaRelationship } from '../../../types'

defineOptions({
  inheritAttrs: false,
})

const filter = ref('')
const params = useSearchParams<{ via?: ViaRelationship }>()
const record = useFormValues()
const { field, name, value, errorMessage, setValue, handleBlur } = useField<BelongsTo>()
const { data, isLoading } = useResourceApi.list(field.resource.slug, { search: filter })

const options = computed(() => {
  // TODO: This might not be really performant
  const options = data.value ? [...data.value.data] : []
  if (!options.some((r) => r[field.resource.idKey] === value.value)) {
    options.unshift(record.value[field.relationship.relationName])
  }
  return options
})

const isVia = params.via?.foreignKey === toValue(name)

if (isVia) {
  setValue(params.via?.value)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <Select
      :id="name"
      :name="name"
      v-model="value"
      :options="options"
      :loading="isLoading"
      :option-label="field.resource.titleKey"
      :option-value="field.resource.idKey"
      :placeholder="`Select ${field.resource.label}`"
      :disabled="isVia"
      v-bind="field.attributes"
      @blur="handleBlur"
    >
      <template #header>
        <div class="p-2">
          <InputText class="w-full" v-model="filter" />
        </div>
      </template>
    </Select>
    <errorMessage />
  </div>
</template>

<script setup lang="ts">
import type { InferSerializable } from '../../../../src/types'
import type BelongsTo from '../../../../src/fields/belongs_to'
import { ref } from 'vue'
import { useResourceApi } from '../../../composables/resource'
import Select from 'primevue/select'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  error?: string[]
  field: InferSerializable<BelongsTo>
  record: any
}>()

const filter = ref('')
const model = defineModel()

const { data, isLoading } = useResourceApi.list(props.field.resource.slug, { search: filter })
</script>

<template>
  <div class="flex flex-col gap-2">
    <Select
      v-model="model"
      :options="data?.data ?? []"
      :loading="isLoading"
      :option-label="field.resource.titleKey"
      :option-value="field.resource.idKey"
      :placeholder="`Select ${field.resource.name}`"
      v-bind="field.attributes"
    >
      <template #header>
        <div class="p-2">
          <InputText class="w-full" v-model="filter" />
        </div>
      </template>
    </Select>
    <small class="text-red-400" v-if="error">{{ error.join('\n') }}</small>
  </div>
</template>

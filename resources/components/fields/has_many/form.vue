<script setup lang="ts">
import type { InferSerializable } from '../../../../src/types'
import type { BaseResource } from '../../../../src/resources/base_resource'
import type HasMany from '../../../../src/fields/has_many'
import ResourceTable from '../../resource-table.vue'
import { provideResource } from '../../../composables/resource'
import Heading from '../../ui/heading.vue'

const props = defineProps<{
  error?: string[]
  resource: InferSerializable<BaseResource>
  field: InferSerializable<HasMany>
  form: any
}>()

provideResource(props.field.resource)
</script>

<template>
  <div class="flex flex-col gap-2">
    <ResourceTable
      :resource="field.resource"
      :additional-filters="[{ field: field.relationship.foreignKey, value: form[resource.idKey] }]"
      :create-params="{ initialData: { [field.relationship.foreignKey]: form[resource.idKey] } }"
    >
      <template #title>
        <Heading variant="h2">{{ field.resource.labelPlural }}</Heading>
      </template>
    </ResourceTable>
  </div>
</template>

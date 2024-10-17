<script setup lang="ts">
import type HasMany from '../../../../src/fields/has_many'
import ResourceTable from '../../resource-table.vue'
import Heading from '../../ui/heading.vue'
import { useResource } from '../../../composables/resource'
import { useField } from '../../../composables/field'
import { useFormValues } from 'vee-validate'

defineOptions({
  inheritAttrs: false,
})

const resource = useResource()
const record = useFormValues()
const { field } = useField<HasMany>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <ResourceTable
      :resource="field.resource"
      :additional-filters="[
        { field: field.relationship.foreignKey, value: record[resource.idKey] },
      ]"
      :create-params="{ initialData: { [field.relationship.foreignKey]: record[resource.idKey] } }"
    >
      <template #title>
        <Heading variant="h2">{{ field.resource.labelPlural }}</Heading>
      </template>
    </ResourceTable>
  </div>
</template>

<script setup lang="ts">
import type HasMany from '../../../../src/fields/has_many'
import ResourceTable from '../../resource-table.vue'
import Heading from '../../ui/heading.vue'
import { useResource } from '../../../composables/resource'
import { useField } from '../../../composables/field'
import { useFormValues } from 'vee-validate'
import ProvideResource from '../../resource/provide-resource.vue'

defineOptions({
  inheritAttrs: false,
})

const resource = useResource()
const record = useFormValues()
const { field } = useField<HasMany>()
</script>

<template>
  <ProvideResource :resource="field.resource">
    <div class="flex flex-col gap-2">
      <ResourceTable
        :additional-filters="[
          { field: field.relationship.foreignKey, value: record[resource.idKey] },
        ]"
        :via="{
          resource: resource.name,
          foreignKey: field.relationship.foreignKey,
          value: record[resource.idKey],
        }"
      >
        <template #title>
          <Heading variant="h2">{{ field.resource.labelPlural }}</Heading>
        </template>
      </ResourceTable>
    </div>
  </ProvideResource>
</template>

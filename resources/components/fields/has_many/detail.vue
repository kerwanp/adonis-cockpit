<script setup lang="ts">
import type { ResourceRecord, InferSerializable } from '../../../types'
import type HasMany from '../../../../src/fields/has_many'
import ResourceTable from '../../resource-table.vue'
import Heading from '../../ui/heading.vue'
import ProvideResource from '../../resource/provide-resource.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  field: InferSerializable<HasMany>
  record: ResourceRecord
}>()

const resource = props.field.resource
</script>

<template>
  <ProvideResource :resource="resource">
    <div class="flex flex-col gap-2">
      <ResourceTable
        :resource="field.resource"
        :additional-filters="[
          { field: field.relationship.foreignKey, value: record[resource.idKey] },
        ]"
        :create-params="{
          initialData: { [field.relationship.foreignKey]: record[resource.idKey] },
        }"
      >
        <template #title>
          <Heading variant="h2">{{ field.resource.labelPlural }}</Heading>
        </template>
      </ResourceTable>
    </div>
  </ProvideResource>
</template>

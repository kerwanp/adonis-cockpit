<script setup lang="ts">
import type { InferSerializable } from '../../../src/types'
import type { MenuItem } from '../../../src/menu/menu_item'
import type { BaseResource } from '../../../src/resources/base_resource'
import Heading from '../../components/ui/heading.vue'
import ResourceTable from '../../components/resource-table.vue'
import Layout from '../../layouts/app.vue'
import { provideResource } from '../../composables/resource'

defineOptions({
  layout: Layout,
})

const props = defineProps<{
  resource: InferSerializable<BaseResource>
  resources: Record<string, InferSerializable<BaseResource>>
  menu: InferSerializable<MenuItem>[]
}>()

provideResource(props.resource)
</script>

<template>
  <ResourceTable :resource="resource">
    <template #title>
      <Heading variant="h1">{{ resource.labelPlural }}</Heading>
    </template>
  </ResourceTable>
</template>

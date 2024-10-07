<script setup lang="ts">
import Heading from '../../components/ui/heading.vue'
import ResourceTable from '../../components/resource-table.vue'
import Layout from '../../layouts/app.vue'
import { InferSerializable } from '../../../src/types'
import { MenuItem } from '../../../src/menu/menu_item'
import { BaseResource } from '../../../src/resources/base_resource'
import { provideResource } from '../../composables/resource'

const props = defineProps<{
  resource: InferSerializable<BaseResource>
  resources: InferSerializable<BaseResource>[]
  menu: InferSerializable<MenuItem>[]
}>()

provideResource(props.resource)
</script>

<template>
  <Layout
    :menu="menu"
    :breadcrumb="[{ label: resource.labelPlural, icon: resource.icon }]"
    :resources="resources"
  >
    <ResourceTable :resource="resource">
      <template #title>
        <Heading variant="h1">{{ resource.labelPlural }}</Heading>
      </template>
    </ResourceTable>
  </Layout>
</template>

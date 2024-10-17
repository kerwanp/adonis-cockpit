<script setup lang="ts">
import type { Resource } from '../../../types'
import ResourceTable from '../../resource-table.vue'
import Heading from '../../ui/heading.vue'
import { useResource } from '../../../composables/resource'

const props = defineProps<{
  resource?: Resource
}>()

const resource = useResource(props.resource)
</script>

<template>
  <ResourceTable :resource="resource">
    <template #title>
      <Heading variant="h1">{{ resource.labelPlural }}</Heading>
    </template>
  </ResourceTable>
</template>

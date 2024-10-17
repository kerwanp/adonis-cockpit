<script setup lang="ts">
import type { Resource, ResourceRecord } from '../../../types'
import ResourceService from '../../../services/resource_service'
import Header from '../../ui/header.vue'
import Heading from '../../ui/heading.vue'
import EditButton from '../buttons/edit-button.vue'
import DeleteButton from '../buttons/delete-button.vue'
import ResourceDetail from '../../resource-detail.vue'
import { router } from '@inertiajs/vue3'
import { useResource } from '../../../composables/resource'

const props = defineProps<{
  resource?: Resource
  record: ResourceRecord
}>()

const resource = useResource(props.resource)

function handleDeleted() {
  router.visit(ResourceService.makeUrl(resource.slug, 'index'), {
    onSuccess: () => resource.toasts.deleted(),
  })
}
</script>

<template>
  <Header>
    <Heading variant="h1">{{ resource.label }} Details: {{ record[resource.titleKey] }}</Heading>
    <template #actions>
      <EditButton size="small" :record-id="record[resource.idKey]" />
      <DeleteButton size="small" :record-id="record[resource.idKey]" @success="handleDeleted" />
    </template>
  </Header>
  <ResourceDetail :resource="resource" :record="record" />
</template>

<script setup lang="ts">
import type { RecordId, Resource } from '../../../types'
import ResourceService from '../../../services/resource_service'
import Button from 'primevue/button'
import { useResource } from '../../../composables/resource'

const props = defineProps<{
  resource?: Resource
  recordId: RecordId
}>()

const resource = useResource(props.resource)
</script>

<template>
  <Button
    as="Link"
    :href="ResourceService.makeUrl(resource.slug, 'edit', recordId.toString())"
    label="Edit"
    aria-label="Edit"
    icon="pi pi-pencil"
    icon-pos="right"
    severity="primary"
    v-bind="$attrs"
  />
</template>

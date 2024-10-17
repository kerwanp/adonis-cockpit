<script setup lang="ts">
import type { RecordId, Resource } from '../../../types'
import Button from 'primevue/button'
import ResourceService from '../../../services/resource_service'
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
    :href="ResourceService.makeUrl(resource.slug, 'detail', recordId.toString())"
    label="View"
    aria-label="View"
    icon="pi pi-eye"
    icon-pos="right"
    severity="primary"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import type { RecordId, Resource, ViaRelationship } from '../../../types'
import ResourceService from '../../../services/resource_service'
import Button from 'primevue/button'
import { useResource } from '../../../composables/resource'
import qs from 'qs'

const props = defineProps<{
  resource?: Resource
  recordId: RecordId
  via?: ViaRelationship
}>()

const resource = useResource(props.resource)

let url = ResourceService.makeUrl(resource.slug, 'edit', props.recordId.toString())

if (props.via) {
  url += `?${qs.stringify({ via: props.via })}`
}
</script>

<template>
  <Button
    as="Link"
    :href="url"
    label="Edit"
    aria-label="Edit"
    icon="pi pi-pencil"
    icon-pos="right"
    severity="primary"
    v-bind="$attrs"
  />
</template>

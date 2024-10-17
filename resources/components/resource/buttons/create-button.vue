<script setup lang="ts">
import type { Resource, ViaRelationship } from '../../../types'
import Button from 'primevue/button'
import ResourceService from '../../../services/resource_service'
import qs from 'qs'
import { useResource } from '../../../composables/resource'

const props = defineProps<{
  resource?: Resource
  via?: ViaRelationship
}>()

const resource = useResource(props.resource)

let url = ResourceService.makeUrl(resource.slug, 'create')

if (props.via) {
  url += `?${qs.stringify({ via: props.via })}`
}
</script>

<template>
  <Button
    as="Link"
    :href="url"
    label="Create"
    aria-label="Edit"
    icon="pi pi-plus"
    icon-pos="right"
    severity="primary"
  />
</template>

<script setup lang="ts">
import type { Resource } from '../../../types'
import Button from 'primevue/button'
import ResourceService from '../../../services/resource_service'
import qs from 'qs'
import { useResource } from '../../../composables/resource'

const props = defineProps<{
  resource?: Resource
  params?: any
}>()

const resource = useResource(props.resource)

let url = ResourceService.makeUrl(resource.slug, 'create')

if (props.params) {
  url += `?${qs.stringify(props.params)}`
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

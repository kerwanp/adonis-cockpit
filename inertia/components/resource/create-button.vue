<script setup lang="ts">
import Button from 'primevue/button'
import { BaseResource } from '../../../src/resources/base_resource'
import { InferSerializable } from '../../../src/types'
import { injectResource } from '../../composables/resource'
import ResourceService from '../../services/resource_service'
import qs from 'qs'

const props = defineProps<{
  resource?: InferSerializable<BaseResource>
  params?: any
}>()

const resource = props.resource ?? injectResource()

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

<script setup lang="ts">
import Button from 'primevue/button'
import { BaseResource } from '../../../src/resources/base_resource'
import { InferSerializable, RecordId } from '../../../src/types'
import { injectResource } from '../../composables/resource'
import ResourceService from '../../services/resource_service'

const props = defineProps<{
  resource?: InferSerializable<BaseResource>
  recordId: RecordId
}>()

const resource = props.resource ?? injectResource()
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

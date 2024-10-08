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
    :href="ResourceService.makeUrl(resource.slug, 'detail', recordId.toString())"
    label="View"
    aria-label="View"
    icon="pi pi-eye"
    icon-pos="right"
    severity="primary"
    v-bind="$attrs"
  />
  <ConfirmPopup></ConfirmPopup>
</template>

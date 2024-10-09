<script setup lang="ts">
import type { BaseResource } from '../../../src/resources/base_resource'
import type { InferSerializable, RecordId } from '../../../src/types'
import Button from 'primevue/button'
import ResourceService from '../../services/resource_service'
import ConfirmPopup from 'primevue/confirmpopup'
import { injectResource } from '../../composables/resource'

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

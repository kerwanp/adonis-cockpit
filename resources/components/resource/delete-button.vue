<script setup lang="ts">
import type { BaseResource } from '../../../src/resources/base_resource'
import type { InferSerializable, RecordId } from '../../../src/types'
import Button from 'primevue/button'
import { useResource } from '../../composables/resource'
import { useConfirm } from 'primevue/useconfirm'

const props = defineProps<{
  resource?: InferSerializable<BaseResource>
  recordId: RecordId
}>()

const emit = defineEmits<{
  success: []
}>()

const resource = useResource(props.resource)

const confirm = useConfirm()

async function deleteRecord(event: Event) {
  confirm.require({
    target: event.currentTarget,
    message: 'Do you want to delete this record?',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: async () => {
      await resource.delete(props.recordId)
      emit('success')
    },
    reject: () => {},
  })
}
</script>

<template>
  <Button
    label="Delete"
    aria-label="Delete"
    icon="pi pi-trash"
    icon-pos="right"
    severity="danger"
    @click="deleteRecord"
    v-bind="$attrs"
  />
  <ConfirmPopup></ConfirmPopup>
</template>

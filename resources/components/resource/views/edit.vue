<script setup lang="ts">
import type { Resource, ResourceRecord, ViaRelationship } from '../../../types'
import ResourceService from '../../../services/resource_service'
import Header from '../../ui/header.vue'
import ResourceForm from '../../resource-form.vue'
import Button from 'primevue/button'
import { router } from '@inertiajs/vue3'
import { useForm } from '../../../composables/form'
import { useResource } from '../../../composables/resource'
import Heading from '../../ui/heading.vue'
import DeleteButton from '../buttons/delete-button.vue'
import { computed } from 'vue'

const props = defineProps<{
  resource?: Resource
  record: ResourceRecord
  via?: ViaRelationship
}>()

const resource = useResource(props.resource)

const form = useForm({ initialValues: props.record })

function handleDeleted() {
  router.visit(ResourceService.makeUrl(resource.slug, 'index'), {
    onSuccess: () => resource.toasts.deleted(),
  })
}

function updateResource(data: ResourceRecord) {
  return resource.update({ id: props.record[resource.idKey], data })
}

const redirectUrl = computed(() => {
  if (props.via) {
    return ResourceService.makeUrl(props.via.resource, 'edit', props.via.value)
  }

  return ResourceService.makeUrl(resource.slug, 'index')
})

const handleSubmit = form.handleSubmit(async (data: ResourceRecord) => {
  await updateResource(data)

  router.visit(redirectUrl.value, {
    onSuccess: () => resource.toasts.edited(),
  })
})

const handleSubmitAndContinue = form.handleSubmit(async (data: ResourceRecord) => {
  await updateResource(data)
  resource.toasts.edited()
})
</script>

<template>
  <Header>
    <Heading variant="h1">Edit {{ resource.label }}: {{ record[resource.titleKey] }}</Heading>
    <template #actions>
      <DeleteButton :record-id="record[resource.idKey]" @success="handleDeleted" />
    </template>
  </Header>
  <ResourceForm :resource="resource" :initial-data="record" action="edit" @submit="handleSubmit">
    <template #actions>
      <Button type="button" as="Link" text :href="redirectUrl">Cancel</Button>
      <Button type="button" @click="handleSubmitAndContinue">Update & Continue Editing</Button>
      <Button type="submit">Update {{ resource.label }}</Button>
    </template>
  </ResourceForm>
</template>

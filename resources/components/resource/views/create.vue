<script setup lang="ts">
import type { Resource, ViaRelationship } from '../../../types'
import ResourceForm from '../../resource-form.vue'
import Heading from '../../ui/heading.vue'
import Header from '../../ui/header.vue'
import Button from 'primevue/button'
import ResourceService from '../../../services/resource_service'
import { router } from '@inertiajs/vue3'
import { useResource } from '../../../composables/resource'
import { useForm } from '../../../composables/form'
import { computed } from 'vue'

const props = defineProps<{
  resource?: Resource
  via?: ViaRelationship
}>()

const resource = useResource(props.resource)
const form = useForm()

const redirectUrl = computed(() => {
  if (props.via) {
    return ResourceService.makeUrl(props.via.resource, 'edit', props.via.value)
  }

  return ResourceService.makeUrl(resource.slug, 'index')
})

const handleSubmit = form.handleSubmit(async (values) => {
  await resource.create(values)

  router.visit(redirectUrl.value, {
    onSuccess: () => resource.toasts.created(),
  })
})
</script>

<template>
  <Header>
    <slot name="header">
      <Heading variant="h1">Create {{ resource.label }}</Heading>
    </slot>
  </Header>
  <ResourceForm :resource="resource" action="create" @submit="handleSubmit">
    <template #actions>
      <slot name="actions">
        <Button as="Link" :href="redirectUrl" text>Cancel</Button>
        <Button type="submit">Create {{ resource.label }}</Button>
      </slot>
    </template>
  </ResourceForm>
</template>

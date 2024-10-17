<script setup lang="ts">
import type { Resource } from '../../../types'
import ResourceForm from '../../components/resource-form.vue'
import Heading from '../../components/ui/heading.vue'
import Header from '../../components/ui/header.vue'
import Button from 'primevue/button'
import ResourceService from '../../../services/resource_service'
import { router } from '@inertiajs/vue3'
import { useResource } from '../../../composables/resource'
import { useForm } from '../../../composables/form'

const props = defineProps<{
  resource?: Resource
}>()

const resource = useResource(props.resource)
const form = useForm()

const handleSubmit = form.handleSubmit(async (values) => {
  const result = await resource.create(values)

  router.visit(ResourceService.makeUrl(resource.slug, 'detail', result[resource.idKey]), {
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
      <Button as="Link" :href="resource.routes.index" text>Cancel</Button>
      <Button type="button" @click="handleSubmit">Create {{ resource.label }}</Button>
    </template>
  </ResourceForm>
</template>

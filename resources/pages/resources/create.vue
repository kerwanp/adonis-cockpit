<script setup lang="ts">
import type { MenuItem } from '../../../src/menu/menu_item'
import type { InferSerializable } from '../../../src/types'
import type { BaseResource } from '../../../src/resources/base_resource'
import { useToast } from 'primevue/usetoast'
import ResourceForm from '../../components/resource-form.vue'
import Heading from '../../components/ui/heading.vue'
import Layout from '../../layouts/app.vue'
import { router } from '@inertiajs/vue3'
import ResourceService from '../../services/resource_service'
import { provideResource, useResource } from '../../composables/resource'
import Header from '../../components/ui/header.vue'
import Button from 'primevue/button'

defineOptions({
  layout: Layout,
})

const props = defineProps<{
  menu: InferSerializable<MenuItem>[]
  resource: InferSerializable<BaseResource>
  resources: Record<string, InferSerializable<BaseResource>>
}>()

provideResource(props.resource)

const toast = useToast()

const resource = useResource(props.resource)

// TODO: Find way to show toast after visit
// TODO: Add ability to create new one directly
const handleSubmit = async (data: any) => {
  const result = await resource.create(data)

  router.visit(
    ResourceService.makeUrl(props.resource.slug, 'detail', result[props.resource.idKey]),
    {
      onSuccess: () =>
        toast.add({
          severity: 'success',
          summary: `${props.resource.name} created`,
          detail: `Your new ${props.resource.name} has been succesfully created.`,
          life: 3000,
        }),
    }
  )
}
</script>

<template>
  <Header>
    <Heading variant="h1">Create {{ resource.label }}</Heading>
  </Header>
  <ResourceForm :resource="resource" action="create" @submit="handleSubmit">
    <template #actions>
      <Button as="Link" :href="resource.routes.index" text>Cancel</Button>
      <Button type="submit">Create {{ resource.label }}</Button>
    </template>
  </ResourceForm>
</template>

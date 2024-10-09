<script setup lang="ts">
import type { InferSerializable } from '../../../src/types'
import type { MenuItem } from '../../../src/menu/menu_item'
import type { BaseResource } from '../../../src/resources/base_resource'
import Layout from '../../layouts/app.vue'
import Heading from '../../components/ui/heading.vue'
import ResourceForm from '../../components/resource-form.vue'
import Header from '../../components/ui/header.vue'
import DeleteButton from '../../components/resource/delete-button.vue'
import ResourceService from '../../services/resource_service'
import { router } from '@inertiajs/vue3'
import { provideResource, useResource } from '../../composables/resource'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'

const props = defineProps<{
  menu: InferSerializable<MenuItem>[]
  resource: InferSerializable<BaseResource>
  resources: Record<string, InferSerializable<BaseResource>>
  data: any
}>()

provideResource(props.resource)

const resource = useResource(props.resource)

const toast = useToast()

function handleDeleted() {
  router.visit(ResourceService.makeUrl(props.resource.slug, 'index'), {
    onSuccess: () => {
      toast.add({
        severity: 'error',
        summary: 'Record deleted',
        detail: 'The record has been succesfully deleted.',
        life: 3000,
      })
    },
  })
}

// TODO: Find way to show toast after visit
// TODO: Add ability to create new one directly
const handleSubmit = async (data: any) => {
  const result = await resource.update({ id: props.data[props.resource.idKey], data })

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
  <Layout
    :menu="menu"
    :resources="resources"
    :breadcrumb="[
      { label: resource.labelPlural, icon: resource.icon, url: resource.routes.index },
      { label: 'Edit' },
    ]"
  >
    <Header>
      <Heading variant="h1">Edit {{ resource.name }}: {{ data[resource.titleKey] }}</Heading>
      <template #actions>
        <DeleteButton :record-id="data[resource.idKey]" @success="handleDeleted" />
      </template>
    </Header>
    <ResourceForm :resource="resource" :initial-data="data" action="edit" @submit="handleSubmit">
      <template #actions>
        <Button type="button" as="Link" text :href="resource.routes.index">Cancel</Button>
        <Button type="submit">Update & continue editing</Button>
        <Button type="submit">Update {{ resource.name }}</Button>
      </template>
    </ResourceForm>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../../layouts/app.vue'
import Heading from '../../components/ui/heading.vue'
import Header from '../../components/ui/header.vue'
import { InferSerializable } from '../../../src/types'
import { MenuItem } from '../../../src/menu/menu_item'
import { BaseResource } from '../../../src/resources/base_resource'
import ResourceDetail from '../../components/resource-detail.vue'
import { provideResource } from '../../composables/resource'
import DeleteButton from '../../components/resource/delete-button.vue'
import { router } from '@inertiajs/vue3'
import ResourceService from '../../services/resource_service'
import { useToast } from 'primevue/usetoast'
import EditButton from '../../components/resource/edit-button.vue'

const props = defineProps<{
  menu: InferSerializable<MenuItem>[]
  resource: InferSerializable<BaseResource>
  resources: InferSerializable<BaseResource>[]
  data: any
}>()

provideResource(props.resource)

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
</script>

<template>
  <Layout
    :menu="menu"
    :resources="resources"
    :breadcrumb="[
      { label: resource.labelPlural, icon: resource.icon, url: resource.routes.index },
      { label: 'Detail' },
    ]"
  >
    <Header>
      <Heading variant="h1">{{ resource.label }} Details: {{ data[resource.titleKey] }}</Heading>
      <template #actions>
        <EditButton size="small" :record-id="data[resource.idKey]" />
        <DeleteButton size="small" :record-id="data[resource.idKey]" @success="handleDeleted" />
      </template>
    </Header>
    <ResourceDetail :resource="resource" :data="data" />
  </Layout>
</template>

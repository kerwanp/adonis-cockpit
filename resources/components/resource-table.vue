<script setup lang="ts">
import type { Resource } from '../types'
import type { ApiIndexInputParams } from '../../src/routes/handlers/api'
import { useToast } from 'primevue/usetoast'
import { useResourceApi } from '../composables/resource'
import { ref } from 'vue'
import DataTable from './ui/datatable.vue'
import Header from './ui/header.vue'
import Heading from './ui/heading.vue'
import EditButton from './resource/buttons/edit-button.vue'
import DetailButton from './resource/buttons/detail-button.vue'
import DeleteButton from './resource/buttons/delete-button.vue'
import CreateButton from './resource/buttons/create-button.vue'
import ActionsMenu from './resource/actions-menu.vue'
import InputText from 'primevue/inputtext'

const props = defineProps<{
  resource: Resource
  additionalFilters?: ApiIndexInputParams['filters']
  createParams?: any
}>()

const selectedRows = ref([])
const search = ref<string>()
const page = ref(1)
const perPage = ref(25)
const sorts = ref<ApiIndexInputParams['sorts']>([])

const { data: paginator } = useResourceApi.list(props.resource.slug, {
  page,
  perPage,
  sorts,
  search,
  filters: [...(props.additionalFilters ?? [])],
})

const toast = useToast()

function handleDeleted() {
  toast.add({
    severity: 'error',
    summary: 'Record deleted',
    detail: 'The record has been succesfully deleted.',
    life: 3000,
  })
}
</script>

<template>
  <Header>
    <slot name="title" />
    <template #actions>
      <ActionsMenu :records="selectedRows" />
      <InputText v-model="search" :placeholder="`Search ${resource.labelPlural}...`" />
      <CreateButton :params="props.createParams" />
    </template>
  </Header>
  <div
    class="grow min-h-0 border rounded-2xl flex flex-col overflow-hidden bg-surface-0 dark:bg-surface-900 dark:border-surface-800"
  >
    <template v-if="true">
      <DataTable
        :fields="resource.fields"
        :rows="paginator?.data ?? []"
        :total="paginator?.meta.total ?? 0"
        v-model:page="page"
        v-model:sorts="sorts"
        v-model:per-page="perPage"
        v-model:selected-rows="selectedRows"
      >
        <template #rowActions="{ data }">
          <div class="flex gap-1 flex-nowrap">
            <DetailButton rounded text label severity="secondary" :record-id="data.id" />
            <EditButton rounded text label severity="info" :record-id="data.id" />
            <DeleteButton
              rounded
              text
              label
              severity="danger"
              :record-id="data.id"
              @success="handleDeleted"
            />
          </div>
        </template>
      </DataTable>
    </template>
    <div v-else class="h-full flex flex-col gap-2 justify-center items-center">
      <span class="pi pi-info-circle text-3xl mb-4"></span>
      <Heading variant="h3">You do not have any {{ resource.name }} yet!</Heading>
      <CreateButton as="Link" label="Create one" />
    </div>
  </div>
</template>

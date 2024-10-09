<script setup lang="ts">
import type { Field } from '../../../src/fields/field'
import type { InferSerializable } from '../../../src/types'
import DataTable, { DataTableSortEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import { PageState } from 'primevue/paginator'
import { FilterMatchMode, FilterOperator } from '@primevue/core/api'
import { ref } from 'vue'

const props = defineProps<{
  fields: InferSerializable<Field>[]
  rows: any[]
  total: number
}>()

function initFilters() {
  return props.fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    }),
    {}
  )
}

const page = defineModel<number>('page', { default: 1 })
const perPage = defineModel<number>('perPage', { default: 25 })
const sorts = defineModel<{ field: string; direction: 'asc' | 'desc' }[]>('sorts', { default: [] })
const selectedRows = defineModel<any[]>('selectedRows')
const filters = ref(initFilters())

function paginate(state: PageState) {
  page.value = state.page + 1
  perPage.value = state.rows
}

function sort(event: DataTableSortEvent) {
  sorts.value =
    event.multiSortMeta?.map((m) => ({
      field: m.field as string,
      direction: m.order === -1 ? 'asc' : 'desc',
    })) ?? []
}
</script>

<template>
  <div class="flex-grow flex flex-col overflow-auto">
    <DataTable
      :value="rows"
      scrollable
      scroll-height="flex"
      lazy
      sort-mode="multiple"
      @sort="sort"
      filter-display="menu"
      v-model:filters="filters"
      v-model:selection="selectedRows"
      data-key="id"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column
        v-for="field of fields.filter((field) => field.visibility.index)"
        :field="field.name"
        :header="field.label"
        :sortable="field.sortable"
      >
        <template #body="row">
          <component :is="field.indexComponent" :field="field" :value="row.data[field.name]" />
        </template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
        </template>
      </Column>
      <Column header="Actions">
        <template #body="{ data }">
          <slot name="rowActions" :data="data" />
        </template>
      </Column>
    </DataTable>
  </div>
  <Paginator
    @page="paginate"
    :rows="perPage"
    :first="(page - 1) * perPage"
    :totalRecords="total"
    :rowsPerPageOptions="[10, 25, 50, 100]"
  >
    <template #start>{{ selectedRows.length }} rows selected</template>
    <template #end>{{ rows.length }} out of {{ total }} </template>
  </Paginator>
</template>

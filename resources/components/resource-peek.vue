<script setup lang="ts">
import type { Resource, ResourceRecord } from '../types'
import EditButton from './resource/buttons/edit-button.vue'
import DetailButton from './resource/buttons/detail-button.vue'

defineProps<{
  resource: Resource
  record: ResourceRecord
}>()
</script>

<template>
  <div class="flex flex-col min-w-[300px]">
    <div>
      <template v-for="field of resource.fields.filter((f) => f.type === 'field')">
        <div
          v-if="field.visibility.detail"
          class="flex border-b last:border-none dark:border-surface-800"
        >
          <div class="w-24 flex items-center py-2">
            {{ field.label }}
          </div>
          <div class="flex items-center py-2">
            <component
              :is="field.detailComponent ?? field.indexComponent"
              :field="field"
              :record="record"
              :value="record[field.name]"
            />
          </div>
        </div>
      </template>
    </div>
    <div class="mt-3 flex gap-2">
      <EditButton
        class="flex-1"
        :resource="resource"
        :record-id="record[resource.idKey]"
        size="small"
        outlined
      />
      <DetailButton
        class="flex-1"
        :resource="resource"
        :record-id="record[resource.idKey]"
        size="small"
        outlined
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InferSerializable } from '../../src/types'
import type { BaseResource } from '../../src/resources/base_resource'
import EditButton from './resource/edit-button.vue'
import DetailButton from './resource/detail-button.vue'

defineProps<{
  resource: InferSerializable<BaseResource>
  data: any
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
              :record="data"
              :value="data[field.name]"
            />
          </div>
        </div>
      </template>
    </div>
    <div class="mt-3 flex gap-2">
      <EditButton
        class="flex-1"
        :resource="resource"
        :record-id="data[resource.idKey]"
        size="small"
        outlined
      />
      <DetailButton
        class="flex-1"
        :resource="resource"
        :record-id="data[resource.idKey]"
        size="small"
        outlined
      />
    </div>
  </div>
</template>

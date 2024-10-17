<script setup lang="ts">
import type { Resource, ResourceRecord } from '../types'
import Card from './ui/card.vue'
import InjectField from './form/inject-field.vue'

defineProps<{
  resource: Resource
  record: ResourceRecord
}>()
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-8">
      <Card>
        <template v-for="field of resource.fields.filter((f) => f.type === 'field')">
          <div
            v-if="field.visibility.detail"
            class="flex border-b last:border-none dark:border-surface-800"
          >
            <div class="w-64 flex items-center py-4">
              {{ field.label }}
            </div>
            <div class="flex items-center py-4">
              <component
                :is="field.detailComponent ?? field.indexComponent"
                :field="field"
                :record="record"
                :value="record[field.name]"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div>
      <template v-for="field of resource.fields.filter((f) => f.type === 'panel')">
        <InjectField :field="field">
          <component
            :is="field.detailComponent ?? field.indexComponent"
            :field="field"
            :record="record"
          />
        </InjectField>
      </template>
    </div>
  </div>
</template>

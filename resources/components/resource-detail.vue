<script setup lang="ts">
import type { InferSerializable } from '../../src/types'
import type { BaseResource } from '../../src/resources/base_resource'
import Card from './ui/card.vue'

defineProps<{
  resource: InferSerializable<BaseResource>
  data: any
}>()
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-8">
      <Card>
        <template v-for="field of resource.fields.filter((f) => f.type === 'field')">
          <div v-if="field.visibility.detail" class="flex border-b dark:border-surface-800">
            <div class="w-64 flex items-center py-4">
              {{ field.label }}
            </div>
            <div class="flex items-center py-4">
              <component
                :is="field.detailComponent ?? field.indexComponent"
                :field="field"
                :record="data"
                :value="data[field.name]"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div>
      <template v-for="field of resource.fields.filter((f) => f.type === 'panel')">
        <component :is="field.fieldComponent" :resource="resource" :record="data" :field="field" />
      </template>
    </div>
  </div>
</template>

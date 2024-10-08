<script setup lang="ts">
import { InferSerializable } from '../../src/types'
import Card from './ui/card.vue'
import { BaseResource } from '../../src/resources/base_resource'

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
                :value="data[field.name]"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div>
      <template v-for="field of resource.fields.filter((f) => f.type === 'panel')">
        <component :is="field.fieldComponent" :resource="resource" :form="data" :field="field" />
      </template>
    </div>
  </div>
</template>

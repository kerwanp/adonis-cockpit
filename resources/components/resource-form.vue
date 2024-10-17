<script setup lang="ts">
import Card from './ui/card.vue'
import Button from 'primevue/button'
import InjectField from './form/inject-field.vue'
import { Resource } from '../types'

defineProps<{
  resource: Resource
  action: 'create' | 'edit'
}>()
</script>

<template>
  <div class="flex flex-col gap-8">
    <form class="flex flex-col gap-4">
      <Card>
        <template v-for="field of resource.fields.filter((f) => f.type === 'field')">
          <InjectField :field="field">
            <div
              v-if="field.visibility[action]"
              class="flex border-b last:border-none dark:border-surface-800"
            >
              <div class="w-64 flex items-center py-4">
                <label :for="field.name" class="cursor-pointer">
                  {{ field.label }}
                </label>
              </div>
              <div class="flex items-center py-4">
                <component :is="field.fieldComponent" :field="field" />
              </div>
            </div>
          </InjectField>
        </template>
      </Card>
      <div class="flex gap-4 justify-end items-center">
        <slot name="actions">
          <Button type="submit">Submit</Button>
        </slot>
      </div>
    </form>
    <div v-if="action === 'edit'">
      <template v-for="field of resource.fields.filter((f) => f.type === 'panel')">
        <InjectField :field="field">
          <component :is="field.fieldComponent" :field="field" :resource="resource" />
        </InjectField>
      </template>
    </div>
  </div>
</template>

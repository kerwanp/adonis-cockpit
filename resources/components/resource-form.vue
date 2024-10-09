<script setup lang="ts">
import type { InferSerializable } from '../../src/types'
import type { BaseResource } from '../../src/resources/base_resource'
import Card from './ui/card.vue'
import qs from 'qs'
import { useForm } from '@inertiajs/vue3'

const props = defineProps<{
  resource: InferSerializable<BaseResource>
  action: 'create' | 'edit'
  initialData?: any
}>()

// TODO: Initial value
function initializeData() {
  const data: Record<string, any> = props.initialData ?? {}

  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  if (query.initialData) {
    for (const [key, value] of Object.entries(query.initialData)) {
      if (data[key]) continue
      data[key] = value
    }
  }

  for (const field of props.resource.fields) {
    if (data[field.name]) continue
    data[field.name] = null
  }

  return data
}

const form = useForm(initializeData())

const emit = defineEmits<{
  submit: [any]
}>()
</script>

<template>
  <div class="flex flex-col gap-8">
    <form class="flex flex-col gap-8" @submit.prevent="emit('submit', form.data())">
      <Card>
        <template v-for="field of resource.fields.filter((f) => f.type === 'field')">
          <div v-if="field.visibility[action]" class="flex border-b dark:border-surface-800">
            <div class="w-64 flex items-center py-4">
              <label :for="field.name" class="cursor-pointer">
                {{ field.label }}
              </label>
            </div>
            <div class="flex items-center py-4">
              <component
                :is="field.fieldComponent"
                :field="field"
                :error="form.errors[field.name]"
                :form="form"
                v-model="form[field.name]"
              />
            </div>
          </div>
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
        <component :is="field.fieldComponent" :field="field" :resource="resource" :form="form" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MenuItem } from 'primevue/menuitem'
import { router } from '@inertiajs/vue3'
import { injectResources } from '../../composables/resources'
import Button from 'primevue/button'
import Menu from 'primevue/menu'

const resources = injectResources()

const menu = ref()
const items = ref<MenuItem[]>(
  Object.values(resources).map((resource) => ({
    label: `Create ${resource.name}`,
    command() {
      router.visit(resource.routes.create)
    },
    icon: resource.icon,
  }))
)

function toggle(event: Event) {
  menu.value.toggle(event)
}
</script>

<template>
  <Button label="Create" @click="toggle" icon="pi pi-plus" icon-pos="right" />
  <Menu :model="items" ref="menu" id="create_resource_menu" popup />
</template>

<script setup lang="ts">
import type { InferSerializable } from '../../src/types'
import type { MenuItem } from '../../src/menu/menu_item'
import type { BaseResource } from '../../src/resources/base_resource'
import { MenuItem as PrimeMenuItem } from 'primevue/menuitem'
import { Link } from '@inertiajs/vue3'
import { Ref, ref } from 'vue'
import Menu from 'primevue/menu'
import ThemeSelector from './ui/theme-selector.vue'
import CreateMenu from './resource/create-menu.vue'
import { injectResources } from '../composables/resources'
import Badge from 'primevue/badge'

const props = defineProps<{
  menu: InferSerializable<MenuItem>[]
  resources: InferSerializable<BaseResource>[]
}>()

const resources = injectResources()

const items: Ref<PrimeMenuItem[]> = ref([
  {
    label: 'Home',
    url: '/admin',
    icon: 'pi pi-home',
  },
  ...props.menu.map((item) => ({
    label: item.label,
    url: item.href,
    target: item.target,
    icon: item.icon,
  })),
  {
    label: 'Resources',
    items: Object.values(resources).map((resource) => ({
      label: resource.label,
      url: resource.routes.index,
      icon: resource.icon,
    })),
  },
])
</script>

<template>
  <div
    class="w-[250px] h-full flex flex-col border-r border-surface-200 bg-surface-0 dark:bg-surface-950 dark:border-surface-800 p-3"
  >
    <div class="p-4">
      <img src="https://adonis-cockpit.com/logo-horizontal.png" />
    </div>
    <CreateMenu />
    <Menu
      :model="items"
      class="h-full flex flex-col border-none bg-transparent py-4"
      :pt="{ list: { class: 'flex-1' } }"
    >
      <template #item="{ item, props }">
        <Link v-if="item.url" :href="item.url" class="flex items-center w-full py-1 px-3">
          <span :class="item.icon" />
          <span class="ml-3">{{ item.label }}</span>
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
        </Link>
        <a v-else class="flex items-center w-full py-1 px-3" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-3">{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <ThemeSelector />
      </template>
    </Menu>
  </div>
</template>

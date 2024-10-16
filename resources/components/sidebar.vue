<script setup lang="ts">
import type { InferSerializable } from '../../src/types'
import type { BaseResource } from '../../src/resources/base_resource'
import { MenuItem as PrimeMenuItem } from 'primevue/menuitem'
import { Link } from '@inertiajs/vue3'
import { Ref, ref } from 'vue'
import Menu from 'primevue/menu'
import ThemeSelector from './ui/theme-selector.vue'
import CreateMenu from './resource/create-menu.vue'
import Badge from 'primevue/badge'
import { Menu as MenuData } from '../../src/menu/menu'

const props = defineProps<{
  menu: InferSerializable<MenuData>[]
  resources: InferSerializable<BaseResource>[]
}>()

const items: Ref<PrimeMenuItem[]> = ref(props.menu)
</script>

<template>
  <div
    class="w-[250px] h-full flex flex-col border-r border-surface-200 bg-surface-0 dark:bg-surface-900 dark:border-surface-800 p-3"
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
      <template #submenulabel="{ item }">
        <span class="text-muted-color font-semibold text-sm">{{ item.label }}</span>
      </template>
      <template #item="{ item, props }">
        <Link v-if="item.url" :href="item.url" class="flex items-center w-full py-1 px-3 gap-2">
          <div class="w-4 h-4" :class="item.icon" />
          <div>{{ item.label }}</div>
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
        </Link>
      </template>
      <template #end>
        <ThemeSelector />
      </template>
    </Menu>
  </div>
</template>

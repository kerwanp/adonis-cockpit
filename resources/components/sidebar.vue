<script setup lang="ts">
import type { InferSerializable } from '../../src/types'
import CreateMenu from './resource/create-menu.vue'
import { Menu as MenuData } from '../../src/menu/menu'
import Menu from './ui/menu/index.vue'
import ThemeSelector from './ui/theme-selector.vue'
import { Resource } from '../types'

defineProps<{
  menu: InferSerializable<MenuData>[]
  resources: Resource[]
}>()
</script>

<template>
  <div
    class="w-[250px] h-full flex flex-col border-r border-surface-200 bg-surface-0 dark:bg-surface-900 dark:border-surface-800 p-3"
  >
    <div class="p-4">
      <img src="https://adonis-cockpit.com/logo-horizontal.png" />
    </div>
    <CreateMenu />
    <Menu class="flex-1" :menu="menu" />
    <ThemeSelector />
  </div>
</template>

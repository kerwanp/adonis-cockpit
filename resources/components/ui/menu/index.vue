<script setup lang="ts">
import { Menu } from '../../../../src/menu/menu'
import { InferSerializable } from '../../../../src/types'
import MenuCategory from './category.vue'
import MenuItem from './item.vue'

defineProps<{
  menu: InferSerializable<Menu>
}>()
</script>

<template>
  <ul class="flex flex-col py-6">
    <li v-for="item of menu">
      <MenuCategory v-if="item.items" :item="item" />
      <MenuItem v-else :item="item" />
    </li>
  </ul>
</template>

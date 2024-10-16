<script lang="ts" setup>
import { MenuItem } from '../../../../src/menu/menu_item'
import { InferSerializable } from '../../../../src/types'
import Item from './item.vue'

defineProps<{
  item: InferSerializable<MenuItem>
}>()
</script>

<template>
  <ul class="mt-4 flex flex-col">
    <li class="text-sm text-muted-color font-semibold mb-2">{{ item.label }}</li>
    <li v-for="item in item.items">
      <Item :item="item" />
    </li>
  </ul>
</template>

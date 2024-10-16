<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'
import { MenuItem } from '../../../../src/menu/menu_item'
import { InferSerializable } from '../../../../src/types'
import { router } from '@inertiajs/vue3'
import { ref } from 'vue'

const props = defineProps<{
  item: InferSerializable<MenuItem>
}>()

const isActive = ref<boolean>(false)

router.on('navigate', (event: any) => {
  const pathname = event.detail.page.url
  if (props.item.prefixMatch) {
    isActive.value = pathname.startsWith(props.item.url)
  } else {
    isActive.value = pathname === props.item.url
  }
})
</script>

<template>
  <Link
    :href="item.url"
    class="px-2 py-1 aria-selected:bg-indigo-700 aria-selected:text-white hover:text-white hover:bg-indigo-700/80 dark:hover:bg-indigo-700/20 dark:aria-selected:bg-indigo-700/60 rounded-md duration-75 mb-1 flex gap-2 items-center"
    :aria-selected="isActive"
  >
    <div class="w-4 h-4" :class="item.icon" />
    {{ item.label }}
  </Link>
</template>

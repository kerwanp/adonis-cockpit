<script setup lang="ts">
import type { Resource } from '../../types'
import Layout from '../../layouts/app.vue'
import ProvideResource from '../../components/resource/provide-resource.vue'
import List from '../../components/resource/views/list.vue'

defineOptions({
  layout: Layout,
})

defineProps<{
  resource: Resource
}>()
</script>

<template>
  <ProvideResource :resource="resource">
    <List />
  </ProvideResource>
</template>

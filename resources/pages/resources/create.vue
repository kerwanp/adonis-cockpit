<script setup lang="ts">
import Create from '../../components/resource/views/create.vue'
import Layout from '../../layouts/app.vue'
import ProvideResource from '../../components/resource/provide-resource.vue'
import { Resource } from '../../types'

defineOptions({
  layout: Layout,
})

defineProps<{
  resource: Resource
}>()
</script>

<template>
  <ProvideResource :resource="resource">
    <Create />
  </ProvideResource>
</template>

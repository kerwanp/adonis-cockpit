<script setup lang="ts">
import type { Resource, ResourceRecord } from '../../types'
import Layout from '../../layouts/app.vue'
import ProvideResource from '../../components/resource/provide-resource.vue'
import Detail from '../../components/resource/views/detail.vue'

defineOptions({
  layout: Layout,
})

defineProps<{
  resource: Resource
  record: ResourceRecord
}>()
</script>

<template>
  <ProvideResource :resource="resource">
    <Detail :record="record" />
  </ProvideResource>
</template>

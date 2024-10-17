<script setup lang="ts">
import { Resource, ResourceRecord } from '../../types'
import Edit from '../../components/resource/views/edit.vue'
import ProvideResource from '../../components/resource/provide-resource.vue'
import Layout from '../../layouts/app.vue'

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
    <Edit :record="record" />
  </ProvideResource>
</template>

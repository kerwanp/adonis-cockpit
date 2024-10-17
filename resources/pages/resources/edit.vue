<script setup lang="ts">
import { Resource, ResourceRecord, ViaRelationship } from '../../types'
import Edit from '../../components/resource/views/edit.vue'
import ProvideResource from '../../components/resource/provide-resource.vue'
import Layout from '../../layouts/app.vue'
import { useSearchParams } from '../../composables/route'

defineOptions({
  layout: Layout,
})

defineProps<{
  resource: Resource
  record: ResourceRecord
}>()

const params = useSearchParams<{ via?: ViaRelationship }>()
</script>

<template>
  <ProvideResource :resource="resource">
    <Edit :record="record" :via="params.via" />
  </ProvideResource>
</template>

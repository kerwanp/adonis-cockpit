<script setup lang="ts">
import Create from '../../components/resource/views/create.vue'
import Layout from '../../layouts/app.vue'
import ProvideResource from '../../components/resource/provide-resource.vue'
import { Resource, ViaRelationship } from '../../types'
import { useSearchParams } from '../../composables/route'

defineOptions({
  layout: Layout,
})

defineProps<{
  resource: Resource
}>()

const params = useSearchParams<{ via?: ViaRelationship }>()
</script>

<template>
  <ProvideResource :resource="resource">
    <Create :via="params.via" />
  </ProvideResource>
</template>

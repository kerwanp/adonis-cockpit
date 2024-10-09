<script setup lang="ts">
import type { BaseResource } from '../../src/resources/base_resource'
import type { MenuItem } from '../../src/menu/menu_item'
import type { InferSerializable } from '../../src/types'
import Layout from '../layouts/app.vue'

defineProps<{
  menu: InferSerializable<MenuItem>[]
  resources: Record<string, InferSerializable<BaseResource>>
}>()
</script>

<template>
  <Layout :breadcrumb="[]" :menu="menu" :resources="resources"> </Layout>
</template>

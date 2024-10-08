<script setup lang="ts">
import { BaseResource } from '../../src/base_resource'
import { MenuItem } from '../../src/menu/menu_item'
import { InferSerializable } from '../../src/types'
import Layout from '../layouts/app.vue'

defineProps<{
  menu: InferSerializable<MenuItem>[]
  resources: InferSerializable<BaseResource>[]
}>()
</script>

<template>
  <Layout :menu="menu" :resources="resources"> </Layout>
</template>

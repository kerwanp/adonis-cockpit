<script setup lang="ts">
import { provideResource } from '../../composables/resource'
import { Resource } from '../../types'

const props = defineProps<{
  resource: Resource
}>()

provideResource(props.resource)
</script>

<template>
  <slot />
</template>

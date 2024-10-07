<script setup lang="ts">
defineProps({
  variant: String,
})
</script>

<template>
  <h1 v-if="variant === 'h1'" class="text-color text-3xl font-semibold leading-normal">
    <slot />
  </h1>
  <h2 v-if="variant === 'h2'" class="text-color text-2xl font-semibold leading-normal">
    <slot />
  </h2>
  <h3 v-if="variant === 'h3'" class="text-color text-xl font-semibold leading-normal">
    <slot />
  </h3>
</template>

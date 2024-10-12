<script setup lang="ts">
import ToggleButton from 'primevue/togglebutton'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>
<template>
  <ToggleButton
    class="w-full"
    v-model="isDark"
    on-label="Dark"
    on-icon="pi pi-moon"
    off-label="Light"
    off-icon="pi pi-sun"
  />
</template>

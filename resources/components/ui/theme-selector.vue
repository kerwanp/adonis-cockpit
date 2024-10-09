<script setup lang="ts">
import ToggleButton from 'primevue/togglebutton'

function toggleDarkMode(value: boolean) {
  const element = document.querySelector('html')
  if (value) {
    element.classList.add('dark')
  } else {
    element.classList.remove('dark')
  }
}

const darkMode = defineModel({
  default: true,
  set: (value) => {
    toggleDarkMode(value)
    return value
  },
})
</script>
<template>
  <ToggleButton
    class="w-full"
    v-model="darkMode"
    on-label="Dark"
    on-icon="pi pi-moon"
    off-label="Light"
    off-icon="pi pi-sun"
  />
</template>

<script lang="ts" setup>
import { useFieldError } from 'vee-validate'

const errorMessage = useFieldError()
</script>

<template>
  <small class="text-red-400" v-if="errorMessage">{{ errorMessage }}</small>
</template>

<template>
  <div class="flex justify-between items-center mb-4">
    <slot />
    <div class="flex gap-4 items-center">
      <slot name="actions" />
    </div>
  </div>
</template>

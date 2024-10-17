<script setup lang="ts">
import '../css/app.css'
import 'primeicons/primeicons.css'
import type { AuthOptions, Resource } from '../types'
import Sidebar from '../components/sidebar.vue'
import Toast from 'primevue/toast'
import Breadcrumb from 'primevue/breadcrumb'
import ConfirmPopup from 'primevue/confirmpopup'
import { Link } from '@inertiajs/vue3'
import { MenuItem } from 'primevue/menuitem'
import { provideResources } from '../composables/resources'

const props = defineProps<{
  breadcrumb: MenuItem[]
  menu: any[]
  resources: Record<string, Resource>
  auth: AuthOptions
}>()

provideResources(props.resources)
</script>

<template>
  <Toast />
  <ConfirmPopup></ConfirmPopup>
  <div class="bg-surface-50 dark:bg-surface-950 flex items-start h-screen text-color">
    <Sidebar :auth="auth" :menu="menu" :resources="Object.values(resources)" />
    <div class="flex-1 h-full overflow-y-auto p-4 flex flex-col">
      <Breadcrumb
        class="bg-transparent shrink-0 px-0 text-sm py-0 mb-4"
        :home="{ label: 'Home', icon: 'pi pi-home', url: '/admin' }"
        :model="breadcrumb"
      >
        <template #item="{ item, props }">
          <Link
            v-if="item.url"
            :href="item.url"
            :target="item.url"
            v-bind="props.action"
            class="text-muted-color"
          >
            <span v-if="item.icon" :class="[item.icon]" />
            <span>{{ item.label }}</span>
          </Link>
          <div v-else class="flex gap-2 items-center">
            <span v-if="item.icon" :class="[item.icon, 'text-color']" />
            <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
          </div>
        </template>
        <template #separator><span class="font-bold"> / </span></template>
      </Breadcrumb>
      <div class="flex-1 flex flex-col min-h-0">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Resource, ResourceRecord } from '../../types'
import { ref } from 'vue'
import { useResource } from '../../composables/resource'
import { useConfirm } from 'primevue/useconfirm'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import ConfirmDialog from 'primevue/confirmdialog'

const props = defineProps<{
  resource?: Resource
  records: ResourceRecord[]
}>()

const menu = ref()
const resource = useResource(props.resource)
const confirm = useConfirm()

const items = resource.actions.map((action) => ({
  label: action.label,
  icon: action.icon,
  command() {
    if (!action.confirmation) {
      return runAction(action.id)
    }

    confirm.require({
      ...action.confirmation,
      group: 'actions_menu',
      accept: () => {
        return runAction(action.id)
      },
    })
  },
}))

function runAction(action: string) {
  resource.runAction({ action, ids: props.records.map((r) => r.id) })
}

function toggle(event: Event) {
  menu.value.toggle(event)
}
</script>

<template>
  <template v-if="records.length">
    <ConfirmDialog group="actions_menu"></ConfirmDialog>
    <Menu ref="menu" :model="items" popup />
    <Button type="button" icon="pi pi-ellipsis-h" text @click="toggle" />
  </template>
</template>

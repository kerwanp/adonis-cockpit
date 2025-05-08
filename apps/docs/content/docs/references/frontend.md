# References

## Injected data

To avoid Prop Drilling, Cockpit frontend relies a lot on [`Provide/Inject`](https://vuejs.org/guide/components/provide-inject.html). Meaning that it is not necessary to pass down the data to every single component in the tree.

### `provideResource()`

The `provideResource` function uses [`provide`](https://vuejs.org/guide/components/provide-inject.html#provide) a resource to every children component in the tree.

```vue
<script setup lang="ts">
import { provideResource } from 'adonis-cockpit/inertia'

provideResource(resource)
</script>
```

### `injectResource()`

The `injectResource` function uses [`inject`](https://vuejs.org/guide/components/provide-inject.html#inject) to retrieve the provided resource.
A best practice when creating a component that requires a resource is to accept an optional resource as a prop and if not provided, use the context.

```vue
<script setup lang="ts">
import { injectResource } from 'adonis-cockpit/inertia'
import { InferSerializable } from 'adonis-cockpit/types'
import { BaseResource } from 'adonis-cockpit'

const props = defineProps<{
  resource?: InferSerializable<BaseResource>
}>()

const resource = props.resource ?? injectResource(resource)
</script>
```

:::warning

This function will error if there is no resource provided.

:::

### `provideRecord()`

### `injectRecord()`

## Components

### `<CreateButton />`

The `CreateButton` displays a link to the create view.

```vue
// Use the provided resource
<CreateButton />

// With a specific resource
<CreateButton :resource="resource" />
```

### `<DeleteButton />`

The `DeleteButton` displays a button for deleting a resource with a confirmation dialog.

```vue
// Use the provided resource
<DeleteButton recordId="34" />

// With a specific resource
<DeleteButton :resource="resource" recordId="97" />
```

### `<IndexButton />`

The `IndexButton` displays a link to the index view.

```vue
// Use the provided resource
<IndexButton />

// With a specific resource
<IndexButton :resource="resource" />
```

### `<EditButton />`

The `EditButton` displays a link to the edit view of a record.

```vue
// Use the provided resource
<EditButton recordId="98" />

// With a specific resource
<EditButton :resource="resource" recordId="76" />
```

### `<ActionsMenu />`

The `ActionMenu` component displays a button to open a menu that list the available actions for the resource.
You must provide a list of records for it to be shown.

```vue
// Use the provided resource
<ActionsMenu :records="records" />

// With a specific resource
<ActionsMenu :resource="resource" :records="records" />
```

### `<ResourceForm />`

The `ResourceForm` component is used to display an "edit" or "create" form of a resource.

- `action`: Either `create` or `update`
- `data`: The initial data of the form

```vue
// Uses the provided resource
<ResourceForm action="create" />
<ResourceForm action="edit" :data="record" />

// With a specific resource
<ResourceForm :resource="resource" action="create" />
<ResourceForm :resource="resource" action="update" />
```

### `<ResourceDetail />`

### `<ResourcePeek />`

### `<ResourceTable />`

## Composables

### `useResource()`

The `useResource` composable is a utility to manage resources.

```vue
<script setup lang="ts">
import { useResource } from 'adonis-cockpit/inertia'

const resource = useResource()

async function handleCreate() {
  await resource.create({ title: 'Hello' })
}
</script>

<template>
  <button @click="handleCreate">Create {{ resource.label }}</button>
</template>
```

## Types

Adonis Cockpit brings some type utils to improve the developer experience on the frontend.

### `RecordId`

### `InferSerializable`

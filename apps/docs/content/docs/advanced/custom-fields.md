# Custom Fields

## Introduction

Adonis Cockpit makes it really easy to extend the capabilities of your Admin by letting you create entirely custom fields.

On the following page we will create the existing [Color Picker Field](../basics/fields.md#color-picker).

## Generate the files

A field is made of three parts:

- `field.ts`: The field class used by the backend
- `index.vue`: The Vue component for the index views
- `form.vue`: The Vue component for the form views

Adonis Cockpit bring a `make:field` command to easily create new custom fields.

```sh
node ace make:field color-picker
```

:::disclosure{title="See steps performed by the add command"}

1. Generates the field class in `app/cockpit/fields/[name]/field.ts`.

2. Generates the Vue component for the index views `app/cockpit/fields/[name]/index.vue`.

3. Generates the Vue component for the form views `app/cockpit/fields/[name]/form.vue`.

::::

## Extending the Field

For our `ColorPicker` field we want to give the ability to configure the [format](https://primevue.org/colorpicker/#format) of our color (rgb, hex or hsb).

```ts
ColorPicker.make('color').rgb()
```

To achieve this we have two solutions:

- Store the value in our Field and add it to the serialized ouput (`toJSON`)
- Use the `$attributes` property

The `$attributes` property is perfect in this case as `format` is a simple prop on the PrimeVue component:

```ts
// title: app/cockpit/fields/index.ts
export default class ColorPicker extends Field {
  rgb(): this {
    return this.attribute('format', 'rgb')
  }

  hex(): this {
    return this.attribute('format', 'hex')
  }

  hsb(): this {
    return this.attribute('format', 'hsb')
  }
}
```

:::tip

Read more about the `Field` class on the dedicated [Field Reference page](../references/field.md).

:::

## The Form Component

The Form component is used on the `create` and `edit` pages, this is your form field.
In this example we are going to use the [`ColorPicker component`](https://primevue.org/colorpicker/) from PrimeVue.

```vue
// title: app/cockpit/color_picker/form.vue
<script setup lang="ts">
import { InferSerializable } from 'adonis-cockpit/types'
import ColorPickerField from './field.ts'

defineProps<{
  error?: string[]
  field: InferSerializable<ColorPickerField>
}>()

defineModel<string|null|undefined>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <ColorPicker
        :id="field.name"
        :name="field.name"
        :invalid="!!error?.length"
        v-model="model"
        v-bind="field.attributes"
      />
      <label :for="field.name">
        {{ model }}
      </label>
    </div>
    <small class="text-red-400" v-if="error">{{ error.join('\n') }}</small>
  </div>
</template>
```

In this component we:

- Define a model and use it on our input

- Define the required props to get our serialized field and the errors

- Use `v-bind="field.attributes"` to pass the `$attributes` containing our color format

:::tip

The `InferSerializable` utility type is used to retrieve the return type of the `toJSON` method of your field.

:::

## The Index Component

The Index Component is used on the `index` page, on the `detail` page (if there is no `detailComponent`) and on the `peek` popover (if there is no `peekComponent`).

In our case we will reuse the [ColorPicker](https://primevue.org/colorpicker/#disabled) PrimeVue component but disable it.

```vue
// title: app/cockpit/color_picker/form.vue
<script setup lang="ts">
import { InferSerializable } from 'adonis-cockpit/types'
import ColorPickerField from './field.ts'

defineProps<{
  field: InferSerializable<ColorPickerField>
  value: string|null|undefined
}>()
</script>

<template>
  <div class="flex gap-2">
    <ColorPicker
      :id="field.name"
      :name="field.name"
      :invalid="!!error?.length"
      :value="value"
      v-bind="field.attributes"
      disabled
    />
    <label :for="field.name">
      {{ model }}
    </label>
  </div>
</template>
```

In this component we:

- Define the required props to get our serialized field and the value.

- Use `v-bind="field.attributes"` to pass the `$attributes` containing our color format

## Use your custom field

You can now use your custom field wherever you want.

```ts
import ColorPicker from '#cockpit/fields/color_picker'

export default class ProductResource extends ModelResource {
  fields() {
    return [
      Id.make('id'),
      Text.make('name'),
      ColorPicker.make('color').rgb(),
    ]
  }
}
```

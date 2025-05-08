# Custom Pages

Adonis Cockpit has been built with extensibility in mind and creating custom pages is extremely easy.

## Define the route

First let's start by creating a new route that will render a custom page using [Inertia](https://docs.adonisjs.com/guides/views-and-templates/inertia). We will give it the name `admin.custom-page` to easily generate URLs later.

```ts
// title: start/routes.ts
router.get('/admin/custom-page', ({ inertia }: HttpContext) => {
  return inertia.render('custom-page')
}).as('admin.custom-page')
```

## Create the page

Next create the Vue component for the page.

```vue
// title: inertia/pages/custom-page.vue
<temlate>
  <Layout
    :menu="menu"
    :resources="resources"
    :breadcrumb="[
      { label: 'Custom Page' },
    ]"
  >
    <h1>Hello world!</h1>
  </Layout>
</temlate>
```

:::tip

Read more about the available methods, components and utils on the [Frontend reference page](../references/frontend.md).

:::

## Add the page to the menu

You can already access your page at the defined URL `/admin/custom-page`. Let's now add a new item in our Menu so users can access it.

```ts
// title: start/cockpit.ts
cockpit.menu([
  MenuItem.make()
    .route('admin.custom-page')
    .label('My custom page')
    .icon('pi pi-eye')
])
```

:::tip

You can read more information about menu configuration on the [Menu documentation page](./menu.md)

:::

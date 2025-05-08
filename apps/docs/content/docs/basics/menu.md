# Menu

By default Cockpit provides a really simple menu that list all your resources. You might want to display only specific resources and add new items. Hopefully, the menu is fully customizable.

## Menu Customization

The menu customization is done directly in the `start/cockpit.ts` file. Using the `cockpit.menu` method.
Customizing the menu will override the default one.

### Add a Menu Item

```ts
// title: start/cockpit.ts
cockpit.menu(menu => {
  menu.item('Home').icon('pi pi-home').route('cockpit.home')
  menu.item('Custom page').icon('pi pi-home').href('/admin/custom-page')
})
```

### Add a Resource Menu Item

Cockpit provides an helper to add items directly from a resource. The label, icon and route will be automatically configured.

```ts
// title: start/cockpit.ts
cockpit.menu(menu => {
  menu.resource(UserResource)
})
```

### Add a Category

Categories are a great way to group your items, it works the same as the `menu` method.

```ts
// title: start/cockpit.ts
cockpit.menu(menu => {
  menu.category('Resources', (category) => {
    category.resource(UserResource)
    category.item('Settings').route('settings')
  })
})
```

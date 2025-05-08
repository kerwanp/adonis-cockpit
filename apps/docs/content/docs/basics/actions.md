# Actions

Actions are operations that can be applied with one or multiple records.

## Creating Actions

Actions are simple classes that extend `Action`.

- `label`: The label displayed in the [`ActionsMenu`](../references/frontend.md#actionsmenu-)
- `icon`: The icon displayed in the [`ActionsMenu`](../references/frontend.md#actionsmenu-)
- `handle()` The method called when running the action.

### Example

```ts
import { Action } from 'adonis-cockpit/actions'

export default class SynchronizeAction extends Action {
  label = 'Synchronize'
  icon = 'pi pi-sync'

  handle(resource: BaseResource, ids: RecordId[]) {
    return customService.synchronize(resource.name, ...ids)
  }
}
```

### Confirmation Dialog

It is important to ask the user for confirmation when running important tasks. You can achieve that by adding a `confirmation` method to your action that returns the properties for the dialog. [See the available options](https://primevue.org/confirmdialog/)

```ts
import { Action } from 'adonis-cockpit/actions'

export default class SynchronizeAction extends Action {
  // ...
  confirmation() {
    return {
      header: 'Synchronize Records',
      message: 'Are you sure you want to synchronize the records?'
    }
  }
}
```

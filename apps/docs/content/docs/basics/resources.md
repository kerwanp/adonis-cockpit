# Resources

Resources are the core of Cockpit. They represent your administrable resources.

You can manage any kind of resources and by default Cockpit ship with a `LucidResource` to manage [Lucid Models](https://lucid.adonisjs.com/docs/models). If you want to create custom resources, head over to the dedicated [Custom Resources page](../advanced/custom-resources.md).

## Defining Resources

Cockpit bring a `make:resource` command to easily create and register new resources.

```sh
node ace make:resource User
```

:::disclosure{title="See steps performed by the add command"}

1. Creates a new `app/cockpit/user_resource.ts`

   ```ts
   import User from "#models/user";

   export default class UserResource {
     model = User;
   }
   ```

2. Registers the created resource in `start/cockpit.ts`

   ```ts
   import cockpit from "adonis-cockpit/services/main";
   import UserResource from "#cockpit/user_resource";

   cockpit.resource(UserResource);
   ```

:::

:::tip

By default, every Cockpit elements are generated inside `app/cockpit` folder. You can change this behavior with the `cockpitPath` configuration option. Learn more on the [Configuration page](../getting-started/configuration.md).

:::

## Registering Resources

To make any `Resource` available in your Cockpit dashboard, you need to register it in the `start/cockpit.ts` file using the `cockpit.resource` method.

:::tip

Adonis Cockpit [`make:command`](#defining-resources) automatically registers resources for you.

:::

```ts
import cockpit from "adonis-cockpit/services/main";
import UserResource from "#cockpit/user_resource";

cockpit.resource(UserResource);
```

## Resource configuration

### Fields

The fields defines what data will be shown and how it will be displayed. You can configure the fields inside the `fields` method of your resource.

```ts
import { Id, Text, Email, Boolean } from "adonis-cockpit/fields";

export default class UserResource extends ModelResource {
  fields() {
    return [
      Id.make("id"),
      Text.make("firstName"),
      Text.make("lastName"),
      Email.make("email"),
      Boolean.make("isAdmin"),
    ];
  }
}
```

:::tip

Read more about the different available fields and their configuration on the dedicated [Fields page](./fields.md).

:::

### Labels and Slug

By default, the `ModelResource` automatically setup everything for you. But you might want to configure the labels and the slug that will be used across the administration pages of your resource.

```ts
export default class MemberResource extends ModelResource {
  label() {
    return "User";
  }

  labelPlural() {
    return "Users";
  }

  slug() {
    return "users";
  }
}
```

### Actions

Actions are operations that can be applied with one or multiple records. You can override the default actions and add custom ones by overriding the `actions` method.

```ts
export default class MemberResource extends ModelResource {
  actions(): Action[] {
    return [
      SynchronizeAction.make(),
      DeleteAction.make(),
    ]
  }
}
```

:::tip

Read more about how to create custom Actions on the dedicated [Actions documentation page](./actions.md)

:::

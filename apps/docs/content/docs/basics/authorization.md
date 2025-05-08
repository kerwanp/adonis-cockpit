# Authorization

Adonis Cockpit relies on [Adonis Bouncer](https://docs.adonisjs.com/guides/security/authorization) for authorization. You can apply policies globaly, per operation and resources.

:::tip

Adonis Cockpit does not bring any authentication system (yet), you can follow the [Official Adonis Authentication documentation](https://docs.adonisjs.com/guides/authentication/introduction) to get everything setup.

:::

## Configuring Auth

### URLs

Cockpit is able to display a Logout button when the user is authenticated, you can configure the URL in the Cockpit configuration file.

```ts
// title: config/cockpit.ts
import { defineConfig } from 'adonis-cockpit'

export default defineConfig({
  auth: {
    logoutUrl: '/logout',
  },
})
```

### User

Cockpit will display the current authenticated user information in the navigation bar. By default it will retrieve the `email`, `userName` and `avatar` from your model. You might want to change this behavior, you can do it so using the `auth.user` configuration option.

```ts
// title: config/cockpit.ts
import { defineConfig } from 'adonis-cockpit'

export default defineConfig({
  auth: {
    user({ auth }) {
      const user = auth.getUserOrFail()
      return {
        userName: `${user.firstName} ${user.lastName}`,
        email: user.email
      }
    }
  },
})
```

## Policies

### Global Policy

The global policy is applied everywhere on the admin.

```ts
// title: app/abilities/main.ts
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'

export const adminPolicy = Bouncer.ability((user: User) => {
  return user.isAdmin
})
```

```ts
// title: start/cockpit.ts
import cockpit from 'adonis-cockpit/services/main'

cockpit.policy(adminPolicy)
```

### Per Operation Policies

You can define different policies for each different kind of operations.

```ts
// title: start/cockpit.ts
import cockpit from 'adonis-cockpit/services/main'

cockpit.policies({
  read: memberPolicy,
  create: adminPolicy,
  update: adminPolicy,
  delete: superAdminPolicy
})
```

:::warning

The per operation policies are overwritten by the [Per Resource](#per-resource) and [Per Action](#per-action) policies.

:::

### Per Resource Policies

You can apply custom policies at the resource level. They will override the [Per Operation](#per-operation) policies.

```ts
class Resource extends ModelResurce {
  policies = {
    read: memberPolicy,
    create: adminPolicy,
    update: adminPolicy,
    delete: superAdminPolicy
  }
}
```

### Per Action Policies

You can apply custom policies to your [Actions](./actions.md). They will override the [Per Operation](#per-operation) policies.

```ts
class SynchronizeAction extends Action {
  policy = synchronizePolicy
}
```

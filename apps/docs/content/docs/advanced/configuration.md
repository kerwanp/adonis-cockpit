# Configuration

## Dashboard Access

By default everyone has access to your Cockpit dashboard, to prevent this you can use your own abilities.

```ts
// title: app/abilities/main.ts
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'

export const accessAdmin = Bouncer.ability((user: User) => {
  return user.isAdmin
})
```

```ts
// title: start/cockpit.ts
import cockpit from 'adonis-cockpit/services/main'

cockpit.policy(dashboardAccess)
```

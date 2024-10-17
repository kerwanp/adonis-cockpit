import { HttpContext } from '@adonisjs/core/http'
import cockpit from '../services/main.js'
import { NextFn } from '@adonisjs/core/types/http'
import { User } from './types.js'

export async function cockpitMiddleware(ctx: HttpContext, next: NextFn) {
  let user: User | undefined
  if ('auth' in ctx) {
    await ctx.auth.check()

    if (cockpit.config.auth?.user) {
      user = cockpit.config.auth.user(ctx)
    } else {
      user = ctx.auth.user
    }
  }

  if (cockpit.$routesManager.$policy) {
    if ('bouncer' in ctx) {
      // TODO: Type
      const bouncer = ctx.bouncer as any
      if (await bouncer.denies(cockpit.$routesManager.$policy)) {
        ctx.response.abort('You cannot access the Cockpit panel')
      }
    }
  }

  ctx.inertia.share({
    menu: () => cockpit.buildMenu().toJSON(),
    resources: () =>
      Object.entries(cockpit.getResources()).reduce(
        (acc, [name, item]) => ({
          ...acc,
          [name]: item.toJSON(),
        }),
        {}
      ),
    auth: () => ({
      logoutUrl: cockpit.config.auth?.logoutUrl ?? '/logout',
      user,
    }),
  })

  await next()
}

import { HttpContext } from '@adonisjs/core/http'
import cockpit from '../services/main.js'
import { NextFn } from '@adonisjs/core/types/http'

export async function cockpitMiddleware(ctx: HttpContext, next: NextFn) {
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
  })

  if (cockpit.$routesManager.$policy) {
    if ('bouncer' in ctx) {
      // TODO: Type
      const bouncer = ctx.bouncer as any
      if (await bouncer.denies(cockpit.$routesManager.$policy)) {
        ctx.response.abort('You cannot access the Cockpit panel')
      }
    }
  }

  await next()
}

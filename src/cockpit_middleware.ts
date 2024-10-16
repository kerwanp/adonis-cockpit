import { HttpContext } from '@adonisjs/core/http'
import admin from '../services/main.js'
import { NextFn } from '@adonisjs/core/types/http'

export async function cockpitMiddleware(ctx: HttpContext, next: NextFn) {
  ctx.inertia.share({
    menu: () => admin.buildMenu().toJSON(),
    resources: () =>
      Object.entries(admin.getResources()).reduce(
        (acc, [name, item]) => ({
          ...acc,
          [name]: item.toJSON(),
        }),
        {}
      ),
  })

  if (admin.$routesManager.$policy) {
    if ('bouncer' in ctx) {
      // TODO: Type
      const bouncer = ctx.bouncer as any
      if (await bouncer.denies(admin.$routesManager.$policy)) {
        ctx.response.abort('You cannot access the Cockpit panel')
      }
    }
  }

  await next()
}

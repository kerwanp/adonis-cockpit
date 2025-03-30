import { HttpContext } from "@adonisjs/core/http";
import { NextFn } from "@adonisjs/core/types/http";

export default class CockpitMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const cockpit = await import("../services/main.js").then((m) => m.default);

    const user = cockpit.getUser(ctx);

    await cockpit.$resourcesManager.commit();

    ctx.inertia.share({
      menu: await cockpit.getMenu(),
      resources: () =>
        Object.entries(cockpit.$resourcesManager.resources).reduce(
          (acc, [name, item]) => ({
            ...acc,
            [name]: item.toJSON(),
          }),
          {},
        ),
      ...(user ? { user } : {}),
    });

    await next();
  }
}

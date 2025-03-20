import { HttpContext } from "@adonisjs/core/http";
import { NextFn } from "@adonisjs/core/types/http";

export async function cockpitMiddleware(ctx: HttpContext, next: NextFn) {
  const cockpit = await import("../services/main.js").then((m) => m.default);

  ctx.inertia.share({
    resources: () =>
      Object.entries(cockpit.$resourcesManager.resources).reduce(
        (acc, [name, item]) => ({
          ...acc,
          [name]: item.toJSON(),
        }),
        {},
      ),
  });

  await next();
}

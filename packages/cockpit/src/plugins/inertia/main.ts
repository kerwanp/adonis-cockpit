import { configProvider } from "@adonisjs/core";
import { ConfigProvider } from "@adonisjs/core/types";
import { ResolvedConfig } from "@adonisjs/inertia/types";

export default function withCockpit(
  provider: ConfigProvider<ResolvedConfig<{}>>,
): ConfigProvider<ResolvedConfig<{}>> {
  return configProvider.create(async (app) => {
    const config = await provider.resolver(app);

    config.rootView = extendRootView(config.rootView);

    return config;
  });
}

function extendRootView(
  option: ResolvedConfig<{}>["rootView"],
): ResolvedConfig<{}>["rootView"] {
  return (ctx) => {
    // TODO: Do not hardcode
    if (ctx.request.url().startsWith("/admin")) {
      return "cockpit::react_layout";
    }

    return typeof option === "string" ? option : option(ctx);
  };
}

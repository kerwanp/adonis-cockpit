import { configProvider } from "@adonisjs/core";
import { ConfigProvider } from "@adonisjs/core/types";
import { ResolvedConfig } from "@adonisjs/inertia/types";

export default function withCockpit(
  provider: ConfigProvider<ResolvedConfig<{}>>,
): ConfigProvider<ResolvedConfig<{}>> {
  return configProvider.create(async (app) => {
    const config = await provider.resolver(app);

    config.rootView = extendRootView(config.rootView);
    config.ssr.pages = extendSSR(config.ssr.pages);

    return config;
  });
}

function extendRootView(
  option: ResolvedConfig<{}>["rootView"],
): ResolvedConfig<{}>["rootView"] {
  return (ctx) => {
    if (ctx.route?.name?.startsWith("cockpit.")) return "cockpit::react_layout";
    if (typeof option === "string") return option;
    return option(ctx);
  };
}

function extendSSR(
  option: ResolvedConfig<{}>["ssr"]["pages"],
): ResolvedConfig<{}>["ssr"]["pages"] {
  return (ctx, page) => {
    if (ctx.route?.name?.startsWith("cockpit.")) return false;
    if (option === undefined) return true;
    if (Array.isArray(option)) return option.includes(page);
    return option(ctx, page);
  };
}

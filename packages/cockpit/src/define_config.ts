import { configProvider } from "@adonisjs/core";
import { ConfigProvider } from "@adonisjs/core/types";
import { CockpitConfig, ResolvedConfig } from "./types.js";

export function defineConfig(
  config: CockpitConfig,
): ConfigProvider<ResolvedConfig> {
  return configProvider.create(async () => {
    return config;
  });
}

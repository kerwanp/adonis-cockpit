import { ApplicationService } from "@adonisjs/core/types";
import CockpitManager from "../src/manager.js";
import { CockpitConfig, ResolvedConfig } from "../src/types.js";
import { configProvider } from "@adonisjs/core";
import { RuntimeException } from "@adonisjs/core/exceptions";
import "../src/extensions.js";

export default class CockpitProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton(CockpitManager, async (container) => {
      const router = await container.make("router");
      const cockpitConfigProvider =
        this.app.config.get<CockpitConfig>("cockpit");
      const config = await configProvider.resolve<ResolvedConfig>(
        this.app,
        cockpitConfigProvider,
      );

      if (!config) {
        throw new RuntimeException(
          'Invalid "config/cockpit.ts" file. Make sure you are using the "defineConfig" method',
        );
      }

      return new CockpitManager(router, config);
    });
  }

  async boot() {
    await this.#registerEdgePlugin();
  }

  async #registerEdgePlugin() {
    if (!this.app.usingEdgeJS) return;

    const edgeExports = await import("edge.js");
    const { default: edgePluginCockpit } = await import(
      "../src/plugins/edge/main.js"
    );

    edgeExports.default.use(edgePluginCockpit());
  }
}

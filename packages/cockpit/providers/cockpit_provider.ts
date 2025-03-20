import { ApplicationService } from "@adonisjs/core/types";
import CockpitManager from "../src/manager.js";

export default class CockpitProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton(CockpitManager, async (container) => {
      const router = await container.make("router");
      return new CockpitManager(router);
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

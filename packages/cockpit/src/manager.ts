import { HttpRouterService } from "@adonisjs/core/types";
import { ResourcesManager } from "./resources/manager.js";
import { RoutesManager } from "./routes/manager.js";
import { errors } from "./errors/index.js";
import { Menu } from "./menu/menu.js";
import { HttpContext, RouteGroup } from "@adonisjs/core/http";
import { ResolvedConfig } from "./types.js";

export default class CockpitManager {
  $resourcesManager: ResourcesManager;
  $routesManager: RoutesManager;

  protected config: ResolvedConfig;

  sidebar = new Menu();

  protected menu?: Menu;

  constructor(router: HttpRouterService, config: ResolvedConfig) {
    this.$routesManager = new RoutesManager(router);
    this.$resourcesManager = new ResourcesManager(config.resources);
    this.config = config;
  }

  registerRoutes(modifier?: (group: RouteGroup) => void) {
    return this.$routesManager.registerRoutes(modifier);
  }

  getResource(name: string) {
    return this.$resourcesManager.get(name);
  }

  getResourceOrFail(name: string) {
    const resource = this.$resourcesManager.get(name);

    if (!resource) {
      throw new errors.E_RESOURCE_NOT_FOUND(name);
    }

    return resource;
  }

  getUser(ctx: HttpContext) {
    try {
      return this.config.auth.user?.(ctx);
    } catch {
      return null;
    }
  }

  async getMenu() {
    if (!this.menu) {
      this.menu = await this.config.menu().then((r) => r.default);
    }

    return this.menu.toJSON();
  }

  async commit() {
    await this.$resourcesManager.commit();
  }
}

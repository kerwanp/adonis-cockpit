import { HttpRouterService } from "@adonisjs/core/types";
import { ResourcesManager } from "./resources/manager.js";
import { RoutesManager } from "./routes/manager.js";
import { errors } from "./errors/index.js";
import { Constructor } from "type-fest";
import { BaseResource } from "./resources/base_resource.js";
import { Menu } from "./menu/menu.js";
import { HttpContext, RouteGroup } from "@adonisjs/core/http";
import { ResolvedConfig } from "./types.js";

export default class CockpitManager {
  $resourcesManager: ResourcesManager;
  $routesManager: RoutesManager;

  protected config: ResolvedConfig;

  sidebar = new Menu();

  constructor(router: HttpRouterService, config: ResolvedConfig) {
    this.$routesManager = new RoutesManager(router);
    this.$resourcesManager = new ResourcesManager();
    this.config = config;
  }

  registerRoutes(modifier?: (group: RouteGroup) => void) {
    return this.$routesManager.registerRoutes(modifier);
  }

  resources(...resources: Constructor<BaseResource>[]) {
    for (const resource of resources) {
      this.$resourcesManager.register(new resource());
    }
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
    return this.config.auth.user?.(ctx);
  }

  getMenu() {
    // if (!this.#menuBuilder) {
    //   menu.item("Home").icon("pi pi-home").route("cockpit.home");
    //   menu.category("Resources", (category) => {
    //     for (const resource of Object.values(
    //       this.$resourcesManager.resources,
    //     )) {
    //       category.resource(resource);
    //     }
    //   });
    //   return menu;
    // }

    // const menu = new Menu();

    // MenuStorage.run(menu, () => this.#menuBuilder!(menu));

    return this.sidebar.toJSON();
  }
}

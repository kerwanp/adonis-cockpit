import { HttpRouterService } from "@adonisjs/core/types";
import { ResourcesManager } from "./resources/manager.js";
import { RoutesManager } from "./routes/manager.js";
import { errors } from "./errors/index.js";
import { Constructor } from "type-fest";
import { BaseResource } from "./resources/base_resource.js";

export default class CockpitManager {
  $resourcesManager: ResourcesManager;
  $routesManager: RoutesManager;

  constructor(router: HttpRouterService) {
    this.$routesManager = new RoutesManager(router);
    this.$resourcesManager = new ResourcesManager();
  }

  registerRoutes() {
    this.$routesManager.registerRoutes();
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
}

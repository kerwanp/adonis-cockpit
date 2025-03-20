/// <reference types="@adonisjs/inertia/inertia_middleware" />

import { HttpRouterService } from "@adonisjs/core/types";
import { cockpitMiddleware } from "../middleware.js";

const CockpitController = () => import("../controllers/cockpit_controller.js");
const ResourcesController = () =>
  import("../controllers/resources_controller.js");

const ApiResourcesController = () =>
  import("../controllers/api_resources_controller.js");

export class RoutesManager {
  #router: HttpRouterService;

  constructor(router: HttpRouterService) {
    this.#router = router;
  }

  registerRoutes() {
    const router = this.#router;
    router
      .group(() => {
        this.#registerBaseRoutes();
        this.#registerResourceRoutes();
        this.#registerApiRoutes();
      })
      .use(cockpitMiddleware)
      .prefix("/admin")
      .as("cockpit");
  }

  #registerBaseRoutes() {
    const router = this.#router;
    router.get("/", [CockpitController, "home"]).as("home");
  }

  #registerResourceRoutes() {
    const router = this.#router;

    router
      .group(() => {
        router.get("/", [ResourcesController, "index"]).as("index");
        // router.get("/create", [ResourcesController, "create"]).as("create");
        // router.get("/:resource", [ResourcesController, "detail"]).as("detail");
        // router.get("/:resouce/edit", [ResourcesController, "edit"]).as("edit");
      })
      .prefix("/resources/:resource")
      .as("resources");
  }

  #registerApiRoutes() {
    const router = this.#router;

    router
      .group(() => {
        router
          .group(() => {
            router.get("/", [ApiResourcesController, "index"]).as("index");
            // router.get("/create", [ResourcesController, "create"]).as("create");
            // router.get("/:resource", [ResourcesController, "detail"]).as("detail");
            // router.get("/:resouce/edit", [ResourcesController, "edit"]).as("edit");
          })
          .prefix("/resources/:resource")
          .as("resources");
      })
      .prefix("/api")
      .as("api");
  }
}

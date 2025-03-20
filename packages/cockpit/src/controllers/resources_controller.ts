/// <reference types="@adonisjs/inertia/inertia_middleware" />

import { HttpContext } from "@adonisjs/core/http";
import cockpit from "../../services/main.js";

export default class ResourcesController {
  index({ request, inertia }: HttpContext) {
    const resourceName = request.param("resource");
    const resource = cockpit.getResourceOrFail(resourceName);

    return inertia.render("cockpit::resources/index", {
      resource: resourceName,
      breadcrumb: [
        {
          label: resource.labelPlural(),
        },
      ],
    });
  }
}

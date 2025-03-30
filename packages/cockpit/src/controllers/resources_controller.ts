/// <reference types="@adonisjs/inertia/inertia_middleware" />

import { HttpContext } from "@adonisjs/core/http";
import cockpit from "../../services/main.js";
import router from "@adonisjs/core/services/router";

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

  async edit({ request, inertia }: HttpContext) {
    const resourceName = request.param("resource");
    const recordId = request.param("record");

    const resource = cockpit.getResourceOrFail(resourceName);
    const record = await resource.retrieve({ id: recordId });

    return inertia.render("cockpit::resources/edit", {
      resource: resource.name(),
      record,
      breadcrumb: [
        {
          label: resource.labelPlural(),
          url: router.makeUrl("cockpit.resources.index", {
            resource: resource.name(),
          }),
        },
        {
          label: record[resource.titleKey()],
        },
      ],
    });
  }

  async create({ request, inertia }: HttpContext) {
    const resourceName = request.param("resource");

    const resource = cockpit.getResourceOrFail(resourceName);

    return inertia.render("cockpit::resources/create", {
      resource: resource.name(),
      breadcrumb: [
        {
          label: resource.labelPlural(),
          url: router.makeUrl("cockpit.resources.index", {
            resource: resource.name(),
          }),
        },
        {
          label: "Create",
        },
      ],
    });
  }
}

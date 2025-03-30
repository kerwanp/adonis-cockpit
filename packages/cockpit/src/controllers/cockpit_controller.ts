/// <reference types="@adonisjs/inertia/inertia_middleware" />

import { HttpContext } from "@adonisjs/core/http";

export default class CockpitController {
  home({ inertia }: HttpContext) {
    return inertia.render("cockpit::home", {
      breadcrumb: [
        {
          label: "Home",
        },
      ],
    });
  }
}

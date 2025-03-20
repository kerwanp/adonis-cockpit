/// <reference types="@adonisjs/core/providers/vinejs_provider" />

import { HttpContext } from "@adonisjs/core/http";
import cockpit from "../../services/main.js";
import vine from "@vinejs/vine";

export const indexValidator = vine.compile(
  vine.object({
    page: vine.number(),
    perPage: vine.number(),
    params: vine.object({
      resource: vine.string(),
    }),
  }),
);

export default class ResourcesController {
  async index({ request }: HttpContext) {
    const resourceName = request.param("resource");
    const resource = cockpit.getResourceOrFail(resourceName);

    const { params, ...payload } = await request.validateUsing(indexValidator);

    const data = await resource.list(payload);

    return data;
  }
}

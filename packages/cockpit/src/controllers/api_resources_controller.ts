/// <reference types="@adonisjs/core/providers/vinejs_provider" />

import { HttpContext } from "@adonisjs/core/http";
import cockpit from "../../services/main.js";
import vine from "@vinejs/vine";

const indexValidator = vine.compile(
  vine.object({
    page: vine.number(),
    perPage: vine.number(),
    query: vine.string().optional(),
    filter: vine.any().optional(),
    sort: vine.any().optional(),
    params: vine.object({
      resource: vine.string(),
    }),
  }),
);

const updateValidator = vine.compile(
  vine.object({
    params: vine.object({
      resource: vine.string(),
      record: vine.union([
        vine.union.if((v) => vine.helpers.isString(v), vine.string()),
        vine.union.if((v) => vine.helpers.isNumeric(v), vine.number()),
      ]),
    }),
    data: vine.any(),
  }),
);

const createValidator = vine.compile(
  vine.object({
    params: vine.object({
      resource: vine.string(),
    }),
    data: vine.any(),
  }),
);

const deleteValidator = vine.compile(
  vine.object({
    params: vine.object({
      resource: vine.string(),
      record: vine.union([
        vine.union.if((v) => vine.helpers.isString(v), vine.string()),
        vine.union.if((v) => vine.helpers.isNumeric(v), vine.number()),
      ]),
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

  async retrieve({ request }: HttpContext) {
    const resourceName = request.param("resource");
    const recordId = request.param("record");
    const resource = cockpit.getResourceOrFail(resourceName);
    const record = await resource.retrieve({ id: recordId });
    return record;
  }

  async update({ request }: HttpContext) {
    const { params, ...payload } = await request.validateUsing(updateValidator);
    const resource = cockpit.getResourceOrFail(params.resource);

    return await resource.update(params.record, payload.data);
  }

  async create({ request }: HttpContext) {
    const { params, ...payload } = await request.validateUsing(createValidator);
    const resource = cockpit.getResourceOrFail(params.resource);

    return await resource.create(payload.data);
  }

  async delete({ request }: HttpContext) {
    const { params } = await request.validateUsing(deleteValidator);
    const resource = cockpit.getResourceOrFail(params.resource);

    return await resource.delete(params.record);
  }
}

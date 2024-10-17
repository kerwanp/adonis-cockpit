import { HttpContext } from '@adonisjs/core/http'
import admin from '../../../../services/main.js'
import vine from '@vinejs/vine'

const validator = vine.compile(
  vine.object({
    data: vine.any(),
    params: vine.object({
      resourceSlug: vine.string(),
      recordId: vine.string(),
    }),
  })
)

export async function handleApiUpdate({ request, response }: HttpContext) {
  const { params, ...payload } = await request.validateUsing(validator)
  const resource = admin.findResourceBySlug(params.resourceSlug)

  if (!resource) {
    return response.status(404)
  }

  // TODO: Workaround, must be done properly
  delete payload.data[resource.idKey()]

  const data = await resource.validate(payload.data)

  return resource.update(params.recordId, data)
}

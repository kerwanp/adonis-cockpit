import { HttpContext } from '@adonisjs/core/http'
import admin from '../../../../services/main.js'
import vine from '@vinejs/vine'

const validator = vine.compile(
  vine.object({
    ids: vine.array(vine.any()), // TODO: Allows numbers and string
    params: vine.object({
      resourceSlug: vine.string(),
      action: vine.string(),
    }),
  })
)

export async function handleApiAction({ request, response }: HttpContext) {
  const { params, ...payload } = await request.validateUsing(validator)
  const resource = admin.findResourceBySlug(params.resourceSlug)

  if (!resource) {
    return response.status(404)
  }

  const action = resource.actions().find((item) => item.constructor.name === params.action)

  if (!action) {
    return response.status(404)
  }

  return action.handle(resource, payload.ids)
}

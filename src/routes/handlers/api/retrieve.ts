import { HttpContext } from '@adonisjs/core/http'
import admin from '../../../../services/main.js'
import vine from '@vinejs/vine'

const validator = vine.compile(
  vine.object({
    params: vine.object({
      resourceSlug: vine.string(),
      recordId: vine.string(),
    }),
  })
)

export async function handleApiRetrieve({ request, response }: HttpContext) {
  const { params } = await request.validateUsing(validator)
  const resource = admin.findResourceBySlug(params.resourceSlug)

  if (!resource) {
    return response.status(404)
  }

  return resource.retrieve(params.recordId)
}

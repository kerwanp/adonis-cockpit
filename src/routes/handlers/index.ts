import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import admin from '../../../services/main.js'

// TODO: Validation
const getValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    perPage: vine.number().optional(),
  })
)

export async function makeIndexHandler({ request, response, inertia }: HttpContext) {
  const resourceName = request.param('slug')
  const resource = admin.findResourceBySlug(resourceName)

  if (!resource) {
    return response.status(404)
  }

  return inertia.render('cockpit::resources/index', {
    resource: resource.toJSON(),
  })
}

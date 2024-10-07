import { HttpContext } from '@adonisjs/core/http'
import admin from '../../../services/main.js'

export async function resourceDetailHandler({ request, response, inertia }: HttpContext) {
  const resourceName = request.param('slug')
  const resource = admin.findResourceBySlug(resourceName)

  if (!resource) {
    return response.status(404)
  }

  const id = request.param('id')
  const model = await resource.retrieve(id)

  return inertia.render('cockpit::resources/detail', {
    resource: resource.toJSON(),
    data: model.serialize(),
  })
}

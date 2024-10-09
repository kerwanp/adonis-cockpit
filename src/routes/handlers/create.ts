import '@adonisjs/inertia/types'
import { HttpContext } from '@adonisjs/core/http'
import admin from '../../../services/main.js'

export async function resourceCreateHandler({ request, response, inertia }: HttpContext) {
  const resourceName = request.param('slug')
  const resource = admin.findResourceBySlug(resourceName)

  if (!resource) {
    return response.status(404)
  }

  return inertia.render('cockpit::resources/create', { resource: resource.toJSON() })
}

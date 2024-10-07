import { HttpContext } from '@adonisjs/core/http'
import admin from '../../../../services/main.js'

// TODO: Validation
export async function handleApiDelete({ request, response }: HttpContext) {
  const slug = request.param('resourceSlug')
  const recordId = request.param('recordId')
  const resource = admin.findResourceBySlug(slug)

  if (!resource) {
    return response.status(404)
  }

  await resource.delete(recordId)

  response.status(204)
}

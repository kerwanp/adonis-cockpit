import { HttpContext } from '@adonisjs/core/http'
import admin from '../../../services/main.js'

export async function resourceEditHandler({ request, response, inertia }: HttpContext) {
  const resourceName = request.param('slug')
  const resource = admin.findResourceBySlug(resourceName)

  if (!resource) {
    return response.status(404)
  }

  const id = request.param('id')
  const model = await resource.retrieve(id)

  if (request.method() === 'POST') {
    const { ...payload } = request.body()
    model.merge(payload)
    await model.save()
  }

  return inertia.render('cockpit::resources/edit', {
    resource: resource.toJSON(),
    data: model.serialize(),
  })
}

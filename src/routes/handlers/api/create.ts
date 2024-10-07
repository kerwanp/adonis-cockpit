import { HttpContext } from '@adonisjs/core/http'
import admin from '../../../../services/main.js'

export async function handleApiCreate({ request, response }: HttpContext) {
  const { ...payload } = request.body()

  const resourceName = request.param('resourceSlug')
  const resource = admin.findResourceBySlug(resourceName)

  if (!resource) {
    return response.status(404)
  }

  // const data = await resource.validate(payload)
  const data = payload

  const record = await resource.create(data)
  return record
}

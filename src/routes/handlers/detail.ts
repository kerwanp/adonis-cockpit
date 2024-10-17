import { HttpContext } from '@adonisjs/core/http'
import cockpit from '../../../services/main.js'

export async function resourceDetailHandler({ request, response, inertia }: HttpContext) {
  const resourceName = request.param('slug')
  const resource = cockpit.findResourceBySlug(resourceName)

  if (!resource) {
    return response.status(404)
  }

  const id = request.param('id')
  const model = await resource.retrieve(id)

  return inertia.render('cockpit::resources/detail', {
    resource: resource.toJSON(),
    record: model.serialize(),
    breadcrumb: [
      { label: resource.labelPlural(), icon: resource.icon?.(), url: resource.route('index') },
      { label: 'Detail' },
    ],
  })
}

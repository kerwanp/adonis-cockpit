import '@adonisjs/inertia/types'
import { HttpContext } from '@adonisjs/core/http'
import cockpit from '../../../services/main.js'

export async function resourceCreateHandler({ request, response, inertia }: HttpContext) {
  const resourceName = request.param('slug')
  const resource = cockpit.findResourceBySlug(resourceName)

  if (!resource) {
    return response.status(404)
  }

  return inertia.render('cockpit::resources/create', {
    resource: resource.toJSON(),
    breadcrumb: [
      { label: resource.labelPlural(), icon: resource.icon?.(), url: resource.route('index') },
      { label: 'Detail' },
    ],
  })
}

import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import cockpit from '../../../services/main.js'

const validator = vine.compile(
  vine.object({
    params: vine.object({
      slug: vine.string(),
    }),
  })
)

export async function makeIndexHandler({ request, response, inertia }: HttpContext) {
  const { params } = await request.validateUsing(validator)
  const resource = cockpit.findResourceBySlug(params.slug)

  if (!resource) {
    return response.status(404)
  }

  return inertia.render('cockpit::resources/index', {
    resource: resource.toJSON(),
    breadcrumb: [
      {
        label: resource.labelPlural(),
        icon: resource.icon?.(),
      },
    ],
  })
}

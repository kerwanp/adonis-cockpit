import { HttpContext } from '@adonisjs/core/http'
import admin from '../../../../services/main.js'
import vine from '@vinejs/vine'
import { Infer, InferInput } from '@vinejs/vine/types'

export const validator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    perPage: vine.number().optional(),
    sorts: vine
      .array(
        vine.object({
          field: vine.string(),
          direction: vine.enum(['asc', 'desc']),
        })
      )
      .optional(),
    filters: vine
      .array(
        vine.object({
          field: vine.string(),
          value: vine.any(),
        })
      )
      .optional(),
    search: vine.string().optional(),
    params: vine.object({
      resourceSlug: vine.string(),
    }),
  })
)

export async function handleApiIndex({ request }: HttpContext) {
  const { params, ...payload } = await request.validateUsing(validator)

  const resource = admin.findResourceBySlug(params.resourceSlug)

  if (!resource) {
    // TODO: Fix issue
    throw new Error('Resource not found')
  }

  const paginator = resource.list(payload)
  return paginator
}

export type ApiIndexInputParams = Omit<InferInput<typeof validator>, 'params'>
export type ApiIndexParams = Omit<Infer<typeof validator>, 'params'>

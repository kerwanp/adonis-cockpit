import { HttpContext } from '@adonisjs/core/http'
import { BaseResource } from './base_resource.js'
import { Component, Type } from './types.js'
import edge from 'edge.js'
import string from '@adonisjs/core/helpers/string'
import router from '@adonisjs/core/services/router'
import vine from '@vinejs/vine'

export default class Admin {
  #resources: BaseResource[] = []
  #menu: () => Component[] = () => []

  resource(Resource: Type<BaseResource>) {
    const resource = new Resource()
    this.#resources.push(resource)

    const slug = string.create(resource.name()).slugify().noCase().plural().toString()

    router
      .group(() => {
        router
          .get('/', async (ctx) => {
            const page = ctx.request.input('page', 1)
            const pagination = await resource.list().paginate(page, 3)
            pagination.baseUrl(resource.route('index'))

            return ctx.view.render('admin::pages/resources/index', {
              resource,
              pagination,
            })
          })
          .as('index')
        router
          .route('/create', ['POST', 'GET'], async (ctx) => {
            if (ctx.request.method() === 'POST') {
              const { _csrf, ...payload } = ctx.request.body()

              const validator = vine.compile(resource.validator())

              await validator.validate(payload)

              console.log('IT WORKS')

              await resource.create(payload)
            }

            return ctx.view.render('admin::pages/resources/create', { resource })
          })
          .as('create')
        router
          .route('/:id/edit', ['POST', 'GET'], async (ctx) => {
            const id = ctx.request.param('id')
            const model = await resource.retrieve(id)

            if (ctx.request.method() === 'POST') {
              const { _csrf, ...payload } = ctx.request.body()
              model.merge(payload)
              await model.save()
            }

            return ctx.view.render('admin::pages/resources/edit', { resource, data: model })
          })
          .as('edit')
      })
      .prefix(`/admin/resources/${slug}`)
      .as(`admin.resources.${slug}`)
  }

  handler(ctx: HttpContext) {
    return ctx.view.render('admin::pages/home')
  }

  menu(menu: () => Component[]) {
    this.#menu = menu
  }

  getMenu() {
    return this.#menu()
  }

  init() {
    edge.global('admin', this)
    router
      .group(() => {
        router.get('/', (ctx) => this.handler(ctx)).as('home')
      })
      .prefix('/admin')
      .as('admin')
  }
}

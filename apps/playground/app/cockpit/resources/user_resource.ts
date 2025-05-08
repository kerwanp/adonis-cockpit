import { LucidResource } from 'adonis-cockpit'
import { LayoutBuilder, BaseLayout } from 'adonis-cockpit/fields'
import User from '#models/user'

export default class UserResource extends LucidResource(User) {
  fields(form: LayoutBuilder<User>): BaseLayout[] {
    return [
      form.panel((form) => [
        form.id('id'),
        form.text('firstName'),
        form.text('lastName'),
        form.email('email').required(),
        form.text('password').required(),
        form.boolean('isAdmin').required(),
        form.text('roles').required(),
        form.date('createdAt').required(),
        form.date('updatedAt'),
      ]),
    ]
  }
}

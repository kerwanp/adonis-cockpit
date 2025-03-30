/* eslint-disable @typescript-eslint/no-shadow */
import User from '#models/user'
import { LucidResource } from 'adonis-cockpit'
import { BaseLayout, LayoutBuilder } from 'adonis-cockpit/fields'

export default class UserResource extends LucidResource(User) {
  icon(): string {
    return 'fa fa-users'
  }

  searchKeys(): string[] {
    return ['id', 'email', 'firstName', 'lastName']
  }

  fields(form: LayoutBuilder<User>): BaseLayout[] {
    return [
      form
        .panel((form) => {
          form.id('id')
          form
            .email('email')
            .required()
            .placeholder('john.doe@example.org')
            .hint('Put the email here Lois')
          form.text('firstName').required().placeholder('John')
          form.text('lastName').required().placeholder('Doe')
          form.boolean('isAdmin')
        })
        .title('General'),
    ]
  }
}

import User from '#models/user'
import { ModelResource } from 'adonis-cockpit'
import { Email, Id, Text, Boolean } from 'adonis-cockpit/fields'

export default class UserResource extends ModelResource {
  model = User

  fields() {
    return [
      Id.make('id'),
      Text.make('firstName'),
      Text.make('lastName'),
      Email.make('email'),
      Boolean.make('isAdmin'),
    ]
  }
}

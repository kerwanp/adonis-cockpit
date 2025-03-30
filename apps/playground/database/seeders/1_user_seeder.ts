import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  count = 100

  async run(): Promise<void> {
    await User.create({
      firstName: 'Demo',
      lastName: 'Cockpit',
      email: 'demo@adonis-cockpit.com',
      password: 'password',
      isAdmin: true,
    })

    const data = Array.from({ length: this.count }).map(() => this.generate())
    await User.createMany(data)
  }

  generate() {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    return {
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email({ firstName, lastName }),
      password: faker.internet.password(),
      isAdmin: faker.datatype.boolean(),
      roles: faker.helpers.arrayElements(['guest', 'member', 'moderator']),
    }
  }
}

import Brand from '#models/brand'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  count = 25

  async run() {
    const data = Array.from({ length: this.count }).map(() => this.generate())
    await Brand.createMany(data)
  }

  generate() {
    return {
      name: faker.company.name(),
      industry: faker.commerce.department(),
      websiteUrl: faker.internet.url({ protocol: 'https' }),
      isPublished: faker.datatype.boolean(),
    }
  }
}

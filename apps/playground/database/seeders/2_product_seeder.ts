import Brand from '#models/brand'
import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  count = 25

  async run() {
    const brands = await Brand.all()
    for (const brand of brands) {
      const data = Array.from({ length: this.count }).map(() => this.generate(brand))
      await Product.createMany(data)
    }
  }

  generate(brand: Brand) {
    return {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      brandId: brand.id,
      sku: faker.string.alphanumeric({ casing: 'upper', length: 6 }),
      quantity: faker.number.int({ min: 0, max: 256 }),
      price: Math.round(Number.parseFloat(faker.commerce.price()) * 100),
    }
  }
}

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name')
      table.string('slug')
      table.string('sku')
      table.text('description')
      table.integer('price')
      table.integer('quantity')
      table.string('status')

      table.integer('brand_id').unsigned().references('brands.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

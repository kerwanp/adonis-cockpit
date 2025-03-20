import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('first_name')
      table.string('last_name')

      table.string('user_name').unique().notNullable()
      table.string('email').unique().notNullable()
      table.boolean('newsletter').defaultTo(false)

      table.jsonb('roles').defaultTo([])

      table.string('password').notNullable()

      table.boolean('is_admin').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
